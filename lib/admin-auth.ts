import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "portfolio_admin";

function getSecret() {
	return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
}

function sign(value: string) {
	const secret = getSecret();

	if (!secret) {
		return "";
	}

	return createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(first: string, second: string) {
	const firstBuffer = Buffer.from(first);
	const secondBuffer = Buffer.from(second);

	return firstBuffer.length === secondBuffer.length && timingSafeEqual(firstBuffer, secondBuffer);
}

export function isAdminConfigured() {
	return Boolean(process.env.ADMIN_PASSWORD);
}

export function verifyPassword(password: string) {
	const configuredPassword = process.env.ADMIN_PASSWORD;

	if (!configuredPassword) {
		return false;
	}

	return safeEqual(password, configuredPassword);
}

export async function createAdminSession() {
	const value = "admin";
	const signature = sign(value);
	const cookieStore = await cookies();

	cookieStore.set(cookieName, `${value}.${signature}`, {
		httpOnly: true,
		maxAge: 60 * 60 * 8,
		path: "/admin",
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
	});
}

export async function clearAdminSession() {
	const cookieStore = await cookies();
	cookieStore.delete(cookieName);
}

export async function hasAdminSession() {
	if (!getSecret()) {
		return false;
	}

	const cookieStore = await cookies();
	const session = cookieStore.get(cookieName)?.value;

	if (!session) {
		return false;
	}

	const [value, signature] = session.split(".");
	return value === "admin" && Boolean(signature) && safeEqual(signature, sign(value));
}
