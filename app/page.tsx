import About from "./components/About";
import BackgroundFX from "./components/BackgroundFX";
import Contact from "./components/Contact";
import EducationAndAchievements from "./components/EducationAndAchievements";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Stats from "./components/Stats";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundFX />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Experience />
      <Projects />
      <EducationAndAchievements />
      <Contact />
      <Footer />
    </div>
  );
}
