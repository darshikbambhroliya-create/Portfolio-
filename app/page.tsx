import GithubStreak from "./components/GithubStreak";
import { Footer } from "./components/layout/footer";
import HeroSection from "./components/sections/HeroSection";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Studies from "./components/sections/studies";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <Skills />
      <Projects />
      <Studies />
      <GithubStreak username="darshikbambhroliya-create" />
      <Footer />
    </main>
  );
}
