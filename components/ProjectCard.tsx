type ProjectCardProps = {
    title: string
    description: string
    tech: string[]
    link?: string
  }
  
  export default function ProjectCard({ title, description, tech, link }: ProjectCardProps) {
    return (
      <div className="border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-300">
          {tech.map((t) => (
            <span key={t} className="bg-gray-800 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            className="inline-block mt-4 text-blue-500 hover:underline"
          >
            View Project →
          </a>
        )}
      </div>
    )
  }
  