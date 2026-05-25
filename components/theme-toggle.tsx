"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const savedTheme = window.localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

		document.documentElement.classList.toggle("dark", shouldUseDark);
		setIsDark(shouldUseDark);
	}, []);

	function toggleTheme() {
		setIsDark((current) => {
			const next = !current;
			document.documentElement.classList.toggle("dark", next);
			window.localStorage.setItem("theme", next ? "dark" : "light");
			return next;
		});
	}

	return (
		<button
			aria-label="Toggle theme"
			className="morph-button fixed right-5 top-5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center border border-zinc-200 bg-zinc-50 p-2 text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
			onClick={toggleTheme}
			type="button"
		>
			{isDark ? <Moon className="h-full w-full" /> : <Sun className="h-full w-full" />}
		</button>
	);
}
