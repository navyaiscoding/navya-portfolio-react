import { useState } from 'react'
import { projects, type ProjectEntry } from '../../data'
import { useReveal } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Projects.css'

interface ProjectCardProps {
  project: ProjectEntry
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, className } = useReveal<HTMLDivElement>()
  // If the banner can't load, drop it (and the image column) instead of showing a broken icon.
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(project.imageUrl) && !imageFailed
  const [logoFailed, setLogoFailed] = useState(false)
  const showLogo = Boolean(project.logoUrl) && !logoFailed

  return (
    <div
      className={`project-card ${showImage ? 'has-banner' : ''} ${className}`}
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {showImage && (
        <div className="project-media">
          <img
            src={project.imageUrl}
            alt={project.imageAlt ?? ''}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        </div>
      )}
      <div className="project-content">
        <h3 className="project-title">
          {showLogo && (
            <img
              className="project-logo"
              src={project.logoUrl}
              alt={project.logoAlt ?? ''}
              title={project.logoAlt}
              onError={() => setLogoFailed(true)}
            />
          )}
          {project.name}
        </h3>
        <p className="project-description">{project.description}</p>
        <ul className="project-tags">
          {project.stack.map((tech) => (
            <li key={tech} className="project-tag">{tech}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Live demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, className } = useReveal()
  return (
    <section className="section" id="projects" ref={ref}>
      <div className={className}>
        <SectionHeading title="Projects" />
        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard project={project} index={i} key={project.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
