import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "portfolio_admin";
const sessionMaxAgeSeconds = 60 * 60 * 8;

function cookieOptions() {
	return {
		httpOnly: true,
		path: "/admin",
		sameSite: "strict" as const,
		secure: process.env.NODE_ENV === "production",
	};
}

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

export function safeEqual(first: string, second: string) {
	const firstBuffer = Buffer.from(first);
	const secondBuffer = Buffer.from(second);

	return firstBuffer.length === secondBuffer.length && timingSafeEqual(firstBuffer, secondBuffer);
}

export function verifySessionValue(session?: string) {
	if (!session || !getSecret()) {
		return false;
	}

	const [value, signature] = session.split(".");

	if (!value || !signature || !safeEqual(signature, sign(value))) {
		return false;
	}

	const [role, expiresAt] = value.split(":");
	return role === "admin" && Number(expiresAt) > Date.now();
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
	const expiresAt = Date.now() + sessionMaxAgeSeconds * 1000;
	const value = `admin:${expiresAt}`;
	const cookieStore = await cookies();
	const signature = sign(value);

	cookieStore.set(cookieName, `${value}.${signature}`, {
		...cookieOptions(),
		maxAge: sessionMaxAgeSeconds,
	});
}

export async function clearAdminSession() {
	const cookieStore = await cookies();

	cookieStore.set(cookieName, "", {
		...cookieOptions(),
		expires: new Date(0),
		maxAge: 0,
	});
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

	return verifySessionValue(session);
}
