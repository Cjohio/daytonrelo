import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckSquare, Calendar, MapPin, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "PCS Checklist: Moving to Wright-Patterson AFB (Month-by-Month Guide) | Dayton Relo",
  description: "The complete PCS checklist for military families moving to Wright-Patterson AFB. Month-by-month tasks covering housing, schools, finance, and arrival — so nothing falls through the cracks.",
  keywords: ["PCS checklist WPAFB", "moving to Wright-Patterson AFB", "PCS to Dayton Ohio", "WPAFB relocation guide", "military PCS checklist Ohio"],
};

export default function PCSChecklistPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-gold/10 text-gold-dark text-xs font-bold px-2.5 py-1 rounded-md">Military PCS</span>
            <span className="text-gray-400 text-sm">May 15, 2025</span>
            <span className="text-gray-400 text-sm">· 10 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-snug">
            PCS Checklist: Moving to<br />
            <span className="text-gold">Wright-Patterson AFB (Month-by-Month Guide)</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">Written by Chris Jurgens — U.S. Army Iraq War veteran and licensed Ohio Realtor specializing in military relocation to the Wright-Patterson AFB area.</p>
        </div>
      </section>

      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-gray-900">
        <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=600&fit=crop&auto=format" alt="PCS moving checklist Wright-Patterson AFB" fill className="object-cover opacity-80" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "PCS Checklist: Moving to Wright-Patterson AFB", "description": "Month-by-month PCS checklist for military families moving to WPAFB — housing, schools, finance, and arrival.", "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=600&fit=crop&auto=format", "author": { "@type": "Person", "name": "Chris Jurgens", "url": "https://daytonrelo.com/about" }, "publisher": { "@type": "Organization", "name": "Dayton Relo", "url": "https://daytonrelo.com" }, "datePublished": "2025-05-15", "dateModified": "2026-04-09", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://daytonrelo.com/blog/pcs-checklist-wpafb-dayton" }, "keywords": ["PCS checklist", "WPAFB", "Wright-Patterson AFB", "military relocation", "Dayton Ohio"] }) }} />

          <section>
            <p className="text-gray-700 text-lg leading-relaxed">PCS season is organized chaos. The orders come through, everyone in your household has a different priority list, and the timeline moves faster than you expect. This checklist is designed to prevent the most common WPAFB relocation mistakes — organized by how far out you are from your report date so you know exactly what to tackle each month.</p>
          </section>

          {[
            {
              title: "4–6 Months Out",
              icon: <Calendar className="w-6 h-6 text-gold" />,
              color: "blue",
              tasks: [
                { item: "Contact a WPAFB-area real estate agent early", detail: "The best homes in Beavercreek, Fairborn, and Centerville sell in days during peak season. Getting connected early — before you have orders in hand — means you can do research without pressure. Chris can set up MLS alerts for your criteria immediately." },
                { item: "Calculate your BAH for Dayton zip codes", detail: "Your BAH changes with your duty station. Dayton is lower cost than most major metro areas, but prices are also significantly lower. Run the numbers at militaryrates.com [verify before acting] to understand your real buying power." },
                { item: "Pull your VA eligibility status", detail: "Confirm your Certificate of Eligibility (COE) with a VA-approved lender. This takes hours, not weeks, but it is worth doing early so there are no surprises." },
                { item: "Research neighborhoods by priority", detail: "Schools vs. commute vs. price — decide what matters most before you start looking at listings. Use our neighborhood guide at /neighborhoods to compare Fairborn, Beavercreek, Centerville, Kettering, Springboro, and Oakwood." },
              ]
            },
            {
              title: "2–3 Months Out",
              icon: <CheckSquare className="w-6 h-6 text-gold" />,
              color: "green",
              tasks: [
                { item: "Get VA loan pre-approval", detail: "With orders in progress, most VA lenders can issue a pre-approval letter. This is essential before making any offers. You will need: last 2 years of W-2s, recent pay stubs, bank statements, and your COE." },
                { item: "Research schools and enrollment windows", detail: "Beavercreek, Fairborn, and Centerville City Schools all have different enrollment processes. Some require proof of address before enrolling — plan around this if you are buying, not renting. [Verify enrollment requirements with each district]" },
                { item: "Schedule a house hunting trip (HHT)", detail: "Your orders should include authorization for a House Hunting Trip. Coordinate with your losing installation to get this approved as early as possible — Dayton homes move fast and an in-person visit makes the difference." },
                { item: "Set up home search alerts", detail: "Ask Chris to set up automatic MLS notifications for your criteria. You will see new listings within minutes of them hitting the market — critical in a fast-moving inventory environment." },
              ]
            },
            {
              title: "1 Month Out",
              icon: <MapPin className="w-6 h-6 text-gold" />,
              color: "amber",
              tasks: [
                { item: "Finalize housing decision — buy or rent", detail: "If you are buying, you should be under contract by now to close before your report date. If you are renting temporarily, confirm your short-term housing in Fairborn, Beavercreek, or Huber Heights — all have availability near the base." },
                { item: "Schedule utilities for closing/move-in date", detail: "AES Ohio (electric), Columbia Gas, and local water utilities all require setup. Do this 2 weeks before move-in to avoid gaps in service." },
                { item: "Confirm TMO/PPM shipment dates", detail: "Weight ticket, pickup date, and delivery window. If doing a PPM/DITY move to Dayton, the I-70 corridor from the east and I-75 from the south are your main routes." },
                { item: "Notify schools of enrollment date", detail: "If you have a housing address, begin the enrollment process at the school your children will attend. Some districts require physical presence for enrollment — plan a day specifically for this." },
              ]
            },
            {
              title: "Arrival Week",
              icon: <Home className="w-6 h-6 text-gold" />,
              color: "purple",
              tasks: [
                { item: "Check in with WPAFB Airman and Family Readiness Center", detail: "The A&FRC offers relocation assistance, community resources, and connections to local military spouse networks. Worth a visit in your first week." },
                { item: "Update your address and ID", detail: "Driver&apos;s license, vehicle registration, and voter registration all need Ohio updates within 30 days of establishing residency. Ohio BMV locations are in Beavercreek and Fairborn." },
                { item: "Find your go-to urgent care and healthcare providers", detail: "Identify TRICARE-accepting providers near your home before you need them. Wright-Patterson Medical Center is on base; many families also use providers in Beavercreek and Centerville." },
                { item: "Get plugged into the community", detail: "WPAFB Spouses&apos; Club, Facebook groups for WPAFB families, and NextDoor for your specific neighborhood are all active. These networks answer questions faster than Google." },
              ]
            },
          ].map((phase) => (
            <section key={phase.title}>
              <div className="flex items-center gap-3 mb-5">
                {phase.icon}
                <h2 className="text-2xl font-black text-charcoal">{phase.title}</h2>
              </div>
              <div className="space-y-4">
                {phase.tasks.map((task) => (
                  <div key={task.item} className="flex gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <CheckSquare className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-charcoal text-sm mb-1">{task.item}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{task.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
            <h2 className="text-xl font-black text-charcoal mb-3">The #1 Mistake on WPAFB PCS Moves</h2>
            <p className="text-gray-700 leading-relaxed">Waiting too long to start the housing search. Families who contact me 4–6 months out get the best homes. Families who contact me 3 weeks before their report date are competing for whatever is left — or settling for short-term rentals while they wait for better inventory. The Dayton market is not as competitive as DC or San Diego, but it is competitive enough that timing matters.</p>
          </section>

          <div className="border-t border-gray-100 pt-8">
            <div className="flex items-start gap-4 bg-gray-50 rounded-2xl p-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold">
                <img src="/headshot.jpg" alt="Chris Jurgens" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-gold uppercase tracking-widest mb-1">Written by</p>
                <p className="font-black text-charcoal text-lg leading-tight">Chris Jurgens</p>
                <p className="text-sm text-gray-500 mb-2">Licensed Ohio Realtor · U.S. Army Iraq War Veteran · Team Flory · eXp Realty</p>
                <p className="text-sm text-gray-600 leading-relaxed">Chris has 15 years of real estate experience in the Dayton area and specializes in military PCS moves and VA loan transactions. He served 9 years in the U.S. Army, including a deployment to Iraq.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-charcoal text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-4"><CheckSquare className="w-10 h-10 text-gold" /></div>
          <h2 className="text-2xl font-black mb-3">Start Your WPAFB PCS Search Early</h2>
          <p className="text-gray-300 mb-8">The earlier you reach out, the more options you have. Chris can set up MLS alerts for your criteria today — no orders required.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+19372413484" className="btn-gold">Call Chris Now</a>
            <Link href="/contact" className="btn-outline">Send a Message</Link>
          </div>
        </div>
      </section>
      <div className="bg-gray-50 py-8 text-center">
        <Link href="/blog" className="text-gold font-semibold hover:text-gold-dark transition-colors">← Back to Blog</Link>
      </div>
    </main>
  );
}
