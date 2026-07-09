import type { Metadata } from "next";
import VisualizerApp from "./VisualizerApp";

export const metadata: Metadata = {
  title: "Paint Visualizer | Vikash Kumar",
  description:
    "Upload photos of your room and preview walls and ceilings in Asian Paints shades.",
};

export default function VisualizerPage() {
  return <VisualizerApp />;
}
