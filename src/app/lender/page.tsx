import type { Metadata } from "next";
import Link from "next/link";
import { Medal, Zap, Home, Hammer, Award, TrendingUp, Briefcase } from "lucide-react";
import LenderCards from "./LenderCards";

export const metadata: Metadata = {
  title: "Preferred Lenders | Dayton Relo",
  description: "Meet Chris's preferred mortgage lenders — VA loan specialists and Dayton-area experts for military buyers, first-time buyers, and relocating families.",
};

// ─── Lender Data — update when real lenders are confirmed ────────────────────
// Shared with LenderCards client component for random display
export const LENDERS = [
  {
    id: "1",
    name: "Lender 1",
    title: "Senior Mortgage Loan Officer",
    company: "Company Name Here",
    nmls: "NMLS #000001",
    tagline: "Short tagline goes here — one memorable line.",
    shortBio: "Short bio for the card. Keep it to 1–2 sentences highlighting specialty and experience.",
    fullBio: "Full biography goes here. 2–3 paragraphs describing background, experience, approach to lending, and what makes them a great fit for military and relocation buyers in the Dayton area.",
    phone: "(555) 555-0001",
    email: "lender1@example.com",
    website: "https://example.com",
    photo: null as string | null,
    specialties: ["VA Loans", "Military Relocation", "First-Time Buyers"],
    loanTypes: [
      { label: "VA Purchase Loan",     note: "0% down, no PMI — veterans & active duty" },
      { label: "VA IRRRL Refinance",   note: "Streamlined refi for existing VA loans" },
      { label: "Conventional Loan",    note: "3–20% down, flexible terms" },
      { label: "FHA Loan",             note: "Low down payment, flexible credit" },
      { label: "Cash-Out Refinance",   note: "Access your equity for any purpose" },
    ],
    why: [
      { icon: Medal, title: "VA Specialist",  body: "Add detail about VA loan expertise and track record with military buyers." },
      { icon: Zap,  title: "Fast Closings",  body: "Add detail about turnaround speed and pre-approval process." },
      { icon: Home,  title: "Local Expert",   body: "Add context about knowledge of the Dayton/WPAFB market." },
    ],
  },
  {
    id: "2",
    name: "Lender 2",
    title: "Mortgage Loan Officer",
    company: "Company Name Here",
    nmls: "NMLS #000002",
    tagline: "Short tagline goes here — one memorable line.",
    shortBio: "Short bio for the card. Keep it to 1–2 sentences highlighting specialty and experience.",
    fullBio: "Full biography goes here. 2–3 paragraphs describing background, experience, approach to lending, and what makes them a great fit for military and relocation buyers in the Dayton area.",
    phone: "(555) 555-0002",
    email: "lender2@example.com",
    website: "https://example.com",
    photo: null as string | null,
    specialties: ["FHA Loans", "First-Time Buyers", "Renovation Loans"],
    loanTypes: [
      { label: "FHA Loan",             note: "Low down payment, flexible credit" },
      { label: "Conventional Loan",    note: "3–20% down, competitive rates" },
      { label: "VA Purchase Loan",     note: "0% down, no PMI" },
      { label: "203k Renovation Loan", note: "Buy and renovate with one loan" },
      { label: "USDA Rural Loan",      note: "0% down for eligible Ohio properties" },
    ],
    why: [
      { icon: Home,  title: "First-Time Buyer Focus", body: "Add detail about approach to guiding first-time buyers." },
      { icon: Hammer,  title: "Renovation Expert",      body: "Add context about 203k and renovation lending experience." },
      { icon: Award,  title: "Award / Credential",     body: "Add any relevant credentials, volume stats, or recognitions." },
    ],
  },
  {
    id: "3",
    name: "Lender 3",
    title: "Mortgage Loan Officer",
    company: "Company Name Here",
    nmls: "NMLS #000003",
    tagline: "Short tagline goes here — one memorable line.",
    shortBio: "Short bio for the card. Keep it to 1–2 sentences highlighting specialty and experience.",
    fullBio: "Full biography goes here. 2–3 paragraphs describing background, experience, approach to lending, and what makes them a great fit for military and relocation buyers in the Dayton area.",
    phone: "(555) 555-0003",
    email: "lender3@example.com",
    website: "https://example.com",
    photo: null as string | null,
    specialties: ["Conventional Loans", "Jumbo Loans", "Investment Property"],
    loanTypes: [
      { label: "Conventional Loan",    note: "3–20% down, competitive rates" },
      { label: "Jumbo Loan",           note: "Above conforming limits" },
      { label: "VA Purchase Loan",     note: "0% down, no PMI" },
      { label: "Investment Property",  note: "1–4 unit, portfolio & DSCR options" },
      { label: "Cash-Out Refinance",   note: "Access equity for any purpose" },
    ],
    why: [
      { icon: TrendingUp,  title: "Investment Specialist", body: "Add detail about experience with investment and multi-unit properties." },
      { icon: Briefcase,  title: "High-Volume Closer",    body: "Add context about closing volume and complex transactions." },
      { icon: Award,  title: "Award / Credential",    body: "Add any relevant credentials, awards, or volume stats." },
    ],
  },
];

export default function LenderPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label mb-4">Chris&apos;s Preferred Lenders</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Meet Our Trusted<br />
            <span className="text-gold">Mortgage Partners</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            These are lenders Chris has personally vetted and worked with in the Dayton market.
            All specialize in VA loans and military relocation — and they know how to close on time.
          </p>
          <p className="text-gray-500 text-sm italic">
            Lenders displayed in random order — no ranking implied.
          </p>
        </div>
      </section>

      {/* Lender Cards — client component handles random order */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <LenderCards lenders={LENDERS} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-black mb-3">Not Sure Which Lender Fits Your Situation?</h2>
          <p className="text-gray-300 mb-8">
            Chris can help match you with the right lender — VA, FHA, conventional, or anything in between.
          </p>
          <Link href="/contact" className="btn-gold">Ask Chris</Link>
        </div>
      </section>

      {/* Disclosure */}
      <div className="bg-gray-50 py-6 text-center">
        <p className="text-gray-500 text-xs max-w-2xl mx-auto px-4 leading-relaxed">
          You are always free to work with any lender of your choice. These are referrals only.
          Chris Jurgens does not receive compensation for these referrals. Loan products and terms
          subject to lender qualification and approval.
        </p>
      </div>
    </main>
  );
}
