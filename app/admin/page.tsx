import { ThemeToggle } from "@/components/theme-toggle";
import { hasAdminSession, isAdminConfigured } from "@/lib/admin-auth";
import { getResumeData } from "@/lib/resume";
import { loginAction, logoutAction } from "./actions";
import { AdminEditor } from "./admin-editor";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type AdminPageProps = {
	searchParams: Promise<{
		error?: string;
		saved?: string;
	}>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
	const params = await searchParams;
	const isConfigured = isAdminConfigured();
	const isAuthenticated = await hasAdminSession();

	if (!isConfigured) {
		return (
			<>
				<ThemeToggle />
				<main className="site-shell m-auto max-w-[640px] px-6 py-24">
					<h1 className="pb-4 text-3xl text-zinc-950 dark:text-zinc-100">
						Admin Locked
					</h1>
					<p className="text-sm">
						Set <code>ADMIN_PASSWORD</code> in your environment to enable the
						secure editor.
					</p>
				</main>
			</>
		);
	}

	if (!isAuthenticated) {
		return (
			<>
				<ThemeToggle />
				<main className="site-shell m-auto max-w-[640px] px-6 py-24">
					<h1 className="pb-4 text-3xl text-zinc-950 dark:text-zinc-100">
						Admin
					</h1>
					<p className="pb-8 text-sm">Sign in to edit your portfolio content.</p>
					{params.error ? (
						<p className="mb-4 rounded border border-[#D34516]/30 bg-[#D34516]/10 p-3 text-sm text-zinc-950 dark:text-zinc-100">
							Invalid password.
						</p>
					) : null}
					<form action={loginAction} className="grid gap-4">
						<label className="block text-sm">
							<span className="text-zinc-950 dark:text-zinc-100">Password</span>
							<input
								className="mt-2 w-full rounded border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-600"
								name="password"
								type="password"
							/>
						</label>
						<button
							className="morph-button w-fit border border-zinc-200 bg-zinc-950 px-4 py-2 text-sm text-zinc-50 dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-950"
							type="submit"
						>
							Sign In
						</button>
					</form>
				</main>
			</>
		);
	}

	const resume = await getResumeData();

	return (
		<>
			<ThemeToggle />
			<header className="site-shell m-auto max-w-[960px] px-6 pb-8 pt-16">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<h1 className="text-3xl text-zinc-950 dark:text-zinc-100">
							Edit Portfolio
						</h1>
						<p className="pt-2 text-sm">
							Update your resume data, then save to refresh the public site.
						</p>
						{params.saved ? (
							<p className="pt-2 text-sm text-zinc-950 dark:text-zinc-100">
								Saved.
							</p>
						) : null}
					</div>
					<form action={logoutAction}>
						<button className="morph-link text-sm" type="submit">
							Log out
						</button>
					</form>
				</div>
			</header>
			<main className="m-auto max-w-[960px] px-6 pb-24">
				<AdminEditor initialData={resume} />
			</main>
		</>
	);
}
