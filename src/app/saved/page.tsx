import type { Metadata } from "next";
import SavedHomes from "./SavedHomes";

export const metadata: Metadata = {
  title: "Saved Homes | Dayton Relo",
  description: "View your saved Dayton area homes. Schedule showings, compare properties, and contact Chris Jurgens to make your next move.",
};

export default function SavedPage() {
  return <SavedHomes />;
}
