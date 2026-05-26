import { SectionJumpController } from "@/components/section-jump-controller";
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
      className={`morph-chip inline-flex border border-zinc-200 px-[6px] py-[3px] dark:border-zinc-800 ${skillColors[index % skillColors.length]}`}
    >
      {children}
    </span>
  );
}

function TechStack({ items }: { items: string[] }) {
	if (items.length === 0) {
		return null;
	}

	return (
		<div className="mt-4 flex flex-wrap gap-1">
			{items.map((item, index) => (
				<Chip index={index} key={item}>
					{item}
				</Chip>
			))}
		</div>
	);
}

function formatDate(value: string) {
	if (!value) {
		return "";
	}

	const [year, month] = value.split("-");
	const date = new Date(Number(year), Number(month || "1") - 1);

	return new Intl.DateTimeFormat("en", {
		month: "short",
		year: "numeric",
	}).format(date);
}

function formatRange(fromDate: string, toDate: string) {
	if (!fromDate && !toDate) {
		return "";
	}

	if (fromDate && !toDate) {
		return `${formatDate(fromDate)} - Present`;
	}

	if (!fromDate) {
		return formatDate(toDate);
	}

	return `${formatDate(fromDate)} - ${formatDate(toDate)}`;
}

export default async function Home() {
	const resume = await getResumeData();
	const sections = [
		"Intro",
		...(resume.experience.length > 0 ? ["Experience"] : []),
		...(resume.projects.length > 0 ? ["Projects"] : []),
		...(resume.education.length > 0 ? ["Education"] : []),
		"Contact",
	];

	return (
		<>
			<SectionJumpController sections={sections} />
			<ThemeToggle />
			<header className="screen-section site-shell" data-screen-section>
				<div className="section-inner m-auto max-w-[640px] px-6">
					<p className="motion-item w-fit border border-zinc-200 bg-zinc-50 px-2 py-1 text-sm text-zinc-500 shadow-[3px_3px_0_#000] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
						{resume.role}
						{resume.location ? ` / ${resume.location}` : ""}
					</p>
					<h1 className="motion-item pt-8 text-4xl text-zinc-950 dark:text-zinc-100">
						{resume.name}
					</h1>
					<p className="motion-item text-sm">{resume.intro}</p>
					<p className="motion-item pt-2 text-sm">{resume.summary}</p>
					{resume.skills.length > 0 ? (
						<div className="motion-item pt-2 text-sm text-justify">
  <p>
    I primarily use the following technologies for building my software.
  </p>

  <div className="mt-2 flex flex-wrap gap-2">
    {resume.skills.map((skill, index) => (
      <Chip index={index} key={skill}>
        {skill}
      </Chip>
    ))}
  </div>
</div>
					) : null}
				</div>
			</header>

			<main>
				{resume.experience.length > 0 ? (
					<section className="screen-section" data-screen-section>
						<div className="section-inner m-auto w-full max-w-[640px] px-6">
							<h2 className="section-title motion-item pb-6 text-lg text-zinc-950 dark:text-zinc-100">
								Experience
							</h2>
							<div className="grid gap-4">
								{resume.experience.map((item) => (
									<article
										className="motion-item morph-card border border-zinc-200 p-4 dark:border-zinc-800"
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
											<p className="text-xs text-zinc-500">
												{formatRange(item.fromDate, item.toDate)}
											</p>
										</div>
										<p className="pb-2 text-sm">{item.role}</p>
										<div
											className="rich-content text-sm"
											dangerouslySetInnerHTML={{ __html: item.description }}
										/>
										<TechStack items={item.techStack} />
									</article>
								))}
							</div>
						</div>
					</section>
				) : null}

				{resume.projects.length > 0 ? (
					<section className="screen-section" data-screen-section>
						<div className="section-inner m-auto w-full max-w-[640px] px-6">
							<h2 className="section-title motion-item pb-6 text-lg text-zinc-950 dark:text-zinc-100">
								Projects
							</h2>
							<div className="grid gap-4">
								{resume.projects.map((project, index) => (
									<article
										className={`motion-item morph-card border border-zinc-200 p-4 dark:border-zinc-800 ${index === 0 ? "bg-[linear-gradient(135deg,rgba(49,120,198,0.12)_50%,rgba(211,69,22,0.12)_50%)]" : ""}`}
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
										<div
											className="rich-content text-sm"
											dangerouslySetInnerHTML={{ __html: project.description }}
										/>
										<TechStack items={project.techStack} />
									</article>
								))}
							</div>
						</div>
					</section>
				) : null}

				{resume.education.length > 0 ? (
					<section className="screen-section" data-screen-section>
						<div className="section-inner m-auto w-full max-w-[640px] px-6">
							<h2 className="section-title motion-item pb-6 text-lg text-zinc-950 dark:text-zinc-100">
								Education
							</h2>
							<div className="grid gap-4">
								{resume.education.map((item) => (
									<article
										className="motion-item morph-card border border-dashed border-zinc-200 p-4 dark:border-zinc-800"
										key={`${item.school}-${item.degree}`}
									>
										<div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
											<h3 className="text-sm text-zinc-950 dark:text-zinc-100">
												{item.school}
											</h3>
											<p className="text-xs text-zinc-500">
												{formatRange(item.fromDate, item.toDate)}
											</p>
										</div>
										<p className="text-sm">{item.degree}</p>
										{item.grade ? (
											<p className="pt-2 text-sm">Grade: {item.grade}</p>
										) : null}
									</article>
								))}
							</div>
						</div>
					</section>
				) : null}
			</main>

			<footer className="screen-section border-t border-zinc-200 dark:border-zinc-800" data-screen-section>
				<div className="section-inner m-auto w-full max-w-[640px] px-6">
					<h2 className="section-title motion-item pb-6 text-lg text-zinc-950 dark:text-zinc-100">
						Contact
					</h2>
					<div className="motion-item flex flex-wrap gap-2">
					{resume.links.map((link) => (
						<a
							className="morph-link text-sm hover:text-zinc-950 dark:hover:text-zinc-100"
							href={link.url}
							key={link.label}
						>
							{link.label}
						</a>
					))}
					</div>
				</div>
			</footer>
		</>
	);
}
