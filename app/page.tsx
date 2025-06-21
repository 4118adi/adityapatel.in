import Experience from "./components/Experience";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Experience />
      <Projects />
    </main>
  );
}
