import type { Metadata } from "next";
import About from "../components/About";

export const metadata: Metadata = {
  title: "About | Vikash Kumar",
  description: "A little about Vikash Kumar.",
};

export default function AboutPage() {
  return <About />;
}
