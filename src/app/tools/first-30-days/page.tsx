'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface ChecklistItem {
  id: string;
  text: string;
}

interface Category {
  title: string;
  items: ChecklistItem[];
}

interface Section {
  id: string;
  title: string;
  icon: string;
  color: string;
  categories: Category[];
}

const SECTIONS: Section[] = [
  {
    id: 'general',
    title: 'General Move-In',
    icon: '🏠',
    color: '#C9A84C',
    categories: [
      {
        title: 'Week 1 — Admin',
        items: [
          { id: 'g1', text: 'Forward mail from old address at USPS.com' },
          { id: 'g2', text: 'Update address with your bank' },
          { id: 'g3', text: 'Notify employer / HR of new address' },
          { id: 'g4', text: 'Update address on credit cards & subscriptions' },
          { id: 'g5', text: 'Update voter registration (Ohio)' },
        ],
      },
      {
        title: 'Week 1 — Utilities',
        items: [
          { id: 'g6', text: 'Set up electric (AES Ohio or DP&L)' },
          { id: 'g7', text: 'Set up gas (Vectren / CenterPoint Energy)' },
          { id: 'g8', text: 'Set up internet (Spectrum, AT&T, or WOW!)' },
          { id: 'g9', text: 'Set up renter\'s or homeowner\'s insurance' },
        ],
      },
      {
        title: 'Week 2 — Ohio DMV',
        items: [
          { id: 'g10', text: 'Get Ohio driver\'s license (required within 30 days)' },
          { id: 'g11', text: 'Register vehicle in Ohio (required within 30 days)' },
          { id: 'g12', text: 'Get Ohio auto insurance card' },
        ],
      },
      {
        title: 'Week 2 — Healthcare',
        items: [
          { id: 'g13', text: 'Find a primary care physician in Dayton' },
          { id: 'g14', text: 'Request medical records from prior provider' },
          { id: 'g15', text: 'Find a dentist' },
          { id: 'g16', text: 'Locate nearest urgent care & emergency room' },
          { id: 'g17', text: 'Transfer prescriptions to a local pharmacy' },
        ],
      },
      {
        title: 'Week 2–3 — Kids & Schools',
        items: [
          { id: 'g18', text: 'Enroll children in school district' },
          { id: 'g19', text: 'Request transfer of school records' },
          { id: 'g20', text: 'Research after-school programs & extracurriculars' },
        ],
      },
      {
        title: 'Week 3–4 — Community',
        items: [
          { id: 'g21', text: 'Find your nearest grocery store & pharmacy' },
          { id: 'g22', text: 'Explore your neighborhood — get the lay of the land' },
          { id: 'g23', text: 'Visit the National Air Force Museum (it\'s free!)' },
          { id: 'g24', text: 'Find a local gym, park, or trail near you' },
          { id: 'g25', text: 'Join a local Facebook group or Nextdoor' },
        ],
      },
    ],
  },
  {
    id: 'military',
    title: 'Military / WPAFB',
    icon: '🛡️',
    color: '#4A90D9',
    categories: [
      {
        title: 'In-Processing',
        items: [
          { id: 'm1', text: 'Report to gaining unit and begin in-processing' },
          { id: 'm2', text: 'Confirm PCS orders are finalized' },
          { id: 'm3', text: 'Connect with your unit sponsor' },
          { id: 'm4', text: 'Complete newcomer / OPSEC briefings' },
        ],
      },
      {
        title: 'Base Access',
        items: [
          { id: 'm5', text: 'Obtain WPAFB base pass and vehicle decal' },
          { id: 'm6', text: 'Register vehicle with base security' },
          { id: 'm7', text: 'Update military ID card if needed' },
        ],
      },
      {
        title: 'DEERS & Benefits',
        items: [
          { id: 'm8', text: 'Verify DEERS enrollment for you and family' },
          { id: 'm9', text: 'Enroll in TRICARE at new location' },
          { id: 'm10', text: 'Locate WPAFB Military Treatment Facility (MTF)' },
          { id: 'm11', text: 'Confirm BAH rate with Finance office' },
        ],
      },
      {
        title: 'Housing Allowance',
        items: [
          { id: 'm12', text: 'Submit signed lease or closing docs to Finance' },
          { id: 'm13', text: 'Confirm BAH payments are active in myPay' },
          { id: 'm14', text: 'Review any OHA / BAH differences with housing office' },
        ],
      },
      {
        title: 'Family Support',
        items: [
          { id: 'm15', text: 'Contact Airman & Family Readiness Center (A&FRC)' },
          { id: 'm16', text: 'Explore on-base childcare options (CDC)' },
          { id: 'm17', text: 'Connect with spouse employment support at A&FRC' },
          { id: 'm18', text: 'Join WPAFB spouse / community Facebook groups' },
        ],
      },
    ],
  },
];

const ALL_ITEMS = SECTIONS.flatMap((s) =>
  s.categories.flatMap((c) => c.items)
);

export default function First30DaysPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<string>('general');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('first-30-days-checked');
    const savedSection = localStorage.getItem('first-30-days-section');
    if (saved) {
      try {
        setChecked(new Set(JSON.parse(saved)));
      } catch {}
    }
    if (savedSection) setActiveSection(savedSection);
  }, []);

  // Save to localStorage when checked changes
  useEffect(() => {
    localStorage.setItem('first-30-days-checked', JSON.stringify([...checked]));
  }, [checked]);

  // Save active section
  useEffect(() => {
    localStorage.setItem('first-30-days-section', activeSection);
  }, [activeSection]);

  const toggleTask = (id: string) => {
    const newChecked = new Set(checked);
    newChecked.has(id) ? newChecked.delete(id) : newChecked.add(id);
    setChecked(newChecked);
  };

  const total = ALL_ITEMS.length;
  const done = checked.size;
  const pct = Math.round((done / total) * 100);

  const currentSection = SECTIONS.find((s) => s.id === activeSection)!;

  const sectionCounts = useMemo(() => {
    return Object.fromEntries(
      SECTIONS.map((s) => {
        const ids = s.categories.flatMap((c) => c.items.map((i) => i.id));
        const count = ids.filter((id) => checked.has(id)).length;
        return [s.id, count];
      })
    );
  }, [checked]);

  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Your First 30 Days in Dayton</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            A comprehensive checklist to help you settle in, get your essentials squared away, and start enjoying your new community.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg border border-gray-300 p-6 mb-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-charcoal">
              {done} of {total} tasks complete
            </span>
            <span className="text-lg font-bold text-gold">{pct}%</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          {pct === 100 && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-gold">🎉 You're all settled in — welcome to Dayton!</p>
            </div>
          )}
        </div>

        {/* Section Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          {SECTIONS.map((section) => {
            const secTotal = section.categories.flatMap((c) => c.items).length;
            const secDone = sectionCounts[section.id] ?? 0;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 px-6 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  isActive
                    ? `bg-white border-2`
                    : 'bg-white border border-gray-300 hover:border-gray-400'
                }`}
                style={isActive ? { borderColor: section.color } : {}}
              >
                <span className="text-2xl">{section.icon}</span>
                <div className="text-left">
                  <div className="text-charcoal">{section.title}</div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: section.color }}
                  >
                    {secDone}/{secTotal}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Checklist */}
        <div className="space-y-8">
          {currentSection.categories.map((category) => (
            <div key={category.title}>
              <h3 className="text-lg font-bold text-charcoal mb-4 uppercase tracking-wide">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.items.map((item) => {
                  const isChecked = checked.has(item.id);

                  return (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-300 cursor-pointer hover:border-gold transition"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTask(item.id)}
                        className="mt-1 w-5 h-5 accent-gold"
                      />
                      <span
                        className={`text-sm ${
                          isChecked
                            ? 'line-through text-gray-500'
                            : 'text-charcoal'
                        }`}
                      >
                        {item.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Helpful Tips */}
        <div className="mt-16 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Tips for Success</h3>
          <ul className="space-y-3 text-sm text-blue-900">
            <li className="flex gap-2">
              <span>•</span>
              <span><strong>Utilities first:</strong> Getting electric, gas, and internet set up is critical. Call providers as soon as you have a move-in date.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span><strong>Military deadlines:</strong> Your base ID and vehicle registration have legal deadlines. Don't delay on in-processing.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span><strong>Schools:</strong> If you have kids, contact the school district right away. Enrollment timelines vary by district.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span><strong>Healthcare:</strong> Finding a new primary care doctor and dentist takes time. Start early to avoid gaps in coverage.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span><strong>Community:</strong> Explore your neighborhood! Dayton is a friendly, welcoming city with great parks, museums, and local restaurants.</span>
            </li>
          </ul>
        </div>

        {/* Local Resources Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Dayton Resources & Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-white">
              <h3 className="text-lg font-bold text-charcoal mb-3">Utilities</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Electric:</strong> AES Ohio or DP&L</li>
                <li><strong>Gas:</strong> Vectren or CenterPoint Energy</li>
                <li><strong>Internet:</strong> Spectrum, AT&T, or WOW!</li>
              </ul>
            </div>

            <div className="card bg-white">
              <h3 className="text-lg font-bold text-charcoal mb-3">Banking</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Recommended:</strong> Wright-Patt Credit Union (military-friendly)</li>
                <li><strong>Also available:</strong> Fifth Third Bank, PNC</li>
              </ul>
            </div>

            <div className="card bg-white">
              <h3 className="text-lg font-bold text-charcoal mb-3">DMV & Vehicle</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Ohio BMV:</strong> Bring PCS orders and current license</li>
                <li><strong>Deadline:</strong> 30 days from arrival</li>
              </ul>
            </div>

            <div className="card bg-white">
              <h3 className="text-lg font-bold text-charcoal mb-3">Military Resources</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>A&FRC:</strong> Airman & Family Readiness Center</li>
                <li><strong>WPAFB CDC:</strong> On-base childcare</li>
              </ul>
            </div>

            <div className="card bg-white">
              <h3 className="text-lg font-bold text-charcoal mb-3">Fun Stuff</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>National Air Force Museum</strong> - Free!Dayton!</li>
                <li><strong>MetroParks:</strong> Great trails and parks</li>
                <li><strong>Community Facebook groups</strong> for neighborhoods</li>
              </ul>
            </div>

            <div className="card bg-white">
              <h3 className="text-lg font-bold text-charcoal mb-3">Questions?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Have specific questions about neighborhoods, schools, or the area? Chris is here to help.
              </p>
              <Link
                href="/contact"
                className="inline-block px-4 py-2 bg-gold text-charcoal font-semibold rounded hover:bg-opacity-90 transition"
              >
                Contact Chris
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="mt-16 bg-charcoal text-cream rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gold mb-4">Welcome to Dayton!</h2>
          <p className="text-lg mb-8">
            Settling into a new city is a big task, but you've got this. Use this checklist to stay organized, and don't hesitate to reach out if you have questions about the area or your move.
          </p>
          <Link
            href="/contact"
            className="btn-gold inline-block"
          >
            Get in Touch With Chris
          </Link>
        </div>
      </div>
    </main>
  );
}
