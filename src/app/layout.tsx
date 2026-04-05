import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: { default: "Dayton Relo | Chris Jurgens – Dayton Ohio Realtor", template: "%s | Dayton Relo" },
  description: "Relocating to Dayton, Ohio? Chris Jurgens is a licensed Ohio Realtor specializing in military PCS moves, corporate relocation, and local home buyers. Team Flory · eXp Realty.",
  keywords: ["Dayton Ohio realtor", "PCS Dayton", "WPAFB relocation", "Dayton homes for sale", "relocating to Dayton", "corporate relocation Dayton"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://daytonrelo.com",
    siteName: "Dayton Relo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
