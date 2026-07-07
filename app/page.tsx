import Contact from "./components/Contact";
import ExploreTiles from "./components/ExploreTiles";
import Hero from "./components/Hero";
import Stats from "./components/Stats";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ExploreTiles />
      <Contact />
    </>
  );
}
