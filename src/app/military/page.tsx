import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Military PCS to Dayton & WPAFB | Chris Jurgens Realtor",
  description: "PCS orders to Wright-Patterson Air Force Base? Chris Jurgens is a veteran-owned real estate team specializing in military relocations to the Dayton, Ohio area. VA loans, BAH guidance, and off-base housing.",
  keywords: ["PCS Dayton Ohio", "WPAFB housing", "Wright-Patterson AFB relocation", "military realtor Dayton", "VA loan Dayton Ohio", "BAH Dayton"],
};

const STEPS = [
  { step: "01", title: "Share Your Orders", desc: "Send Chris your PCS orders and report date. He'll build a timeline and housing plan that fits your window." },
  { step: "02", title: "Get Your BAH Briefing", desc: "Understand exactly what your BAH covers in the Dayton market — which neighborhoods fit your budget and which ones to prioritize." },
  { step: "03", title: "Tour Homes (In-Person or Virtual)", desc: "Already across the country? No problem. Chris offers full virtual tours and can represent you through the entire process remotely." },
  { step: "04", title: "Close & Get Settled", desc: "From offer to keys, Chris handles the details so you can focus on your family and your mission." },
];

const AREAS = [
  { name: "Beavercreek", dist: "8 min to WPAFB", notes: "Top-rated schools, newer builds, popular with officers." },
  { name: "Fairborn", dist: "5 min to WPAFB", notes: "Closest to base, most budget-friendly, strong military community." },
  { name: "Xenia", dist: "15 min to WPAFB", notes: "Affordable, quiet, great for families with space needs." },
  { name: "Centerville", dist: "20 min to WPAFB", notes: "Excellent schools, established neighborhoods, higher BAH usage." },
  { name: "Huber Heights", dist: "12 min to WPAFB", notes: "Mid-range pricing, lots of inventory, easy base access." },
  { name: "Kettering", dist: "18 min to WPAFB", notes: "Walkable, established, great value for senior NCOs and officers." },
];

const FAQS = [
  { q: "Can I use my VA loan benefit?", a: "Absolutely. Chris works with VA-approved lenders and can connect you with the right team to maximize your benefit — including no down payment options." },
  { q: "What if I haven't received my orders yet?", a: "Start early. Chris can walk you through the Dayton market, BAH rates, and neighborhood options so you're ready to move fast when orders drop." },
  { q: "Can I buy a home remotely?", a: "Yes. Chris handles virtual tours, digital paperwork, and remote closings regularly for military clients relocating from other duty stations." },
  { q: "What's the BAH rate for Dayton?", a: "BAH for the Wright-Patterson area is competitive. Depending on rank and dependency status, most servicemembers can comfortably purchase rather than rent in the Dayton market." },
];

export default function MilitaryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Military PCS · WPAFB</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              PCS to Dayton.<br />
              <span className="text-gold">Done Right.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Chris is a U.S. Army Iraq War veteran who has lived the PCS process. He knows your timeline, your VA loan options, and the neighborhoods within minutes of Wright-Patterson AFB.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+19372413484" className="btn-gold">Call Chris Now</a>
              <a href="#contact" className="btn-outline">Send Your Orders Info</a>
            </div>
          </div>
        </div>
      </section>

      {/* Veteran badge strip */}
      <section className="bg-gold py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap gap-6 justify-center items-center">
          {["U.S. Army Iraq War Veteran · 9 Years", "VA Loan Specialist", "Remote & Virtual Closings", "WPAFB Area Expert"].map(t => (
            <span key={t} className="text-charcoal font-bold text-sm">✓ {t}</span>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="section-label mb-2">How It Works</p>
          <h2 className="text-3xl font-black">From Orders to Keys</h2>
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

      {/* Neighborhoods near WPAFB */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Off-Base Housing</p>
            <h2 className="text-3xl font-black">Neighborhoods Near WPAFB</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AREAS.map(({ name, dist, notes }) => (
              <div key={name} className="bg-white rounded-xl p-5 border border-gray-100 hover:border-gold transition-colors">
                <h3 className="font-black text-base mb-1">{name}</h3>
                <p className="text-gold text-xs font-bold mb-2">{dist}</p>
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
          <h2 className="text-3xl font-black">Military PCS FAQs</h2>
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
            <h2 className="text-3xl font-black text-white">Share Your PCS Details</h2>
            <p className="text-gray-400 mt-2">Chris will reach out within 24 hours to build your housing plan.</p>
          </div>
          <LeadForm source="military-pcs" title="PCS Housing Inquiry" subtitle="Tell Chris your report date and what you're looking for." dark />
        </div>
      </section>
    </>
  );
}
