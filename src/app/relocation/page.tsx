import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Relocation to Dayton Ohio | Chris Jurgens Realtor",
  description: "Relocating to Dayton for work? Chris Jurgens specializes in corporate relocation and job transfers to the Dayton, Ohio area. Fast timelines, neighborhood expertise, and a hands-on process.",
  keywords: ["corporate relocation Dayton Ohio", "relocating to Dayton for work", "Dayton Ohio relocation specialist", "job transfer Dayton", "relo package Dayton"],
};

const STEPS = [
  { step: "01", title: "Define Your Priorities", desc: "Commute time, school district, neighborhood vibe, budget — Chris maps out what matters most and builds your search around it." },
  { step: "02", title: "Get the Market Briefing", desc: "Dayton's market moves fast. Chris gives you a clear picture of pricing, inventory, and what to expect before you make a single offer." },
  { step: "03", title: "Tour On Your Schedule", desc: "Flying in for a weekend? Chris lines up back-to-back tours and can also do virtual walkthroughs if you can't make the trip." },
  { step: "04", title: "Negotiate & Close", desc: "Chris brings aggressive negotiation and construction knowledge to every offer — spotting issues and finding leverage others miss." },
];

const AREAS = [
  { name: "Centerville", tag: "Top pick for executives", notes: "Quiet, established, excellent schools, easy highway access to downtown and I-75." },
  { name: "Springboro",  tag: "Growing fast", notes: "One of the fastest-growing suburbs — great schools, newer construction, family-friendly." },
  { name: "Beavercreek", tag: "Tech corridor", notes: "Close to defense contractors, top-rated schools, newer builds with modern finishes." },
  { name: "Kettering",   tag: "Great value", notes: "Established neighborhood, walkable areas, affordable pricing, close to Dayton proper." },
  { name: "Oakwood",     tag: "Luxury & walkable", notes: "Small-city feel, beautiful historic homes, top schools, walkable to shops and restaurants." },
  { name: "Miamisburg",  tag: "Easy commute", notes: "Access to 725 and I-75, affordable, family-friendly, close to The Greene shopping district." },
];

const FAQS = [
  { q: "Does Chris work with relocation packages?", a: "Yes. Chris is experienced working alongside relocation management companies (RMCs) and can coordinate directly with your HR or relo team." },
  { q: "What if my timeline is tight?", a: "Tight timelines are Chris's specialty. He'll prioritize your search, line up tours fast, and move aggressively to get you under contract." },
  { q: "Can I see homes before moving?", a: "Absolutely. Chris offers virtual tours and can give you a full walkthrough via video call so you can make confident decisions remotely." },
  { q: "What areas are best for commuting downtown?", a: "Kettering, Oakwood, and Centerville are all within 15–20 minutes of downtown Dayton. Springboro and Miamisburg give great highway access for broader metro commutes." },
];

export default function RelocationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Corporate Relocation · Job Transfer</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Relocating for Work.<br />
              <span className="text-gold">Let&apos;s Make It Easy.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Chris Jurgens has helped dozens of corporate relocators get settled in Dayton fast — with the right neighborhood, the right home, and zero runaround.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+19372413484" className="btn-gold">Call Chris Now</a>
              <a href="#contact" className="btn-outline">Send Your Details</a>
            </div>
          </div>
        </div>
      </section>

      {/* Strip */}
      <section className="bg-gold py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap gap-6 justify-center">
          {["Fast Timelines", "Virtual Tours Available", "Relo Package Coordination", "15 Years Local Experience"].map(t => (
            <span key={t} className="text-charcoal font-bold text-sm flex items-center gap-2"><Check className="w-4 h-4" /> {t}</span>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="section-label mb-2">The Process</p>
          <h2 className="text-3xl font-black">From Offer Letter to Move-In</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STEPS.map(({ step, title, desc }) => (
            <div key={step} className="card flex gap-5">
              <div className="text-gold font-black text-2xl w-10 flex-shrink-0">{step}</div>
              <div>
                <h3 className="font-black text-base mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Find Your Fit</p>
            <h2 className="text-3xl font-black">Top Neighborhoods for Relocators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AREAS.map(({ name, tag, notes }) => (
              <div key={name} className="bg-white rounded-xl p-5 border border-gray-100 hover:border-gold transition-colors">
                <h3 className="font-black text-base mb-1">{name}</h3>
                <p className="text-gold text-xs font-bold mb-2">{tag}</p>
                <p className="text-gray-500 text-sm">{notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Common Questions</p>
          <h2 className="text-3xl font-black">Corporate Relo FAQs</h2>
        </div>
        <div className="flex flex-col gap-5">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="card">
              <h3 className="font-black mb-2">{q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lead form */}
      <section id="contact" className="bg-charcoal py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Start Here</p>
            <h2 className="text-3xl font-black text-white">Tell Chris About Your Move</h2>
            <p className="text-gray-400 mt-2">He&apos;ll respond within 24 hours with a game plan.</p>
          </div>
          <LeadForm source="corporate-relocation" title="Relocation Inquiry" subtitle="Share your move date, company, and what you're looking for." dark />
        </div>
      </section>
    </>
  );
}