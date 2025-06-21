import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "[Your Name] - Software Developer Portfolio",
  description: "Personal portfolio website showcasing my work as a software developer, including projects, skills, and experience.",
  keywords: ["software developer", "portfolio", "web development", "full-stack developer"],
  authors: [{ name: "[Your Name]" }],
  openGraph: {
    title: "[Your Name] - Software Developer Portfolio",
    description: "Personal portfolio website showcasing my work as a software developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
