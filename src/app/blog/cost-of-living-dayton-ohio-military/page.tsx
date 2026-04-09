import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DollarSign, TrendingDown, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Cost of Living in Dayton Ohio vs DC, San Diego & Colorado Springs | Dayton Relo",
  description: "How does Dayton, Ohio's cost of living compare for military families? We break down housing, groceries, taxes, and BAH against DC, San Diego, and Colorado Springs — the numbers will surprise you.",
  keywords: ["cost of living Dayton Ohio military", "Dayton Ohio vs DC cost of living", "Dayton Ohio vs San Diego military", "WPAFB cost of living comparison", "affordable military cities Ohio"],
};

export default function CostOfLivingPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-gold/10 text-gold-dark text-xs font-bold px-2.5 py-1 rounded-md">Finance</span>
            <span className="text-gray-400 text-sm">May 22, 2025</span>
            <span className="text-gray-400 text-sm">· 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-snug">
            Cost of Living: Dayton Ohio vs.<br />
            <span className="text-gold">DC, San Diego &amp; Colorado Springs</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">Written by Chris Jurgens — U.S. Army Iraq War veteran and licensed Ohio Realtor specializing in military relocation to the Wright-Patterson AFB area.</p>
        </div>
      </section>

      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-gray-900">
        <Image src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop&auto=format" alt="Cost of living comparison Dayton Ohio" fill className="object-cover opacity-80" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Cost of Living in Dayton Ohio vs DC, San Diego & Colorado Springs", "description": "How Dayton, Ohio compares for military families on housing, groceries, taxes, and BAH.", "image": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop&auto=format", "author": { "@type": "Person", "name": "Chris Jurgens", "url": "https://daytonrelo.com/about" }, "publisher": { "@type": "Organization", "name": "Dayton Relo", "url": "https://daytonrelo.com" }, "datePublished": "2025-05-22", "dateModified": "2026-04-09", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://daytonrelo.com/blog/cost-of-living-dayton-ohio-military" }, "keywords": ["cost of living", "Dayton Ohio", "military", "WPAFB", "DC", "San Diego", "Colorado Springs"] }) }} />

          <section>
            <p className="text-gray-700 text-lg leading-relaxed">One of the first questions families ask when they get WPAFB orders is: what is Dayton actually like to live in? The answer surprises almost everyone coming from DC, San Diego, or Colorado Springs. Dayton is significantly more affordable than any of those metros — and for military families, that gap translates directly into financial opportunity.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <p className="text-sm text-amber-700">[Estimated — verify before acting] All figures below are estimates based on publicly available data. Costs change over time. Verify specific prices with local sources before making financial decisions.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Housing: The Biggest Difference</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
              <table className="w-full text-sm">
                <thead className="bg-charcoal text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">City</th>
                    <th className="px-4 py-3 text-left">Median Home Price [Est.]</th>
                    <th className="px-4 py-3 text-left">Median Rent 3BR [Est.]</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {[["Dayton/WPAFB area","$230K–$340K","$1,200–$1,600/mo"],["Washington DC metro","$550K–$750K","$2,800–$3,800/mo"],["San Diego metro","$700K–$950K","$3,200–$4,500/mo"],["Colorado Springs","$380K–$500K","$1,800–$2,400/mo"]].map(([city, price, rent]) => (
                    <tr key={city} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-charcoal">{city}</td>
                      <td className="px-4 py-3">{price}</td>
                      <td className="px-4 py-3">{rent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed">The housing difference is staggering. A San Diego service member&apos;s BAH barely covers a small apartment. A WPAFB service member&apos;s BAH often covers the full mortgage on a 3-bedroom home in Fairborn or Kettering — leaving them building equity instead of paying a landlord.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Everyday Costs</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { category: "Groceries", dayton: "~$600–$800/mo for family of 4 [Est.]", comparison: "10–20% lower than DC/San Diego [Est.]" },
                { category: "Gas", dayton: "Typically among Ohio&apos;s lower prices [Est.]", comparison: "Significantly less than California [Est.]" },
                { category: "Childcare", dayton: "~$900–$1,400/mo per child [Est.]", comparison: "30–50% less than DC metro [Est.]" },
                { category: "Dining out", dayton: "Casual meal: $12–$18/person [Est.]", comparison: "20–30% less than coastal cities [Est.]" },
              ].map((item) => (
                <div key={item.category} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-bold text-charcoal mb-1">{item.category}</p>
                  <p className="text-sm text-gray-700 mb-1">{item.dayton}</p>
                  <p className="text-sm text-gold font-semibold">{item.comparison}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Taxes: Ohio Is Not the Cheapest, But...</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Ohio has a state income tax — typically 2.75% to 3.99% on most military income levels [Estimated — verify at tax.ohio.gov]. Military retirement pay is fully exempt from Ohio income tax, which is a significant benefit for retirees. Active duty pay is subject to Ohio tax while stationed here.</p>
            <p className="text-gray-700 leading-relaxed">Property taxes in the Dayton area average roughly 1.5% to 2% of assessed value per year [Estimated]. On a $280,000 home, that is roughly $4,200–$5,600 annually, or $350–$467/month — factored into your mortgage payment if you escrow. This is comparable to most metro areas nationwide.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">The Military Family Opportunity in Dayton</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <TrendingDown className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal">Lower cost + VA loan = equity building</p>
                  <p className="text-gray-600 text-sm mt-1">In DC or San Diego, your BAH barely covers rent. In Dayton, it covers a mortgage. Every month at WPAFB, you&apos;re building equity rather than making a landlord wealthy. After a 3–4 year tour, you can rent the home out or sell — either way you&apos;re ahead.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <DollarSign className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal">Lower cost of living = more disposable income</p>
                  <p className="text-gray-600 text-sm mt-1">Military pay doesn&apos;t change based on where you live — but your purchasing power does. A family spending $2,500/month less on housing and daily expenses than they would in DC has $30,000 more per year to save, invest, or spend. That compounds over a career.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Home className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal">Dayton home prices are historically undervalued</p>
                  <p className="text-gray-600 text-sm mt-1">Compared to other mid-size Midwest cities, Dayton prices have historically lagged — meaning more upside potential as the region grows. The influx of defense contractors and WPAFB expansion projects have been steady drivers of local appreciation [Inference based on observed market trends — verify with current market data].</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
            <h2 className="text-xl font-black text-charcoal mb-3">Bottom Line</h2>
            <p className="text-gray-700 leading-relaxed">Dayton is not the most exciting city in America. But for a military family trying to build wealth on a military salary, it is one of the most financially favorable duty stations you can receive. Low home prices, strong BAH coverage, reasonable taxes, and a genuine community of military families who have chosen to stay even after retiring — that is a package most duty stations cannot match.</p>
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
          <h2 className="text-2xl font-black mb-3">Make the Most of Your WPAFB Tour</h2>
          <p className="text-gray-300 mb-8">Chris helps military families turn their Dayton tour into a financial win. Call to talk through your situation before your orders arrive.</p>
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
