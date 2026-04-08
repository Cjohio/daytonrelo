export const metadata = {
  title: 'Relocation Package Negotiation Guide | Dayton Relocation',
  description: 'Comprehensive guide to negotiating corporate relocation packages, from moving costs to housing assistance.',
};

const CATEGORIES = [
  {
    id: 'moving',
    icon: '📦',
    title: 'Moving Expenses',
    items: [
      { text: 'Full pack-and-move service (door to door)', value: '$3,000–$12,000', priority: 'high' },
      { text: 'Temporary storage (up to 90 days)', value: '$150–$400/mo', priority: 'high' },
      { text: 'Vehicle shipping (if driving isn\'t practical)', value: '$800–$1,500', priority: 'medium' },
      { text: 'Travel reimbursement (mileage, hotel, meals)', value: '$500–$2,000', priority: 'medium' },
      { text: 'Professional cleaning of prior residence', value: '$200–$500', priority: 'low' },
    ],
  },
  {
    id: 'housing',
    icon: '🏠',
    title: 'Housing Assistance',
    items: [
      { text: 'Temporary housing stipend (30–90 days)', value: '$2,000–$8,000', priority: 'high' },
      { text: 'Closing cost reimbursement on home purchase', value: '$3,000–$10,000', priority: 'high' },
      { text: 'Lease-break fee coverage at prior home', value: '$500–$3,000', priority: 'high' },
      { text: 'Home-finding trip (flights, hotel, meals)', value: '$500–$2,000', priority: 'medium' },
      { text: 'Loss-on-sale protection if market is down', value: 'Varies', priority: 'medium' },
      { text: 'Mortgage rate buy-down assistance', value: '$1,000–$5,000', priority: 'low' },
    ],
  },
  {
    id: 'lifestyle',
    icon: '👨‍👩‍👧‍👦',
    title: 'Family & Lifestyle',
    items: [
      { text: 'Spouse career transition support or job placement', value: 'Service', priority: 'high' },
      { text: 'School enrollment support and records transfer', value: 'Service', priority: 'medium' },
      { text: 'Child/dependent care stipend during transition', value: '$500–$2,000', priority: 'medium' },
      { text: 'Cultural / community integration support', value: 'Service', priority: 'low' },
    ],
  },
  {
    id: 'financial',
    icon: '💰',
    title: 'Financial & Tax',
    items: [
      { text: 'Lump-sum relocation allowance (instead of managed move)', value: '$5,000–$25,000', priority: 'high' },
      { text: 'Tax gross-up on relocation reimbursements', value: '30–40% of benefits', priority: 'high' },
      { text: 'Duplicate housing allowance (paying two rents/mortgages)', value: 'Varies', priority: 'medium' },
      { text: 'CPA / tax preparation for relocation year', value: '$300–$800', priority: 'medium' },
    ],
  },
];

const TIPS = [
  'Get everything in writing before you accept the offer. Verbal promises disappear.',
  'Ask for a lump-sum option — it gives you more flexibility than a managed move.',
  'Always request the tax gross-up. Relocation benefits are taxable income; your employer can cover the extra tax.',
  'Negotiate the home-finding trip as a separate line item — most HR teams will approve it.',
  'If your employer uses a third-party relo firm, ask Chris to work directly with them — he has experience with relocation transactions.',
  'Closing costs are 2–5% of purchase price. On a $265K Dayton home that\'s $5,300–$13,250 — worth asking for.',
];

function PriorityBadge({ priority }: { priority: 'high' | 'medium' | 'low' }) {
  const colors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-gray-100 text-gray-700',
  };
  const labels = {
    high: 'Must Ask',
    medium: 'Good Ask',
    low: 'Nice to Have',
  };
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded ${colors[priority]}`}>
      {labels[priority]}
    </span>
  );
}

export default function ReloPackagePage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-3">Relocation Package Guide</h1>
          <p className="text-lg text-gray-600 mb-6">
            Know what to negotiate before you sign. Most companies offer more than they initially present.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-blue-900">
              💡 <strong>Pro tip:</strong> Most companies offer more than they initially present. This checklist shows everything you can reasonably negotiate — know your number before you sign.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6 mb-16">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-6 flex items-center gap-4 border-b border-gray-200">
                <span className="text-3xl">{cat.icon}</span>
                <h2 className="text-xl font-bold text-charcoal">{cat.title}</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {cat.items.map((item, i) => (
                  <div key={i} className="p-6 flex gap-4">
                    <div className="min-w-fit">
                      <PriorityBadge priority={item.priority as 'high' | 'medium' | 'low'} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-charcoal mb-1">{item.text}</p>
                      <p className="text-gold font-bold text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-charcoal mb-8">Negotiation Tips from Chris</h2>
          <div className="space-y-4">
            {TIPS.map((tip, i) => (
              <div key={i} className="flex gap-4">
                <div className="min-w-fit w-8 h-8 rounded-full bg-gold text-charcoal font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-charcoal leading-relaxed pt-1">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gold mb-3">Ready to house-hunt in Dayton?</h2>
          <p className="text-gray-300 mb-6">
            Chris works with corporate relocation packages regularly and can coordinate directly with your employer's relo firm.
          </p>
          <a href="/contact" className="btn-gold inline-block">
            Contact Chris
          </a>
        </section>
      </div>
    </main>
  );
}
