import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "VA Loan Guide for WPAFB: Everything You Need to Know Before Your PCS | Dayton Relo",
  description: "Complete VA home loan guide for service members PCSing to Wright-Patterson AFB. Certificate of Eligibility, funding fee waiver, entitlement, and Dayton-area tips.",
  keywords: ["VA loan WPAFB", "VA home loan Dayton Ohio", "PCS home buying guide", "VA loan Certificate of Eligibility", "WPAFB real estate", "military home buying Dayton"],
};

export default function VALoanGuidePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-gold/10 text-gold-dark text-xs font-bold px-2.5 py-1 rounded-md">VA Loans</span>
            <span className="text-gray-400 text-sm">April 1, 2025</span>
            <span className="text-gray-400 text-sm">· 9 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-snug">
            VA Loan Guide for WPAFB:<br />
            <span className="text-gold">Everything You Need to Know Before Your PCS</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Written by Chris Jurgens — U.S. Army Iraq War veteran and licensed Ohio Realtor
            specializing in military relocation to the Wright-Patterson AFB area.
          </p>
        </div>
      </section>

      {/* Hero image */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop&auto=format"
          alt="VA home loan guide for Dayton Ohio"
          fill
          className="object-cover opacity-80"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Article body */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">

          {/* JSON-LD Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": "VA Loan Guide for WPAFB: Everything You Need to Know Before Your PCS",
                "description": "Complete VA home loan guide for service members PCSing to Wright-Patterson AFB. Certificate of Eligibility, funding fee waiver, entitlement, and Dayton-area tips.",
                "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop&auto=format",
                "author": {
                  "@type": "Person",
                  "name": "Chris Jurgens",
                  "url": "https://daytonrelo.com/about"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Dayton Relo",
                  "url": "https://daytonrelo.com"
                },
                "datePublished": "2025-04-01",
                "dateModified": "2026-04-09",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://daytonrelo.com/blog/va-loan-guide-dayton-ohio"
                },
                "keywords": ["VA loan", "WPAFB", "PCS", "Dayton Ohio", "VA home loan", "military relocation"]
              }),
            }}
          />

          {/* Intro */}
          <section>
            <p className="text-gray-700 text-lg leading-relaxed">
              If you&apos;re receiving PCS orders to Wright-Patterson Air Force Base, buying a home in the
              Dayton area is one of the smartest financial moves you can make — especially with the VA
              home loan benefit in your corner. With $0 down, no PMI, and competitive rates, VA loans
              are the most powerful home buying tool available to service members and veterans. But a
              lot of buyers leave money on the table simply because they don&apos;t know how the benefit
              works in practice.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              This guide walks you through everything — from confirming your eligibility to what
              actually happens at the closing table — with specific guidance for buying near WPAFB.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              Step 1: Confirm Your Eligibility and Get Your COE
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before anything else, you need a Certificate of Eligibility (COE). This is the VA&apos;s
              official document confirming you&apos;ve met the service requirements to use the benefit. Most
              VA-approved lenders can pull your COE automatically through the VA&apos;s system — you don&apos;t
              need to get it yourself before talking to a lender.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In general, you&apos;re eligible if you&apos;ve served 90 consecutive days on active duty during
              wartime, 181 days during peacetime, 6 years in the National Guard or Reserves, or are
              the surviving spouse of a veteran who died in service or from a service-connected
              disability. Specific service requirements have changed over the years — always verify
              your exact status with the VA or a VA-approved lender.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              Step 2: Understand the Funding Fee (and How to Avoid It)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The VA funding fee is a one-time charge that helps keep the VA loan program funded for
              future generations of veterans. It&apos;s typically 1.25% to 3.3% of the loan amount,
              depending on your down payment and whether it&apos;s your first VA loan. On a $280,000
              home — roughly the median in the Beavercreek/Fairborn corridor near WPAFB — that&apos;s
              between $3,500 and $9,240.
            </p>
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
              <p className="font-bold text-charcoal mb-1">Important: Funding Fee Waiver</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                If you have a service-connected disability rating of 10% or higher, you are exempt
                from the VA funding fee entirely. This is one of the most commonly missed benefits —
                confirm your disability rating before closing so your lender can apply the waiver.
                Surviving spouses of veterans who died in service or from service-connected causes
                are also exempt.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              Step 3: Know Your Entitlement
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              VA loan entitlement is the amount the VA guarantees to the lender if you default. Full
              entitlement means there is no loan limit — you can buy any price home (that you qualify
              for financially) with $0 down. You have full entitlement if you&apos;ve never used your VA
              benefit, or if you&apos;ve used it but paid off the loan and had your entitlement restored.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you have a current VA loan — say, a home you bought at a previous duty station that
              you haven&apos;t sold — you may have reduced entitlement. You can still use the VA loan, but
              you may need a down payment if the loan amount exceeds your remaining entitlement. A
              VA-approved lender can calculate your exact situation based on your COE.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              Step 4: Get Pre-Approved Before You Start Shopping
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Dayton market moves quickly — especially in Beavercreek, Centerville, and Fairborn,
              which are the most popular neighborhoods for WPAFB buyers. Pre-approval is essential.
              It shows sellers you&apos;re serious, tells you exactly what you can spend, and positions you
              to move fast when you find the right home.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For VA pre-approval, lenders will look at your income (including BAH and BAS as
              qualifying income), credit score, and residual income — the amount you have left over
              after all monthly obligations. The VA residual income requirement is often the decisive
              factor, so make sure you understand your full financial picture before applying.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              Step 5: The VA Appraisal — What to Expect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All VA-financed homes must be appraised by a VA-approved appraiser. The appraisal does
              two things: confirms the home&apos;s market value and checks for Minimum Property
              Requirements (MPRs). MPRs are basic safety and livability standards — the home must
              have working utilities, no active pest infestations, no major structural defects, and
              functioning heating systems.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In the Dayton area, most standard homes pass without issues. If the appraisal comes in
              below the purchase price, you can negotiate with the seller, make up the difference in
              cash, or walk away and get your earnest money back. Your agent should know how to
              navigate this — it&apos;s one of the key differences between a VA-experienced Realtor and one
              who is learning on your transaction.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              The WPAFB Market: Where Are Military Buyers Buying?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most WPAFB buyers look at three main areas: Beavercreek (closest to the base, highly
              rated schools, higher price point), Fairborn (walkable to base, more affordable, strong
              resale), and Centerville (great schools, suburban feel, longer commute but popular with
              families). Huber Heights and Riverside offer more budget-friendly options with
              reasonable commutes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              BAH for an E-6 with dependents at WPAFB in 2025 is competitive with median home prices
              in Fairborn and Huber Heights — meaning many buyers can cover their full mortgage
              payment with their housing allowance. Run the numbers with a VA-experienced lender
              before assuming you&apos;ll need to add out-of-pocket cash.
            </p>
          </section>

          {/* Closing */}
          <section className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
            <h2 className="text-xl font-black text-charcoal mb-3">Bottom Line</h2>
            <p className="text-gray-700 leading-relaxed">
              The VA loan is one of the best financial tools in existence — $0 down, no PMI, and
              rates that often beat conventional products. But it works best when you understand it
              before you start shopping. Get your COE confirmed, check whether your disability rating
              qualifies you for a funding fee waiver, and work with a lender who closes VA loans
              routinely. The Dayton market rewards prepared buyers.
            </p>
          </section>

          {/* Author bio */}
          <div className="border-t border-gray-100 pt-8">
            <div className="flex items-start gap-4 bg-gray-50 rounded-2xl p-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold">
                <img src="/headshot.jpg" alt="Chris Jurgens" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-gold uppercase tracking-widest mb-1">Written by</p>
                <p className="font-black text-charcoal text-lg leading-tight">Chris Jurgens</p>
                <p className="text-sm text-gray-500 mb-2">Licensed Ohio Realtor · U.S. Army Iraq War Veteran · Team Flory · eXp Realty</p>
                <p className="text-sm text-gray-600 leading-relaxed">Chris has 15 years of real estate experience in the Dayton area and specializes in military PCS moves and VA loan transactions. He served 9 years in the U.S. Army, including a deployment to Iraq, and brings firsthand understanding of the military relocation process to every client.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lender CTA */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-1">Preferred Lenders</p>
            <h2 className="text-xl font-black text-charcoal">Ready to Use Your VA Benefit?</h2>
            <p className="text-gray-600 text-sm mt-1">
              Meet Chris&apos;s vetted VA specialists — all experienced with Dayton-area military buyers.
            </p>
          </div>
          <Link href="/lender" className="btn-gold flex-shrink-0">Meet Our Lenders →</Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-4xl mb-4">🎖️</div>
          <h2 className="text-2xl font-black mb-3">Questions About Your VA Loan?</h2>
          <p className="text-gray-300 mb-8">
            Chris is a U.S. Army Iraq War veteran and licensed Ohio Realtor. He can walk you
            through your specific situation and connect you with a VA-approved lender.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+19372413484" className="btn-gold">Call Chris Now</a>
            <Link href="/contact" className="btn-outline">Send a Message</Link>
          </div>
        </div>
      </section>

      {/* Back to blog */}
      <div className="bg-gray-50 py-8 text-center">
        <Link href="/blog" className="text-gold font-semibold hover:text-gold-dark transition-colors">
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}
