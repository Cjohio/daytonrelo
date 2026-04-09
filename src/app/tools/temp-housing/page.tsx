import { Lightbulb, Star } from 'lucide-react';

export const metadata = {
  title: 'Temporary Housing Guide | Dayton Relocation',
  description: 'Guide to temporary housing options in Dayton: extended stay hotels, furnished apartments, and corporate housing.',
};

const HOUSING_OPTIONS = [
  {
    id: '1',
    name: 'Homewood Suites Beavercreek',
    type: 'Extended Stay Hotel',
    address: '2750 Fairfield Commons Blvd, Beavercreek',
    rate: '$129–$179/night',
    amenities: ['WiFi', 'Full Kitchen', 'Parking', 'Pool', 'Breakfast'],
    description: 'Full kitchen suites. Weekly/monthly rates. 10 min from WPAFB.',
    url: 'https://www.hilton.com',
    featured: true,
  },
  {
    id: '2',
    name: 'Extended Stay America – Dayton',
    type: 'Extended Stay Hotel',
    address: '7571 Brandt Pike, Huber Heights',
    rate: '$79–$109/night',
    amenities: ['WiFi', 'Kitchenette', 'Parking', 'Pet Friendly'],
    description: 'Budget-friendly weekly rates. Great for 30–90 day stays.',
    url: 'https://www.extendedstayamerica.com',
    featured: true,
  },
  {
    id: '3',
    name: 'Residence Inn Beavercreek',
    type: 'Extended Stay Hotel',
    address: '2779 Fairfield Commons Blvd, Beavercreek',
    rate: '$149–$199/night',
    amenities: ['WiFi', 'Full Kitchen', 'Parking', 'Pool', 'Gym', 'Breakfast'],
    description: 'Marriott property. Full kitchens, 10 min from WPAFB and L3Harris.',
    url: 'https://www.marriott.com',
    featured: false,
  },
];

const HOUSING_TIPS = [
  {
    title: 'Ask for Weekly/Monthly Rates',
    description: 'Most extended-stay hotels offer significant discounts for stays longer than 7 days. Always negotiate.',
  },
  {
    title: 'Verify Parking & WiFi Included',
    description: 'These can add up fast. Most corporate housing includes both, but always confirm upfront.',
  },
  {
    title: 'Consider Furnished Apartments',
    description: 'For stays longer than 3 months, furnished short-term rentals often offer better value than hotels.',
  },
  {
    title: 'Ask Chris for Negotiated Rates',
    description: 'Chris has relationships with several properties and can sometimes secure corporate discounts for clients.',
  },
  {
    title: 'Budget 30–90 Days Transition',
    description: 'Most relocations use temporary housing for the home search and closing period.',
  },
];

export default function TempHousingPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-3">Temporary Housing Guide</h1>
          <p className="text-lg text-gray-600 mb-6">
            Bridge the gap between your old home and new one. Here are vetted options for corporate relocators and PCS families in the Dayton area.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-blue-900 flex items-start gap-2">
              <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
              <span><strong>Pro tip:</strong> Chris has preferred extended-stay contacts and can sometimes negotiate corporate rates for clients in transition.</span>
            </p>
          </div>
        </div>

        {/* Featured Options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-charcoal mb-8 border-l-4 border-gold pl-4">Recommended Extended Stay Hotels</h2>
          <div className="space-y-6">
            {HOUSING_OPTIONS.filter((h) => h.featured).map((housing) => (
              <div
                key={housing.id}
                className={`card border-2 p-6 ${housing.featured ? 'border-gold bg-yellow-50' : 'border-gray-200'}`}
              >
                {housing.featured && (
                  <p className="text-gold font-bold text-sm mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    Chris Recommends
                  </p>
                )}
                <h3 className="text-xl font-bold text-charcoal mb-1">{housing.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{housing.address}</p>
                <p className="text-gold font-bold mb-4">{housing.rate} (ask for weekly/monthly rates)</p>
                <p className="text-charcoal mb-4">{housing.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {housing.amenities.map((amenity) => (
                    <span key={amenity} className="bg-gray-200 text-charcoal text-xs font-semibold px-3 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
                <a href={housing.url} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm py-2 px-4 inline-block">
                  View / Book
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* All Options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-charcoal mb-8 border-l-4 border-gold pl-4">All Extended Stay Options</h2>
          <div className="space-y-4">
            {HOUSING_OPTIONS.map((housing) => (
              <div key={housing.id} className="card bg-white border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-charcoal">{housing.name}</h4>
                  <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded">{housing.type}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{housing.address}</p>
                <p className="text-gold font-bold text-sm">{housing.rate}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-charcoal mb-8">What to Look For</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {HOUSING_TIPS.map((tip, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-charcoal mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typical Costs */}
        <section className="mb-16 bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Typical Costs & Durations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h4 className="font-bold text-charcoal mb-2">Extended Stay Hotel</h4>
              <p className="text-gold font-bold mb-2">$79–$199/night</p>
              <p className="text-sm text-gray-600">Best for: 30–90 days, furnished suites with kitchen</p>
            </div>
            <div>
              <h4 className="font-bold text-charcoal mb-2">Furnished Apartment</h4>
              <p className="text-gold font-bold mb-2">$1,500–$2,500/month</p>
              <p className="text-sm text-gray-600">Best for: 3+ months, full home comfort</p>
            </div>
            <div>
              <h4 className="font-bold text-charcoal mb-2">Corporate Housing</h4>
              <p className="text-gold font-bold mb-2">$2,000–$4,000/month</p>
              <p className="text-sm text-gray-600">Best for: Premium furnished homes & executive placements</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gold mb-3">Need Help Finding Temp Housing?</h2>
          <p className="text-gray-300 mb-6">
            Chris can help you navigate temporary housing options and negotiate corporate rates with his preferred providers.
          </p>
          <a href="/contact" className="btn-gold inline-block">
            Contact Chris
          </a>
        </section>
      </div>
    </main>
  );
}
