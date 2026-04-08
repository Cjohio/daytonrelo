export const metadata = {
  title: 'Preferred Lender | Dayton Relocation',
  description: 'Chris\'s preferred mortgage lender: VA loans, conventional, FHA, USDA, jumbo, and more.',
};

const LENDER = {
  name: '[LENDER NAME]',
  title: 'Mortgage Loan Officer',
  company: '[COMPANY NAME]',
  tagline: '[Your tagline here]',
  phone: '[PHONE NUMBER]',
  website: '[WEBSITE URL]',
  nmls: '[NMLS #]',
};

const WHY_ITEMS = [
  {
    icon: '🏠',
    title: 'Local Dayton Expert',
    body: 'Knows the Dayton market, understands local neighborhoods, and has relationships with real estate professionals across the area.',
  },
  {
    icon: '⚡',
    title: 'Fast Pre-Approvals',
    body: 'Quick turnaround on pre-approval letters — typically 24–48 hours. Gets you ready to make competitive offers.',
  },
  {
    icon: '🎖️',
    title: 'VA & Military Specialist',
    body: 'Extensive experience with VA loans, working with WPAFB service members and veterans. Understands military relocation needs.',
  },
  {
    icon: '🏆',
    title: 'Competitive Rates',
    body: 'Shop competitive rates and terms. Works to secure the best possible financing for Dayton-area buyers.',
  },
];

const LOAN_TYPES = [
  { label: 'VA Purchase Loan', note: '0% down, no PMI — for eligible veterans & active duty' },
  { label: 'Conventional Loan', note: '3–20% down, flexible terms, competitive rates' },
  { label: 'FHA Loan', note: 'Low down payment, flexible credit requirements' },
  { label: 'USDA Rural Development', note: '0% down for eligible rural/suburban Ohio properties' },
  { label: 'Jumbo Loan', note: 'For homes above conforming loan limits' },
  { label: 'VA IRRRL Refinance', note: 'Streamlined refi for existing VA loans' },
  { label: 'Cash-Out Refinance', note: 'Access your home\'s equity for improvements or debt' },
];

export default function LenderPage() {
  return (
    <main className="min-h-screen bg-charcoal text-white">
      {/* Hero Section */}
      <div className="border-b-4 border-gold py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-24 h-24 rounded-full bg-charcoal border-2 border-gold flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">👤</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">{LENDER.name}</h1>
          <p className="text-gray-300 mb-2">
            {LENDER.title} · {LENDER.company}
          </p>
          <p className="text-xs text-gray-500 mb-4">{LENDER.nmls}</p>
          <p className="text-gold italic text-lg mb-8">{LENDER.tagline}</p>

          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href={`tel:${LENDER.phone}`}
              className="btn-gold py-3 px-6 inline-flex items-center gap-2"
            >
              📞 Call
            </a>
            <a
              href={`sms:${LENDER.phone}`}
              className="btn-gold py-3 px-6 inline-flex items-center gap-2"
            >
              💬 Text
            </a>
            <a
              href={LENDER.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline py-3 px-6 inline-flex items-center gap-2"
            >
              🌐 Website
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white text-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          {/* Why Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-charcoal mb-8 border-l-4 border-gold pl-4">
              Why {LENDER.name}?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {WHY_ITEMS.map(({ icon, title, body }) => (
                <div key={title} className="bg-cream rounded-lg p-6 border border-gray-200">
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-bold text-charcoal mb-2">{title}</h3>
                  <p className="text-gray-700 text-sm">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Loan Products */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-charcoal mb-8 border-l-4 border-gold pl-4">
              Loan Products Offered
            </h2>
            <div className="space-y-4">
              {LOAN_TYPES.map(({ label, note }) => (
                <div key={label} className="flex gap-4 p-4 border-b border-gray-200 last:border-0">
                  <span className="text-gold text-xl flex-shrink-0">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-charcoal mb-1">{label}</h4>
                    <p className="text-gray-600 text-sm">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-charcoal text-white rounded-lg p-8 text-center border border-gold">
            <h2 className="text-2xl font-bold text-gold mb-3">Ready to Get Pre-Approved?</h2>
            <p className="text-gray-300 mb-6">
              Reach out to {LENDER.name} directly, or connect through Chris and we'll make the introduction.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href={`tel:${LENDER.phone}`}
                className="btn-gold py-3 px-6 inline-flex items-center gap-2"
              >
                📞 Call {LENDER.name}
              </a>
              <a
                href="/contact"
                className="btn-outline py-3 px-6 inline-block"
              >
                Connect Through Chris
              </a>
            </div>
          </section>

          {/* Disclosure */}
          <p className="text-gray-600 text-xs text-center mt-8 pt-8 border-t border-gray-200">
            You are always free to work with any lender of your choice. This is a referral only and Chris Jurgens does not receive any compensation for this referral. Loan products and terms subject to lender qualification and approval.
          </p>
        </div>
      </div>
    </main>
  );
}
