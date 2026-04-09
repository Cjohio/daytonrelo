'use client';

import { useState } from 'react';
import { UtensilsCrossed, Truck, PartyPopper, Sun, Landmark, Handshake, Bike, Wine, Coffee } from 'lucide-react';
import { Dog, Music, MapPin, Lightbulb, AlertCircle } from 'lucide-react';

type FoodType = 'full_kitchen' | 'food_trucks' | 'snacks' | 'no_food';
type Feature =
  | 'dog_friendly'
  | 'live_music'
  | 'patio'
  | 'historic'
  | 'coop'
  | 'bike_trail'
  | 'cocktails'
  | 'coffee';

interface Brewery {
  name: string;
  city: string;
  address: string;
  description: string;
  food: FoodType;
  features: Feature[];
  website: string;
  tip?: string;
}

const FOOD_CONFIG: Record<
  FoodType,
  { label: string; color: string; icon: React.ReactNode }
> = {
  full_kitchen: { label: 'Full Kitchen', color: '#10B981', icon: <UtensilsCrossed className="w-4 h-4" /> },
  food_trucks: { label: 'Food Trucks', color: '#F97316', icon: <Truck className="w-4 h-4" /> },
  snacks: { label: 'Snacks Only', color: '#F59E0B', icon: <PartyPopper className="w-4 h-4" /> },
  no_food: { label: 'Taproom Only', color: '#6B6B6B', icon: <UtensilsCrossed className="w-4 h-4" /> },
};

const FEATURE_CONFIG: Record<
  Feature,
  { label: string; color: string; icon: React.ReactNode }
> = {
  dog_friendly: { label: 'Dog Friendly', color: '#A78BFA', icon: <Dog className="w-4 h-4" /> },
  live_music: { label: 'Live Music', color: '#EC4899', icon: <Music className="w-4 h-4" /> },
  patio: { label: 'Patio', color: '#84CC16', icon: <Sun className="w-4 h-4" /> },
  historic: { label: 'Historic Bldg', color: '#92400E', icon: <Landmark className="w-4 h-4" /> },
  coop: { label: 'Co-op Owned', color: '#0EA5E9', icon: <Handshake className="w-4 h-4" /> },
  bike_trail: { label: 'Bike Trail', color: '#65A30D', icon: <Bike className="w-4 h-4" /> },
  cocktails: { label: 'Cocktails', color: '#C084FC', icon: <Wine className="w-4 h-4" /> },
  coffee: { label: 'Coffee Bar', color: '#78350F', icon: <Coffee className="w-4 h-4" /> },
};

const BREWERIES: Brewery[] = [
  {
    name: 'Warped Wing Brewing Co.',
    city: 'Dayton',
    address: '26 Wyandot St, Dayton',
    description:
      'One of Dayton\'s flagship craft breweries inside a stunning 1938 iron foundry. Beer hall vibes with pinball, foosball, and giant Jenga. Multiple area locations.',
    food: 'full_kitchen',
    features: ['patio', 'historic'],
    website: 'https://warpedwing.com',
    tip: 'Also has locations in Springboro, Huber Heights, and Mason. Great for groups.',
  },
  {
    name: 'Toxic Brew Company',
    city: 'Dayton',
    address: '431 E 5th St, Dayton (Oregon District)',
    description:
      'Craft beer and whiskey in the heart of the Oregon District. Late-night hours make it a go-to after dinner or a show.',
    food: 'no_food',
    features: ['cocktails'],
    website: 'https://toxicbrewcompany.com',
    tip: 'Oregon District is walkable — grab dinner at a neighboring restaurant and head here after.',
  },
  {
    name: 'Branch & Bone Artisan Ales',
    city: 'Dayton',
    address: '905 Wayne Ave, Dayton',
    description:
      'Artisan ales in a relaxed neighborhood taproom. Known for creative small-batch brews. Food trucks on-site Sundays and for special events.',
    food: 'food_trucks',
    features: ['patio'],
    website: 'https://branchandboneales.com',
    tip: 'Sunday food truck lineup is a local favorite. Check their socials for the weekly schedule.',
  },
  {
    name: 'Dayton Beer Company',
    city: 'Dayton',
    address: '41 Madison St, Dayton',
    description:
      'European-style beer hall steps from Fifth Third Field with 36 Ohio craft taps and locally sourced food. Perfect before or after a Dragons game.',
    food: 'full_kitchen',
    features: ['historic'],
    website: 'https://thedaytonbeerco.com',
    tip: 'Go on a Dragons game day for the full downtown Dayton experience.',
  },
  {
    name: 'Little Fish Brewing Co. — Dayton',
    city: 'Dayton',
    address: '116 Webster St, Dayton',
    description:
      'Farm-to-table food and rotating craft beers inside a beautifully restored 100+ year-old factory and train stop. One of Dayton\'s best overall experiences.',
    food: 'full_kitchen',
    features: ['historic', 'patio'],
    website: 'https://littlefishbrewing.com',
    tip: 'Brunch on Sat-Sun is exceptional. Barrel-aged sours and IPAs are standouts on tap.',
  },
  {
    name: 'Fifth Street Brewpub',
    city: 'Dayton',
    address: '1600 E 5th St, Dayton (St. Anne\'s Hill)',
    description:
      "Ohio's first cooperatively owned brewpub in the charming St. Anne's Hill historic district. Scratch-made food including famous smashburgers and cheese curds.",
    food: 'full_kitchen',
    features: ['coop', 'historic', 'patio'],
    website: 'https://fifthstreetbrewpub.com',
    tip: 'Saturday brunch starting at 10am — the Chevre burger and salmon B.E.L.T. are must-tries.',
  },
  {
    name: 'Carillon Brewing Company',
    city: 'Dayton',
    address: '1000 Carillon Blvd, Dayton',
    description:
      'Historic brewery at Carillon Historical Park — one of the most unique settings in Dayton. Brews traditional 19th-century-style Ohio ales using period techniques.',
    food: 'snacks',
    features: ['historic', 'patio'],
    website: 'https://daytonshistory.org/carillon-brewing-co/',
    tip: 'Visit during Carillon Park hours — the museum and park grounds make this a full afternoon.',
  },
  {
    name: 'Eudora Brewing Company',
    city: 'Kettering',
    address: '3022 Wilmington Pike, Kettering',
    description:
      'Elevated brewpub with a massive dog-friendly patio featuring 6 glass garage doors. Scratch kitchen with locally sourced ingredients and happy hour specials.',
    food: 'full_kitchen',
    features: ['dog_friendly', 'patio'],
    website: 'https://eudorabrewing.com',
    tip: 'One of the best dog-friendly patios in the Dayton area. Trivia nights on weeknights.',
  },
  {
    name: 'Loose Ends Brewing',
    city: 'Centerville',
    address: '890 S Main St, Centerville',
    description:
      'Community-focused neighborhood brewery with artisan pizza, ice cream, and a famous Sunday brunch with signature rangoons and Bloody Marys.',
    food: 'full_kitchen',
    features: ['patio'],
    website: 'https://looseendsbrewing.com',
    tip: 'Sunday brunch is the move — the rangoons and Bloody Marys are locally legendary.',
  },
  {
    name: 'Heavier Than Air Brewing Co.',
    city: 'Centerville',
    address: '497 Miamisburg-Centerville Rd, Centerville',
    description:
      'Aviation-themed taproom with creative craft brews. Outside food is welcome and encouraged. A relaxed neighborhood spot with a loyal local following.',
    food: 'no_food',
    features: ['patio'],
    website: 'https://heavierthanairbrewing.com',
    tip: "Bring your own food or order delivery — they're very welcoming of outside food.",
  },
  {
    name: 'Bock Family Brewing',
    city: 'Centerville',
    address: '8150 Washington Village Dr, Centerville',
    description:
      'Family-owned neighborhood brewery in Washington Township. Great rotating tap selection in a welcoming, low-key taproom.',
    food: 'no_food',
    features: [],
    website: 'https://bockfamilybrewing.com',
  },
  {
    name: 'Lock 27 Brewing',
    city: 'Centerville',
    address: '1035 S Main St, Centerville',
    description:
      'Full-service restaurant and brewery named after Miami-Erie Canal lock history. Solid food menu alongside a well-rounded house tap list.',
    food: 'full_kitchen',
    features: [],
    website: 'https://lock27brewing.com',
  },
  {
    name: 'Wandering Griffin Brewery & Pub',
    city: 'Beavercreek',
    address: '3725 Presidential Dr, Beavercreek',
    description:
      ' 10,000 sq ft brewpub with smoked BBQ, gourmet pizza, and a full-service coffee bar (Wanderlust) open daily. Covered beer garden patio with its own bar.',
    food: 'full_kitchen',
    features: ['dog_friendly', 'patio', 'coffee'],
    website: 'https://wanderinggriffin.com',
    tip: 'Coffee bar opens at 6:30am — great for a morning stop. Beer garden patio has its own bar.',
  },
  {
    name: 'Southern Ohio Brewing',
    city: 'Beavercreek',
    address: '818 Factory Rd, Beavercreek',
    description:
      'Family-owned taproom right on the Miami Valley Bike Trail with 12-14 rotating taps. Regular food truck on-site Wed-Sun during warmer months.',
    food: 'food_trucks',
    features: ['bike_trail', 'patio'],
    website: 'https://southernohiobrewing.com',
    tip: 'Perfect stop on a Miami Valley Trail ride. Lock up the bike and grab a pint.',
  },
  {
    name: 'Star City Brewing Company',
    city: 'Miamisburg',
    address: '319 S 2nd St, Miamisburg',
    description:
      'Craft micro-brewery inside a stunning 19th-century Peerless Mill Inn building. Hidden basement speakeasy-style cocktail lounge with live music on Friday and Saturday nights.',
    food: 'no_food',
    features: ['live_music', 'cocktails', 'historic'],
    website: 'https://starcitybrewing.com',
    tip: 'The basement lounge is a hidden gem — live music Fri-Sat makes it a full night out.',
  },
  {
    name: 'Yellow Springs Brewery',
    city: 'Yellow Springs',
    address: '305 N Walnut St, Yellow Springs',
    description:
      'Founded 2013, one of the region\'s most celebrated craft breweries with 20 rotating taps. Local snacks and food trucks. A must-visit when exploring Yellow Springs.',
    food: 'food_trucks',
    features: ['patio'],
    website: 'https://yellowspringsbrewery.com',
    tip: 'Pair with a walk through the village — Yellow Springs is one of Ohio\'s most unique towns.',
  },
  {
    name: 'Trail Town Brewing',
    city: 'Yellow Springs',
    address: '101 Corry St, Yellow Springs',
    description:
      'Cozy neighborhood brewery in the heart of Yellow Springs, steps from the Little Miami Scenic Trail. Laid-back atmosphere with a rotating tap list.',
    food: 'snacks',
    features: ['bike_trail'],
    website: 'https://trailtownbrewingys.com',
    tip: 'Great fuel stop before or after a trail ride on the Little Miami Scenic Trail.',
  },
  {
    name: 'Devil Wind Brewing',
    city: 'Xenia',
    address: '130 S Detroit St, Xenia',
    description:
      'Dog-friendly taproom and cocktail bar in downtown Xenia with creative craft brews and a welcoming atmosphere. Both indoor and outdoor seating.',
    food: 'no_food',
    features: ['dog_friendly', 'cocktails', 'patio'],
    website: 'https://devilwindbrewing.com',
    tip: 'One of Xenia\'s best spots — grab dinner nearby and make a night of downtown Xenia.',
  },
  {
    name: 'Hairless Hare Brewery',
    city: 'Vandalia',
    address: '738 W National Rd, Vandalia',
    description:
      'Established 2013, this microbrewery north of Dayton is known for exceptional sours and a rotating craft lineup. Full kitchen with food service.',
    food: 'full_kitchen',
    features: ['patio'],
    website: 'https://hairlessharebrewery.com',
    tip: 'Known for some of the best sours in the region. Worth the drive from Dayton.',
  },
  {
    name: 'Crooked Handle Brewing Co.',
    city: 'Piqua',
    address: '123 N Main St, Piqua',
    description:
      'Full brewpub in historic downtown Piqua with a well-rounded food menu and quality house brews. A great anchor for exploring the upper Miami Valley.',
    food: 'full_kitchen',
    features: ['historic', 'patio'],
    website: 'https://crookedhandle.com',
    tip: 'About 30 min north of Dayton — combine with a visit to historic downtown Piqua.',
  },
];

function FoodBadge({ type }: { type: FoodType }) {
  const cfg = FOOD_CONFIG[type];
  return (
    <div
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${cfg.color}20`, color: cfg.color }}
    >
      {cfg.icon}
      <span>{cfg.label}</span>
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
      {cfg.icon}
      <span>{cfg.label}</span>
    </div>
  );
}

export default function BreweriesPage() {
  const cities = [
    'All',
    ...Array.from(new Set(BREWERIES.map((b) => b.city))).sort(),
  ];
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedFood, setSelectedFood] = useState('All');

  const filtered = BREWERIES.filter((b) => {
    if (selectedCity !== 'All' && b.city !== selectedCity) return false;
    if (selectedFood !== 'All' && b.food !== selectedFood) return false;
    return true;
  });

  return (
    <main className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            Breweries in Dayton
          </h1>
          <p className="text-lg opacity-90">
            19 craft breweries across the Dayton area
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-charcoal border-b border-gold/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="space-y-4">
            {/* City Filter */}
            <div>
              <p className="text-xs font-semibold text-gold/60 uppercase mb-2">
                City
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors whitespace-nowrap ${
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

            {/* Food Filter */}
            <div>
              <p className="text-xs font-semibold text-gold/60 uppercase mb-2">
                Food
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'full_kitchen', 'food_trucks', 'snacks', 'no_food'].map(
                  (food) => (
                    <button
                      key={food}
                      onClick={() =>
                        setSelectedFood(
                          food as typeof selectedFood
                        )
                      }
                      className={`px-4 py-2 rounded-full font-semibold transition-colors whitespace-nowrap ${
                        selectedFood === food
                          ? 'btn-gold text-charcoal'
                          : 'border border-gold/30 text-gold hover:bg-gold/10'
                      }`}
                    >
                      {food === 'All'
                        ? 'All'
                        : FOOD_CONFIG[food as FoodType].label}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-charcoal/70 mb-8 font-semibold">
            {filtered.length} breweries in Dayton area
          </p>

          <div className="grid gap-6">
            {filtered.map((brewery) => (
              <div
                key={brewery.name}
                className="card bg-white border border-charcoal/10 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-charcoal mb-1">
                      {brewery.name}
                    </h3>
                    <p className="text-sm text-charcoal/60 flex items-center gap-1">
                      <MapPin className="w-4 h-4 inline mr-1" /> {brewery.address}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-charcoal/70 mb-4">{brewery.description}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <FoodBadge type={brewery.food} />
                    {brewery.features.map((feature) => (
                      <FeatureBadge key={feature} feature={feature} />
                    ))}
                  </div>

                  {/* Tip */}
                  {brewery.tip && (
                    <div className="bg-yellow-50 border-l-4 border-gold p-3 mb-4 rounded">
                      <p className="text-sm text-yellow-900">
                        <span className="font-semibold"><Lightbulb className="w-4 h-4 inline mr-1" />Pro tip:</span>{' '}
                        {brewery.tip}
                      </p>
                    </div>
                  )}

                  {/* Website Link */}
                  <a
                    href={brewery.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-block"
                  >
                    Visit Website →
                  </a>
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
            <span className="font-semibold"><AlertCircle className="w-4 h-4 inline mr-1" />Note:</span> Hours and food
            offerings change seasonally. Always check the brewery's website
            before visiting.
          </p>
        </div>
      </section>
    </main>
  );
}
