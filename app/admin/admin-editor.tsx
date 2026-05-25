"use client";

import type {
	ResumeData,
	ResumeEducation,
	ResumeExperience,
	ResumeLink,
	ResumeProject,
} from "@/lib/resume";
import { Plus, Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { saveResumeAction } from "./actions";

type FieldProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	textarea?: boolean;
};

function Field({ label, value, onChange, textarea }: FieldProps) {
	const className =
		"mt-2 w-full rounded border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-600";

	return (
		<label className="block text-sm">
			<span className="text-zinc-950 dark:text-zinc-100">{label}</span>
			{textarea ? (
				<textarea
					className={`${className} min-h-24 resize-y`}
					onChange={(event) => onChange(event.target.value)}
					value={value}
				/>
			) : (
				<input
					className={className}
					onChange={(event) => onChange(event.target.value)}
					value={value}
				/>
			)}
		</label>
	);
}

function SectionHeader({
	title,
	onAdd,
}: {
	title: string;
	onAdd: () => void;
}) {
	return (
		<div className="flex items-center justify-between gap-4 pb-4">
			<h2 className="text-lg text-zinc-950 dark:text-zinc-100">{title}</h2>
			<button
				className="flex h-8 w-8 items-center justify-center rounded border border-zinc-200 text-zinc-950 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800"
				onClick={onAdd}
				type="button"
			>
				<Plus className="h-4 w-4" />
			</button>
		</div>
	);
}

export function AdminEditor({ initialData }: { initialData: ResumeData }) {
	const [resume, setResume] = useState(initialData);
	const payload = useMemo(() => JSON.stringify(resume), [resume]);

	function update<Key extends keyof ResumeData>(key: Key, value: ResumeData[Key]) {
		setResume((current) => ({ ...current, [key]: value }));
	}

	function updateArrayItem<T>(
		key: keyof ResumeData,
		index: number,
		nextItem: T,
	) {
		setResume((current) => {
			const items = [...(current[key] as T[])];
			items[index] = nextItem;
			return { ...current, [key]: items };
		});
	}

	function removeArrayItem(key: keyof ResumeData, index: number) {
		setResume((current) => ({
			...current,
			[key]: (current[key] as unknown[]).filter((_, itemIndex) => itemIndex !== index),
		}));
	}

	return (
		<form action={saveResumeAction} className="grid gap-9">
			<input name="resume" type="hidden" value={payload} />

			<section className="grid gap-4">
				<h2 className="text-lg text-zinc-950 dark:text-zinc-100">Profile</h2>
				<div className="grid gap-4 md:grid-cols-2">
					<Field label="Name" onChange={(value) => update("name", value)} value={resume.name} />
					<Field label="Handle" onChange={(value) => update("handle", value)} value={resume.handle} />
					<Field label="Role" onChange={(value) => update("role", value)} value={resume.role} />
					<Field label="Location" onChange={(value) => update("location", value)} value={resume.location} />
					<Field label="Email" onChange={(value) => update("email", value)} value={resume.email} />
				</div>
				<Field label="Intro" onChange={(value) => update("intro", value)} textarea value={resume.intro} />
				<Field label="Summary" onChange={(value) => update("summary", value)} textarea value={resume.summary} />
				<Field
					label="Skills, comma separated"
					onChange={(value) => update("skills", value.split(",").map((skill) => skill.trim()))}
					value={resume.skills.join(", ")}
				/>
			</section>

			<section>
				<SectionHeader
					onAdd={() => update("links", [...resume.links, { label: "", url: "" }])}
					title="Links"
				/>
				<div className="grid gap-4">
					{resume.links.map((link, index) => (
						<div className="rounded border border-zinc-200 p-4 dark:border-zinc-800" key={index}>
							<div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
								<Field
									label="Label"
									onChange={(value) => updateArrayItem<ResumeLink>("links", index, { ...link, label: value })}
									value={link.label}
								/>
								<Field
									label="URL"
									onChange={(value) => updateArrayItem<ResumeLink>("links", index, { ...link, url: value })}
									value={link.url}
								/>
								<button
									className="mt-7 flex h-10 w-10 items-center justify-center rounded border border-zinc-200 text-zinc-950 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800"
									onClick={() => removeArrayItem("links", index)}
									type="button"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
						</div>
					))}
				</div>
			</section>

			<section>
				<SectionHeader
					onAdd={() =>
						update("experience", [
							...resume.experience,
							{ company: "", role: "", period: "", url: "", description: "" },
						])
					}
					title="Experience"
				/>
				<div className="grid gap-4">
					{resume.experience.map((item, index) => (
						<div className="rounded border border-zinc-200 p-4 dark:border-zinc-800" key={index}>
							<div className="grid gap-4 md:grid-cols-2">
								<Field label="Company" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, company: value })} value={item.company} />
								<Field label="Role" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, role: value })} value={item.role} />
								<Field label="Period" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, period: value })} value={item.period} />
								<Field label="URL" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, url: value })} value={item.url} />
							</div>
							<div className="mt-4">
								<Field label="Description" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, description: value })} textarea value={item.description} />
							</div>
							<button className="mt-4 text-sm underline" onClick={() => removeArrayItem("experience", index)} type="button">
								Remove
							</button>
						</div>
					))}
				</div>
			</section>

			<section>
				<SectionHeader
					onAdd={() => update("projects", [...resume.projects, { name: "", url: "", description: "" }])}
					title="Projects"
				/>
				<div className="grid gap-4">
					{resume.projects.map((project, index) => (
						<div className="rounded border border-zinc-200 p-4 dark:border-zinc-800" key={index}>
							<div className="grid gap-4 md:grid-cols-2">
								<Field label="Name" onChange={(value) => updateArrayItem<ResumeProject>("projects", index, { ...project, name: value })} value={project.name} />
								<Field label="URL" onChange={(value) => updateArrayItem<ResumeProject>("projects", index, { ...project, url: value })} value={project.url} />
							</div>
							<div className="mt-4">
								<Field label="Description" onChange={(value) => updateArrayItem<ResumeProject>("projects", index, { ...project, description: value })} textarea value={project.description} />
							</div>
							<button className="mt-4 text-sm underline" onClick={() => removeArrayItem("projects", index)} type="button">
								Remove
							</button>
						</div>
					))}
				</div>
			</section>

			<section>
				<SectionHeader
					onAdd={() => update("education", [...resume.education, { school: "", degree: "", period: "" }])}
					title="Education"
				/>
				<div className="grid gap-4">
					{resume.education.map((item, index) => (
						<div className="rounded border border-zinc-200 p-4 dark:border-zinc-800" key={index}>
							<div className="grid gap-4 md:grid-cols-3">
								<Field label="School" onChange={(value) => updateArrayItem<ResumeEducation>("education", index, { ...item, school: value })} value={item.school} />
								<Field label="Degree" onChange={(value) => updateArrayItem<ResumeEducation>("education", index, { ...item, degree: value })} value={item.degree} />
								<Field label="Period" onChange={(value) => updateArrayItem<ResumeEducation>("education", index, { ...item, period: value })} value={item.period} />
							</div>
							<button className="mt-4 text-sm underline" onClick={() => removeArrayItem("education", index)} type="button">
								Remove
							</button>
						</div>
					))}
				</div>
			</section>

			<button
				className="fixed bottom-5 right-5 flex items-center gap-2 rounded border border-zinc-200 bg-zinc-950 px-4 py-2 text-sm text-zinc-50 shadow-sm hover:bg-zinc-800 dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
				type="submit"
			>
				<Save className="h-4 w-4" />
				Save
			</button>
		</form>
	);
}
