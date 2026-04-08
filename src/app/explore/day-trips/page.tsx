'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Trip {
  name: string;
  drive: string;
  distance: string;
  category: string;
  color: string;
  desc: string;
  highlights: string[];
  tip: string;
  url: string;
}

const TRIPS: Trip[] = [
  {
    name: "Yellow Springs",
    drive: "25 min",
    distance: "20 mi",
    category: "Nature & Quirky",
    color: "#7ED321",
    desc: "Dayton's favorite day trip. Charming village with great food, hiking Glen Helen Nature Preserve, boutique shopping, and a laid-back arts scene. Home of Dave Chappelle.",
    highlights: ["Glen Helen Nature Preserve", "Young's Jersey Dairy (ice cream & mini golf)", "The Winds Café", "Antioch College area shops"],
    tip: "Go on a weekday — weekends get crowded. Spring and fall are stunning.",
    url: "https://www.villageofyellowsprings.org",
  },
  {
    name: "Hocking Hills State Park",
    drive: "1 hr 20 min",
    distance: "90 mi",
    category: "Nature & Outdoors",
    color: "#417505",
    desc: "Ohio's most stunning natural area. Caves, waterfalls, old-growth forest, and sandstone cliffs. Old Man's Cave is the main attraction. Book cabins months in advance.",
    highlights: ["Old Man's Cave", "Ash Cave (largest recess cave in Ohio)", "Cedar Falls", "Rock House"],
    tip: "Arrive before 9am to beat the crowds at Old Man's Cave. Free admission to state park.",
    url: "https://hockinghills.com",
  },
  {
    name: "Columbus",
    drive: "1 hr 15 min",
    distance: "75 mi",
    category: "City Day Trip",
    color: "#4A90D9",
    desc: "Ohio's capital and largest city. World-class Short North Arts District, Columbus Zoo (consistently ranked top 5 in US), great food scene, and Ohio State campus.",
    highlights: ["Short North Arts District", "Columbus Zoo & Aquarium", "North Market", "Franklin Park Conservatory", "German Village"],
    tip: "Short North on a Saturday morning is perfect. Columbus Museum of Art is worth a visit.",
    url: "https://www.experiencecolumbus.com",
  },
  {
    name: "Kings Island",
    drive: "45 min",
    distance: "50 mi",
    category: "Family / Thrills",
    color: "#F5A623",
    desc: "One of the Midwest's best amusement parks. World-class roller coasters including The Beast (longest wooden coaster in the world), plus a full waterpark. Season passes are a great deal.",
    highlights: ["The Beast roller coaster", "Orion (giga coaster)", "Soak City Waterpark", "Planet Snoopy (kids)"],
    tip: "Buy tickets online — always cheaper. Season passes pay for themselves in 2 visits. Best days: Tuesday/Wednesday.",
    url: "https://www.visitkingsisland.com",
  },
  {
    name: "Cincinnati",
    drive: "1 hr",
    distance: "55 mi",
    category: "City Day Trip",
    color: "#D0021B",
    desc: "Cincinnati has excellent food (chili, skyline), the Newport Aquarium, Cincinnati Art Museum (free), American Sign Museum, and the Bengals/Reds if games are in season.",
    highlights: ["Cincinnati Art Museum (free)", "Findlay Market", "Newport Aquarium", "Over-the-Rhine neighborhood", "Eden Park"],
    tip: "Free parking at Eden Park on weekends. Try Skyline Chili — it's Cincinnati's thing.",
    url: "https://www.visitcincinnati.com",
  },
  {
    name: "Cedar Point",
    drive: "2 hr",
    distance: "160 mi",
    category: "Family / Thrills",
    color: "#9B59B6",
    desc: "America's roller coaster capital. 17 coasters including Top Thrill 2 and Millennium Force. Worth the drive for any thrill-seeker. Plan a full day or weekend.",
    highlights: ["Top Thrill 2", "Millennium Force", "Dragster", "Cedar Point Shores Waterpark"],
    tip: "Stay on-site for early entry access. Bring a cooler to the adjacent parking — no food restrictions in the lot.",
    url: "https://www.cedarpoint.com",
  },
  {
    name: "Indiana Dunes",
    drive: "2 hr 30 min",
    distance: "175 mi",
    category: "Nature & Outdoors",
    color: "#F5A623",
    desc: "National park on Lake Michigan's southern shore. Sandy beaches, towering dunes, and excellent hiking. Feels like a beach vacation without flying. Best May–September.",
    highlights: ["Mount Baldy (sand dune)", "West Beach swimming", "Cowles Bog Trail", "Sleeping Bear Dunes day trip"],
    tip: "National Park Pass gets you in free. West Beach parking fills by 10am on summer weekends.",
    url: "https://www.nps.gov/indu",
  },
  {
    name: "Clifton Gorge & John Bryan State Park",
    drive: "30 min",
    distance: "25 mi",
    category: "Nature & Outdoors",
    color: "#417505",
    desc: "A hidden gem right next to Yellow Springs. Dramatic limestone gorge carved by the Little Miami River. Some of the best hiking in Ohio — technical trails with beautiful scenery.",
    highlights: ["Clifton Gorge Nature Preserve", "John Bryan State Park trails", "Little Miami River views", "Narrows Reserve"],
    tip: "Combine with Yellow Springs for a perfect full-day outing. Trails are moderate — good for older kids.",
    url: "https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/john-bryan-state-park",
  },
];

const CATEGORIES = ["All", "Nature & Outdoors", "City Day Trip", "Family / Thrills", "Nature & Quirky"];

export default function DayTripsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visible = activeFilter === "All"
    ? TRIPS
    : TRIPS.filter(t => t.category === activeFilter);

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-charcoal text-cream px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Day Trips from Dayton</h1>
          <p className="text-lg text-cream/90">
            Living in Dayton puts you within 2.5 hours of some incredible destinations. Here are the best day trips from your new home base.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-cream sticky top-0 z-10 px-6 py-6 border-b border-charcoal/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold text-sm transition-colors ${
                  activeFilter === cat
                    ? 'bg-charcoal text-gold'
                    : 'bg-white border-2 border-charcoal/20 text-charcoal hover:border-charcoal/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-charcoal/70 text-sm mb-8">
            Showing {visible.length} of {TRIPS.length} {visible.length === 1 ? 'destination' : 'destinations'}
          </p>

          <div className="space-y-6">
            {visible.map(trip => (
              <div key={trip.name} className="card bg-white rounded-lg border-2 border-charcoal/10 p-6 hover:border-gold/50 transition-colors">
                {/* Header with Icon and Category */}
                <div className="flex gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ backgroundColor: `${trip.color}20` }}
                  >
                    {trip.category === "Nature & Outdoors" && "🏞️"}
                    {trip.category === "Nature & Quirky" && "🍃"}
                    {trip.category === "City Day Trip" && "🏙️"}
                    {trip.category === "Family / Thrills" && "🎢"}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-charcoal mb-2">{trip.name}</h2>
                    <div className="flex gap-4 text-sm text-charcoal/70">
                      <span className="flex items-center gap-1">🚗 {trip.drive}</span>
                      <span className="flex items-center gap-1">📍 {trip.distance}</span>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap self-start"
                    style={{ backgroundColor: `${trip.color}15`, color: trip.color }}
                  >
                    {trip.category}
                  </div>
                </div>

                {/* Description */}
                <p className="text-charcoal text-base leading-relaxed mb-4">{trip.desc}</p>

                {/* Highlights */}
                <div className="mb-4">
                  <h3 className="text-xs font-bold text-charcoal/60 uppercase tracking-wide mb-3">Don't Miss</h3>
                  <ul className="space-y-2">
                    {trip.highlights.map(h => (
                      <li key={h} className="text-charcoal text-sm flex items-start gap-2">
                        <span className="text-gold mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Insider Tip */}
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-4 flex gap-3">
                  <span className="text-xl">💡</span>
                  <p className="text-charcoal text-sm">{trip.tip}</p>
                </div>

                {/* Link Button */}
                <a
                  href={trip.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2 px-6 py-3 bg-gold text-charcoal font-bold rounded-lg hover:bg-gold/90 transition-colors"
                >
                  <span>Plan Your Visit</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
