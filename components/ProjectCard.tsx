type ProjectCardProps = {
    title: string
    description: string
    tech: string[]
    link?: string
  }
  
  export default function ProjectCard({ title, description, tech, link }: ProjectCardProps) {
    return (
      <div className="bg-[#111] border border-[#333] rounded-2xl p-6 shadow-md hover:shadow-blue-500/20 transition duration-200">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-gray-400">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="bg-gray-800 text-sm text-gray-300 px-3 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            className="inline-block mt-5 text-sm font-medium text-blue-500 hover:underline"
          >
            View Project →
          </a>
        )}
      </div>
    )
  }
  