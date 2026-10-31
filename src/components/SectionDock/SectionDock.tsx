import { useActiveSection } from '../../hooks'
import './SectionDock.css'

interface DockItem {
  id: string
  label: string
  icon: JSX.Element
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const DOCK_ITEMS: DockItem[] = [
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
  },
  {
    id: 'competencies',
    label: 'Competencies',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg {...iconProps}>
        <path d="M9 8 4 12l5 4" />
        <path d="M15 8l5 4-5 4" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg {...iconProps}>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="9" r="6" />
        <path d="m8.5 14.5-1.5 7 5-2.5 5 2.5-1.5-7" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 6 8 6 8-6" />
      </svg>
    ),
  },
]

const SECTION_IDS = DOCK_ITEMS.map((item) => item.id)

export default function SectionDock() {
  const active = useActiveSection(SECTION_IDS)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="dock" aria-label="Section navigation">
      {DOCK_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`dock-tile ${active === item.id ? 'active' : ''}`}
          onClick={() => scrollTo(item.id)}
          aria-current={active === item.id ? 'true' : undefined}
        >
          <span className="dock-tile-icon">{item.icon}</span>
          <span className="dock-tile-label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
