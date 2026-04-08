export const metadata = {
  title: 'Local Services Directory | Dayton Relocation',
  description: 'Chris-curated local services for new Dayton residents: movers, plumbing, electrical, HVAC, and more.',
};

interface Service {
  id: string;
  name: string;
  category: string;
  phone: string;
  website: string;
  neighborhood: string;
  description: string;
  featured: boolean;
}

const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Two Men and a Truck – Dayton',
    category: 'Movers',
    phone: '(937) 291-7161',
    website: 'https://www.twomenandatruck.com',
    neighborhood: 'Citywide',
    description: "Full-service moving. Chris's go-to for PCS and corporate moves.",
    featured: true,
  },
  {
    id: '2',
    name: 'Dayton Moving & Storage',
    category: 'Movers',
    phone: '(937) 254-3636',
    website: 'https://daytonmoving.com',
    neighborhood: 'Citywide',
    description: 'Family-owned. Specializes in military and corporate relocations.',
    featured: true,
  },
  {
    id: '3',
    name: 'Roto-Rooter Dayton',
    category: 'Plumbing',
    phone: '(937) 222-3030',
    website: 'https://www.rotorooter.com',
    neighborhood: 'Citywide',
    description: '24/7 plumbing and drain service.',
    featured: false,
  },
  {
    id: '4',
    name: 'ARS / Rescue Rooter Dayton',
    category: 'HVAC',
    phone: '(937) 401-5050',
    website: 'https://www.ars.com',
    neighborhood: 'Citywide',
    description: 'Heating, cooling, and plumbing. Good for new homeowners.',
    featured: false,
  },
  {
    id: '5',
    name: 'Merry Maids Dayton',
    category: 'Cleaning',
    phone: '(937) 277-9993',
    website: 'https://www.merrymaids.com',
    neighborhood: 'Citywide',
    description: 'Move-in/move-out cleaning. Bonded and insured.',
    featured: false,
  },
  {
    id: '6',
    name: 'Mr. Electric of Dayton',
    category: 'Electrical',
    phone: '(937) 401-0037',
    website: 'https://www.mrelectric.com',
    neighborhood: 'Citywide',
    description: 'Licensed electricians for panel upgrades, outlets, and inspections.',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Movers', 'Plumbing', 'HVAC', 'Cleaning', 'Electrical'];

export default function LocalServicesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-3">Local Services Directory</h1>
          <p className="text-lg text-gray-600 mb-6">
            Chris-curated local services for new Dayton residents. These are providers he has personally worked with or received strong client feedback on.
          </p>

          <div className="bg-yellow-50 border-l-4 border-gold p-6 rounded-r-lg">
            <p className="text-charcoal">
              ⭐ <strong>Note from Chris:</strong> These are businesses I've personally vetted or received feedback from clients about. I don't receive referral fees — these recommendations are based on real experience.
            </p>
          </div>
        </div>

        {/* Featured Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-charcoal mb-8 border-l-4 border-gold pl-4">Chris-Recommended Movers</h2>
          <div className="space-y-6">
            {SERVICES.filter((s) => s.featured).map((service) => (
              <div key={service.id} className="card bg-white border-2 border-gold p-6">
                <p className="text-gold font-bold text-sm mb-2">⭐ Chris Recommends</p>
                <h3 className="text-xl font-bold text-charcoal mb-1">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <div className="flex gap-3">
                  <a
                    href={`tel:${service.phone.replace(/\D/g, '')}`}
                    className="btn-gold text-sm py-2 px-4 inline-flex items-center gap-2"
                  >
                    📞 {service.phone}
                  </a>
                  <a href={service.website} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm py-2 px-4 inline-block">
                    Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Services */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-charcoal mb-8">All Services</h2>

          {CATEGORIES.filter((c) => c !== 'All').map((category) => {
            const services = SERVICES.filter((s) => s.category === category);
            if (services.length === 0) return null;

            return (
              <div key={category} className="mb-10">
                <h3 className="text-lg font-bold text-charcoal mb-6 border-l-4 border-gold pl-4">{category}</h3>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="card bg-white border border-gray-200 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold text-charcoal">{service.name}</h4>
                        <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-1 rounded">
                          {service.neighborhood}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                      <div className="flex gap-2">
                        <a
                          href={`tel:${service.phone.replace(/\D/g, '')}`}
                          className="text-gold hover:text-gold/80 text-sm font-semibold"
                        >
                          {service.phone}
                        </a>
                        <span className="text-gray-300">·</span>
                        <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 text-sm font-semibold">
                          Website
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <section className="bg-charcoal text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gold mb-3">Know a Great Local Service?</h2>
          <p className="text-gray-300 mb-6">Contact Chris to recommend a business for this list.</p>
          <a href="/contact" className="btn-gold inline-block">
            Send a Recommendation
          </a>
        </section>
      </div>
    </main>
  );
}
