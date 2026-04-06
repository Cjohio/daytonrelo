import { useState } from 'react';

export const metadata = {
  title: 'School Guide | Dayton Relocation',
  description: 'Comprehensive guide to Dayton-area schools: public districts, private schools, Catholic, Montessori, and more.',
};

interface PublicDistrict {
  id: string;
  name: string;
  city: string;
  grades: string;
  rating: string;
  stars: number;
  note: string;
  url: string;
}

interface PrivateSchool {
  id: string;
  name: string;
  city: string;
  grades: string;
  type: 'Catholic' | 'Christian' | 'Montessori' | 'Independent' | 'Jewish';
  note: string;
  url: string;
}

const PUBLIC: PublicDistrict[] = [
  {
    id: 'oakwood',
    name: 'Oakwood City Schools',
    city: 'Oakwood',
    grades: 'PreK–12',
    rating: 'A+',
    stars: 5,
    note: 'Ranked top 10 in Ohio. Nationally recognized. Most prestigious suburban district.',
    url: 'https://www.oakwoodschools.org',
  },
  {
    id: 'centerville',
    name: 'Centerville City Schools',
    city: 'Centerville',
    grades: 'PreK–12',
    rating: 'A+',
    stars: 5,
    note: '5-star Ohio report card rating. Consistently one of the top districts in the state.',
    url: 'https://www.centerville.k12.oh.us',
  },
  {
    id: 'springboro',
    name: 'Springboro Community City Schools',
    city: 'Springboro',
    grades: 'PreK–12',
    rating: 'A',
    stars: 5,
    note: 'High-performing district, top-rated high school, strong community involvement.',
    url: 'https://www.springboro.org',
  },
  {
    id: 'beavercreek',
    name: 'Beavercreek City Schools',
    city: 'Beavercreek',
    grades: 'PreK–12',
    rating: 'A',
    stars: 4,
    note: 'Most popular choice for WPAFB officers. Strong academics and athletics.',
    url: 'https://www.beavercreekschools.org',
  },
  {
    id: 'tipp-city',
    name: 'Tipp City Exempted Village Schools',
    city: 'Tipp City',
    grades: 'PreK–12',
    rating: 'A-',
    stars: 4,
    note: 'Small-town feel with excellent academics. Growing community north of Dayton.',
    url: 'https://www.tippschools.com',
  },
  {
    id: 'kettering',
    name: 'Kettering City Schools',
    city: 'Kettering',
    grades: 'PreK–12',
    rating: 'A-',
    stars: 4,
    note: '4.5-star Ohio rating. Strong STEM programs and close-knit community.',
    url: 'https://www.ketteringschools.org',
  },
];

const PRIVATE: PrivateSchool[] = [
  {
    id: 'cj',
    name: 'Chaminade Julienne Catholic High School',
    city: 'Dayton',
    grades: '9–12',
    type: 'Catholic',
    note: 'Ohio\'s 2025 CAPE Blue Ribbon School. Top-ranked private school in the region. 21 sports, AP courses.',
    url: 'https://www.cjeagles.org',
  },
  {
    id: 'alter',
    name: 'Archbishop Alter High School',
    city: 'Kettering',
    grades: '9–12',
    type: 'Catholic',
    note: 'Top-ranked Catholic high school. Strong academics, competitive athletics, and a storied history.',
    url: 'https://www.alterhs.org',
  },
  {
    id: 'montessori-dayton',
    name: 'Montessori School of Dayton',
    city: 'Dayton',
    grades: 'PreK–8',
    type: 'Montessori',
    note: 'Largest private Montessori school in the Dayton area. Founded 1964. Authentic AMI-aligned program.',
    url: 'https://www.montessoridayton.org',
  },
  {
    id: 'dominion',
    name: 'Dominion Academy of Dayton',
    city: 'Dayton',
    grades: 'K–12',
    type: 'Christian',
    note: 'Classical Christian education from K through 12. Founded 1998. Rigorous academics grounded in faith.',
    url: 'https://www.dominionacademy.org',
  },
  {
    id: 'dayton-christian',
    name: 'Dayton Christian Schools',
    city: 'Miamisburg',
    grades: 'PreK–12',
    type: 'Christian',
    note: 'One of the largest Christian schools in Ohio. PreK through 12 on a beautiful campus.',
    url: 'https://www.daytonchristian.com',
  },
  {
    id: 'hillel',
    name: 'Hillel Academy of Dayton',
    city: 'Oakwood',
    grades: 'K–6',
    type: 'Jewish',
    note: 'Located in Oakwood. K-6 school emphasizing Jewish values, ethics, and strong academics.',
    url: 'https://www.hilleldayton.org',
  },
];

const RATING_COLORS: Record<string, string> = {
  'A+': 'bg-green-700',
  A: 'bg-green-600',
  'A-': 'bg-green-500',
  'B+': 'bg-amber-600',
  B: 'bg-amber-500',
  'B-': 'bg-amber-400',
  C: 'bg-orange-600',
};

const TYPE_COLORS: Record<string, string> = {
  Catholic: 'text-blue-700 bg-blue-50 border-blue-200',
  Christian: 'text-green-700 bg-green-50 border-green-200',
  Montessori: 'text-amber-700 bg-amber-50 border-amber-200',
  Jewish: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  Independent: 'text-gray-700 bg-gray-50 border-gray-200',
};

export default function SchoolsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-3">Dayton Schools</h1>
          <p className="text-lg text-gray-600">
            Public districts, private schools, Catholic, Montessori, and independent options across the metro area.
          </p>
        </div>

        {/* Public Schools Section */}
        <section className="mb-16">
          <h2 className="section-label mb-8">Public School Districts</h2>
          <p className="text-gray-600 mb-8 bg-white border border-gray-200 p-4 rounded-lg">
            Ratings based on Ohio State Report Cards. Listed highest to lowest.
          </p>
          <div className="grid gap-6">
            {PUBLIC.map((d) => (
              <div key={d.id} className="card bg-white border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal mb-2">{d.name}</h3>
                    <p className="text-sm text-gray-600">
                      {d.city} · Grades {d.grades}
                    </p>
                  </div>
                  <span className={`${RATING_COLORS[d.rating]} text-white font-bold px-3 py-1 rounded text-sm`}>
                    {d.rating}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{d.note}</p>
                <div className="flex gap-3">
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-sm py-2 px-4 inline-block"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Private Schools Section */}
        <section className="mb-16">
          <h2 className="section-label mb-8">Private Schools</h2>
          <p className="text-gray-600 mb-8 bg-white border border-gray-200 p-4 rounded-lg">
            Catholic, Montessori, Christian, and independent options across the metro.
          </p>

          {['Catholic', 'Montessori', 'Christian', 'Jewish'].map((type) => {
            const schools = PRIVATE.filter((s) => s.type === type);
            if (schools.length === 0) return null;

            return (
              <div key={type} className="mb-10">
                <h3 className="text-lg font-bold text-charcoal mb-6 border-l-4 border-gold pl-4">
                  {type} Schools
                </h3>
                <div className="grid gap-4">
                  {schools.map((p) => (
                    <div key={p.id} className="card bg-white border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-charcoal">{p.name}</h4>
                          <p className="text-sm text-gray-600">
                            {p.city} · Grades {p.grades}
                          </p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded border ${TYPE_COLORS[p.type]}`}>
                          {p.type}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-4">{p.note}</p>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold text-sm py-2 px-4 inline-block"
                      >
                        Visit Website
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <section className="bg-charcoal text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gold mb-3">Finding the Right School Match?</h2>
          <p className="text-gray-300 mb-6">
            Use our neighborhood comparison tool to find areas with top-rated schools in your price range.
          </p>
          <a href="/tools/neighborhood-compare" className="btn-gold inline-block">
            Compare Neighborhoods
          </a>
        </section>
      </div>
    </main>
  );
}
