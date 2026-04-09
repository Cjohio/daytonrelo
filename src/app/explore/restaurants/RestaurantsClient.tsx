'use client';

import { useState } from 'react';
import { UtensilsCrossed, Landmark, Star, Phone, MapPin } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  hood: string;
  since?: string;
  price: '$' | '$$' | '$$$' | '$$$$';
  description: string;
  tip?: string;
  mapsQuery: string;
}

// ─── Dayton Staples — iconic historic spots ──────────────────────────────────
const STAPLES: Restaurant[] = [
  {
    id: 'pine-club',
    name: 'The Pine Club',
    cuisine: 'Steakhouse',
    hood: 'Oakwood',
    since: 'Since 1947',
    price: '$$$',
    description:
      "Dayton's most legendary restaurant and a true American original. No reservations, no credit cards, no desserts — just perfectly aged hand-cut steaks, stewed tomatoes, and onion rings. Presidents and Hall of Famers have eaten here. You should too.",
    tip: "Cash only. Expect a wait — it's always worth it.",
    mapsQuery: 'The Pine Club Dayton Ohio',
  },
  {
    id: 'marions-piazza',
    name: "Marion's Piazza",
    cuisine: 'Pizza',
    hood: 'Multiple Locations',
    since: 'Since 1965',
    price: '$',
    description:
      "Voted Dayton's Best Pizza over 33 times and counting. Thin crust, cut into signature small squares, with a sauce recipe that hasn't changed in decades. This is the pizza every Daytonian grows up on. You'll be hooked after one slice.",
    tip: 'Try the house special. Nine locations across the metro.',
    mapsQuery: "Marion's Piazza Dayton Ohio",
  },
  {
    id: 'slyders',
    name: "Slyder's Tavern",
    cuisine: 'Burgers & Bar',
    hood: 'Belmont',
    since: 'Since 1948',
    price: '$',
    description:
      'Won Best Hamburger in Dayton six out of eight times. A true neighborhood tavern with no pretension and outstanding wings. Exactly the kind of place that makes Dayton special — and has for over 75 years.',
    tip: "Order the wings. They're legendary.",
    mapsQuery: "Slyder's Tavern Dayton Ohio",
  },
  {
    id: 'jays-seafood',
    name: "Jay's Seafood",
    cuisine: 'Seafood',
    hood: 'Oregon District',
    since: 'Since 1976',
    price: '$$$',
    description:
      "Dayton's premier independent seafood restaurant, holding court in the historic Oregon District for nearly 50 years. Seasonal, fresh fish and shellfish in a classic setting that never goes out of style.",
    tip: 'Ask your server what came in fresh that day.',
    mapsQuery: "Jay's Seafood Dayton Ohio",
  },
  {
    id: 'amber-rose',
    name: 'The Amber Rose',
    cuisine: 'Eastern European',
    hood: 'North Dayton',
    since: 'Since 1968',
    price: '$$',
    description:
      'Housed in a building dating to 1910, The Amber Rose serves old-world Eastern European comfort food — pierogies, schnitzel, stuffed cabbage — made from recipes passed down through generations. A Dayton hidden gem.',
    tip: "Don't skip the pierogies. They're the real deal.",
    mapsQuery: 'The Amber Rose Dayton Ohio',
  },
  {
    id: 'root-beer-stand',
    name: 'Root Beer Stand',
    cuisine: 'American Drive-In',
    hood: 'Sharonville / Dayton',
    since: 'Since 1928',
    price: '$',
    description:
      'A classic carhop drive-in serving frosty mugs of homemade root beer and hot dogs. A Dayton summer tradition stretching back nearly 100 years. Pull up, roll down your window, and experience something genuinely American.',
    tip: 'The root beer float is non-negotiable.',
    mapsQuery: 'Root Beer Stand Dayton Ohio',
  },
  {
    id: 'flying-pizza',
    name: 'Flying Pizza',
    cuisine: 'New York Pizza',
    hood: 'Dayton',
    since: 'Since 1971',
    price: '$',
    description:
      'New York-style pizza by the slice, made with the same cheese, same flour, and same sauce recipe for over 50 years. No frills, no reinvention — just great pizza done right, every single time.',
    tip: "Grab a slice to go. Eat it standing up. You'll understand.",
    mapsQuery: 'Flying Pizza Dayton Ohio',
  },
  {
    id: 'oakwood-club',
    name: 'The Oakwood Club',
    cuisine: 'Surf & Turf',
    hood: 'Oakwood',
    since: 'Since 1962',
    price: '$$$',
    description:
      "Dayton's go-to for special occasions since 1962. Impeccably aged Angus beef, freshly flown-in seafood, homemade breads and desserts. The kind of place you bring someone you want to impress.",
    tip: 'Make a reservation. This one fills up.',
    mapsQuery: 'The Oakwood Club Dayton Ohio',
  },
];

// ─── Best of Dayton — modern top picks ───────────────────────────────────────
const BEST: Restaurant[] = [
  {
    id: 'salar',
    name: 'Salar Restaurant & Lounge',
    cuisine: 'Peruvian / Mediterranean',
    hood: 'Oregon District',
    price: '$$$',
    description:
      "Chef Margot Blondet's stunning fusion of Peruvian heritage and Mediterranean technique. The ceviche and pisco sours are worth the trip alone. One of the most exciting restaurants in all of Ohio.",
    tip: 'Start with the ceviche. Order the pisco sour. Thank us later.',
    mapsQuery: 'Salar Restaurant Dayton Oregon District',
  },
  {
    id: 'wheat-penny',
    name: 'Wheat Penny Oven and Bar',
    cuisine: 'Wood-Fired Pizza',
    hood: 'South Park',
    price: '$$',
    description:
      "Artisan wood-fired pizzas with inventive, seasonal toppings — think roasted cauliflower, eggplant parm, local cheeses. One of Dayton's most beloved modern dining spots and a neighborhood anchor.",
    tip: 'The seasonal specials are always the move.',
    mapsQuery: 'Wheat Penny Oven and Bar Dayton Ohio',
  },
  {
    id: 'thai-9',
    name: 'Thai 9',
    cuisine: 'Thai & Sushi',
    hood: 'Oregon District',
    price: '$$',
    description:
      'An expansive menu of authentic Thai dishes and fresh sushi under one roof. From spicy green curries to creative sushi rolls, Thai 9 has been a neighborhood anchor in the Oregon District for years.',
    tip: 'Great happy hour. The pad see ew is outstanding.',
    mapsQuery: 'Thai 9 Restaurant Dayton Oregon District',
  },
  {
    id: 'lilys',
    name: "Lily's Dayton",
    cuisine: 'Southern / Tiki',
    hood: 'Oregon District',
    price: '$$',
    description:
      'A one-of-a-kind tiki-inspired eatery blending American Southern cooking with Polynesian flair. Bao bun sliders, rumaki, free-range fried chicken, and creative cocktails in a wildly fun atmosphere.',
    tip: 'Come for the food, stay for the cocktails and vibe.',
    mapsQuery: "Lily's Dayton Ohio",
  },
  {
    id: 'luckys',
    name: "Lucky's Taproom & Eatery",
    cuisine: 'American / Craft Beer',
    hood: 'Downtown Dayton',
    price: '$$',
    description:
      "Dayton's favorite craft beer hub with generous, crowd-pleasing food. Great for groups — big booths, long beer lists, and a menu that covers everyone from meat lovers to vegans.",
    tip: 'Great spot for a first night out with your new Dayton crew.',
    mapsQuery: "Lucky's Taproom Dayton Ohio",
  },
  {
    id: 'sonora-grill',
    name: 'Sonora Grill',
    cuisine: 'Mexican / Latin',
    hood: 'Beavercreek',
    price: '$$',
    description:
      'Fresh, vibrant Latin flavors that punch well above their weight. A favorite near WPAFB for its bold flavors, generous portions, and lively atmosphere. Solid margaritas too.',
    tip: 'The carne asada tacos are a must.',
    mapsQuery: 'Sonora Grill Beavercreek Ohio',
  },
  {
    id: 'meefs',
    name: "Meef's Pasteria",
    cuisine: 'Italian',
    hood: 'Beavercreek',
    price: '$$',
    description:
      "Handmade pasta and Italian comfort food done with real care. Meef's has built a loyal following in Beavercreek for its scratch-made dishes and warm, unpretentious atmosphere.",
    tip: 'Ask about the fresh pasta special — it changes regularly.',
    mapsQuery: "Meef's Pasteria Beavercreek Ohio",
  },
  {
    id: 'flemings',
    name: "Fleming's Prime Steakhouse",
    cuisine: 'Steakhouse',
    hood: 'The Greene, Beavercreek',
    price: '$$$$',
    description:
      'Premium USDA Prime steaks and an exceptional wine list at The Greene Town Center. The place for a true special-occasion dinner near WPAFB. Impeccable service and a top-tier bar program.',
    tip: 'The Brussels sprouts side dish is surprisingly incredible.',
    mapsQuery: "Fleming's Prime Steakhouse Beavercreek Ohio",
  },
  {
    id: 'manna',
    name: 'Manna Uptown',
    cuisine: 'European / South American',
    hood: 'Centerville',
    price: '$$$',
    description:
      'A sophisticated fusion of modern European and South American flavors in the heart of Centerville. Manna punches well above a suburb\'s expectations — creative, beautifully plated, and consistently excellent.',
    tip: 'Great date-night spot. Reservations recommended on weekends.',
    mapsQuery: 'Manna Uptown Centerville Ohio',
  },
  {
    id: 'grist',
    name: 'Grist',
    cuisine: 'American / Upscale',
    hood: 'Beavercreek',
    price: '$$$',
    description:
      'Modern American cuisine in a stylish, contemporary setting. Grist brings big-city dining energy to Beavercreek with a seasonal menu, craft cocktails, and a wine list that impresses regulars and visitors alike.',
    tip: 'The brunch menu is a sleeper hit on weekends.',
    mapsQuery: 'Grist Restaurant Beavercreek Ohio',
  },
];

// ─── Price Badge ──────────────────────────────────────────────────────────────
function PriceBadge({ price }: { price: Restaurant['price'] }) {
  return (
    <span className="font-extrabold text-sm tracking-tight">
      <span className="text-charcoal">{price}</span>
      <span className="text-gray-300">{'$$$$'.slice(price.length)}</span>
    </span>
  );
}

// ─── Logo with graceful fallback ─────────────────────────────────────────────
// If /logos/restaurants/{id}.png (or .jpg) is missing, shows a gold-bordered
// text badge with the first letter of the restaurant name. This means the
// page looks polished whether or not the logo files have been downloaded yet.
function RestaurantLogo({ id, name }: { id: string; name: string }) {
  const [errored, setErrored] = useState(false);
  const initial = name.replace(/^(The |A )/, '').charAt(0).toUpperCase();

  if (errored) {
    return (
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-cream border-2 border-gold flex items-center justify-center">
        <span className="text-3xl sm:text-4xl font-serif font-bold text-gold">
          {initial}
        </span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={`/logos/restaurants/${id}.png`}
      alt={`${name} logo`}
      loading="lazy"
      onError={() => setErrored(true)}
      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain bg-cream border border-gray-200 p-1.5"
    />
  );
}

// ─── Restaurant Card ──────────────────────────────────────────────────────────
function RestaurantCard({ r }: { r: Restaurant }) {
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(r.mapsQuery)}`;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 mb-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Logo */}
        <RestaurantLogo id={r.id} name={r.name} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Top meta row */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <span className="text-xs text-gray-600 font-semibold">{r.cuisine}</span>
              {r.since && (
                <span className="text-[10px] text-gold font-bold bg-gold/10 px-2 py-0.5 rounded">
                  {r.since}
                </span>
              )}
            </div>
            <PriceBadge price={r.price} />
          </div>

          {/* Name */}
          <h3 className="text-lg sm:text-xl font-extrabold text-charcoal leading-tight mb-1">
            {r.name}
          </h3>

          {/* Hood */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{r.hood}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-charcoal/90 leading-relaxed mt-3 mb-3">
        {r.description}
      </p>

      {/* Pro tip */}
      {r.tip && (
        <div className="flex items-start gap-2 bg-[#FFFBEB] border border-[#F5E088] rounded-lg p-3 mb-3">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gold"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-[#7A6000] leading-snug italic flex-1">{r.tip}</p>
        </div>
      )}

      {/* Directions button */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 text-charcoal text-sm font-bold py-2.5 rounded-lg transition-colors"
      >
        <MapPin className="w-4 h-4" />
        Get Directions
      </a>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
type Tab = 'staples' | 'best';

export default function RestaurantsClient() {
  const [activeTab, setActiveTab] = useState<Tab>('staples');
  const list = activeTab === 'staples' ? STAPLES : BEST;

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero header */}
      <section className="bg-charcoal border-b-2 border-gold">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <p className="text-gold text-xs sm:text-sm font-bold tracking-[0.3em] mb-2">
            DAYTON EATS
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            The Local Food Guide
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl">
            Chris-curated restaurant picks for Dayton, Ohio — the iconic historic
            staples every Daytonian loves, plus the best modern spots from the
            Oregon District to Beavercreek.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex">
          <button
            onClick={() => setActiveTab('staples')}
            className={`flex-1 py-4 text-center border-b-[3px] transition-colors ${
              activeTab === 'staples'
                ? 'border-gold text-charcoal'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className="text-sm sm:text-base font-bold flex items-center justify-center gap-2">
              <Landmark className="w-4 h-4" />
              Dayton Staples
            </div>
            <div className="text-[10px] sm:text-xs opacity-80 mt-0.5">
              Iconic & Historic
            </div>
          </button>
          <button
            onClick={() => setActiveTab('best')}
            className={`flex-1 py-4 text-center border-b-[3px] transition-colors ${
              activeTab === 'best'
                ? 'border-gold text-charcoal'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className="text-sm sm:text-base font-bold flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              Best of Dayton
            </div>
            <div className="text-[10px] sm:text-xs opacity-80 mt-0.5">
              Top Picks by Neighborhood
            </div>
          </button>
        </div>
      </div>

      {/* List */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-sm text-gray-600 italic bg-white border border-gray-200 rounded-xl p-4 mb-6 leading-relaxed">
          {activeTab === 'staples'
            ? 'These are the restaurants that define Dayton — the places locals fiercely defend, newcomers quickly adopt, and everyone ends up loving.'
            : "The best of what Dayton's food scene has to offer right now, from the Oregon District to Beavercreek and beyond."}
        </p>

        {list.map((r) => (
          <RestaurantCard key={r.id} r={r} />
        ))}

        {/* CTA bottom */}
        <div className="mt-10 bg-charcoal text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-extrabold mb-2">
            Thinking about moving to Dayton?
          </h2>
          <p className="text-gray-300 mb-5 max-w-xl mx-auto">
            Chris knows every neighborhood, school district, and — yes — every
            great restaurant in the area. Let&apos;s talk about where you&apos;ll feel at
            home.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+19372413484" className="btn-gold flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Call (937) 241-3484
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold font-bold px-5 py-2.5 rounded-lg hover:bg-gold hover:text-charcoal transition-colors"
            >
              Send a Message
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
