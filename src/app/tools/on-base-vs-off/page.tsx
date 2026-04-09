import Link from 'next/link';
import { Car, Building2, Check, X } from 'lucide-react';

export const metadata = {
  title: 'On-Base vs Off-Base Housing at WPAFB | Dayton Relo',
  description: 'Compare on-base and off-base housing options near Wright-Patterson Air Force Base. Explore neighborhoods, costs, schools, and make the right choice for your family.',
};

const ON_BASE_NEIGHBORHOODS = [
  {
    name: 'Kittyhawk',
    desc: 'Family-focused with a strong community feel. Mix of duplexes and single-family homes.',
    waitlist: '4–8 months',
    rent: 'BAH covers 100%',
    petFriendly: true,
  },
  {
    name: 'Phoenix',
    desc: 'Newer construction, close to the commissary and rec center. Popular for junior officers.',
    waitlist: '3–6 months',
    rent: 'BAH covers 100%',
    petFriendly: true,
  },
  {
    name: 'The Prairies',
    desc: 'Senior NCO/officer housing with larger homes. Quieter setting near golf course.',
    waitlist: '6–12 months',
    rent: 'BAH covers 100%',
    petFriendly: true,
  },
];

const OFF_BASE_NEIGHBORHOODS = [
  {
    name: 'Fairborn',
    drive: '3 min',
    schools: 'B-',
    medRent: '$1,300/mo',
    medPrice: '$180K',
    note: 'Most popular with E4–E6. Close to main gate, affordable, walkable to some amenities.',
    pros: ['Shortest commute', 'Budget-friendly', 'Large military community', 'Main gate access'],
    cons: ['Schools rated B-', 'Smaller homes average'],
  },
  {
    name: 'Riverside',
    drive: '5 min',
    schools: 'B',
    medRent: '$1,250/mo',
    medPrice: '$175K',
    note: 'Budget-friendly. Direct access to WPAFB South Gate.',
    pros: ['Most affordable option', 'Direct gate access', 'Quick commute', 'Good military population'],
    cons: ['Developing area', 'Limited amenities'],
  },
  {
    name: 'Beavercreek',
    drive: '10 min',
    schools: 'A',
    medRent: '$1,700/mo',
    medPrice: '$265K',
    note: 'Top-rated schools, upscale retail, newer construction. Popular with officers and families.',
    pros: ['Excellent schools', 'New construction', 'Great amenities', 'Family-friendly'],
    cons: ['Higher housing costs', 'Longer commute', 'Busier area'],
  },
  {
    name: 'Huber Heights',
    drive: '13 min',
    schools: 'B-',
    medRent: '$1,400/mo',
    medPrice: '$210K',
    note: 'Good value, solid schools, established neighborhoods.',
    pros: ['Good value', 'Military-heavy', 'Established neighborhoods', 'Moderate commute'],
    cons: ['Schools not top-rated', 'Older homes average'],
  },
  {
    name: 'Kettering',
    drive: '22 min',
    schools: 'A-',
    medRent: '$1,400/mo',
    medPrice: '$259K',
    note: 'Great schools, beautiful older homes. Worth the commute for families prioritizing education.',
    pros: ['Top-rated schools', 'Established charm', 'Great value', 'Family-focused'],
    cons: ['Longer commute', 'Older homes', 'Fewer new construction'],
  },
];

const ON_PROS = [
  'No rent/mortgage payment — covered by BAH',
  'Walk to base facilities (commissary, BX, gym, chapel)',
  'Military community — built-in support network',
  'Maintenance handled by housing office',
  'No utilities to manage in most cases',
  'Quick commute — minutes to duty station',
];

const ON_CONS = [
  'Waitlists of 3–12 months — can\'t always time it with PCS',
  'Less space than off-base equivalents',
  'Must follow base housing rules (pets, modifications, etc.)',
  'You never build home equity',
  'Less access to civilian community and amenities',
];

const OFF_PROS = [
  'Build equity if you buy — VA loan requires $0 down',
  'More space for the same or less than BAH',
  'More neighborhood variety and civilian amenities',
  'Freedom to modify, decorate, and make it yours',
  'Can rent it out after PCS — Dayton has a strong rental market',
  'Access to Dayton\'s excellent school districts',
];

const OFF_CONS = [
  'Responsible for utilities, maintenance, and repairs',
  'Commute adds 5–25 minutes depending on neighborhood',
  'Need to manage move-in, lease, or mortgage closing timing',
];

export default function OnBaseVsOffPage() {
  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-4">On-Base vs Off-Base Housing</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            One of the biggest decisions for a PCS move: live on base or off? Here's an honest breakdown for WPAFB to help you decide.
          </p>
        </div>

        {/* On-Base Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-charcoal mb-2">On-Base Housing at WPAFB</h2>
          <p className="text-gray-600 mb-8">All neighborhoods are managed by Hunt Military Communities.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {ON_BASE_NEIGHBORHOODS.map((neighborhood) => (
              <div key={neighborhood.name} className="card bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-gold" />
                  <h3 className="text-xl font-bold text-charcoal flex-1">{neighborhood.name}</h3>
                  {neighborhood.petFriendly && (
                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                      Pet Friendly
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-4 text-sm">{neighborhood.desc}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waitlist:</span>
                    <span className="font-semibold text-charcoal">{neighborhood.waitlist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-semibold text-charcoal">{neighborhood.rent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://www.wpafb.af.mil/Units/88th-Air-Base-Wing/Directorates/Housing/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gold text-charcoal font-semibold rounded-lg hover:bg-opacity-90 transition"
          >
            Check WPAFB Housing Office Waitlist
          </a>
        </section>

        {/* Pros/Cons Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-charcoal mb-8">Quick Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* On-Base Column */}
            <div className="card bg-white">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-blue-500">
                <div className="w-4 h-4 rounded-full bg-blue-600" />
                <h3 className="text-2xl font-bold text-charcoal">On-Base</h3>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-green-700 text-lg mb-3">Pros</h4>
                <ul className="space-y-2">
                  {ON_PROS.map((pro) => (
                    <li key={pro} className="text-green-700 text-sm flex gap-2">
                      <Check className="w-4 h-4 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-red-700 text-lg mb-3">Cons</h4>
                <ul className="space-y-2">
                  {ON_CONS.map((con) => (
                    <li key={con} className="text-red-700 text-sm flex gap-2">
                      <X className="w-4 h-4 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Off-Base Column */}
            <div className="card bg-white">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-gold">
                <div className="w-4 h-4 rounded-full bg-gold" />
                <h3 className="text-2xl font-bold text-charcoal">Off-Base</h3>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-green-700 text-lg mb-3">Pros</h4>
                <ul className="space-y-2">
                  {OFF_PROS.map((pro) => (
                    <li key={pro} className="text-green-700 text-sm flex gap-2">
                      <Check className="w-4 h-4 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-red-700 text-lg mb-3">Cons</h4>
                <ul className="space-y-2">
                  {OFF_CONS.map((con) => (
                    <li key={con} className="text-red-700 text-sm flex gap-2">
                      <X className="w-4 h-4 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Off-Base Neighborhoods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-charcoal mb-8">Top Off-Base Neighborhoods Near WPAFB</h2>
          <div className="space-y-6">
            {OFF_BASE_NEIGHBORHOODS.map((neighborhood) => (
              <div key={neighborhood.name} className="card bg-white hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal mb-2">{neighborhood.name}</h3>
                    <p className="text-gray-700 mb-4">{neighborhood.note}</p>
                  </div>
                  <div className="md:text-right">
                    <div className="space-y-1 text-sm font-semibold text-charcoal">
                      <p className="flex items-center gap-1"><Car className="w-4 h-4" /> {neighborhood.drive} commute</p>
                      <p className="flex items-center gap-1"><Building2 className="w-4 h-4" /> Schools: {neighborhood.schools}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Median Rent</p>
                    <p className="font-bold text-charcoal">{neighborhood.medRent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Median Price</p>
                    <p className="font-bold text-charcoal">{neighborhood.medPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Commute</p>
                    <p className="font-bold text-charcoal">{neighborhood.drive}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Schools</p>
                    <p className="font-bold text-charcoal">{neighborhood.schools}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-green-700 mb-2">Why Consider</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {neighborhood.pros.map((pro) => (
                        <li key={pro}>+ {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-700 mb-2">Considerations</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {neighborhood.cons.map((con) => (
                        <li key={con}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-charcoal mb-8">Feature Comparison Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden border border-gray-300">
              <thead className="bg-charcoal text-cream">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Feature</th>
                  <th className="px-6 py-4 text-left font-bold">On-Base</th>
                  <th className="px-6 py-4 text-left font-bold">Off-Base</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Cost', onBase: 'BAH covers 100%', offBase: 'BAH + out-of-pocket or mortgage' },
                  { feature: 'Commute', onBase: '2–10 min', offBase: '3–25 min' },
                  { feature: 'Schools', onBase: 'Base schools', offBase: 'Dayton excellent districts' },
                  { feature: 'Community', onBase: 'Military-focused', offBase: 'Civilian + military mix' },
                  { feature: 'Flexibility', onBase: 'Base policies', offBase: 'Your rules' },
                  { feature: 'Pet Policies', onBase: 'Strict restrictions', offBase: 'More flexible' },
                  { feature: 'Maintenance', onBase: 'Housing office handles', offBase: 'Your responsibility' },
                  { feature: 'BAH Impact', onBase: 'No equity built', offBase: 'Builds equity if you buy' },
                ].map((row) => (
                  <tr key={row.feature} className="border-t border-gray-300 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-charcoal">{row.feature}</td>
                    <td className="px-6 py-4 text-gray-700">{row.onBase}</td>
                    <td className="px-6 py-4 text-gray-700">{row.offBase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-charcoal text-cream rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gold mb-4">Not Sure Which is Right for You?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Chris has helped dozens of military families work through this exact decision. A quick call can save you months of stress and help you avoid costly mistakes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-gold inline-block"
            >
              Talk to Chris
            </Link>
            <Link
              href="/listings"
              className="btn-outline inline-block"
            >
              Browse Listings
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
