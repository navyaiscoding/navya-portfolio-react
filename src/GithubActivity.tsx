import { useEffect, useState } from 'react'
import { github } from './data'

interface GithubUser {
  public_repos: number
  followers: number
  html_url: string
}

interface GithubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
}

type LoadState = 'loading' | 'ready' | 'error'

export default function GithubActivity() {
  const [user, setUser] = useState<GithubUser | null>(null)
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [state, setState] = useState<LoadState>('loading')

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${github.username}`),
          fetch(`https://api.github.com/users/${github.username}/repos?sort=updated&per_page=6`),
        ])
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API request failed')
        const userData: GithubUser = await userRes.json()
        const reposData: GithubRepo[] = await reposRes.json()
        if (cancelled) return
        setUser(userData)
        setRepos(reposData.filter((r) => !r.name.toLowerCase().includes('fork')))
        setState('ready')
      } catch {
        if (!cancelled) setState('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (state === 'loading') {
    return (
      <div className="gh-skeleton">
        {[1, 2, 3].map((i) => (
          <div className="gh-skeleton-card" key={i} />
        ))}
      </div>
    )
  }

  if (state === 'error') {
    return (
      <p className="about-text muted">
        Couldn't load live GitHub data right now — see the full profile at{' '}
        <a className="accent" href={`https://github.com/${github.username}`} target="_blank" rel="noreferrer">
          github.com/{github.username}
        </a>
        .
      </p>
    )
  }

  return (
    <div>
      {user && (
        <div className="gh-stats mono">
          <a href={user.html_url} target="_blank" rel="noreferrer" className="gh-stat">
            <span className="gh-stat-value accent">{user.public_repos}</span>
            <span className="muted small">public repos</span>
          </a>
          <a href={user.html_url} target="_blank" rel="noreferrer" className="gh-stat">
            <span className="gh-stat-value accent">{user.followers}</span>
            <span className="muted small">followers</span>
          </a>
        </div>
      )}

      {repos.length === 0 ? (
        <p className="about-text muted">
          No public repositories yet — this portfolio's source is on its way to being public. Check{' '}
          <a className="accent" href={`https://github.com/${github.username}`} target="_blank" rel="noreferrer">
            github.com/{github.username}
          </a>{' '}
          for the latest.
        </p>
      ) : (
        <div className="gh-repo-grid">
          {repos.map((repo) => (
            <a
              key={repo.id}
              className="gh-repo-card"
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="mono">{repo.name}</h3>
              <p className="gh-repo-desc">{repo.description || 'No description provided.'}</p>
              <div className="gh-repo-meta mono small muted">
                {repo.language && <span>{repo.language}</span>}
                <span>★ {repo.stargazers_count}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
