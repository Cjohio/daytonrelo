import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, MapPin, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Schools Near Wright-Patterson AFB: Complete Guide for Military Families | Dayton Relo",
  description: "Which school districts near WPAFB are best for military kids? We rank Beavercreek, Fairborn, Centerville, Springboro, and more — with honest data military families actually need.",
  keywords: ["schools near Wright-Patterson AFB", "best schools WPAFB military families", "Beavercreek schools Ohio", "Springboro schools military", "Dayton Ohio schools military families"],
};

export default function SchoolsNearWPAFBPage() {
  const districts = [
    { name: "Springboro Community City Schools", city: "Springboro", rating: "10/10 [Est.]", distance: "~25 mi", enrollment: "~6,800 [Est.]", highlights: ["Ranked #1 in Ohio for multiple years [Est. per Niche rankings — verify]", "Award-winning arts and STEM programs", "Strong athletics", "High graduation rate"], note: "The commute to WPAFB is the tradeoff. Families who prioritize schools above all else choose Springboro and don't regret it.", slug: "springboro" },
    { name: "Beavercreek City Schools", city: "Beavercreek", rating: "9/10 [Est.]", distance: "~8 mi", enrollment: "~8,200 [Est.]", highlights: ["Consistently top-ranked Greene County district", "Strong AP program and college prep", "Multiple award-winning elementary schools", "Active military family community"], note: "The most popular choice for WPAFB officer families. Close to base, excellent schools, and established military network among the parent community.", slug: "beavercreek" },
    { name: "Centerville City Schools", city: "Centerville", rating: "9/10 [Est.]", distance: "~18 mi", enrollment: "~7,100 [Est.]", highlights: ["Nationally recognized schools", "Strong IB and gifted programs", "Centerville High School consistently ranks in Ohio top 20 [Est.]", "Well-funded extracurriculars"], note: "Centerville schools are genuinely excellent — comparable to Beavercreek. The commute is longer but the community feel and school quality make it a strong choice for O-4+ families.", slug: "centerville" },
    { name: "Kettering City Schools", city: "Kettering", rating: "7/10 [Est.]", distance: "~15 mi", enrollment: "~6,400 [Est.]", highlights: ["Solid district with good value", "Fairmont High School has strong arts and athletics", "More affordable housing in the district", "Active community foundation support"], note: "Kettering is the best value school district in the WPAFB corridor — not as elite as Beavercreek or Springboro, but genuinely solid and paired with lower housing costs.", slug: "kettering" },
    { name: "Fairborn City Schools", city: "Fairborn", rating: "6/10 [Est.]", distance: "~3 mi", enrollment: "~5,100 [Est.]", highlights: ["Closest district to WPAFB", "Improving performance trends", "Strong JROTC program", "Wright State University partnership programs"], note: "Fairborn schools have improved over the past decade and serve a large military kid population. They are not Beavercreek, but they are a functional, improving district — and the proximity to base and lower home prices may outweigh the school gap for many families.", slug: "fairborn" },
  ];

  return (
    <main className="min-h-screen">
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-gold/10 text-gold-dark text-xs font-bold px-2.5 py-1 rounded-md">Schools</span>
            <span className="text-gray-400 text-sm">June 8, 2025</span>
            <span className="text-gray-400 text-sm">· 8 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-snug">
            Schools Near Wright-Patterson AFB:<br />
            <span className="text-gold">Complete Guide for Military Families</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">Written by Chris Jurgens — U.S. Army Iraq War veteran and licensed Ohio Realtor specializing in military relocation to the Wright-Patterson AFB area.</p>
        </div>
      </section>

      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-gray-900">
        <Image src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=600&fit=crop&auto=format" alt="Schools near Wright-Patterson AFB Dayton Ohio" fill className="object-cover opacity-80" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Schools Near Wright-Patterson AFB: Complete Guide for Military Families", "description": "School district rankings near WPAFB — Beavercreek, Springboro, Centerville, Fairborn, Kettering compared for military families.", "image": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=600&fit=crop&auto=format", "author": { "@type": "Person", "name": "Chris Jurgens", "url": "https://daytonrelo.com/about" }, "publisher": { "@type": "Organization", "name": "Dayton Relo", "url": "https://daytonrelo.com" }, "datePublished": "2025-06-08", "dateModified": "2026-04-09", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://daytonrelo.com/blog/schools-near-wpafb-dayton" }, "keywords": ["schools WPAFB", "military families", "Beavercreek schools", "Springboro schools", "Dayton Ohio school districts"] }) }} />

          <section>
            <p className="text-gray-700 text-lg leading-relaxed">For military families with school-age children, the school district is often the deciding factor in where to live — and it should be. Military kids typically change schools every 3–4 years, which makes landing in a strong, supportive district especially important. The good news: several communities around WPAFB have genuinely excellent schools that regularly rank among Ohio&apos;s best.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <p className="text-sm text-amber-700">[Estimated — verify before acting] School ratings and rankings are estimates based on publicly available data and may have changed. Always verify current performance with the Ohio Department of Education and district websites before enrolling.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">What Military Families Should Look for in a School District</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Academic rankings matter, but military families have specific needs beyond test scores. Look for districts that:</p>
            <div className="grid md:grid-cols-2 gap-3">
              {["Have experience absorbing military transfer students mid-year", "Have strong counseling programs for kids adjusting to new environments", "Offer robust JROTC or leadership programs at the high school level", "Have active military family networks among the parent community", "Communicate proactively with parents about academic progress", "Have advanced coursework that transfers cleanly to other districts"].map((item) => (
                <div key={item} className="flex gap-2 items-start bg-gray-50 rounded-lg p-3">
                  <GraduationCap className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-6 border-l-4 border-gold pl-4">School Districts Near WPAFB — Ranked</h2>
            <div className="space-y-6">
              {districts.map((d, i) => (
                <div key={d.name} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="bg-charcoal text-white px-6 py-4 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-gold text-charcoal font-black text-sm flex items-center justify-center">{i + 1}</span>
                      <div>
                        <p className="font-black">{d.name}</p>
                        <p className="text-gray-400 text-xs">{d.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold" />{d.rating}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gray-400" />{d.distance} from WPAFB</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Highlights</p>
                        <ul className="space-y-1">{d.highlights.map((h) => <li key={h} className="text-sm text-gray-700 flex gap-1.5"><span className="text-gold font-bold">+</span>{h}</li>)}</ul>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Enrollment [Est.]</p>
                        <p className="text-sm text-gray-700">{d.enrollment} students</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <p className="text-sm text-blue-800 leading-relaxed"><strong>Chris&apos;s take:</strong> {d.note}</p>
                    </div>
                    <div className="mt-3">
                      <Link href={`/neighborhoods/${d.slug}`} className="text-gold text-sm font-semibold hover:text-gold-dark transition-colors">View {d.city} neighborhood guide →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Practical Tips for Military School Enrollment in Ohio</h2>
            <div className="space-y-3">
              {[
                { tip: "Ohio participates in the Interstate Compact on Educational Opportunity for Military Children", detail: "This means your child&apos;s grade placement, graduation requirements, and extracurricular participation should be accommodated when enrolling mid-year. [Verify current compact status with Ohio DOE]" },
                { tip: "Enrollment typically requires proof of address", detail: "Most Ohio districts require a lease or closing documents showing your new address before enrolling. If you are buying and haven&apos;t closed yet, contact the district in advance — some accept purchase contracts temporarily." },
                { tip: "IEP and 504 plans transfer", detail: "Ohio schools are required to honor existing IEP and 504 plans while developing new ones. Bring documentation from your child&apos;s previous school." },
                { tip: "Request transcripts before you PCS", detail: "Official transcripts sent from school-to-school are more reliable than parent copies. Request them 4–6 weeks before your move date." },
              ].map((item) => (
                <div key={item.tip} className="flex gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <GraduationCap className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-charcoal text-sm mb-1">{item.tip}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
            <h2 className="text-xl font-black text-charcoal mb-3">Bottom Line</h2>
            <p className="text-gray-700 leading-relaxed">The Dayton area has no shortage of quality school options for military families. Springboro and Beavercreek lead the rankings, Centerville is a strong alternative, and even Fairborn — the closest district to the base — is a functional, improving district. The right choice depends on your BAH level, commute tolerance, and children&apos;s ages. Reach out and I can map current listings to school district boundaries so you see exactly what is available in the district you want.</p>
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
          <div className="flex justify-center mb-4"><GraduationCap className="w-10 h-10 text-gold" /></div>
          <h2 className="text-2xl font-black mb-3">Find a Home in the Right School District</h2>
          <p className="text-gray-300 mb-8">Chris can filter listings by school district boundary so you only see homes that actually feed into the school you want.</p>
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
