import "./globals.css";
import { SiteLoader } from "@/components/site-loader";


export const metadata = {
	title: "Aditya Patel | Portfolio",
	description: "Personal portfolio of Aditya Patel, web developer & designer.",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-zinc-50 font-mono text-zinc-700 transition-colors dark:bg-zinc-900 dark:text-zinc-400">
				<SiteLoader />
				{children}
			</body>
		</html>
	);
}
