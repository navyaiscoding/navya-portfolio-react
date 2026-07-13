import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'
import { StateGraph, Annotation, START, END } from '@langchain/langgraph'
import { profile, skills, coreCompetencies, experience } from '../src/data.js'

/**
 * Live agentic workflow, not a single prompt.
 *
 * Graph:
 *   extractRequirements -> matchResume -> draftBullets -> critiqueBullets
 *                                              ^________________|
 *                                    (loops back if critique finds a
 *                                     fabricated skill, up to 2 times)
 *
 * The resume "source of truth" is src/data.ts — the same file that drives
 * the rest of the site — so the agent can never drift out of sync with the
 * public resume content, and every claim it's allowed to make about the
 * candidate is auditable against real, versioned data.
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
const TailorState = Annotation.Root({
  jobDescription: Annotation<string>(),
  resumeContext: Annotation<string>(),
  requirements: Annotation<string[]>({ reducer: (_prev, next) => next, default: () => [] }),
  matched: Annotation<string[]>({ reducer: (_prev, next) => next, default: () => [] }),
  missingKeywords: Annotation<string[]>({ reducer: (_prev, next) => next, default: () => [] }),
  fitScore: Annotation<number>({ reducer: (_prev, next) => next, default: () => 0 }),
  bullets: Annotation<string[]>({ reducer: (_prev, next) => next, default: () => [] }),
  critiqueIssues: Annotation<string[]>({ reducer: (_prev, next) => next, default: () => [] }),
  revisionCount: Annotation<number>({ reducer: (_prev, next) => next, default: () => 0 }),
})
type TailorStateType = typeof TailorState.State

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
    max_tokens: 1024,
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
async function extractRequirementsNode(state: TailorStateType) {
  const data = await callClaudeJSON(
    'You are a technical recruiter. Extract the key technical skills, tools, and qualifications explicitly ' +
      'required or preferred in the job description the user provides. Return strict JSON only: ' +
      '{"requirements": string[]}. Keep each requirement short (1-4 words). No prose outside the JSON.',
    state.jobDescription,
  )
  return { requirements: Array.isArray(data.requirements) ? data.requirements.slice(0, 20) : [] }
}

async function matchResumeNode(state: TailorStateType) {
  const data = await callClaudeJSON(
    'You are a technical recruiter. Given a candidate resume and a list of job requirements, decide which ' +
      'requirements are genuinely supported by the resume and which are missing. Only mark a requirement as ' +
      "matched if it is explicitly and clearly supported by the resume text — never infer a skill that isn't " +
      'stated. Return strict JSON only: {"matched": string[], "missing": string[], "fitScore": number} where ' +
      'fitScore is 0-100.\n\nRESUME:\n' +
      state.resumeContext,
    `Requirements to check: ${JSON.stringify(state.requirements)}`,
  )
  return {
    matched: Array.isArray(data.matched) ? data.matched : [],
    missingKeywords: Array.isArray(data.missing) ? data.missing : [],
    fitScore: typeof data.fitScore === 'number' ? Math.round(data.fitScore) : 0,
  }
}

async function draftBulletsNode(state: TailorStateType) {
  const feedback = state.critiqueIssues.length
    ? `\n\nThe previous draft incorrectly referenced these skills, which are NOT in the resume: ` +
      `${state.critiqueIssues.join(', ')}. Remove or rephrase them. Do not mention any tool or technology that ` +
      "isn't in the resume text below."
    : ''

  const data = await callClaudeJSON(
    'You are a senior technical resume writer. Write up to 5 resume bullets in Google XYZ format ' +
      '("Accomplished X, as measured by Y, by doing Z") tailored to the job requirements below. ' +
      'CRITICAL RULE: you may ONLY reference skills, tools, and technologies that literally appear in the ' +
      "candidate's resume context. Never invent or infer a technology the candidate hasn't listed, even if the " +
      'job description asks for it — reframe and emphasize real experience, do not fabricate.' +
      feedback +
      '\n\nRESUME:\n' +
      state.resumeContext,
    `Job requirements: ${JSON.stringify(state.requirements)}\n` +
      `Matched skills to emphasize: ${JSON.stringify(state.matched)}\n\n` +
      'Return strict JSON only: {"bullets": string[]}',
  )
  return {
    bullets: Array.isArray(data.bullets) ? data.bullets.slice(0, 5) : [],
    revisionCount: state.revisionCount + 1,
  }
}

async function critiqueBulletsNode(state: TailorStateType) {
  const data = await callClaudeJSON(
    'You are a strict fact-checker. Compare the drafted resume bullets against the candidate resume context. ' +
      'Flag any tool, technology, or skill named in the bullets that does NOT appear anywhere in the resume ' +
      'context — these are fabrications and must be caught. Return strict JSON only: {"issues": string[]} ' +
      '(empty array if none found).\n\nRESUME:\n' +
      state.resumeContext,
    `Drafted bullets:\n${state.bullets.join('\n')}`,
  )
  return { critiqueIssues: Array.isArray(data.issues) ? data.issues : [] }
}

function routeAfterCritique(state: TailorStateType): 'revise' | 'done' {
  if (state.critiqueIssues.length > 0 && state.revisionCount < 2) return 'revise'
  return 'done'
}

// ---------------------------------------------------------------------------
// Graph
// ---------------------------------------------------------------------------
const graph = new StateGraph(TailorState)
  .addNode('extractRequirements', extractRequirementsNode)
  .addNode('matchResume', matchResumeNode)
  .addNode('draftBullets', draftBulletsNode)
  .addNode('critiqueBullets', critiqueBulletsNode)
  .addEdge(START, 'extractRequirements')
  .addEdge('extractRequirements', 'matchResume')
  .addEdge('matchResume', 'draftBullets')
  .addEdge('draftBullets', 'critiqueBullets')
  .addConditionalEdges('critiqueBullets', routeAfterCritique, {
    revise: 'draftBullets',
    done: END,
  })
  .compile()

// ---------------------------------------------------------------------------
// Minimal per-instance rate limit (best-effort — see README for the
// dashboard-level Vercel Firewall rule that backs this up for real)
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 5
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
      matched: result.matched,
      missingKeywords: result.missingKeywords,
      bullets: result.bullets,
      revisions: result.revisionCount,
    })
  } catch (err) {
    console.error('tailor agent error', err)
    res.status(500).json({ error: 'The agent failed to complete. Please try again.' })
  }
}
