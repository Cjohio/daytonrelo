import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, Shield, DollarSign, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "First-Time Homebuyer Guide for Military Families in Dayton, Ohio | Dayton Relo",
  description: "Buying your first home near Wright-Patterson AFB? This step-by-step guide walks military first-time buyers through VA loans, the Dayton market, and how to close confidently.",
  keywords: ["first time homebuyer military Dayton", "VA loan first time buyer Ohio", "buying first home WPAFB", "military first home Dayton Ohio", "first time buyer VA loan Wright-Patterson"],
};

export default function FirstTimeBuyerPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-gold/10 text-gold-dark text-xs font-bold px-2.5 py-1 rounded-md">Home Buying</span>
            <span className="text-gray-400 text-sm">June 1, 2025</span>
            <span className="text-gray-400 text-sm">· 10 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-snug">
            First-Time Homebuyer Guide<br />
            <span className="text-gold">for Military Families in Dayton, Ohio</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">Written by Chris Jurgens — U.S. Army Iraq War veteran and licensed Ohio Realtor specializing in military relocation to the Wright-Patterson AFB area.</p>
        </div>
      </section>

      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-gray-900">
        <Image src="https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&h=600&fit=crop&auto=format" alt="First time homebuyer military Dayton Ohio" fill className="object-cover opacity-80" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", "headline": "First-Time Homebuyer Guide for Military Families in Dayton, Ohio", "description": "Step-by-step guide for military first-time buyers near Wright-Patterson AFB — VA loans, Dayton market, and closing confidently.", "image": "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&h=600&fit=crop&auto=format", "author": { "@type": "Person", "name": "Chris Jurgens", "url": "https://daytonrelo.com/about" }, "publisher": { "@type": "Organization", "name": "Dayton Relo", "url": "https://daytonrelo.com" }, "datePublished": "2025-06-01", "dateModified": "2026-04-09", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://daytonrelo.com/blog/first-time-homebuyer-military-dayton" }, "keywords": ["first time homebuyer", "military", "VA loan", "Dayton Ohio", "WPAFB"] }) }} />

          <section>
            <p className="text-gray-700 text-lg leading-relaxed">Buying your first home is already one of the most significant financial decisions you will make. Doing it during a PCS move adds a layer of complexity that civilian buyers never face. But military first-time buyers near Wright-Patterson AFB have a significant advantage: the VA home loan, a Dayton market with prices that match realistic BAH levels, and a large community of people who have done exactly this before you.</p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">This guide walks you through every step — from confirming you can actually qualify, to what happens on closing day — so you go into your first purchase knowing what to expect.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Step 1: Understand Why the VA Loan Is Your Best Option</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {[["$0 Down Payment", "No down payment required for qualified buyers with full entitlement."],["No PMI","No private mortgage insurance — saving $100–$300/month vs conventional loans. [Est.]"],["Competitive Rates","VA loans typically offer rates comparable or better than conventional. [Est.]"]].map(([title, desc]) => (
                <div key={title} className="bg-gold/5 border border-gold/20 rounded-xl p-4 text-center">
                  <Shield className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="font-bold text-charcoal text-sm mb-1">{title}</p>
                  <p className="text-gray-600 text-xs">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed">For a first-time buyer, the no-down-payment feature alone is transformative. Conventional first-time buyers typically need 3–20% down plus closing costs. On a $250,000 home, that is $7,500–$50,000 in cash reserves required before you can buy. VA buyers need significantly less out of pocket — typically just closing costs, which in many Dayton transactions can be negotiated into the purchase price.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Step 2: Check Your Eligibility and Credit</h2>
            <p className="text-gray-700 leading-relaxed mb-4">VA loan eligibility is based on your service record, not your credit score — but your credit score still matters for the rate you receive. Most VA lenders look for a minimum 580–620 credit score; better scores (700+) unlock the best rates. [Verify current minimums with your lender]</p>
            <p className="text-gray-700 leading-relaxed mb-4">If your credit score needs work, don&apos;t wait. Common quick wins: pay down credit card balances to below 30% of the limit, dispute any errors on your credit report, and avoid opening new credit accounts for 6 months before applying. A mortgage-focused lender can give you a specific action plan based on your actual report.</p>
            <p className="text-gray-700 leading-relaxed">Get your Certificate of Eligibility (COE) confirmed with a VA-approved lender early. It takes minutes through the VA&apos;s automated system and confirms you have the benefit before you go further.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Step 3: Know Your Budget Before You Search</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Your BAH covers the housing payment — but lenders qualify you based on your base pay, not BAH. The VA has a residual income requirement that acts as a safety net: after all monthly obligations, you must have a minimum amount left over based on family size and region. This is often the deciding factor in VA approvals.</p>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <p className="font-bold text-charcoal mb-2">Quick budget framework for Dayton first-time buyers</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex gap-2"><CheckSquare className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> Get pre-approved for your maximum — but target 10–15% below it for comfort</li>
                <li className="flex gap-2"><CheckSquare className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> Factor in property taxes (~1.5–2% annually in Greene/Montgomery County) [Est.]</li>
                <li className="flex gap-2"><CheckSquare className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> Budget $200–$400/month for maintenance on a home under $300K</li>
                <li className="flex gap-2"><CheckSquare className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> Reserve 2–3 months of mortgage payments as an emergency fund</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Step 4: Find the Right Agent — This Matters More Than You Think</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Not every real estate agent knows the VA loan process, the WPAFB market, or the specific needs of a military buyer on a PCS timeline. Choosing the wrong agent costs you time and, in fast markets, can cost you homes. Look for an agent who:</p>
            <ul className="space-y-2 text-gray-700">
              {["Closes VA transactions regularly and knows VA appraisal requirements cold","Has relationships with VA-approved lenders in the Dayton market","Understands PCS timelines and can move at your pace (not theirs)","Has genuine familiarity with Fairborn, Beavercreek, Centerville, and Kettering","Will set up MLS alerts immediately and communicate proactively"].map((item) => (
                <li key={item} className="flex gap-2 items-start"><span className="text-gold font-bold">—</span><span>{item}</span></li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Step 5: Making an Offer and Navigating the VA Appraisal</h2>
            <p className="text-gray-700 leading-relaxed mb-4">In the Dayton market, most homes in the WPAFB BAH range see multiple offers within the first week. Your VA pre-approval letter is your competitive credential — it shows sellers you are a serious buyer with financing confirmed.</p>
            <p className="text-gray-700 leading-relaxed mb-4">Once under contract, a VA-assigned appraiser inspects the home for value and Minimum Property Requirements (MPRs) — basic safety and livability standards. The vast majority of Dayton homes pass without issues. If something comes up, you can negotiate repairs, a price reduction, or walk away. As a buyer, you are protected in ways conventional buyers are not.</p>
            <p className="text-gray-700 leading-relaxed">From offer acceptance to closing typically takes 30–45 days with a VA loan. Plan your PCS timeline around this window.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">Closing Day: What to Expect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Closing on a VA loan is similar to any other closing — you review and sign documents, the title transfers, and you get keys. The main difference is confirming your funding fee status (or exemption) and ensuring your COE is correctly reflected in the loan documents.</p>
            <p className="text-gray-700 leading-relaxed">Bring a cashier&apos;s check or wire transfer for closing costs. In Ohio, closing costs typically run 2–3% of the loan amount [Estimated]. Many buyers negotiate seller concessions to cover part or all of this — your agent should be pushing for this on every transaction.</p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
            <h2 className="text-xl font-black text-charcoal mb-3">Bottom Line</h2>
            <p className="text-gray-700 leading-relaxed">Military first-time buyers near WPAFB are in a better position than almost any first-time buyer anywhere in the country. You have a zero-down loan benefit, a market where BAH actually covers the payment, and a community of experienced military homeowners who have navigated this exact process. The hardest part is getting started — and the best time to do that is before your orders arrive.</p>
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
          <div className="flex justify-center mb-4"><Home className="w-10 h-10 text-gold" /></div>
          <h2 className="text-2xl font-black mb-3">Ready to Buy Your First Home Near WPAFB?</h2>
          <p className="text-gray-300 mb-8">Chris guides military first-time buyers through every step — from VA eligibility to closing day. Reach out before your orders arrive.</p>
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
