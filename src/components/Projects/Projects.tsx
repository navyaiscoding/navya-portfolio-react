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
  return (
    <div
      className={`project-card ${className}`}
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <h3>{project.name}</h3>
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
