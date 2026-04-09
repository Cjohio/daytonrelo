import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Military Home Buying Benefits | Dayton Relo",
  description: "Complete guide to military home buying benefits — VA loans, SCRA protections, adapted housing grants, BAH buying power, and Ohio-specific benefits including OHFA Heroes and property tax exemptions.",
  keywords: ["VA loan Dayton Ohio", "military home buying benefits", "OHFA Ohio Heroes", "SCRA mortgage", "BAH home buying", "disabled veteran property tax Ohio"],
};

const SECTIONS = [
  {
    title: "VA Loan Products",
    tag: "National",
    tagColor: "bg-gold/10 text-gold-dark",
    items: [
      { title: "$0 Down Payment", body: "VA-backed purchase loans require no down payment for eligible veterans, active-duty service members, and surviving spouses. No private mortgage insurance (PMI) required — saving hundreds per month vs. conventional loans." },
      { title: "Competitive Interest Rates", body: "VA loan rates are typically below conventional rates because the VA guarantees a portion of the loan. Shop multiple VA-approved lenders to find the best rate — even a 0.25% difference on a $250K loan saves over $13,000 over 30 years." },
      { title: "Reusable Benefit", body: "Your VA loan entitlement can be restored and used again after paying off a prior VA loan. You can even have multiple VA loans active at once under certain circumstances." },
      { title: "VA IRRRL — Streamline Refinance", body: "The Interest Rate Reduction Refinance Loan lets you lower your rate on an existing VA loan with minimal paperwork, often no appraisal, and no out-of-pocket costs." },
      { title: "VA Cash-Out Refinance", body: "Replace your current mortgage — VA or non-VA — with a new VA loan and access your home equity for home improvements, debt payoff, education, or emergency funds." },
      { title: "Native American Direct Loan (NADL)", body: "Eligible Native American veterans can use this program to purchase, build, or improve a home on federal trust land. The VA acts as the direct lender at below-market rates." },
    ],
  },
  {
    title: "Disability & Adapted Housing Grants",
    tag: "National",
    tagColor: "bg-gold/10 text-gold-dark",
    items: [
      { title: "VA Funding Fee Waiver", body: "Veterans with a service-connected disability rating of 10% or higher are exempt from the VA funding fee. The fee typically runs 1.25%–3.3% of the loan amount — on a $250K home that's $3,125–$8,250 back in your pocket at closing." },
      { title: "Specially Adapted Housing (SAH) Grant", body: "For veterans with certain severe service-connected disabilities, the SAH grant funds building, purchasing, or modifying a home to meet your needs. Grant amounts are set annually by Congress — verify the current maximum at va.gov." },
      { title: "Special Housing Adaptation (SHA) Grant", body: "A smaller grant for veterans with specific service-connected conditions covered by different criteria than SAH. Used to adapt an existing home to meet disability-related needs." },
      { title: "Temporary Residence Adaptation (TRA)", body: "If you are temporarily living in a family member's home while recovering, TRA grants help fund modifications to that residence so it's accessible for you." },
    ],
  },
  {
    title: "Legal & Financial Protections",
    tag: "National",
    tagColor: "bg-gold/10 text-gold-dark",
    items: [
      { title: "SCRA — 6% Interest Rate Cap", body: "The Servicemembers Civil Relief Act caps interest rates at 6% on debts incurred before active-duty service — including mortgages, credit cards, and auto loans. Contact your servicer with deployment orders to invoke this protection." },
      { title: "SCRA — Foreclosure Protection", body: "Lenders cannot foreclose on an active-duty service member's property without a court order. This protection extends 9–12 months after returning from active duty depending on your loan type." },
      { title: "Homeowners Assistance Program (HAP)", body: "If you suffer a financial loss selling your home due to a PCS move, BRAC closure, or base realignment, HAP may cover the difference between what you paid and what you sold for. Administered by the Department of Defense." },
      { title: "VA Foreclosure Avoidance", body: "If you fall behind on your VA loan, VA-assigned loan technicians work directly with your lender on your behalf. The VA has a financial interest in keeping veterans in their homes." },
    ],
  },
  {
    title: "BAH & Housing Allowances",
    tag: "National",
    tagColor: "bg-gold/10 text-gold-dark",
    items: [
      { title: "Basic Allowance for Housing (BAH)", body: "BAH is a monthly, tax-free housing stipend based on pay grade, dependency status, and duty station ZIP code. For WPAFB, BAH rates are designed to cover median rental costs — many service members apply their full BAH toward a mortgage payment." },
      { title: "BAH Rate Protection", body: "Once you establish a BAH rate, it is protected from decreases as long as your dependency status and duty station don't change. If rates increase, your BAH goes up." },
      { title: "BAH as Buying Power", body: "Lenders can count BAH as qualifying income for mortgage eligibility. Combined with a $0-down VA loan, your BAH can cover your full monthly payment in many Dayton-area neighborhoods." },
    ],
  },
  {
    title: "Ohio State Benefits",
    tag: "Ohio",
    tagColor: "bg-blue-50 text-blue-700",
    items: [
      { title: "OHFA Ohio Heroes Program", body: "The Ohio Housing Finance Agency's Ohio Heroes program offers qualifying veterans a discounted mortgage interest rate on purchases and refinances. Must meet OHFA income and purchase price limits. Visit ohiohome.org for current rates — they update regularly." },
      { title: "OHFA Down Payment Assistance", body: "OHFA partners with Ohio Heroes to offer down payment and closing cost assistance grants to qualifying buyers. Can be combined with a VA loan in some cases to further reduce upfront costs." },
      { title: "100% Disabled Veteran Property Tax Exemption", body: "Ohio veterans with a 100% service-connected disability rating are exempt from property taxes on their primary residence. This can save thousands per year. Apply through your County Auditor (Montgomery County for most WPAFB-area homes)." },
      { title: "Ohio Homestead Exemption (Enhanced for Veterans)", body: "Disabled veterans who don't qualify for full exemption may qualify for the Enhanced Homestead Exemption, which reduces the taxable value of their primary residence. Income limits apply — verify thresholds at tax.ohio.gov." },
      { title: "Ohio Veterans Service Commissions", body: "Every Ohio county has a Veterans Service Commission. Montgomery County and Greene County VSCs offer emergency financial assistance, benefits navigation, and claims help — all free. They can fast-track benefits you may not know you qualify for." },
      { title: "Ohio Department of Veterans Services (ODVS)", body: "ODVS manages all Ohio veteran benefits including the Ohio Veterans Bonus program, state veterans homes, and connects veterans to housing and financial resources. Visit dvs.ohio.gov or call 1-877-OHIO-VET." },
    ],
  },
];

const RESOURCES = [
  { label: "VA Housing Assistance",                  url: "https://www.va.gov/housing-assistance/home-loans/" },
  { label: "Apply for VA Certificate of Eligibility", url: "https://www.va.gov/housing-assistance/home-loans/apply-for-coe-form-26-1880/" },
  { label: "OHFA Ohio Heroes Program",               url: "https://www.ohiohome.org/homebuyer/ohioheroes.aspx" },
  { label: "Ohio Dept. of Veterans Services",        url: "https://dvs.ohio.gov" },
  { label: "SCRA Info — servicemembers.gov",         url: "https://www.servicemembers.gov" },
  { label: "Homeowners Assistance Program (HAP)",    url: "https://www.acq.osd.mil/housing/hap.html" },
  { label: "Ohio Property Tax Exemption",            url: "https://tax.ohio.gov/individual/resources/homestead-exemption" },
  { label: "Montgomery County Veterans Services",    url: "https://www.mcohio.org/government/elected_officials/veterans_service_commission/index.php" },
  { label: "Military OneSource",                     url: "https://www.militaryonesource.mil" },
  { label: "DFAS BAH Calculator",                    url: "https://www.defensetravel.dod.mil/site/bahCalc.cfm" },
];

export default function MilitaryBenefitsPage() {
  const totalBenefits = SECTIONS.reduce((n, s) => n + s.items.length, 0);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal text-white py-20 border-b-4 border-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Military Home Buying</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Know Every Benefit<br />
              <span className="text-gold">Before You Buy</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              A complete guide to the national and Ohio state benefits available to veterans
              and active-duty service members — from VA loans and SCRA protections to
              OHFA Heroes and property tax exemptions.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="bg-white/10 rounded-xl px-6 py-4 text-center">
                <p className="text-gold text-2xl font-black">{totalBenefits}</p>
                <p className="text-gray-400 text-xs mt-1">Benefits Covered</p>
              </div>
              <div className="bg-white/10 rounded-xl px-6 py-4 text-center">
                <p className="text-gold text-2xl font-black">{SECTIONS.length}</p>
                <p className="text-gray-400 text-xs mt-1">Categories</p>
              </div>
              <div className="bg-white/10 rounded-xl px-6 py-4 text-center">
                <p className="text-gold text-2xl font-black">OH + US</p>
                <p className="text-gray-400 text-xs mt-1">Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legend + disclaimer */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gold inline-block" />
              <span className="text-sm text-gray-600 font-medium">National benefit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" />
              <span className="text-sm text-gray-600 font-medium">Ohio-specific</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic">
            Verify eligibility and current terms with official sources before acting.
          </p>
        </div>
      </div>

      {/* Benefit sections */}
      <div className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          {SECTIONS.map(({ title, tag, tagColor, items }) => (
            <section key={title}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-black text-charcoal border-l-4 border-gold pl-4">{title}</h2>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${tagColor}`}>{tag}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map(({ title: t, body }) => (
                  <div key={t} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-charcoal mb-2">{t}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Preferred Lenders CTA */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-1">Preferred Lenders</p>
            <h2 className="text-xl font-black text-charcoal">Ready to Use Your VA Benefit?</h2>
            <p className="text-gray-600 text-sm mt-1">Meet Chris&apos;s vetted VA specialists — all experienced with Dayton-area military buyers.</p>
          </div>
          <Link href="/lender" className="btn-gold flex-shrink-0">Meet Our Lenders →</Link>
        </div>
      </section>

      {/* Official Resources */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-charcoal mb-8 border-l-4 border-gold pl-4">Official Resources</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {RESOURCES.map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-gold transition-colors group"
              >
                <span className="text-gold text-lg">🔗</span>
                <span className="text-sm font-medium text-charcoal group-hover:text-gold transition-colors flex-1">{label}</span>
                <span className="text-gray-400 text-xs">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-4xl mb-4">🎖️</div>
          <h2 className="text-2xl font-black mb-3">Questions About Your Benefits?</h2>
          <p className="text-gray-300 mb-8">
            Chris is a U.S. Army Iraq War veteran and licensed Ohio Realtor. He can walk you through
            VA eligibility, connect you with a VA-approved lender, and help you use every benefit available.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+19372413484" className="btn-gold">Call Chris Now</a>
            <Link href="/contact" className="btn-outline">Send a Message</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
