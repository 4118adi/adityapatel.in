import { promises as fs } from "fs";
import path from "path";

export type ResumeLink = {
	label: string;
	url: string;
};

export type ResumeExperience = {
	company: string;
	role: string;
	period: string;
	url: string;
	description: string;
};

export type ResumeProject = {
	name: string;
	url: string;
	description: string;
};

export type ResumeEducation = {
	school: string;
	degree: string;
	period: string;
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

export const resumeDataPath = path.join(process.cwd(), "data", "resume.json");

export async function getResumeData(): Promise<ResumeData> {
	const file = await fs.readFile(resumeDataPath, "utf8");
	return JSON.parse(file) as ResumeData;
}

export async function saveResumeData(data: ResumeData) {
	await fs.writeFile(resumeDataPath, `${JSON.stringify(data, null, "\t")}\n`);
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
		links: (data.links || []).filter((link) => link.label && link.url),
		experience: (data.experience || []).filter((item) => item.company || item.role),
		projects: (data.projects || []).filter((project) => project.name),
		education: (data.education || []).filter((item) => item.school || item.degree),
	};
}
