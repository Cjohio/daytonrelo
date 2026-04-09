import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DollarSign, Home, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "2025 BAH Rates for WPAFB: What You Can Afford in Dayton | Dayton Relo",
  description: "Complete 2025 BAH rate guide for Wright-Patterson AFB by pay grade. See exactly what homes you can afford in Dayton with your housing allowance — E5 through O6 covered.",
  keywords: ["BAH rates Wright-Patterson AFB", "WPAFB BAH 2025", "military housing allowance Dayton Ohio", "BAH Dayton Ohio", "Wright-Patt housing allowance"],
};

export default function BAHRatesPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-gold/10 text-gold-dark text-xs font-bold px-2.5 py-1 rounded-md">Military PCS</span>
            <span className="text-gray-400 text-sm">April 15, 2025</span>
            <span className="text-gray-400 text-sm">· 8 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-snug">
            2025 BAH Rates for WPAFB:<br />
            <span className="text-gold">What You Can Afford in Dayton</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Written by Chris Jurgens — U.S. Army Iraq War veteran and licensed Ohio Realtor specializing in military relocation to the Wright-Patterson AFB area.
          </p>
        </div>
      </section>

      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-gray-900">
        <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop&auto=format" alt="Military housing allowance Dayton Ohio" fill className="object-cover opacity-80" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "2025 BAH Rates for WPAFB: What You Can Afford in Dayton", "description": "Complete 2025 BAH rate guide for Wright-Patterson AFB by pay grade.", "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop&auto=format", "author": { "@type": "Person", "name": "Chris Jurgens", "url": "https://daytonrelo.com/about" }, "publisher": { "@type": "Organization", "name": "Dayton Relo", "url": "https://daytonrelo.com" }, "datePublished": "2025-04-15", "dateModified": "2026-04-09", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://daytonrelo.com/blog/bah-rates-wpafb-dayton-2025" }, "keywords": ["BAH rates", "WPAFB", "Wright-Patterson AFB", "military housing allowance", "Dayton Ohio"] }) }} />

          <section>
            <p className="text-gray-700 text-lg leading-relaxed">Basic Allowance for Housing is the single most important number for any service member buying or renting near Wright-Patterson AFB. Your BAH determines what you can comfortably spend on housing — and in the Dayton market, it goes surprisingly far. This guide breaks down 2025 BAH rates for the WPAFB zip codes, translates them into real buying power, and maps each tier to the neighborhoods where your allowance stretches furthest.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <p className="text-sm text-amber-800 font-semibold">Note on figures below</p>
              <p className="text-sm text-amber-700 mt-1">[Estimated — verify before acting] All BAH figures in this article are estimates based on historical patterns. Actual 2025 rates are set by DoD. Verify your exact rate at militaryrates.com or the official DoD BAH calculator.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">2025 BAH Rates for WPAFB by Pay Grade</h2>
            <p className="text-gray-700 leading-relaxed mb-6">Rates below apply to zip code 45433 (WPAFB area), with dependents. [Estimated — verify at militaryrates.com]</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-charcoal text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Pay Grade</th>
                    <th className="px-4 py-3 text-left">Monthly BAH (w/ dependents)</th>
                    <th className="px-4 py-3 text-left">Est. Buying Power (VA 0% down)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[["E-4","$1,287","~$190K"],["E-5","$1,395","~$210K"],["E-6","$1,506","~$225K"],["E-7","$1,617","~$240K"],["O-1E","$1,395","~$210K"],["O-3","$1,617","~$240K"],["O-4","$1,728","~$260K"],["O-5","$1,899","~$285K"],["O-6","$2,100","~$315K"]].map(([grade, bah, power]) => (
                    <tr key={grade} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-bold text-charcoal">{grade}</td>
                      <td className="px-4 py-3 text-gray-700">{bah} [Est.]</td>
                      <td className="px-4 py-3 text-gray-700">{power} [Est.]</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">Buying power assumes VA loan at ~7% rate, 30-year term, taxes/insurance included. [Estimated — verify with a lender]</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">How BAH Translates to Buying Power</h2>
            <p className="text-gray-700 leading-relaxed mb-4">A rough rule of thumb: every $1,000/month in BAH equals roughly $150,000 in purchase price when using a VA loan at current rates, with taxes and insurance included. [Estimated — rates fluctuate; run exact numbers with a lender]</p>
            <p className="text-gray-700 leading-relaxed mb-4">The critical advantage for military buyers is the VA loan itself. Because you put 0% down, your entire BAH goes directly toward the monthly payment rather than being split between a down payment savings goal and rent. A service member with $1,617/month BAH who rents is essentially giving that money away. The same amount applied to a VA mortgage at today&apos;s rates covers a $240,000 home — which in Fairborn or Kettering gets you a solid 3-bedroom with a garage.</p>
            <p className="text-gray-700 leading-relaxed">The math gets even better when rates drop. If you buy now and rates fall by 1.5%, an IRRRL refinance could drop your payment by $200–$300/month on a $250K loan — meaning your BAH covers even more, or you pocket the difference.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Best Neighborhoods by BAH Tier</h2>
            <div className="space-y-4">
              {[
                { tier: "E-4 to E-5 (~$1,287–$1,395/mo)", neighborhoods: "Fairborn, Xenia, Huber Heights", detail: "Fairborn is 3 miles from the main gate with strong starter home inventory in the $170K–$220K range. You can cover the full payment with BAH. Xenia offers even lower prices if you don&apos;t mind a 20-minute commute." },
                { tier: "E-6 to E-7 (~$1,506–$1,617/mo)", neighborhoods: "Beavercreek (south), Kettering, Riverside", detail: "This range opens up south Beavercreek and Kettering — both have good schools and better housing stock than Fairborn. Target the $220K–$260K range comfortably." },
                { tier: "O-3 to O-4 (~$1,617–$1,728/mo)", neighborhoods: "Beavercreek (north), Centerville", detail: "The $240K–$275K range in Beavercreek and lower Centerville. Top-rated schools, newer construction, and strong appreciation. Centerville is slightly farther from base but has excellent amenities." },
                { tier: "O-5 to O-6 (~$1,899–$2,100/mo)", neighborhoods: "Springboro, Oakwood, Upper Centerville", detail: "The $285K–$350K+ range. Springboro has Ohio&apos;s #1 rated school district [Estimated per Niche] and is worth the 25-mile commute for families prioritizing education. Oakwood is premium and historic." },
              ].map((item) => (
                <div key={item.tier} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="font-bold text-charcoal mb-1">{item.tier}</p>
                  <p className="text-gold font-semibold text-sm mb-2">Best options: {item.neighborhoods}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">4 BAH Tips Military Buyers Often Miss</h2>
            <div className="space-y-4">
              {[
                { icon: <DollarSign className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />, title: "BAH doesn't count as income — but your base pay does", body: "Lenders qualify you on base pay, not BAH. BAH covers the payment, but your debt-to-income ratio is calculated without it. You can often qualify for more than you think." },
                { icon: <Home className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />, title: "Lock your rate strategically", body: "If rates drop significantly after closing, a VA IRRRL lets you refinance with minimal paperwork and no appraisal. Don&apos;t let today&apos;s rates stop you from building equity now." },
                { icon: <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />, title: "Get pre-approved before PCS orders arrive", body: "The best homes near WPAFB go under contract in days. If you wait until orders are in hand, you will be competing cold — and often losing to buyers who started earlier." },
                { icon: <DollarSign className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />, title: "Don't use BAH from your old duty station", body: "BAH is location-specific. Your San Diego or DC BAH is much higher than Dayton&apos;s — and that&apos;s good news, because Dayton home prices are far lower. Recalculate with Dayton&apos;s rates." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  {item.icon}
                  <div>
                    <p className="font-bold text-charcoal">{item.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
            <h2 className="text-xl font-black text-charcoal mb-3">Bottom Line</h2>
            <p className="text-gray-700 leading-relaxed">Dayton is one of the most BAH-friendly markets in the country for military buyers. In most other duty stations, your BAH covers rent and nothing more. Here, it often covers a mortgage — which means you can build equity on the government&apos;s dime and walk away with a real asset after your tour. Run your numbers, get pre-approved early, and reach out before your orders finalize so we can line up the right homes for your budget.</p>
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
          <div className="flex justify-center mb-4"><DollarSign className="w-10 h-10 text-gold" /></div>
          <h2 className="text-2xl font-black mb-3">Let&apos;s Match Your BAH to the Right Home</h2>
          <p className="text-gray-300 mb-8">Chris works with military buyers every week. Tell him your pay grade and when you&apos;re arriving — he&apos;ll pull the right listings before you even land.</p>
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
