'use client';

import { useState } from 'react';
import { Phone, Globe, Star } from 'lucide-react';

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
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredServices = activeCategory === 'All' ? SERVICES : SERVICES.filter(s => s.category === activeCategory);

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
              <Star className="w-4 h-4 inline mr-2" />
              <strong>Note from Chris:</strong> These are businesses I've personally vetted or received feedback from clients about. I don't receive referral fees — these recommendations are based on real experience.
            </p>
          </div>
        </div>

        {/* Featured Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-charcoal mb-8 border-l-4 border-gold pl-4">Chris Recommends</h2>
          <div className="space-y-6">
            {SERVICES.filter(s => s.featured).map(service => (
              <div key={service.id} className="bg-white border-2 border-gold rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-charcoal">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.neighborhood}</p>
                  </div>
                  <Star className="w-5 h-5 text-gold flex-shrink-0" />
                </div>
                <p className="text-charcoal mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-4">
                  <a href={`tel:${service.phone}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Phone className="w-4 h-4" />
                    {service.phone}
                  </a>
                  <a href={service.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Globe className="w-4 h-4" />
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Services */}
        <section>
          <h2 className="text-2xl font-bold text-charcoal mb-6">All Services</h2>
          
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full transition ${
                  activeCategory === cat
                    ? 'bg-gold text-charcoal font-semibold'
                    : 'bg-white border border-gray-300 text-charcoal hover:border-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="space-y-4">
            {filteredServices.map(service => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-charcoal">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.neighborhood}</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">{service.category}</span>
                </div>
                <p className="text-charcoal text-sm mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href={`tel:${service.phone}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Phone className="w-3 h-3" />
                    {service.phone}
                  </a>
                  <a href={service.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Globe className="w-3 h-3" />
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
