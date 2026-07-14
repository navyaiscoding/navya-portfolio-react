import { useEffect, useRef, useState, type RefObject } from 'react'

export type Theme = 'light' | 'dark'

interface RevealResult<T extends HTMLElement> {
  ref: RefObject<T>
  className: string
}

// Fades/slides an element in the first time it scrolls into view.
export function useReveal<T extends HTMLElement = HTMLElement>(): RevealResult<T> {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, className: `reveal ${visible ? 'visible' : ''}` }
}

interface ThemeResult {
  theme: Theme
  toggle: () => void
}

// Persists light/dark theme choice, defaulting to light.
export function useTheme(): ThemeResult {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = window.localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  return { theme, toggle }
}

interface TypedCodeResult {
  typed: string
  done: boolean
}

// Types out a fixed multi-line string once, character by character, and stops.
export function useTypedCode(code: string, speed = 16): TypedCodeResult {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (typed.length >= code.length) return
    const timeout = setTimeout(() => {
      setTyped(code.slice(0, typed.length + 1))
    }, speed)
    return () => clearTimeout(timeout)
  }, [typed, code, speed])

  return { typed, done: typed.length >= code.length }
}

interface TypewriterOptions {
  typingSpeed?: number
  deletingSpeed?: number
  pause?: number
}

// Types out each word in `words`, pauses, deletes it, then moves to the next.
export function useTypewriter(
  words: string[],
  { typingSpeed = 90, deletingSpeed = 45, pause = 1400 }: TypewriterOptions = {}
): string {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === currentWord) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length + (deleting ? -1 : 1)))
      }, deleting ? deletingSpeed : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause])

  return text
}
