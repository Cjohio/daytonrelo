export const metadata = {
  title: 'Dayton Employer Directory | Dayton Relocation',
  description: 'Major employers in Dayton by industry with locations, contact info, and nearest neighborhoods.',
};

interface Employer {
  id: string;
  name: string;
  industry: string;
  employees: string;
  address: string;
  nearestNeighborhoods: string[];
  avgCommute: string;
  mapsUrl: string;
}

const EMPLOYERS: Employer[] = [
  {
    id: 'wpafb',
    name: 'Wright-Patterson Air Force Base',
    industry: 'Military / Government',
    employees: '27,000+',
    address: 'Fairborn, OH 45433',
    nearestNeighborhoods: ['Fairborn', 'Riverside', 'Beavercreek'],
    avgCommute: '10–15 min',
    mapsUrl: 'https://maps.google.com/?q=Wright+Patterson+AFB+Fairborn+OH',
  },
  {
    id: 'l3harris',
    name: 'L3Harris Technologies',
    industry: 'Defense / Aerospace',
    employees: '3,500+',
    address: 'Beavercreek, OH 45440',
    nearestNeighborhoods: ['Beavercreek', 'Kettering', 'Centerville'],
    avgCommute: '10–20 min',
    mapsUrl: 'https://maps.google.com/?q=L3Harris+Beavercreek+OH',
  },
  {
    id: 'kettering-health',
    name: 'Kettering Health',
    industry: 'Healthcare',
    employees: '8,000+',
    address: 'Kettering, OH 45429',
    nearestNeighborhoods: ['Kettering', 'Oakwood', 'Centerville'],
    avgCommute: '10–15 min',
    mapsUrl: 'https://maps.google.com/?q=Kettering+Health+Kettering+OH',
  },
  {
    id: 'premier',
    name: 'Premier Health',
    industry: 'Healthcare',
    employees: '10,000+',
    address: 'Dayton, OH 45408',
    nearestNeighborhoods: ['Oakwood', 'Kettering', 'Downtown'],
    avgCommute: '10–20 min',
    mapsUrl: 'https://maps.google.com/?q=Premier+Health+Dayton+OH',
  },
  {
    id: 'caresource',
    name: 'CareSource',
    industry: 'Insurance / IT',
    employees: '2,500+',
    address: 'Dayton, OH 45402',
    nearestNeighborhoods: ['Oakwood', 'Riverside', 'Downtown'],
    avgCommute: '10–20 min',
    mapsUrl: 'https://maps.google.com/?q=CareSource+Dayton+OH',
  },
  {
    id: 'ud',
    name: 'University of Dayton',
    industry: 'Education',
    employees: '3,000+',
    address: 'Dayton, OH 45469',
    nearestNeighborhoods: ['Kettering', 'Oakwood', 'Miamisburg'],
    avgCommute: '10–20 min',
    mapsUrl: 'https://maps.google.com/?q=University+of+Dayton+OH',
  },
  {
    id: 'wright-state',
    name: 'Wright State University',
    industry: 'Education',
    employees: '2,000+',
    address: 'Fairborn, OH 45324',
    nearestNeighborhoods: ['Fairborn', 'Beavercreek', 'Riverside'],
    avgCommute: '10–15 min',
    mapsUrl: 'https://maps.google.com/?q=Wright+State+University+Fairborn+OH',
  },
  {
    id: 'ncr',
    name: 'NCR Voyix',
    industry: 'Tech / Fintech',
    employees: '1,500+',
    address: 'Dayton, OH 45402',
    nearestNeighborhoods: ['Oakwood', 'Downtown', 'Kettering'],
    avgCommute: '10–15 min',
    mapsUrl: 'https://maps.google.com/?q=NCR+Dayton+OH',
  },
];

const INDUSTRIES = [
  'Military / Government',
  'Healthcare',
  'Defense / Aerospace',
  'Insurance / IT',
  'Education',
  'Tech / Fintech',
];

export default function EmployerMapPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-3">Dayton Employer Directory</h1>
          <p className="text-lg text-gray-600">
            Major employers across the Dayton metro area. Click on an employer to see nearby neighborhoods and average commute times.
          </p>
        </div>

        {/* Employers by Industry */}
        {INDUSTRIES.map((industry) => {
          const industryEmployers = EMPLOYERS.filter((e) => e.industry === industry);
          if (industryEmployers.length === 0) return null;

          return (
            <div key={industry} className="mb-16">
              <h2 className="section-label mb-8">{industry}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {industryEmployers.map((emp) => (
                  <div key={emp.id} className="card bg-white border border-gray-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-charcoal flex items-center justify-center flex-shrink-0">
                        <span className="text-gold text-xl">🏢</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-charcoal">{emp.name}</h3>
                        <p className="text-sm text-gray-600">{emp.employees} employees</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4 pb-4 border-t border-gray-200 pt-4">
                      <div className="flex items-start gap-3">
                        <span className="text-gold text-lg">📍</span>
                        <div>
                          <p className="text-sm font-semibold text-charcoal">{emp.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-gold text-lg">🚗</span>
                        <div>
                          <p className="text-sm font-semibold text-charcoal">Avg Commute: {emp.avgCommute}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-gold text-lg">🏘️</span>
                        <div>
                          <p className="text-sm font-semibold text-charcoal mb-1">Nearby: {emp.nearestNeighborhoods.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    <a
                      href={emp.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold w-full text-center text-sm py-2"
                    >
                      View on Google Maps
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <section className="bg-charcoal text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gold mb-3">Not seeing your employer?</h2>
          <p className="text-gray-300 mb-6">We cover all of the Dayton metro area and work with professionals across every industry.</p>
          <a href="/contact" className="btn-gold inline-block">
            Ask an Agent
          </a>
        </section>
      </div>
    </main>
  );
}
