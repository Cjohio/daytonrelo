import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Spring 2025 Market Update: Dayton Inventory Up — What It Means for Buyers | Dayton Relo",
  description: "Dayton's spring housing market is showing more inventory than last year. What that means for buyers, how rates are affecting affordability, and which neighborhoods are moving fastest.",
  keywords: ["Dayton Ohio housing market 2025", "Dayton real estate market update", "WPAFB housing", "Dayton home prices spring 2025", "Beavercreek Fairborn real estate"],
};

export default function SpringMarketUpdatePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 border-b-4 border-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-2.5 py-1 rounded-md">Market Update</span>
            <span className="text-gray-400 text-sm">March 28, 2025</span>
            <span className="text-gray-400 text-sm">· 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-snug">
            Spring 2025 Market Update:<br />
            <span className="text-gold">Dayton Inventory Up — What It Means for Buyers</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Written by Chris Jurgens — licensed Ohio Realtor and military relocation specialist
            serving buyers in the Dayton and Wright-Patterson AFB area.
          </p>
        </div>
      </section>

      {/* Hero image */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop&auto=format"
          alt="Dayton Ohio spring housing market 2025"
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

          {/* Intro */}
          <section>
            <p className="text-gray-700 text-lg leading-relaxed">
              If you&apos;ve been waiting on the Dayton market, spring 2025 is a better time to buy than
              the past two years. Inventory is up meaningfully compared to this time last year, giving
              buyers more options and — in some price ranges — more room to negotiate. That said, the
              Dayton market hasn&apos;t softened to the point where buyers can be passive. Homes in the
              right neighborhoods at the right price are still moving in days, not weeks.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              Here&apos;s what the data shows and what it means practically for buyers — especially those
              using VA loans or relocating from out of state.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              Inventory: More Choices, But Not a Buyer&apos;s Market
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Active listings in the Dayton metro are running higher this spring than the same period
              in 2024 and 2023. That increase gives buyers in the $200K–$350K range — the heart of
              the VA loan market near WPAFB — more options than they&apos;ve had in several years.
            </p>
            <p className="text-gray-700 leading-relaxed">
              What inventory increase doesn&apos;t mean: it&apos;s not a buyer&apos;s market in the traditional
              sense. Months of supply is still low by historical standards. Well-maintained homes in
              Beavercreek, Centerville, and Fairborn priced correctly are still receiving multiple
              offers within the first week. The uptick in inventory is most pronounced at the
              higher end ($450K+) and in homes that have been sitting due to condition or pricing
              issues.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              Interest Rates and Affordability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Rates remain elevated compared to the historically low levels of 2020–2021, but the
              Dayton market&apos;s price point makes that pain more manageable than in higher-cost metros.
              A $280,000 home — roughly the Fairborn/Huber Heights median — at a 30-year VA rate
              results in a monthly principal and interest payment that is within reach for many
              service members at E-6 and above whose BAH covers a significant portion of it.
            </p>
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
              <p className="font-bold text-charcoal mb-1">VA Loan Advantage in This Environment</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                VA loan rates typically run below conventional rates because of the VA&apos;s guarantee.
                In a higher-rate environment, that spread matters more than ever. Buyers using VA
                financing have a genuine rate advantage over conventional buyers competing for the
                same homes — and $0 down means they&apos;re not tying up cash that could otherwise sit
                in a high-yield savings account.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              Neighborhoods: Which Areas Are Moving Fastest?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Beavercreek continues to be the most competitive submarket for WPAFB buyers. Entry-level
              homes in Beavercreek (roughly $280K–$350K) are still moving quickly, often above ask.
              The school district and proximity to the base justify the premium for families with kids.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fairborn is the value play — closer to base than Beavercreek, more affordable, and
              showing strong appreciation over the past three years. The inventory increase has been
              more pronounced here, giving buyers slightly more negotiating room on homes that have
              been on market for two weeks or more.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Centerville and Springboro appeal to buyers prioritizing schools and a suburban
              lifestyle over commute time. These markets have cooled slightly at the higher end, which
              creates opportunity for buyers in the $350K–$450K range who have flexibility on commute.
              Huber Heights and Riverside remain the most budget-friendly options with direct access
              to the base via I-675.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              What This Means for Out-of-State Buyers
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you&apos;re receiving PCS orders to WPAFB and you&apos;re shopping from a distance, the
              increased inventory is a genuine advantage. A year ago, buyers relocating from out of
              state often found that by the time they could arrange a trip to Dayton, their target
              homes were under contract. That window has widened slightly.
            </p>
            <p className="text-gray-700 leading-relaxed">
              That said, remote buying still requires a strong local agent who knows the neighborhoods
              and can do a video walkthrough and honest assessment on your behalf. Dayton is not a
              market where you can buy off Zillow photos alone — there is significant variation in
              condition and neighborhood character even within the same ZIP code.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-black text-charcoal mb-4 border-l-4 border-gold pl-4">
              The Bottom Line for Spring 2025
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Spring 2025 is a better window for buyers than the past two years. You have more homes
              to look at and, depending on the neighborhood and price point, more room to negotiate
              than you&apos;d have had in 2022–2023. But Dayton is not a market where you can wait for a
              major correction — prices here are supported by a stable employment base anchored to
              WPAFB, and demand from military buyers keeps the floor firm.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you&apos;re ready to buy, get pre-approved now so you can move quickly when the right
              home hits the market. If you&apos;re still six to twelve months out, start the VA eligibility
              confirmation and lender conversations now so you&apos;re not scrambling when your orders come
              through.
            </p>
          </section>

        </div>
      </div>

      {/* Tools CTA */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-1">Free Tools</p>
            <h2 className="text-xl font-black text-charcoal">Run the Numbers on Your Situation</h2>
            <p className="text-gray-600 text-sm mt-1">
              BAH calculator, mortgage calculator, and rent vs. buy comparison — all free.
            </p>
          </div>
          <Link href="/tools" className="btn-gold flex-shrink-0">Open the Tools →</Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-4xl mb-4">🏡</div>
          <h2 className="text-2xl font-black mb-3">Ready to Buy in Dayton?</h2>
          <p className="text-gray-300 mb-8">
            Chris works exclusively with buyers in the Dayton and WPAFB area. Reach out for a
            no-pressure conversation about what the market looks like for your specific situation.
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
