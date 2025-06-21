import ProjectCard from './ProjectCard'

const projects = [
  {
    title: 'Real-Time Seat Occupancy System',
    description: 'Used CCTV + OpenCV to detect and visualize live seat status for auditorium organizers.',
    tech: ['Next.js', 'Prisma', 'OpenCV', 'MySQL'],
    link: 'https://github.com/adityapatel/opencv-seating',
  },
  {
    title: 'Tweet to JPG API',
    description: 'Fetches tweets and renders them as images with optional watermark and design styles.',
    tech: ['Node.js', 'Twitter API', 'Cloudinary'],
    link: 'https://github.com/adityapatel/tweet-img-api',
  },
  {
    title: 'Stock Tip App (Demo)',
    description: 'A cross-platform app for stock recommendations with demo portfolio support.',
    tech: ['React Native', 'Firebase', 'REST API'],
  },
]

export default function Projects() {
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}
