"use client";

import type {
	ResumeData,
	ResumeEducation,
	ResumeExperience,
	ResumeLink,
	ResumeProject,
} from "@/lib/resume";
import { Bold, List, ListOrdered, Plus, Save, Trash2, Underline } from "lucide-react";
import { useMemo, useState } from "react";
import { saveResumeAction } from "./actions";

type FieldProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	textarea?: boolean;
	type?: string;
};

function Field({ label, value, onChange, textarea, type = "text" }: FieldProps) {
	const className =
		"mt-2 w-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-950 focus:shadow-[3px_3px_0_#000] dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-50";

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
					type={type}
					value={value}
				/>
			)}
		</label>
	);
}

function MonthOrPresentField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
}) {
	const isPresent = value === "Present";

	return (
		<div className="grid gap-2">
			<Field
				label={label}
				onChange={onChange}
				type="month"
				value={isPresent ? "" : value}
			/>
			<label className="flex items-center gap-2 text-sm text-zinc-950 dark:text-zinc-100">
				<input
					checked={isPresent}
					className="h-4 w-4"
					onChange={(event) => onChange(event.target.checked ? "Present" : "")}
					type="checkbox"
				/>
				<span>Present</span>
			</label>
		</div>
	);
}

function RichTextEditor({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
}) {
	function runCommand(command: string) {
		document.execCommand(command);
	}

	return (
		<label className="block text-sm">
			<span className="text-zinc-950 dark:text-zinc-100">{label}</span>
			<div className="mt-2 overflow-hidden border border-zinc-200 dark:border-zinc-800">
				<div className="flex gap-1 border-b border-zinc-200 bg-zinc-100 p-2 dark:border-zinc-800 dark:bg-zinc-950">
					<button
						className="morph-button flex h-8 w-8 items-center justify-center border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
						onClick={() => runCommand("bold")}
						type="button"
					>
						<Bold className="h-4 w-4" />
					</button>
					<button
						className="morph-button flex h-8 w-8 items-center justify-center border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
						onClick={() => runCommand("underline")}
						type="button"
					>
						<Underline className="h-4 w-4" />
					</button>
					<button
						className="morph-button flex h-8 w-8 items-center justify-center border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
						onClick={() => runCommand("insertUnorderedList")}
						type="button"
					>
						<List className="h-4 w-4" />
					</button>
					<button
						className="morph-button flex h-8 w-8 items-center justify-center border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
						onClick={() => runCommand("insertOrderedList")}
						type="button"
					>
						<ListOrdered className="h-4 w-4" />
					</button>
				</div>
				<div
					className="rich-editor min-h-32 bg-zinc-50 px-3 py-2 text-sm outline-none dark:bg-zinc-900"
					contentEditable
					dangerouslySetInnerHTML={{ __html: value }}
					onInput={(event) => onChange(event.currentTarget.innerHTML)}
					suppressContentEditableWarning
				/>
			</div>
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

	function parseCommaList(value: string) {
		return value.split(",").map((item) => item.trim()).filter(Boolean);
	}

	return (
		<form action={saveResumeAction} className="grid gap-9">
			<input name="resume" type="hidden" value={payload} />

			<section className="grid gap-4">
				<h2 className="section-title text-lg text-zinc-950 dark:text-zinc-100">Profile</h2>
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
						<div className="morph-card border border-zinc-200 p-4 dark:border-zinc-800" key={index}>
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
									className="morph-button mt-7 flex h-10 w-10 items-center justify-center border border-zinc-200 text-zinc-950 dark:border-zinc-800 dark:text-zinc-100"
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
							{
								company: "",
								role: "",
								fromDate: "",
								toDate: "",
								url: "",
								description: "",
								techStack: [],
							},
						])
					}
					title="Experience"
				/>
				<div className="grid gap-4">
					{resume.experience.map((item, index) => (
						<div className="morph-card border border-zinc-200 p-4 dark:border-zinc-800" key={index}>
							<div className="grid gap-4 md:grid-cols-2">
								<Field label="Company" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, company: value })} value={item.company} />
								<Field label="Role" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, role: value })} value={item.role} />
								<Field label="From" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, fromDate: value })} type="month" value={item.fromDate} />
								<MonthOrPresentField label="To" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, toDate: value })} value={item.toDate} />
								<Field label="URL" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, url: value })} value={item.url} />
							</div>
							<div className="mt-4">
								<RichTextEditor label="Description" onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, description: value })} value={item.description} />
							</div>
							<div className="mt-4">
								<Field
									label="Tech stack highlights, comma separated"
									onChange={(value) => updateArrayItem<ResumeExperience>("experience", index, { ...item, techStack: parseCommaList(value) })}
									value={item.techStack.join(', ')}
								/>
							</div>
							<button className="morph-link mt-4 text-sm" onClick={() => removeArrayItem("experience", index)} type="button">
								Remove
							</button>
						</div>
					))}
				</div>
			</section>

			<section>
				<SectionHeader
					onAdd={() => update("projects", [...resume.projects, { name: "", url: "", description: "", techStack: [] }])}
					title="Projects"
				/>
				<div className="grid gap-4">
					{resume.projects.map((project, index) => (
						<div className="morph-card border border-zinc-200 p-4 dark:border-zinc-800" key={index}>
							<div className="grid gap-4 md:grid-cols-2">
								<Field label="Name" onChange={(value) => updateArrayItem<ResumeProject>("projects", index, { ...project, name: value })} value={project.name} />
								<Field label="URL" onChange={(value) => updateArrayItem<ResumeProject>("projects", index, { ...project, url: value })} value={project.url} />
							</div>
							<div className="mt-4">
								<RichTextEditor label="Description" onChange={(value) => updateArrayItem<ResumeProject>("projects", index, { ...project, description: value })} value={project.description} />
							</div>
							<div className="mt-4">
								<Field
									label="Tech stack highlights, comma separated"
									onChange={(value) => updateArrayItem<ResumeProject>("projects", index, { ...project, techStack: parseCommaList(value) })}
									value={project.techStack.join(", ")}
								/>
							</div>
							<button className="morph-link mt-4 text-sm" onClick={() => removeArrayItem("projects", index)} type="button">
								Remove
							</button>
						</div>
					))}
				</div>
			</section>

			<section>
				<SectionHeader
					onAdd={() => update("education", [...resume.education, { school: "", degree: "", fromDate: "", toDate: "", grade: "" }])}
					title="Education"
				/>
				<div className="grid gap-4">
					{resume.education.map((item, index) => (
						<div className="morph-card border border-zinc-200 p-4 dark:border-zinc-800" key={index}>
							<div className="grid gap-4 md:grid-cols-3">
								<Field label="School" onChange={(value) => updateArrayItem<ResumeEducation>("education", index, { ...item, school: value })} value={item.school} />
								<Field label="Degree" onChange={(value) => updateArrayItem<ResumeEducation>("education", index, { ...item, degree: value })} value={item.degree} />
								<Field label="Grade" onChange={(value) => updateArrayItem<ResumeEducation>("education", index, { ...item, grade: value })} value={item.grade} />
								<Field label="From" onChange={(value) => updateArrayItem<ResumeEducation>("education", index, { ...item, fromDate: value })} type="month" value={item.fromDate} />
								<MonthOrPresentField label="To" onChange={(value) => updateArrayItem<ResumeEducation>("education", index, { ...item, toDate: value })} value={item.toDate} />
							</div>
							<button className="morph-link mt-4 text-sm" onClick={() => removeArrayItem("education", index)} type="button">
								Remove
							</button>
						</div>
					))}
				</div>
			</section>

			<button
				className="morph-button fixed bottom-5 right-5 flex items-center gap-2 border border-zinc-200 bg-zinc-950 px-4 py-2 text-sm text-zinc-50 dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-950"
				type="submit"
			>
				<Save className="h-4 w-4" />
				Save
			</button>
		</form>
	);
}
