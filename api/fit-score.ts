import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'
import { StateGraph, Annotation, START, END } from '@langchain/langgraph'
import { profile, skills, coreCompetencies, experience } from '../src/data.js'

/**
 * Live agentic workflow, not a single prompt — a leaner sibling of the
 * original resume-tailoring agent. Two nodes instead of four, and no large
 * generated text (just a score + short rationale + keyword lists), so it's
 * meaningfully cheaper to run per request while keeping the real part: a
 * conditional loop where the agent checks its own output against the
 * resume before it's allowed to return.
 *
 * Graph:
 *   scoreFit -> critiqueScore
 *      ^_____________|
 *   (loops back if the critique catches a fabricated strength or a score
 *    that doesn't match its own rationale, up to 2 times)
 */

// ---------------------------------------------------------------------------
// Resume context — built from src/data.ts, not duplicated anywhere
// ---------------------------------------------------------------------------
function buildResumeContext(): string {
  const skillLines = skills.map((g) => `- ${g.category}: ${g.items.join(', ')}`).join('\n')
  const expLines = experience
    .map(
      (e) =>
        `${e.role} @ ${e.company} (${e.period}) — stack: ${e.stack}\n` +
        e.bullets.map((b) => `  • ${b}`).join('\n'),
    )
    .join('\n\n')

  return [
    `Name: ${profile.name}`,
    `Title: ${profile.title}`,
    `Summary: ${profile.summary}`,
    '',
    'Skills:',
    skillLines,
    '',
    `Core Competencies: ${coreCompetencies.join(', ')}`,
    '',
    'Experience:',
    expLines,
  ].join('\n')
}

// ---------------------------------------------------------------------------
// Agent state
// ---------------------------------------------------------------------------
const FitState = Annotation.Root({
  jobDescription: Annotation<string>(),
  resumeContext: Annotation<string>(),
  fitScore: Annotation<number>({ reducer: (_prev, next) => next, default: () => 0 }),
  rationale: Annotation<string>({ reducer: (_prev, next) => next, default: () => '' }),
  strengths: Annotation<string[]>({ reducer: (_prev, next) => next, default: () => [] }),
  gaps: Annotation<string[]>({ reducer: (_prev, next) => next, default: () => [] }),
  critiqueNotes: Annotation<string[]>({ reducer: (_prev, next) => next, default: () => [] }),
  revisionCount: Annotation<number>({ reducer: (_prev, next) => next, default: () => 0 }),
})
type FitStateType = typeof FitState.State

// ---------------------------------------------------------------------------
// Claude client + JSON-mode helper
// ---------------------------------------------------------------------------
let anthropic: Anthropic | null = null
function getClient(): Anthropic {
  if (!anthropic) anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  return anthropic
}

async function callClaudeJSON(system: string, user: string): Promise<any> {
  const res = await getClient().messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    system,
    messages: [{ role: 'user', content: user }],
  })
  const block = res.content.find((b) => b.type === 'text')
  const text = block && 'text' in block ? block.text : '{}'
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Model did not return parseable JSON')
  return JSON.parse(jsonMatch[0])
}

// ---------------------------------------------------------------------------
// Nodes
// ---------------------------------------------------------------------------
async function scoreFitNode(state: FitStateType) {
  const feedback = state.critiqueNotes.length
    ? `\n\nYour previous attempt had these problems: ${state.critiqueNotes.join('; ')}. Fix them this time.`
    : ''

  const data = await callClaudeJSON(
    'You are an experienced, honest technical recruiter — critical, not a cheerleader. Score how well the ' +
      "candidate resume fits the job description, 0-100. Only count a strength if it's explicitly and clearly " +
      "supported by the resume text — never infer a skill that isn't stated. List real gaps too, don't soften " +
      'them. Your rationale must be consistent with the score (a score above 80 needs very few real gaps; a ' +
      'score below 50 should reflect a clear mismatch).' +
      feedback +
      '\n\nRESUME:\n' +
      state.resumeContext,
    `JOB DESCRIPTION:\n${state.jobDescription}\n\n` +
      'Return strict JSON only: {"fitScore": number, "rationale": string (2-3 sentences), ' +
      '"strengths": string[] (max 6, real matches only), "gaps": string[] (max 6, real gaps only)}',
  )
  return {
    fitScore: typeof data.fitScore === 'number' ? Math.round(data.fitScore) : 0,
    rationale: typeof data.rationale === 'string' ? data.rationale : '',
    strengths: Array.isArray(data.strengths) ? data.strengths.slice(0, 6) : [],
    gaps: Array.isArray(data.gaps) ? data.gaps.slice(0, 6) : [],
    revisionCount: state.revisionCount + 1,
  }
}

async function critiqueScoreNode(state: FitStateType) {
  const data = await callClaudeJSON(
    'You are a strict fact-checker. Given a resume and a drafted fit assessment (score, rationale, strengths, ' +
      'gaps), flag any problem: a "strength" that references a skill NOT present anywhere in the resume, or a ' +
      'score that contradicts its own rationale (e.g. a high score despite the rationale describing major gaps). ' +
      'Return strict JSON only: {"problems": string[]} (empty array if none found).\n\nRESUME:\n' +
      state.resumeContext,
    `Fit score: ${state.fitScore}\nRationale: ${state.rationale}\n` +
      `Strengths: ${JSON.stringify(state.strengths)}\nGaps: ${JSON.stringify(state.gaps)}`,
  )
  return { critiqueNotes: Array.isArray(data.problems) ? data.problems : [] }
}

function routeAfterCritique(state: FitStateType): 'revise' | 'done' {
  if (state.critiqueNotes.length > 0 && state.revisionCount < 2) return 'revise'
  return 'done'
}

// ---------------------------------------------------------------------------
// Graph
// ---------------------------------------------------------------------------
const graph = new StateGraph(FitState)
  .addNode('scoreFit', scoreFitNode)
  .addNode('critiqueScore', critiqueScoreNode)
  .addEdge(START, 'scoreFit')
  .addEdge('scoreFit', 'critiqueScore')
  .addConditionalEdges('critiqueScore', routeAfterCritique, {
    revise: 'scoreFit',
    done: END,
  })
  .compile()

// ---------------------------------------------------------------------------
// Minimal per-instance rate limit (best-effort — see README for the
// dashboard-level Vercel Firewall rule that backs this up for real)
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 8
const hits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count += 1
  return true
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: 'Server not configured: missing ANTHROPIC_API_KEY' })
    return
  }

  const forwardedFor = req.headers['x-forwarded-for']
  const ip =
    (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown'

  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: 'Rate limit exceeded — try again in a bit.' })
    return
  }

  const jobDescription = typeof req.body?.jobDescription === 'string' ? req.body.jobDescription.trim() : ''
  if (!jobDescription) {
    res.status(400).json({ error: 'jobDescription is required' })
    return
  }
  if (jobDescription.length > 6000) {
    res.status(400).json({ error: 'Job description is too long (max 6000 characters).' })
    return
  }

  try {
    const result = await graph.invoke({
      jobDescription,
      resumeContext: buildResumeContext(),
    })
    res.status(200).json({
      fitScore: result.fitScore,
      rationale: result.rationale,
      strengths: result.strengths,
      gaps: result.gaps,
      revisions: result.revisionCount,
    })
  } catch (err) {
    console.error('fit-score agent error', err)
    res.status(500).json({ error: 'The agent failed to complete. Please try again.' })
  }
}
