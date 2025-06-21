export default function Hero() {
    return (
      <section className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold tracking-tight">
          Hi, I&apos;m <span className="text-blue-500">Aditya Patel</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-xl">
          I design and build scalable backend systems & cloud-native architectures.
        </p>
        <div className="mt-6 flex space-x-4">
          <a href="/projects" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            View Projects
          </a>
          <a href="/contact" className="px-4 py-2 border border-gray-700 text-gray-300 rounded hover:bg-gray-800 transition">
            Contact Me
          </a>
        </div>
      </section>
    )
  }
  