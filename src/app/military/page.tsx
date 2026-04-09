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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the BAH rate at Wright-Patterson AFB in 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BAH rates at WPAFB vary by rank and dependency status. In 2025, an E-5 with dependents receives approximately $1,647/month, and an O-3 with dependents receives approximately $2,178/month. Rates are set annually by the Department of Defense and cover median rental costs in the local housing market. Use our BAH calculator for your specific rate."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use a VA loan to buy a home near WPAFB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. VA loans are one of the best tools for buying near Wright-Patterson AFB. They require $0 down payment, no private mortgage insurance (PMI), and typically offer rates below conventional loans. Eligible service members, veterans, and surviving spouses can use the VA home loan benefit in Fairborn, Beavercreek, Huber Heights, and all Dayton-area communities near WPAFB."
        }
      },
      {
        "@type": "Question",
        "name": "What neighborhoods are closest to Wright-Patterson Air Force Base?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fairborn is the closest city to WPAFB — approximately 3 miles from Gate 12A. Beavercreek is about 8 miles away and offers highly rated schools. Huber Heights and Riverside are also close options with budget-friendly price points. Beavercreek, Fairborn, and Huber Heights are the most popular choices for WPAFB personnel."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a PCS move to WPAFB typically take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most PCS moves to Wright-Patterson AFB take 30–90 days from receiving orders to reporting for duty. The home buying process with a VA loan typically takes 30–45 days from offer to closing. Starting your home search as soon as orders are received gives you the best chance of closing before your report date."
        }
      },
      {
        "@type": "Question",
        "name": "Should I live on base or off base at WPAFB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Living off base near WPAFB is often financially advantageous, especially for buyers using VA loans. Your BAH covers most or all of a mortgage payment in Fairborn and Huber Heights, meaning you build equity instead of paying rent. On-base housing managed by Hunt Companies is available but waitlists exist. Use our On-Base vs. Off-Base calculator to compare your specific situation."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Common Questions</p>
          <h2 className="text-3xl font-black text-charcoal mb-10">WPAFB PCS FAQs</h2>
          <div className="space-y-4">
            {[
              {
                q: "What is the BAH rate at Wright-Patterson AFB in 2025?",
                a: "BAH rates at WPAFB vary by rank and dependency status. An E-5 with dependents receives approximately $1,647/month; an O-3 with dependents approximately $2,178/month. Rates are updated annually by DoD and are designed to cover median local rental costs. Use our BAH calculator for your exact rate."
              },
              {
                q: "Can I use a VA loan to buy near WPAFB?",
                a: "Yes — and it's one of the best financial tools available to you. VA loans require $0 down, no PMI, and typically carry rates below conventional loans. All Dayton-area communities near WPAFB (Fairborn, Beavercreek, Huber Heights, etc.) are VA-eligible."
              },
              {
                q: "Which neighborhoods are closest to Wright-Patterson AFB?",
                a: "Fairborn is the closest — about 3 miles from Gate 12A. Beavercreek is ~8 miles with top-rated schools. Huber Heights and Riverside are also close with lower price points. Beavercreek and Fairborn are the most popular choices for base personnel."
              },
              {
                q: "How long does the PCS home buying process take?",
                a: "Most VA loan purchases take 30–45 days from accepted offer to closing. Start your home search as soon as orders are in hand to give yourself the best chance of closing before your report date."
              },
              {
                q: "Is it better to live on base or off base at WPAFB?",
                a: "For buyers using VA loans, off-base often wins financially — your BAH can cover most or all of a mortgage in Fairborn and Huber Heights, meaning you build equity. On-base (Hunt Companies) has waitlists. Run the numbers with our On-Base vs. Off-Base calculator."
              },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-black text-charcoal list-none">
                  {q}
                  <svg className="w-5 h-5 text-gold flex-shrink-0 ml-3 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/tools/bah-calculator" className="btn-gold">Calculate Your BAH →</Link>
          </div>
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
