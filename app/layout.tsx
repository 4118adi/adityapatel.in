import "./globals.css";


export const metadata = {
	title: "Aditya Patel | Portfolio",
	description: "Personal portfolio of Aditya Patel, web developer & designer.",
};


import ThemeToggle from "../components/ThemeToggle";

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
