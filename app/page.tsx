


import Image from "next/image";


export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors">
			<div className="max-w-2xl w-full bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-8 text-center">
				<Image
					src="/vercel.svg"
					alt="Profile"
					width={96}
					height={96}
					className="mx-auto mb-6 rounded-full border-4 border-blue-300 dark:border-gray-700 shadow"
				/>
				<h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">Aditya Patel</h1>
				<h2 className="text-xl text-blue-600 dark:text-blue-400 mb-4">Web Developer & Designer</h2>
				<p className="text-gray-600 dark:text-gray-300 mb-6">
					Welcome to my personal portfolio! I build modern, responsive web applications with a focus on user experience and performance. Explore my work and get in touch!
				</p>
				<div className="flex justify-center gap-4 mb-6">
					<a
						href="mailto:aditya@example.com"
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition"
					>
						Contact Me
					</a>
					<a
						href="#projects"
						className="px-4 py-2 bg-gray-200 text-blue-700 rounded hover:bg-gray-300 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700 transition"
					>
						View Projects
					</a>
				</div>
				<div className="flex justify-center gap-6">
					<a href="https://github.com/4118adi" target="_blank" rel="noopener noreferrer">
						<Image src="/next.svg" alt="GitHub" width={32} height={32} className="w-8 h-8 hover:scale-110 transition" />
					</a>
					<a href="https://linkedin.com/in/4118adi" target="_blank" rel="noopener noreferrer">
						<Image src="/vercel.svg" alt="LinkedIn" width={32} height={32} className="w-8 h-8 hover:scale-110 transition" />
					</a>
				</div>
			</div>
		</main>
	);
}

