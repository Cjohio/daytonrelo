'use client';

import { useState } from 'react';

type AccessType = 'public' | 'municipal' | 'semi_private' | 'private';
type Feature =
  | 'driving_range'
  | 'restaurant'
  | 'simulator'
  | 'lessons'
  | 'championship'
  | 'walking'
  | 'donald_ross'
  | 'nicklaus'
  | 'top_rated'
  | 'beginner_friendly'
  | 'banquets';

interface Course {
  name: string;
  city: string;
  address: string;
  access: AccessType;
  holes: number;
  par?: number;
  yards?: number;
  designer?: string;
  description: string;
  features: Feature[];
  website: string;
  tip?: string;
}

const ACCESS_CONFIG: Record<AccessType, { label: string; color: string }> = {
  public: { label: 'Public', color: '#10B981' },
  municipal: { label: 'Municipal', color: '#0EA5E9' },
  semi_private: { label: 'Semi-Private', color: '#F97316' },
  private: { label: 'Private', color: '#6B6B6B' },
};

const FEATURE_CONFIG: Record<
  Feature,
  { label: string; emoji: string; color: string }
> = {
  driving_range: {
    label: 'Driving Range',
    emoji: '🎯',
    color: '#84CC16',
  },
  restaurant: { label: 'Restaurant', emoji: '🍽️', color: '#F59E0B' },
  simulator: { label: 'Indoor Simulator', emoji: '📺', color: '#6366F1' },
  lessons: { label: 'Lessons', emoji: '🎓', color: '#0EA5E9' },
  championship: { label: 'Championship', emoji: '🏆', color: '#C9A84C' },
  walking: { label: 'Walkable', emoji: '🚶', color: '#84CC16' },
  donald_ross: { label: 'Donald Ross Design', emoji: '👑', color: '#92400E' },
  nicklaus: { label: 'Nicklaus Design', emoji: '⭐', color: '#C9A84C' },
  top_rated: { label: 'Top Rated', emoji: '⭐', color: '#F59E0B' },
  beginner_friendly: {
    label: 'Beginner Friendly',
    emoji: '😊',
    color: '#10B981',
  },
  banquets: { label: 'Banquets/Events', emoji: '🎉', color: '#A78BFA' },
};

const COURSES: Course[] = [
  {
    name: 'Yankee Trace Golf Club',
    city: 'Centerville',
    address: '10000 Grouse Dr, Centerville',
    access: 'municipal',
    holes: 27,
    par: 72,
    yards: 7100,
    designer: 'Gene Bates & Matt Swanson',
    description:
      'Voted Best Golf Course in Dayton for 20+ consecutive years and ranked Top 50 municipal course in the U.S. Three 9-hole courses create multiple championship combinations from 7,100 yards.',
    features: [
      'driving_range',
      'restaurant',
      'lessons',
      'championship',
      'top_rated',
      'banquets',
    ],
    website: 'https://yankeetrace.org',
    tip: 'The Heritage/Legend combo is the premier layout. Book tee times online — weekends fill fast.',
  },
  {
    name: 'Community Golf Club',
    city: 'Dayton',
    address: '3435 Otterbein Ave, Dayton',
    access: 'municipal',
    holes: 36,
    par: 71,
    yards: 6304,
    designer: 'Alex Campbell (1919)',
    description:
      "Dayton's historic 36-hole municipal facility on land donated in 1918. The Hills course hosted the U.S. Amateur Public Links in 1924. Rolling terrain, elevated tees, and great value.",
    features: ['driving_range', 'lessons', 'walking', 'beginner_friendly'],
    website: 'https://golf-dayton.com',
    tip: 'Best value in Dayton. Two full 18-hole courses — great for beginners and regulars alike.',
  },
  {
    name: 'Pipestone Golf Club',
    city: 'Miamisburg',
    address: '1234 Pipestone Dr, Miamisburg',
    access: 'public',
    holes: 18,
    par: 72,
    yards: 6939,
    designer: 'Arthur Hills (1992)',
    description:
      'Known for the best greens in the Miami Valley. Rolling fairways with 100+ feet of elevation change, undulating bentgrass greens, and a 4-star Golf Digest rating. One of the top daily-fee courses in Ohio.',
    features: [
      'driving_range',
      'restaurant',
      'simulator',
      'lessons',
      'championship',
      'top_rated',
      'banquets',
    ],
    website: 'https://pipestonegolf.com',
    tip: 'The 1818 Grill is excellent for post-round dining. Indoor simulators available in winter.',
  },
  {
    name: 'Mound Golf Course',
    city: 'Miamisburg',
    address: 'Mound Ave, Miamisburg',
    access: 'municipal',
    holes: 9,
    par: 36,
    yards: 2789,
    designer: 'Alex Campbell (1938)',
    description:
      'Charming 9-hole course situated atop a bluff overlooking Miamisburg and the Miami Valley, adjacent to the historic Indian Mound State Park. Lush fairways and a quaint clubhouse with outdoor patio.',
    features: ['walking', 'beginner_friendly'],
    website: 'https://cityofmiamisburg.com',
    tip: 'Perfect for a quick round or beginners. The views from the bluff are some of the best in the area.',
  },
  {
    name: 'Cassel Hills Golf Course',
    city: 'Vandalia',
    address: '2501 S Dixie Dr, Vandalia',
    access: 'municipal',
    holes: 18,
    par: 71,
    yards: 6655,
    designer: 'Scruggs & Hammonds / Craig Schreiner (1974)',
    description:
      '4-star Golf Digest rated municipal course with massive 6,000 sq ft average greens and links-style front nine. Solid challenge for all skill levels with certified instructors on staff.',
    features: ['driving_range', 'lessons', 'championship', 'top_rated', 'banquets'],
    website: 'https://casselhills.com',
    tip: "Those enormous greens can be deceptive — three-putts are common for first-timers.",
  },
  {
    name: 'Jamaica Run Golf Course',
    city: 'Germantown',
    address: '6200 Jamaica Rd, Germantown',
    access: 'public',
    holes: 18,
    par: 72,
    yards: 6587,
    description:
      'Memorable public course with small elevated greens and a signature par-5 18th hole featuring a pond and dramatic fairway drop. One of the best values in Montgomery County.',
    features: ['restaurant', 'lessons', 'banquets'],
    website: 'https://jamaicarun.com',
    tip: 'Great value — 18 holes with cart under $35. The par-5 18th is one of the most memorable finishing holes in the area.',
  },
  {
    name: 'Graywolf Golf Club',
    city: 'Clayton',
    address: '1 Club Dr, Clayton',
    access: 'public',
    holes: 18,
    par: 72,
    yards: 7223,
    designer: 'Chi-Chi Rodriguez & Denis Griffiths (1999)',
    description:
      'A big, bold 7,223-yard daily-fee course designed by Chi-Chi Rodriguez. Bentgrass fairways and greens, new clubhouse, annual memberships available. One of the longer public tracks in the region.',
    features: ['driving_range', 'lessons', 'championship'],
    website: 'https://graywolfgolfclub.com',
    tip: 'Play from the appropriate tees — 7,223 from the tips is a serious test. Great course for low handicappers.',
  },
  {
    name: 'Meadowbrook at Clayton',
    city: 'Clayton',
    address: 'Clayton, OH',
    access: 'public',
    holes: 18,
    description:
      'Historic, tree-lined course in Clayton with scenic settings and magnificently shaded fairways. A local favorite for golfers looking for a classic, peaceful round.',
    features: ['walking'],
    website: 'https://meadowbrookatclayton.com',
  },
  {
    name: 'WGC Golf Course',
    city: 'Xenia',
    address: '821 N Detroit St, Xenia',
    access: 'public',
    holes: 18,
    par: 71,
    yards: 6551,
    designer: 'Jack Kidwell & Mike Hurdzan',
    description:
      'Voted #1 Course in Greene County. Built in the 1920s and now fully public, with lush ryegrass fairways, five sets of tees on most holes including family tees. Fun for all skill levels.',
    features: ['lessons', 'top_rated', 'beginner_friendly', 'walking'],
    website: 'https://wgcgolfcourse.com',
    tip: 'Five tee options including family tees make this perfect for mixed groups and juniors.',
  },
  {
    name: 'Jasper Hills Golf Club',
    city: 'Xenia',
    address: '1100 Knollhaven Rd, Xenia',
    access: 'public',
    holes: 18,
    par: 72,
    yards: 6646,
    description:
      'Reopened in 2022 after full restoration (formerly Sebastian Hills). Challenging rolling terrain, brand-new GPS carts, concrete cart paths, and a full-service restaurant and bar with outdoor seating.',
    features: ['driving_range', 'restaurant', 'lessons'],
    website: 'https://golfjasperhills.com',
    tip: 'Feels brand new since the 2022 restoration. The outdoor bar patio is a great spot post-round.',
  },
  {
    name: 'Beechwood Golf Course',
    city: 'Arcanum',
    address: 'Arcanum, OH (30 min NW of Dayton)',
    access: 'public',
    holes: 27,
    description:
      '27-hole facility in a beautiful rural setting with three distinct 9-hole courses (Woodland, Creekside, Lakeview) that can be combined into three different 18-hole rounds. Great for a day trip.',
    features: ['driving_range', 'restaurant', 'lessons'],
    website: 'https://beechwoodgc.com',
    tip: 'Three very different nines — try a different combination each visit. Great escape from the suburbs.',
  },
  {
    name: 'NCR Country Club (South Course)',
    city: 'Kettering',
    address: '4435 Dogwood Trail, Kettering',
    access: 'private',
    holes: 18,
    par: 71,
    yards: 7055,
    designer: 'Dick Wilson (1954)',
    description:
      "One of Ohio's finest private clubs and #68 on Golfweek's Top 100 Classic Courses. Has hosted the 1969 PGA Championship and 1986 U.S. Women's Open. Members and guests only.",
    features: [
      'driving_range',
      'restaurant',
      'lessons',
      'championship',
      'top_rated',
      'donald_ross',
    ],
    website: 'https://ncrcountryclub.com',
    tip: 'Members and guests only — but worth knowing about if you\'re building a network in Dayton.',
  },
  {
    name: 'Country Club of the North',
    city: 'Beavercreek',
    address: 'Beavercreek, OH',
    access: 'private',
    holes: 18,
    par: 73,
    yards: 7071,
    designer: 'Jack Nicklaus Signature Design (1993)',
    description:
      'The only Jack Nicklaus Signature Design course in the Miami Valley, routed along the Little Miami River. A stunning private club and one of the most prestigious courses in Ohio.',
    features: ['driving_range', 'restaurant', 'lessons', 'championship', 'nicklaus'],
    website: 'https://countryclubofthenorth.com',
    tip: 'Members and guests only — one of the best-kept secrets in Dayton golf.',
  },
  {
    name: 'Dayton Country Club',
    city: 'Dayton',
    address: 'Dayton, OH',
    access: 'private',
    holes: 18,
    par: 71,
    yards: 6302,
    designer: 'Donald Ross (1897)',
    description:
      'Historic Donald Ross design dating to 1897 — one of the oldest and most prestigious clubs in Dayton. Classic Ross greens, indoor teaching facility, and short game practice areas.',
    features: ['driving_range', 'lessons', 'championship', 'donald_ross'],
    website: 'https://daytoncountryclub.com',
    tip: 'Members and guests only. One of the most historically significant golf clubs in Ohio.',
  },
];

function AccessBadge({ type }: { type: AccessType }) {
  const cfg = ACCESS_CONFIG[type];
  return (
    <div
      className="inline-block px-3 py-1 rounded-md font-semibold text-sm"
      style={{ backgroundColor: `${cfg.color}20`, color: cfg.color }}
    >
      {cfg.label}
    </div>
  );
}

function FeatureBadge({ feature }: { feature: Feature }) {
  const cfg = FEATURE_CONFIG[feature];
  return (
    <div
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${cfg.color}20`, color: cfg.color }}
    >
      <span>{cfg.emoji}</span>
      <span>{cfg.label}</span>
    </div>
  );
}

export default function GolfPage() {
  const cities = [
    'All',
    'Public Only',
    ...Array.from(new Set(COURSES.map((c) => c.city))).sort(),
  ];
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filtered =
    selectedFilter === 'All'
      ? COURSES
      : selectedFilter === 'Public Only'
        ? COURSES.filter((c) => c.access !== 'private')
        : COURSES.filter((c) => c.city === selectedFilter);

  const publicCount = COURSES.filter((c) => c.access !== 'private').length;

  return (
    <main className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">Golf Courses</h1>
          <p className="text-lg opacity-90">
            13 courses · {publicCount} open to the public
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="bg-charcoal border-b border-gold/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 overflow-x-auto">
          <div className="flex gap-2 whitespace-nowrap">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedFilter(city)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  selectedFilter === city
                    ? 'btn-gold text-charcoal'
                    : 'border border-gold/30 text-gold hover:bg-gold/10'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <section className="bg-charcoal/5 border-b border-charcoal/10 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-charcoal/60 uppercase mb-3">
            Access Types
          </p>
          <div className="flex flex-wrap gap-3">
            {(Object.entries(ACCESS_CONFIG) as [AccessType, typeof ACCESS_CONFIG[AccessType]][]).map(
              ([key, cfg]) => (
                <div
                  key={key}
                  className="inline-flex items-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: cfg.color }}
                  />
                  <span className="text-sm text-charcoal/70">{cfg.label}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-charcoal/70 mb-8 font-semibold">
            {filtered.length} course{filtered.length !== 1 ? 's' : ''}
          </p>

          <div className="grid gap-6">
            {filtered.map((course) => (
              <div
                key={course.name}
                className="card bg-white border border-charcoal/10 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-charcoal mb-1">
                        {course.name}
                      </h3>
                      <p className="text-sm text-charcoal/60 flex items-center gap-1">
                        📍 {course.address}
                      </p>
                    </div>
                    <AccessBadge type={course.access} />
                  </div>

                  {/* Stats */}
                  <div className="bg-charcoal/5 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-charcoal/60 uppercase">
                          Holes
                        </p>
                        <p className="text-2xl font-black text-charcoal">
                          {course.holes}
                        </p>
                      </div>
                      {course.par && (
                        <div>
                          <p className="text-xs font-semibold text-charcoal/60 uppercase">
                            Par
                          </p>
                          <p className="text-2xl font-black text-charcoal">
                            {course.par}
                          </p>
                        </div>
                      )}
                      {course.yards && (
                        <div>
                          <p className="text-xs font-semibold text-charcoal/60 uppercase">
                            Yards
                          </p>
                          <p className="text-2xl font-black text-charcoal">
                            {course.yards.toLocaleString()}
                          </p>
                        </div>
                      )}
                      {course.designer && (
                        <div>
                          <p className="text-xs font-semibold text-charcoal/60 uppercase">
                            Designer
                          </p>
                          <p className="text-sm font-bold text-charcoal line-clamp-2">
                            {course.designer}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-charcoal/70 mb-4">{course.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.features.map((feature) => (
                      <FeatureBadge key={feature} feature={feature} />
                    ))}
                  </div>

                  {/* Tip */}
                  {course.tip && (
                    <div className="bg-yellow-50 border-l-4 border-gold p-3 mb-4 rounded">
                      <p className="text-sm text-yellow-900">
                        <span className="font-semibold">💡 Insider tip:</span>{' '}
                        {course.tip}
                      </p>
                    </div>
                  )}

                  {/* Button */}
                  <div>
                    {course.access === 'private' ? (
                      <p className="text-sm font-semibold text-charcoal/60">
                        Members and guests only
                      </p>
                    ) : (
                      <a
                        href={course.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold inline-block"
                      >
                        Book a Tee Time →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="bg-charcoal/5 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-charcoal/60 text-sm">
            <span className="font-semibold">📌 Note:</span> Green fees and hours
            vary by season. Always check the course website before heading out.
          </p>
        </div>
      </section>
    </main>
  );
}
