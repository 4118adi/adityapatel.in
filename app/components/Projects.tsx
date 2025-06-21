import React from 'react';

const projects = [
  {
    title: 'Project One',
    description: 'A short description of the first project goes here. It highlights the main features and technologies used.',
    tags: ['React', 'Next.js', 'TypeScript'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Project Two',
    description: 'A short description of the second project goes here. It highlights the main features and technologies used.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Project Three',
    description: 'A short description of the third project goes here. It highlights the main features and technologies used.',
    tags: ['Python', 'Django'],
    github: '#',
    demo: '#',
  },
];

export default function Projects() {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className="bg-white dark:bg-[#232526] rounded-lg shadow p-6 flex flex-col gap-3">
            <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags.map(tag => (
                <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-auto">
              <a href={project.github} className="text-blue-600 dark:text-blue-400 text-xs underline" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={project.demo} className="text-blue-600 dark:text-blue-400 text-xs underline" target="_blank" rel="noopener noreferrer">Live Demo</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 