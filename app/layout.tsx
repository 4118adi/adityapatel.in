import "./globals.css";
import { useState, useEffect } from "react";

export const metadata = {
	title: "Aditya Patel | Portfolio",
	description: "Personal portfolio of Aditya Patel, web developer & designer.",
};

function ThemeToggle() {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const isDark = localStorage.getItem("theme") === "dark" ||
				(!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
			setDark(isDark);
			document.documentElement.classList.toggle("dark", isDark);
		}
	}, []);

	const toggleTheme = () => {
		setDark((prev) => {
			const newDark = !prev;
			if (newDark) {
				document.documentElement.classList.add("dark");
				localStorage.setItem("theme", "dark");
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("theme", "light");
			}
			return newDark;
		});
	};

	return (
		<button
			aria-label="Toggle dark mode"
			className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
			onClick={toggleTheme}
		>
			{dark ? (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
			) : (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
			)}
		</button>
	);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition-colors min-h-screen">
				<ThemeToggle />
				{children}
			</body>
		</html>
	);
}
