import './SectionHeading.css'

interface SectionHeadingProps {
  title: string
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <h2 className="section-heading">
      {title}
      <span className="rule" />
    </h2>
  )
}
