'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Park {
  name: string;
  city: string;
  description: string;
  amenities: Amenity[];
  website?: string;
  tip?: string;
}

type Amenity =
  | 'playground'
  | 'tennis'
  | 'pickleball'
  | 'splash_pad'
  | 'trails'
  | 'fishing'
  | 'disc_golf'
  | 'dog_park'
  | 'sports_fields'
  | 'sledding'
  | 'farm'
  | 'gardens'
  | 'swimming'
  | 'camping'
  | 'ice_skating'
  | 'volleyball'
  | 'boat_launch';

const AMENITY_CONFIG: Record<
  Amenity,
  { label: string; color: string; emoji: string }
> = {
  playground: { label: 'Playground', color: '#F59E0B', emoji: '🛝' },
  tennis: { label: 'Tennis', color: '#10B981', emoji: '🎾' },
  pickleball: { label: 'Pickleball', color: '#6366F1', emoji: '🏓' },
  splash_pad: { label: 'Splash Pad', color: '#0EA5E9', emoji: '💦' },
  trails: { label: 'Trails', color: '#84CC16', emoji: '🥾' },
  fishing: { label: 'Fishing', color: '#06B6D4', emoji: '🎣' },
  disc_golf: { label: 'Disc Golf', color: '#F97316', emoji: '🥏' },
  dog_park: { label: 'Dog Park', color: '#A78BFA', emoji: '🐕' },
  sports_fields: {
    label: 'Sports Fields',
    color: '#EF4444',
    emoji: '⚾',
  },
  sledding: { label: 'Sledding', color: '#93C5FD', emoji: '🛷' },
  farm: { label: 'Working Farm', color: '#65A30D', emoji: '🚜' },
  gardens: { label: 'Gardens', color: '#EC4899', emoji: '🌸' },
  swimming: { label: 'Swimming', color: '#0284C7', emoji: '🏊' },
  camping: { label: 'Camping', color: '#92400E', emoji: '⛺' },
  ice_skating: { label: 'Ice Skating', color: '#BAE6FD', emoji: '⛸️' },
  volleyball: { label: 'Volleyball', color: '#F59E0B', emoji: '🏐' },
  boat_launch: { label: 'Boat Launch', color: '#1D4ED8', emoji: '🚤' },
};

const ALL_PARKS: Park[] = [
  {
    name: 'RiverScape MetroPark',
    city: 'Dayton',
    description:
      "Downtown Dayton's flagship park along the Great Miami River. A hub for festivals, outdoor concerts, and year-round recreation.",
    amenities: ['splash_pad', 'ice_skating', 'volleyball', 'fishing', 'trails'],
    website: 'https://www.metroparks.org/places-to-go/riverscape/',
    tip: 'The splash pad is free all summer — great for kids. Ice rink opens in winter.',
  },
  {
    name: 'Eastwood MetroPark',
    city: 'Dayton',
    description:
      'Centered on Eastwood Lake, this park is a favorite for fishing, picnicking, and casual hikes just east of downtown.',
    amenities: ['fishing', 'trails', 'disc_golf', 'dog_park', 'playground'],
    website: 'https://www.metroparks.org/places-to-go/eastwood/',
    tip: 'Disc golf course is free. Dog park has separate small and large dog areas.',
  },
  {
    name: 'Island MetroPark',
    city: 'Dayton',
    description:
      'A peaceful island park on the Mad River with easy walking trails, butterfly gardens, and scenic river views.',
    amenities: ['trails', 'fishing'],
    website: 'https://www.metroparks.org/places-to-go/island/',
    tip: 'Beautiful sunset spot. Connects to the regional bike trail network.',
  },
  {
    name: 'Wegerzyn Gardens MetroPark',
    city: 'Dayton',
    description:
      "Formal gardens, a Children's Discovery Garden, and woodland trails make this one of the most unique parks in the region.",
    amenities: ['gardens', 'trails', 'playground'],
    website: 'https://www.metroparks.org/places-to-go/wegerzyn-gardens/',
    tip: 'The Children\'s Discovery Garden is a highlight for families — interactive and educational.',
  },
  {
    name: 'Possum Creek MetroPark',
    city: 'Dayton',
    description:
      'A west-side gem with a popular disc golf course, fishing ponds, and open meadow trails.',
    amenities: ['disc_golf', 'fishing', 'trails', 'playground'],
    website: 'https://www.metroparks.org/places-to-go/possum-creek/',
    tip: 'One of the best free disc golf courses in the region — 18 holes.',
  },
  {
    name: 'Aullwood Audubon MetroPark',
    city: 'Dayton',
    description:
      'A working organic farm and nature education center on 350 acres of native prairie, woodlands, and wetlands. One of the most peaceful spots in the region.',
    amenities: ['farm', 'gardens', 'trails'],
    website: 'https://www.metroparks.org/places-to-go/aullwood/',
    tip: 'The farm animals and nature center make this a top pick for families with young children.',
  },
  {
    name: 'Cox Arboretum MetroPark',
    city: 'Dayton',
    description:
      'A stunning 189-acre botanical garden featuring specialty gardens, prairie grasses, mature forests, and one of the largest native Ohio butterfly houses in the region.',
    amenities: ['gardens', 'trails'],
    website: 'https://www.metroparks.org/places-to-go/cox-arboretum/',
    tip: 'The butterfly house is a must-see in summer. The tree tower gives a treetop view of the forest.',
  },
  {
    name: 'Englewood MetroPark',
    city: 'Englewood',
    description:
      'The largest park in the Five Rivers system — over 1,900 acres of river bottom land, wooded ravines, open meadows, and a reservoir with camping and fishing.',
    amenities: [
      'camping',
      'fishing',
      'trails',
      'swimming',
      'sports_fields',
      'playground',
    ],
    website: 'https://www.metroparks.org/places-to-go/englewood/',
    tip: 'The swimming area at the reservoir is one of the few places to swim for free in the Dayton region.',
  },
  {
    name: 'Hills & Dales MetroPark',
    city: 'Kettering',
    description:
      'Rolling wooded terrain perfect for trail running and hiking, with a great sledding hill in winter.',
    amenities: ['trails', 'sledding'],
    website: 'https://www.metroparks.org/places-to-go/hills-dales/',
    tip: 'The sledding hill is legendary in winter. Trails are well-maintained year-round.',
  },
  {
    name: 'Carriage Hill MetroPark',
    city: 'Huber Heights',
    description:
      'A working 1880s farm surrounded by miles of trails. Incredible for families who want a rural experience close to the city.',
    amenities: ['farm', 'trails', 'fishing', 'sledding', 'playground'],
    website: 'https://www.metroparks.org/places-to-go/carriage-hill/',
    tip: 'Farm demonstrations run on weekends. Kids love meeting the animals.',
  },
  {
    name: 'Taylorsville MetroPark',
    city: 'Huber Heights',
    description:
      'A peaceful river park along the Great Miami with miles of paved trails connecting to the regional trail network, scenic meadows, and dense woodlands.',
    amenities: ['trails', 'fishing', 'camping'],
    website: 'https://www.metroparks.org/places-to-go/taylorsville/',
    tip: 'The Great Miami River Recreation Trail runs through here — great for biking or a long walk.',
  },
  {
    name: 'Sugarcreek MetroPark',
    city: 'Bellbrook',
    description:
      'One of the most scenic parks in the region — dramatic limestone gorges, cedar cliffs, and pristine woodland trails.',
    amenities: ['trails', 'fishing'],
    website: 'https://www.metroparks.org/places-to-go/sugarcreek/',
    tip: 'The Cedar Cliff Falls trail is stunning. Worth the short drive from Centerville.',
  },
  {
    name: 'Twin Creek MetroPark',
    city: 'Germantown',
    description:
      'Hidden gem with a natural swimming hole, waterfall, and scenic creek-side trails through a shaded gorge.',
    amenities: ['swimming', 'trails', 'fishing'],
    website: 'https://www.metroparks.org/places-to-go/twin-creek/',
    tip: 'The swimming hole is a local secret — perfect on hot summer days.',
  },
  {
    name: 'Caesar Creek State Park',
    city: 'Waynesville',
    description:
      'A massive 10,000-acre park with a reservoir lake, sandy beach, camping, and over 43 miles of trails. 30 min south of Dayton.',
    amenities: [
      'swimming',
      'camping',
      'fishing',
      'boat_launch',
      'trails',
      'sports_fields',
    ],
    website: 'https://parks.ohiodnr.gov/caesarcreek',
    tip: 'The fossil collecting area is unique — you can find 450-million-year-old fossils on the beach.',
  },
  {
    name: 'Delco Park',
    city: 'Kettering',
    description:
      "Kettering's largest and most feature-rich park, with something for every age. Features a splash pad, disc golf, fishing pond, pickleball, and a dog park — all free.",
    amenities: [
      'playground',
      'tennis',
      'pickleball',
      'splash_pad',
      'sports_fields',
      'fishing',
      'trails',
      'disc_golf',
      'dog_park',
    ],
    website: 'https://www.playkettering.org/delco-park/',
    tip: 'The splash pad is hugely popular in summer. Disc golf course is free. Dog park has separate large and small dog areas.',
  },
  {
    name: 'Kennedy Park',
    city: 'Kettering',
    description:
      'Home to Kettering\'s premier pickleball facility — 12 newly renovated outdoor courts plus a splash pad, walking trails, and open green space.',
    amenities: ['pickleball', 'tennis', 'splash_pad', 'trails', 'playground'],
    website: 'https://www.playkettering.org/kennedy-park/',
    tip: 'The John & Betty Meyer Pickleball Courts expanded to 12 courts in 2023 — the top outdoor pickleball spot in Kettering.',
  },
  {
    name: 'Indian Riffle Park',
    city: 'Kettering',
    description:
      'A large neighborhood park along the creek corridor with sports fields, a playground, and wooded trail segments.',
    amenities: ['sports_fields', 'playground', 'trails'],
    website: 'https://www.playkettering.org/departments/parks/',
  },
  {
    name: 'Spinning Hills Park',
    city: 'Kettering',
    description:
      'A nature-focused neighborhood park with disc golf and wooded trails winding through rolling hills.',
    amenities: ['trails', 'disc_golf', 'playground'],
    website: 'https://www.playkettering.org/departments/parks/',
  },
  {
    name: 'Activity Center Park',
    city: 'Centerville',
    description:
      'A 22-acre park anchored by the Centerville-Washington Park District headquarters. Features an all-access inclusive playground, water play area, pickleball courts, baseball diamonds, shelters, and wide open green space.',
    amenities: ['playground', 'splash_pad', 'pickleball', 'sports_fields', 'dog_park'],
    website: 'https://cwpd.org/parks/',
    tip: 'The all-access playground is designed for kids of all abilities — one of the best in the region.',
  },
  {
    name: 'Stubbs Park',
    city: 'Centerville',
    description:
      "Centerville's beloved community gathering park, reopened in 2025 after a major renovation. Features disc golf, free summer concerts, local theater performances, wide open green space, and dog-friendly paths.",
    amenities: ['playground', 'sports_fields', 'trails', 'disc_golf'],
    website: 'https://cwpd.org/parks/',
    tip: 'Summer concerts and outdoor theater run regularly — check CWPD\'s calendar for the schedule.',
  },
  {
    name: 'Spring Valley Park',
    city: 'Centerville',
    description:
      'Quiet neighborhood park with a creek-side trail and well-maintained playground equipment. A local favorite for evening walks.',
    amenities: ['playground', 'trails'],
    website: 'https://cwpd.org/parks/',
  },
  {
    name: 'Rotary Park',
    city: 'Beavercreek',
    description:
      "Beavercreek's flagship community park — features one of the best free splash pads in the region, a large playground, sports fields, and pickleball courts.",
    amenities: ['playground', 'splash_pad', 'trails', 'sports_fields', 'pickleball'],
    website: 'https://www.beavercreekohio.gov/182/City-Parks-and-Trails',
    tip: 'The splash pad is one of the nicest in the Dayton area. Open Memorial Day through Labor Day.',
  },
  {
    name: 'Spring House Park',
    city: 'Beavercreek',
    description:
      "Beavercreek's newest and largest park at 148 acres — a destination park with nearly every amenity: splash pad, dog park, disc golf, pickleball, archery range, fishing dock, multi-sport fields, and miles of trails.",
    amenities: [
      'splash_pad',
      'dog_park',
      'disc_golf',
      'pickleball',
      'fishing',
      'trails',
      'sports_fields',
      'playground',
    ],
    website: 'https://beavercreekohio.gov/781/Spring-House-Park',
    tip: 'Still being developed in phases — already one of the most impressive parks in the region when complete.',
  },
  {
    name: 'Dominick Lofino Park',
    city: 'Beavercreek',
    description:
      'A well-established community park on the north side of Beavercreek with sports facilities, a playground, and green space popular with youth leagues.',
    amenities: ['playground', 'sports_fields', 'tennis', 'trails'],
    website: 'https://www.beavercreekohio.gov/182/City-Parks-and-Trails',
  },
  {
    name: 'John Ankeney Soccer Complex',
    city: 'Beavercreek',
    description: 'Major regional soccer facility with 14 fields hosting youth and adult leagues throughout the year.',
    amenities: ['sports_fields'],
    website: 'https://www.beavercreekohio.gov/182/City-Parks-and-Trails',
  },
  {
    name: 'Mound Park',
    city: 'Miamisburg',
    description:
      'Built around a 65-foot prehistoric Native American burial mound — one of the tallest in the U.S. Climb to the top for panoramic views, then enjoy tennis, sports fields, and a playground.',
    amenities: ['playground', 'tennis', 'trails', 'sports_fields'],
    website: 'https://www.playmiamisburg.com/parks_facilities/parks/',
    tip: 'The mound is a truly unique Dayton-area landmark. Great photo spot at the top.',
  },
  {
    name: 'Sycamore Trails Park',
    city: 'Miamisburg',
    description:
      'The gem of Miamisburg — 75 acres of natural park with an 18-hole disc golf course, pickleball and tennis courts, swimming at the Sycamore Trails Aquatic Center, and wooded trails.',
    amenities: ['disc_golf', 'pickleball', 'tennis', 'swimming', 'trails', 'playground'],
    website: 'https://www.playmiamisburg.com/sycamore-trails-park/',
    tip: 'The disc golf course was redesigned with 18 holes through creeks and elevation changes — one of the best in the area.',
  },
  {
    name: 'Riverfront Park',
    city: 'Miamisburg',
    description:
      'Beautiful 7-acre park along the Great Miami River with a splash pad, large playground, and pavilion. Access point for the Great Miami River Recreation Trail.',
    amenities: ['splash_pad', 'playground', 'fishing', 'trails'],
    website: 'https://www.playmiamisburg.com/parks_facilities/parks/',
    tip: 'One of the best riverfront parks in the region for families.',
  },
  {
    name: 'Canal Run / Community Park',
    city: 'Miamisburg',
    description:
      "Miamisburg's community activity hub featuring the Canal Run Dog Park, a skate park, basketball courts, playground, and walking path along a scenic canal corridor.",
    amenities: ['dog_park', 'playground', 'trails'],
    website: 'https://www.playmiamisburg.com/parks_facilities/canal_run_dog_park/',
    tip: 'Canal Run Dog Park has three separate fenced areas for dogs of all sizes — one of the nicest dog parks in the area.',
  },
  {
    name: 'North Park',
    city: 'Springboro',
    description:
      "Springboro's premier 39-acre park on W. Central Ave. Features 6 lighted pickleball courts (added 2024), 2 lighted tennis courts, 3 soccer/LAX fields, a 30,000 sq ft all-accessible Dayton Children's Hospital playground, an amphitheater, basketball, and a 0.89-mile walking trail.",
    amenities: ['pickleball', 'tennis', 'sports_fields', 'playground', 'trails'],
    website: 'https://www.cityofspringboro.com/facilities/facility/details/North-Park-1',
    tip: 'The new all-accessible playground (2024) is one of the best in the region. Summer concert series and outdoor theater at the amphitheater are free.',
  },
  {
    name: 'Community Park',
    city: 'Springboro',
    description:
      'A versatile sports and recreation park with baseball and basketball courts, tennis, a playground, and the DK Pump Tracks — a free BMX-style pump track for all ages and skill levels.',
    amenities: ['sports_fields', 'playground', 'tennis'],
    website: 'https://www.cityofspringboro.com/facilities/facility/details/Community-Park-2',
    tip: 'The pump track is a hidden gem — free to use and popular with kids on bikes and scooters.',
  },
  {
    name: 'Clearcreek Park',
    city: 'Springboro',
    description:
      'A nature-forward park with creek access, open green space, and a peaceful setting along Clearcreek. Great for casual walks and picnics.',
    amenities: ['trails', 'playground'],
    website: 'https://www.cityofspringboro.com/176/Parks-Recreation',
  },
  {
    name: 'Thomas A. Cloud Park',
    city: 'Huber Heights',
    description:
      "Huber Heights' largest park at 124 acres — a massive athletic complex with 12 tennis courts, 10 ball diamonds, volleyball, 4 soccer fields, 4 basketball courts, a splash pad, and 1.2 miles of paved trails.",
    amenities: ['tennis', 'sports_fields', 'volleyball', 'splash_pad', 'trails', 'playground'],
    website: 'https://www.hhoh.org/646/City-Parks',
    tip: 'The splash pad runs free from Memorial Day through Labor Day. Six picnic shelters available to reserve.',
  },
  {
    name: 'Wayne Park',
    city: 'Huber Heights',
    description:
      'Community recreation park serving the heart of Huber Heights with sports fields, pickleball courts, a splash pad, and open play areas.',
    amenities: ['playground', 'splash_pad', 'tennis', 'pickleball', 'sports_fields'],
    website: 'https://www.hhoh.org/290/Parks-Recreation',
    tip: 'The splash pad was recently renovated — one of the larger ones in the area.',
  },
  {
    name: 'Fairborn Community Park',
    city: 'Fairborn',
    description:
      'Fairborn\'s flagship park with something for everyone — soccer and softball fields, a 500-seat amphitheater, 18-hole disc golf course, volleyball, basketball, tennis, a 2-mile fitness trail, a 5-acre pond, and over 40 acres of restored forest and wetlands.',
    amenities: ['sports_fields', 'disc_golf', 'volleyball', 'tennis', 'trails', 'fishing'],
    website: 'https://www.fairbornoh.gov/government/parks___recreation/index.php',
    tip: 'The 5-acre pond and restored wetlands make this feel like a nature park, not just an athletic complex.',
  },
  {
    name: 'Gracemore Park',
    city: 'Fairborn',
    description:
      'Community park close to Wright State University with sports facilities and open green space. Popular with students and families alike.',
    amenities: ['playground', 'sports_fields', 'tennis'],
    website: 'https://www.fairbornoh.gov/government/parks___recreation/index.php',
  },
  {
    name: 'John Bryan State Park',
    city: 'Yellow Springs',
    description:
      'Just 20 min from WPAFB — one of Ohio\'s most stunning parks, with a dramatic limestone gorge along the Little Miami River, world-class hiking, and rock climbing.',
    amenities: ['trails', 'camping', 'fishing'],
    website: 'https://parks.ohiodnr.gov/johnbryan',
    tip: 'The gorge trail is a must-do for new residents. Connects to Clifton Gorge State Nature Preserve for extended hiking.',
  },
];

function AmenityBadge({ amenity }: { amenity: Amenity }) {
  const cfg = AMENITY_CONFIG[amenity];
  return (
    <div
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${cfg.color}20`, color: cfg.color }}
      title={cfg.label}
    >
      <span>{cfg.emoji}</span>
      <span className="hidden sm:inline">{cfg.label}</span>
    </div>
  );
}

export default function ParksPage() {
  const cities = ['All', ...Array.from(new Set(ALL_PARKS.map((p) => p.city))).sort()];
  const [selectedCity, setSelectedCity] = useState('All');

  const filtered =
    selectedCity === 'All'
      ? ALL_PARKS
      : ALL_PARKS.filter((p) => p.city === selectedCity);

  return (
    <main className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            Parks in Dayton
          </h1>
          <p className="text-lg opacity-90">
            35+ parks, preserves, and nature areas — all free to visit
          </p>
        </div>
      </section>

      {/* City Filter */}
      <div className="bg-charcoal border-b border-gold/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 overflow-x-auto">
          <div className="flex gap-2 whitespace-nowrap">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  selectedCity === city
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

      {/* Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-charcoal/70 mb-8">
            {filtered.length} park{filtered.length !== 1 ? 's' : ''} in{' '}
            {selectedCity === 'All' ? 'Dayton area' : selectedCity}
          </p>

          <div className="grid gap-6">
            {filtered.map((park) => (
              <div
                key={park.name}
                className="card bg-white border border-charcoal/10 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-charcoal mb-1">
                      {park.name}
                    </h3>
                    <p className="text-sm text-charcoal/60 flex items-center gap-1">
                      📍 {park.city}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-charcoal/70 mb-4">{park.description}</p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {park.amenities.map((amenity) => (
                      <AmenityBadge key={amenity} amenity={amenity} />
                    ))}
                  </div>

                  {/* Tip */}
                  {park.tip && (
                    <div className="bg-yellow-50 border-l-4 border-gold p-3 mb-4 rounded">
                      <p className="text-sm text-yellow-900">
                        <span className="font-semibold">💡 Insider tip:</span>{' '}
                        {park.tip}
                      </p>
                    </div>
                  )}

                  {/* Website Link */}
                  {park.website && (
                    <a
                      href={park.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold inline-block"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
