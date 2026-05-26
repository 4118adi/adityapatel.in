import { createClient } from "@supabase/supabase-js";

export type ResumeLink = {
	label: string;
	url: string;
};

export type ResumeExperience = {
	company: string;
	role: string;
	fromDate: string;
	toDate: string;
	url: string;
	description: string;
	techStack: string[];
};

export type ResumeProject = {
	name: string;
	url: string;
	description: string;
	techStack: string[];
};

export type ResumeEducation = {
	school: string;
	degree: string;
	fromDate: string;
	toDate: string;
	grade: string;
};

export type ResumeData = {
	name: string;
	handle: string;
	role: string;
	location: string;
	email: string;
	intro: string;
	summary: string;
	skills: string[];
	links: ResumeLink[];
	experience: ResumeExperience[];
	projects: ResumeProject[];
	education: ResumeEducation[];
};

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function getResumeData(): Promise<ResumeData> {
	const { data, error } = await supabase
		.from("resumes")
		.select("content")
		.eq("slug", "main")
		.maybeSingle();

	if (error) {
		console.error(error);
		throw new Error("Failed to fetch resume data");
	}

	if (!data) {
		return normalizeResumeData({} as ResumeData);
	}

	return normalizeResumeData(data.content as ResumeData);
}

export async function saveResumeData(data: ResumeData) {
	const normalized = normalizeResumeData(data);

	const { error } = await supabase
		.from("resumes")
		.upsert(
			{
				slug: "main",
				content: normalized,
				updated_at: new Date().toISOString(),
			},
			{
				onConflict: "slug",
			},
		);

	if (error) {
		console.error(error);
		throw new Error("Failed to save resume data");
	}
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function textToHtml(value: string) {
	const lines = value
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);

	if (lines.length > 1 && lines.every((line) => line.startsWith("•") || line.startsWith("-"))) {
		return `<ul>${lines
			.map((line) => `<li>${escapeHtml(line.replace(/^[•-]\s*/, ""))}</li>`)
			.join("")}</ul>`;
	}

	return lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
}

export function sanitizeHtml(value: string) {
	const html = value.includes("<") ? value : textToHtml(value);

	return html
		.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
		.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
		.replace(/\son\w+="[^"]*"/gi, "")
		.replace(/\son\w+='[^']*'/gi, "")
		.replace(/\s(href|src)=["']javascript:[^"']*["']/gi, "")
		.replace(/<(?!\/?(p|br|strong|b|em|i|u|ul|ol|li|a)\b)[^>]*>/gi, "");
}

function latestDateValue(item: { fromDate?: string; toDate?: string }) {
	const date = item.toDate || item.fromDate;
	const time = date ? new Date(date).getTime() : 0;

	return Number.isNaN(time) ? 0 : time;
}

function normalizeMonth(value: string) {
	if (!value) {
		return "";
	}

	return value.slice(0, 7);
}

function sortByLatestDate<T extends { fromDate?: string; toDate?: string }>(items: T[]) {
	return [...items].sort(
		(first, second) => latestDateValue(second) - latestDateValue(first),
	);
}

export function normalizeResumeData(data: ResumeData): ResumeData {
	return {
		name: data.name?.trim() || "Aditya Patel",
		handle: data.handle?.trim() || "@adityapatel",
		role: data.role?.trim() || "Web Developer",
		location: data.location?.trim() || "",
		email: data.email?.trim() || "",
		intro: data.intro?.trim() || "",
		summary: data.summary?.trim() || "",
		skills: (data.skills || []).map((skill) => skill.trim()).filter(Boolean),

		links: (data.links || []).filter(
			(link) => link.label?.trim() && link.url?.trim(),
		),

		experience: sortByLatestDate(
			(data.experience || [])
				.filter((item) => item.company || item.role)
				.map((item) => ({
					...item,
					company: item.company?.trim() || "",
					role: item.role?.trim() || "",
					fromDate: normalizeMonth(item.fromDate),
					toDate: normalizeMonth(item.toDate),
					url: item.url?.trim() || "",
					description: sanitizeHtml(item.description || ""),
					techStack: (item.techStack || [])
						.map((tech) => tech.trim())
						.filter(Boolean),
				})),
		),

		projects: (data.projects || [])
			.filter((project) => project.name)
			.map((project) => ({
				...project,
				name: project.name?.trim() || "",
				url: project.url?.trim() || "",
				description: sanitizeHtml(project.description || ""),
				techStack: (project.techStack || [])
					.map((tech) => tech.trim())
					.filter(Boolean),
			})),

		education: sortByLatestDate(
			(data.education || [])
				.filter((item) => item.school || item.degree)
				.map((item) => ({
					...item,
					school: item.school?.trim() || "",
					degree: item.degree?.trim() || "",
					fromDate: normalizeMonth(item.fromDate),
					toDate: normalizeMonth(item.toDate),
					grade: item.grade?.trim() || "",
				})),
		),
	};
}