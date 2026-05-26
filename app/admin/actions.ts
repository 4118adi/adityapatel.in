"use server";

import {
	clearAdminSession,
	createAdminSession,
	hasAdminSession,
	verifyPassword,
} from "@/lib/admin-auth";
import { normalizeResumeData, saveResumeData, type ResumeData } from "@/lib/resume";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
	const password = String(formData.get("password") || "");

	if (!verifyPassword(password)) {
		await clearAdminSession();
		redirect("/admin?error=invalid");
	}

	await createAdminSession();
	redirect("/admin");
}

export async function logoutAction() {
	await clearAdminSession();
	redirect("/admin");
}

export async function saveResumeAction(formData: FormData) {
	const isAuthenticated = await hasAdminSession();

	if (!isAuthenticated) {
		await clearAdminSession();
		redirect("/admin");
	}

	const payload = String(formData.get("resume") || "");

	let parsed: ResumeData;

	try {
		parsed = JSON.parse(payload) as ResumeData;
	} catch {
		redirect("/admin?error=json");
	}

	await saveResumeData(normalizeResumeData(parsed));

	revalidatePath("/");
	revalidatePath("/admin");

	redirect("/admin?saved=1");
}
