import "./globals.css";

export const metadata = {
	title: "Aditya Patel | Portfolio",
	description: "Personal portfolio of Aditya Patel, web developer & designer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
