import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Home, GraduationCap, Car } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Neighborhoods Near WPAFB for Military Families: 2025 Guide | Dayton Relo",
  description: "Choosing where to live near Wright-Patterson AFB? We rank the top 6 neighborhoods by schools, commute, price, and lifestyle — with honest pros and cons for military families.",
  keywords: ["best neighborhoods WPAFB", "where to live Wright-Patterson AFB", "military families Dayton Ohio", "WPAFB neighborhoods guide 2025", "Beavercreek Fairborn Centerville military"],
};

export default function BestNeighborhoodsPage() {
  const neighborhoods = [
    { name: "Fairborn", distance: "~3 mi", price: "~$210K", schools: "6/10", fit: "E-4 to E-6", downside: "Older housing stock", slug: "fairborn", pros: ["Closest city to the base gate", "Most affordable near WPAFB", "5-minute commute", "Wright State University nearby"], cons: ["Schools below Beavercreek average", "Older inventory in many areas", "Limited high-end dining/shopping"] },
    { name: "Beavercreek", distance: "~8 mi", price: "~$340K", schools: "9/10", fit: "O-2 to O-5", downside: "Rush hour traffic on SR-444", slug: "beavercreek", pros: ["Top-rated school district", "The Greene & Fairfield Commons shopping", "Newer subdivisions", "Strong appreciation history"], cons: ["Higher price point", "More congestion at peak hours", "Less character than Fairborn"] },
    { name: "Centerville", distance: "~18 mi", price: "~$370K", schools: "9/10", fit: "O-4 to O-6", downside: "Longer commute", slug: "centerville", pros: ["Excellent schools", "Established, quiet neighborhoods", "Strong resale value", "Good restaurant/retail access"], cons: ["20-25 min commute to WPAFB", "Higher prices limit BAH coverage", "Less military community feel"] },
    { name: "Kettering", distance: "~15 mi", price: "~$230K", schools: "7/10", fit: "E-7 to O-2", downside: "Older neighborhood stock", slug: "kettering", pros: ["More affordable than Beavercreek", "Walkable Oakwood-adjacent feel", "Solid school district", "Short drive to downtown Dayton"], cons: ["Not as close to base as Fairborn", "Aging housing stock in parts", "Less military-focused community"] },
    { name: "Springboro", distance: "~25 mi", price: "~$385K", schools: "10/10", fit: "O-5 to O-6", downside: "Furthest from WPAFB", slug: "springboro", pros: ["Ohio's #1 rated school district [Est.]", "New construction available", "Family-focused community", "Strong property values"], cons: ["25-mile commute each way", "Requires O-5+ BAH to be comfortable", "Feels disconnected from base community"] },
    { name: "Oakwood", distance: "~17 mi", price: "~$450K", schools: "9/10", fit: "O-6+", downside: "Premium prices", slug: "oakwood", pros: ["Historic, prestigious zip code", "Top-rated schools and parks", "Walkable village center", "Exceptional resale value"], cons: ["Among highest prices in Dayton area", "Very competitive inventory", "Significant BAH gap for most grades"] },
  ];

  return (
    <main className="min-h-screen">
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-gold/10 text-gold-dark text-xs font-bold px-2.5 py-1 rounded-md">Neighborhoods</span>
            <span className="text-gray-400 text-sm">May 8, 2025</span>
            <span className="text-gray-400 text-sm">· 10 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-snug">
            Best Neighborhoods Near WPAFB<br />
            <span className="text-gold">for Military Families: 2025 Guide</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">Written by Chris Jurgens — U.S. Army Iraq War veteran and licensed Ohio Realtor specializing in military relocation to the Wright-Patterson AFB area.</p>
        </div>
      </section>

      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-gray-900">
        <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop&auto=format" alt="Best neighborhoods near Wright-Patterson AFB" fill className="object-cover opacity-80" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Best Neighborhoods Near WPAFB for Military Families: 2025 Guide", "description": "Top 6 neighborhoods near Wright-Patterson AFB ranked by schools, commute, price, and lifestyle.", "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop&auto=format", "author": { "@type": "Person", "name": "Chris Jurgens", "url": "https://daytonrelo.com/about" }, "publisher": { "@type": "Organization", "name": "Dayton Relo", "url": "https://daytonrelo.com" }, "datePublished": "2025-05-08", "dateModified": "2026-04-09", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://daytonrelo.com/blog/best-neighborhoods-military-families-dayton" }, "keywords": ["neighborhoods WPAFB", "military families Dayton", "Beavercreek", "Fairborn", "Centerville", "Springboro"] }) }} />

          <section>
            <p className="text-gray-700 text-lg leading-relaxed">The Dayton area has six communities that account for the overwhelming majority of WPAFB home purchases. Each one makes sense for a specific type of buyer — defined by pay grade, family situation, school priorities, and commute tolerance. This guide gives you the honest picture on all six, with real data and the downsides most sites leave out.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <p className="text-sm text-amber-700">[Estimated — verify before acting] Prices, school ratings, and commute times are estimates and change over time. Verify with current listings and school district websites before making decisions.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-6 border-l-4 border-gold pl-4">The 6 Neighborhoods — Ranked by WPAFB Proximity</h2>
            <div className="space-y-8">
              {neighborhoods.map((n, i) => (
                <div key={n.name} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="bg-charcoal text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gold text-charcoal font-black text-sm flex items-center justify-center">{i + 1}</span>
                      <h3 className="text-xl font-black">{n.name}</h3>
                    </div>
                    <span className="text-gold text-sm font-semibold">Best for: {n.fit}</span>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                      {[
                        { icon: <Car className="w-4 h-4" />, label: "Distance", value: n.distance },
                        { icon: <Home className="w-4 h-4" />, label: "Median Price", value: n.price },
                        { icon: <GraduationCap className="w-4 h-4" />, label: "Schools [Est.]", value: n.schools },
                        { icon: <MapPin className="w-4 h-4" />, label: "One Downside", value: n.downside },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center">
                          <div className="flex justify-center text-gold mb-1">{stat.icon}</div>
                          <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
                          <p className="font-bold text-charcoal text-sm">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Strengths</p>
                        <ul className="space-y-1">{n.pros.map((p) => <li key={p} className="text-sm text-gray-700 flex gap-1.5"><span className="text-green-600 font-bold mt-0.5">+</span>{p}</li>)}</ul>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">Honest Downsides</p>
                        <ul className="space-y-1">{n.cons.map((c) => <li key={c} className="text-sm text-gray-700 flex gap-1.5"><span className="text-red-500 font-bold mt-0.5">—</span>{c}</li>)}</ul>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link href={`/neighborhoods/${n.slug}`} className="text-gold text-sm font-semibold hover:text-gold-dark transition-colors">View full {n.name} neighborhood guide →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">How to Choose Before You Arrive</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Most families who agonize over this decision for months end up picking based on three things: their BAH ceiling, whether they have school-age children, and their commute tolerance. If you answer those three questions honestly, the neighborhood essentially picks itself.</p>
            <div className="space-y-3">
              {[
                { q: "BAH under $1,500/mo?", a: "Fairborn is your best option. It gives you the most home for your allowance with the shortest commute." },
                { q: "BAH $1,500–$1,800/mo with school-age kids?", a: "Beavercreek. The school difference is significant and the commute is still manageable." },
                { q: "BAH $1,800+/mo and schools are priority?", a: "Centerville or Springboro. Both have exceptional school districts and the home quality is noticeably higher." },
                { q: "Planning to stay 5+ years and prioritize appreciation?", a: "Beavercreek or Oakwood have historically shown the strongest appreciation in the WPAFB corridor. [Estimated based on market observation]" },
              ].map((item) => (
                <div key={item.q} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-bold text-charcoal text-sm mb-1">{item.q}</p>
                  <p className="text-gray-600 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
            <h2 className="text-xl font-black text-charcoal mb-3">Bottom Line</h2>
            <p className="text-gray-700 leading-relaxed">There is no wrong answer among these six neighborhoods for a military family. Each one has a real community of WPAFB families who chose it deliberately and are happy they did. The key is matching your choice to your actual situation — not optimizing for what sounds impressive from 1,500 miles away. Tell me your pay grade, your family situation, and your top priority, and I will have a tailored list of homes ready before you land.</p>
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
          <div className="flex justify-center mb-4"><MapPin className="w-10 h-10 text-gold" /></div>
          <h2 className="text-2xl font-black mb-3">Get a Personalized Neighborhood Match</h2>
          <p className="text-gray-300 mb-8">Tell Chris your pay grade and what matters most — he will match you to the right neighborhood and pull active listings before you arrive.</p>
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
