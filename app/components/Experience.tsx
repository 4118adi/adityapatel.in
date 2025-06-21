import React from 'react';

const experiences = [
  {
    company: 'Company One',
    role: 'Frontend Developer',
    duration: 'Jan 2022 - Present',
    description: 'Worked on building and maintaining the main web application using React and Next.js. Collaborated with designers and backend developers to deliver new features.',
  },
  {
    company: 'Company Two',
    role: 'Backend Developer',
    duration: 'Jun 2020 - Dec 2021',
    description: 'Developed REST APIs and managed databases using Node.js and MongoDB. Improved application performance and reliability.',
  },
  {
    company: 'University Name',
    role: 'B.Sc. Computer Science',
    duration: '2017 - 2020',
    description: 'Studied core computer science concepts and participated in coding competitions and hackathons.',
  },
];

export default function Experience() {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">Experience</h2>
      <div className="flex flex-col gap-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="bg-white dark:bg-[#232526] rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <span className="font-semibold text-lg">{exp.company}</span>
              <span className="text-xs text-gray-500 mt-1 md:mt-0">{exp.duration}</span>
            </div>
            <div className="font-medium text-blue-600 dark:text-blue-400 mb-1">{exp.role}</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">{exp.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 