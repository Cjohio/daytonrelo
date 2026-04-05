import type { Metadata } from "next";
import CommunityBoard from "./CommunityBoard";

export const metadata: Metadata = {
  title: "Dayton Relo Community | Ask Questions, Get Answers",
  description: "Community message board for people relocating to Dayton, Ohio. Ask about neighborhoods, schools, WPAFB, PCS tips, and more. Chris Jurgens monitors and responds.",
};

export default function CommunityPage() {
  return <CommunityBoard />;
}
