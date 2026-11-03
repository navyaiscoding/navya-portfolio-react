import { getInitials } from './categoryColors'
import { skillIcons } from './skillIcons'
import './Skills.css'

interface SkillIconProps {
  name: string
  // Every other tile sits slightly higher for a relaxed, staggered look.
  raised?: boolean
  // Logo only; the name appears on hover (used by the scrolling ticker).
  labelOnHover?: boolean
}

// One logo tile: round badge with the skill's logo (or its initials when there's
// no logo) and a label. Tinted by the nearest ancestor's `--cat-color`.
export default function SkillIcon({ name, raised, labelOnHover }: SkillIconProps) {
  const icon = skillIcons[name]
  return (
    <div
      className={`skill-icon-item ${labelOnHover ? 'label-on-hover' : ''}`}
      title={name}
      style={raised ? { transform: 'translateY(-0.125rem)' } : undefined}
    >
      <span className="skill-icon-badge">
        {icon ? (
          <img
            src={icon.src}
            alt=""
            className={icon.invert ? 'skill-icon-invert' : ''}
            loading="lazy"
            // Some icon paths change over time — fall back to initials
            // instead of showing a broken image icon.
            onError={(e) => {
              const img = e.currentTarget
              img.style.display = 'none'
              img.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}
        <span className={`skill-icon-initials ${icon ? 'hidden' : ''}`}>{getInitials(name)}</span>
      </span>
      <span className="skill-icon-label">{name}</span>
    </div>
  )
}
