import { ThemeToggle } from "@/components/theme-toggle";
import { getResumeData } from "@/lib/resume";
import type { ReactNode } from "react";

const skillColors = [
	"bg-[#3178C6]/15",
	"bg-[#61DAFB]/20",
	"bg-zinc-200/70 dark:bg-zinc-800",
	"bg-[#38BDF8]/15",
	"bg-[#D34516]/15",
	"bg-[#00ADD8]/15",
	"bg-[#48205D]/15",
];

function Chip({ children, index }: { children: ReactNode; index: number }) {
	return (
		<span
			className={`mr-1 inline-block rounded border border-zinc-200 px-[6px] py-[3px] dark:border-zinc-800 ${skillColors[index % skillColors.length]}`}
		>
			{children}
		</span>
	);
}

export default async function Home() {
	const resume = await getResumeData();

	return (
		<>
			<ThemeToggle />
			<header className="pb-10 pt-14 md:pb-12 md:pt-[72px]">
				<div className="m-auto max-w-[640px] px-6">
					<p className="text-sm text-zinc-500 dark:text-zinc-500">
						{resume.role}
						{resume.location ? ` / ${resume.location}` : ""}
					</p>
					<h1 className="pt-8 text-3xl text-zinc-950 dark:text-zinc-100">
						{resume.name}
					</h1>
					<p className="pb-4 text-sm text-zinc-700 dark:text-zinc-400">
						<a
							className="underline hover:text-zinc-950 dark:hover:text-zinc-100"
							href={`https://www.github.com/${resume.handle}`}
						>
							@aditya.patel
						</a>
					</p>
					<p className="text-sm">{resume.intro}</p>
					<p className="pt-2 text-sm">{resume.summary}</p>
					{resume.skills.length > 0 ? (
						<p className="pt-2 text-sm">
							I primarily use{" "}
							{resume.skills.map((skill, index) => (
								<Chip index={index} key={skill}>
									{skill}
								</Chip>
							))}
							for building my software.
						</p>
					) : null}
				</div>
			</header>

			<main className="m-auto max-w-[640px] px-6">
				{resume.experience.length > 0 ? (
					<section className="py-9">
						<h2 className="pb-6 text-lg text-zinc-950 dark:text-zinc-100">
							Experience
						</h2>
						<div className="grid gap-4">
							{resume.experience.map((item) => (
								<article
									className="rounded border border-zinc-200 p-4 hover:outline hover:outline-4 hover:outline-offset-2 hover:outline-zinc-200 dark:border-zinc-800 dark:hover:outline-zinc-800"
									key={`${item.company}-${item.role}`}
								>
									<div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
										<h3 className="text-sm text-zinc-950 dark:text-zinc-100">
											{item.url ? (
												<a
													className="underline hover:text-zinc-950 dark:hover:text-zinc-100"
													href={item.url}
												>
													{item.company}
												</a>
											) : (
												item.company
											)}
										</h3>
										<p className="text-xs text-zinc-500">{item.period}</p>
									</div>
									<p className="pb-2 text-sm">{item.role}</p>
									<p className="text-sm">{item.description}</p>
								</article>
							))}
						</div>
					</section>
				) : null}

				{resume.projects.length > 0 ? (
					<section className="py-9">
						<h2 className="pb-6 text-lg text-zinc-950 dark:text-zinc-100">
							Projects
						</h2>
						<div className="grid gap-4">
							{resume.projects.map((project, index) => (
								<article
									className={`rounded border border-zinc-200 p-4 hover:outline hover:outline-4 hover:outline-offset-2 hover:outline-zinc-200 dark:border-zinc-800 dark:hover:outline-zinc-800 ${index === 0 ? "bg-[linear-gradient(135deg,rgba(49,120,198,0.12)_50%,rgba(211,69,22,0.12)_50%)]" : ""}`}
									key={project.name}
								>
									<h3 className="mb-4 text-sm">
										<a
											className="underline hover:text-zinc-950 dark:hover:text-zinc-100"
											href={project.url}
										>
											{project.name}
										</a>
									</h3>
									<p className="text-sm">{project.description}</p>
								</article>
							))}
						</div>
					</section>
				) : null}

				{resume.education.length > 0 ? (
					<section className="py-9">
						<h2 className="pb-6 text-lg text-zinc-950 dark:text-zinc-100">
							Education
						</h2>
						<div className="grid gap-4">
							{resume.education.map((item) => (
								<article
									className="rounded border border-dashed border-zinc-200 p-4 dark:border-zinc-800"
									key={`${item.school}-${item.degree}`}
								>
									<div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
										<h3 className="text-sm text-zinc-950 dark:text-zinc-100">
											{item.school}
										</h3>
										<p className="text-xs text-zinc-500">{item.period}</p>
									</div>
									<p className="text-sm">{item.degree}</p>
								</article>
							))}
						</div>
					</section>
				) : null}
			</main>

			<footer className="mt-12 border-t border-zinc-200 py-9 dark:border-zinc-800">
				<div className="m-auto max-w-[640px] space-x-2 px-6">
					{resume.links.map((link) => (
						<a
							className="text-sm underline hover:text-zinc-950 dark:hover:text-zinc-100"
							href={link.url}
							key={link.label}
						>
							{link.label}
						</a>
					))}
				</div>
			</footer>
		</>
	);
}
