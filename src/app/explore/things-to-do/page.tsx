'use client';

import { useState } from 'react';
import { Car, MapPin } from 'lucide-react';

type Category =
  | 'All'
  | 'Museums & History'
  | 'Nature & Outdoors'
  | 'Amusement & Thrills'
  | 'Arts & Culture'
  | 'Local Gems';

interface Attraction {
  name: string;
  city: string;
  drive: string;
  description: string;
  isFree: boolean;
  priceRange: 'FREE' | '$' | '$$' | '$$$' | '$$$$';
  priceDetail: string;
  url: string;
  category: Category;
}

const ATTRACTIONS: Attraction[] = [
  {
    name: 'National Museum of the U.S. Air Force',
    city: 'Wright-Patterson AFB',
    drive: '10 min',
    description:
      'The world\'s largest military aviation museum — 360+ aircraft and missiles across 17 indoor acres. Includes presidential aircraft, space capsules, and WWII galleries. Open to the public.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Always free admission',
    url: 'https://www.nationalmuseum.af.mil',
    category: 'Museums & History',
  },
  {
    name: 'Dayton Art Institute',
    city: 'Dayton',
    drive: '5 min',
    description:
      'One of the top encyclopedic art museums in the Midwest with 27,000+ works spanning 5,000 years. Permanent collection is always free. Special exhibitions priced separately.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free (general collection) · Special exhibits extra',
    url: 'https://www.daytonartinstitute.org',
    category: 'Museums & History',
  },
  {
    name: 'Carillon Historical Park',
    city: 'Dayton',
    drive: '10 min',
    description:
      "A 65-acre outdoor museum tracing Dayton's innovation history — from the Wright Brothers' 1905 Flyer III to Deeds Carillon. Ohio's Official Aviation Museum.",
    isFree: false,
    priceRange: '$',
    priceDetail: '$12 adult · $7 child (6–17) · Under 6 free',
    url: 'https://www.daytonhistory.org',
    category: 'Museums & History',
  },
  {
    name: 'Boonshoft Museum of Discovery',
    city: 'Dayton',
    drive: '10 min',
    description:
      'A hands-on natural history and science museum with 300+ interactive exhibits including live aquarium, planetarium, and outdoor nature trails. A must for families with kids.',
    isFree: false,
    priceRange: '$$',
    priceDetail: '$15 adult · $13 child (2–12)',
    url: 'https://www.boonshoftmuseum.org',
    category: 'Museums & History',
  },
  {
    name: 'Aviation Heritage Hall',
    city: 'Dayton',
    drive: '15 min',
    description:
      'A working restoration facility and aviation museum with WWII aircraft including a B-17 and B-25 bomber. Volunteer-staffed and wonderfully authentic.',
    isFree: false,
    priceRange: '$',
    priceDetail: '$7 adult · $5 child (6–17) · Under 6 free',
    url: 'https://www.aviationheritagehall.org',
    category: 'Museums & History',
  },
  {
    name: 'Piatt Castles',
    city: 'Chillicothe',
    drive: '40 min',
    description:
      'Two Norman-style stone castles built by the Piatt brothers in the 1860s–70s. Filled with original European furnishings and antiques. A truly quirky Ohio landmark.',
    isFree: false,
    priceRange: '$$',
    priceDetail: '$10 adult per castle · $6 child · Combo tickets available',
    url: 'https://www.piattcastles.org',
    category: 'Museums & History',
  },
  {
    name: 'Serpent Mound State Historic Site',
    city: 'Peebles',
    drive: '55 min',
    description:
      'A UNESCO World Heritage Site — one of the most extensive prehistoric earthworks in North America, built by the Hopewell people 1,000+ years ago. Incredible mystery and views from atop the mound.',
    isFree: false,
    priceRange: '$',
    priceDetail: '$8 adult · $4 child (6–12) · Grounds FREE',
    url: 'https://www.ohiohistory.org/visit/serpent-mound',
    category: 'Museums & History',
  },
  {
    name: 'Cincinnati Union Terminal & Cincy Museums',
    city: 'Cincinnati',
    drive: '55 min',
    description:
      'A spectacular Art Deco Union Terminal housing natural history, history, and children\'s museums plus an Omnimax theater. One of the most beautiful buildings in the Midwest.',
    isFree: false,
    priceRange: '$$',
    priceDetail: '$19 adult · $13 child (3–12) · Omnimax extra',
    url: 'https://www.cincymuseum.org',
    category: 'Museums & History',
  },
  {
    name: 'The American Sign Museum',
    city: 'Cincinnati',
    drive: '55 min',
    description:
      'A surprisingly fascinating museum tracing 200 years of American commercial sign-making — neon, painted, electric, and vintage. Fun for all ages.',
    isFree: false,
    priceRange: '$$',
    priceDetail: '$15 adult · $8 student · Under 5 free',
    url: 'https://www.americansignmuseum.org',
    category: 'Museums & History',
  },
  {
    name: 'Fort Ancient State Historic Site',
    city: 'Oregonia',
    drive: '20 min',
    description:
      'A massive hilltop earthwork built by the Fort Ancient people 700+ years ago — 3.5 miles of geometric walls. Museum and trails on-site. One of Ohio\'s most important archaeological sites.',
    isFree: false,
    priceRange: '$',
    priceDetail: '$5 adult · $3 child · Free on Sundays',
    url: 'https://www.ohiohistory.org/visit/fort-ancient',
    category: 'Museums & History',
  },
  {
    name: 'Ohio History Center',
    city: 'Columbus',
    drive: '55 min',
    description:
      'A state history complex spanning 2,000 years — from Native American earthworks to a fully restored 1800s Ohio & Erie Canal Lock & Towpath. Extensive museum and library.',
    isFree: false,
    priceRange: '$$',
    priceDetail: '$10 adult · $5 child (5–12) · Canal boat ride extra',
    url: 'https://www.ohiohistory.org',
    category: 'Museums & History',
  },
  {
    name: 'Glen Helen Nature Preserve',
    city: 'Yellow Springs',
    drive: '25 min',
    description:
      'A stunning 780-acre nature preserve with meadows, forests, and dramatic gorge trails. Home to Glen Helen Outdoor Education Center and some of the most scenic trails in Ohio.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to explore',
    url: 'https://www.antioch.edu/glen-helen/',
    category: 'Nature & Outdoors',
  },
  {
    name: 'Clifton Gorge State Nature Preserve',
    city: 'Yellow Springs',
    drive: '25 min',
    description:
      'A spectacular limestone gorge carved by the Little Miami River — dramatic cliffs, waterfalls, and world-class hiking trails. Connects to John Bryan State Park for extended adventures.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free',
    url: 'https://www.dnr.state.oh.us/tabid/736/default.aspx',
    category: 'Nature & Outdoors',
  },
  {
    name: 'Miamisburg Mound',
    city: 'Miamisburg',
    drive: '15 min',
    description:
      'The largest conical burial mound in Ohio — 65 feet tall and 800 feet in circumference, built by the Adena people over 2,000 years ago. A short hike to the top gives sweeping views of the Miami River valley. Quiet, free, and surprisingly impressive.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free',
    url: 'https://www.miamisburg.gov/Parks/Miamisburg-Mound',
    category: 'Nature & Outdoors',
  },
  {
    name: 'Kings Island',
    city: 'Mason',
    drive: '55 min',
    description:
      'One of the best regional amusement parks in the country — 100 rides including the Beast (world\'s longest wooden coaster), Orion giga coaster, and a full water park. Can easily spend 2 days.',
    isFree: false,
    priceRange: '$$$$',
    priceDetail: '~$75–$100+ single day · Season passes ~$79',
    url: 'https://www.visitkingsisland.com',
    category: 'Amusement & Thrills',
  },
  {
    name: 'Newport Aquarium',
    city: 'Newport, KY',
    drive: '55 min',
    description:
      'Voted one of the top aquariums in the U.S. — walk-through shark tunnels, touch pools, penguins, and a jawdropping 1,000-pound alligator snapping turtle. Right across the river from Cincinnati.',
    isFree: false,
    priceRange: '$$$',
    priceDetail: '$30 adult · $20 child (2–12) · Under 2 free',
    url: 'https://www.newportaquarium.com',
    category: 'Amusement & Thrills',
  },
  {
    name: 'Ark Encounter',
    city: 'Williamstown, KY',
    drive: '50 min',
    description:
      'A life-size, 510-foot recreation of Noah\'s Ark — one of the largest timber-frame structures in the world. Interactive exhibits across three decks. Unique and visually impressive regardless of belief.',
    isFree: false,
    priceRange: '$$$',
    priceDetail: '$49 adult · $28 child (5–17) · Parking $15',
    url: 'https://arkencounter.com',
    category: 'Amusement & Thrills',
  },
  {
    name: 'Creation Museum',
    city: 'Petersburg, KY',
    drive: '55 min',
    description:
      'A state-of-the-art natural history museum presenting a biblical worldview with planetarium, botanical gardens, zip lines, petting zoo, and well-produced exhibits. Popular with families.',
    isFree: false,
    priceRange: '$$$',
    priceDetail: '$35 adult · $20 child (5–17) · Combo tickets with Ark',
    url: 'https://creationmuseum.org',
    category: 'Amusement & Thrills',
  },
  {
    name: 'Ohio Caverns',
    city: 'West Liberty',
    drive: '45 min',
    description:
      'Ohio\'s largest natural cavern system — spectacular white crystal stalactites and stalagmites formed over millions of years. Year-round 54°F underground. Kid-friendly guided tours.',
    isFree: false,
    priceRange: '$$',
    priceDetail: '$20 adult · $12 child (5–12) · Under 5 free',
    url: 'https://www.ohiocaverns.com',
    category: 'Amusement & Thrills',
  },
  {
    name: 'Zane Shawnee Caverns',
    city: 'Bellefontaine',
    drive: '45 min',
    description:
      'A unique cave system with rare cave pearls — smooth, round mineral formations found in fewer than 80 caves worldwide. Above ground: a campground and small Shawnee Nation museum.',
    isFree: false,
    priceRange: '$$',
    priceDetail: '~$16 adult · ~$10 child',
    url: 'https://www.zaneshawneecaverns.org',
    category: 'Amusement & Thrills',
  },
  {
    name: 'Eldora Speedway',
    city: 'New Weston',
    drive: '45 min',
    description:
      'A legendary half-mile clay oval track — one of the premier dirt racing venues in the world. Hosts major NASCAR and World of Outlaws events. Loud, fast, and genuinely exciting.',
    isFree: false,
    priceRange: '$$',
    priceDetail: '$20–$75 depending on event',
    url: 'https://www.eldoraspeedway.com',
    category: 'Amusement & Thrills',
  },
  {
    name: 'Great Wolf Lodge',
    city: 'Mason',
    drive: '55 min',
    description:
      'A massive indoor water park resort — perfect for families with young kids. Multiple water slides, wave pools, a ropes course, arcade, and MagiQuest interactive game. Book in advance.',
    isFree: false,
    priceRange: '$$$',
    priceDetail: 'Admission varies · Day passes $50–$80+',
    url: 'https://www.greatwolflodge.com',
    category: 'Amusement & Thrills',
  },
  {
    name: 'iFLY Skydiving Simulator',
    city: 'Cincinnati',
    drive: '55 min',
    description:
      'Experience indoor skydiving in a vertical wind tunnel — for absolute beginners through advanced flyers. Intense and genuinely fun. Great for birthdays and team events.',
    isFree: false,
    priceRange: '$$$',
    priceDetail: '~$70–$120+ per person depending on package',
    url: 'https://www.iflyworld.com',
    category: 'Amusement & Thrills',
  },
  {
    name: 'Playhouse Square Theater District',
    city: 'Cleveland',
    drive: '2 hours',
    description:
      'America\'s largest performing arts center outside of New York — 4 historic theaters hosting Broadway shows, plays, musicals, ballet, and concerts. World-class productions.',
    isFree: false,
    priceRange: '$$$',
    priceDetail: '$30–$150+ per ticket',
    url: 'https://www.playhousequare.org',
    category: 'Arts & Culture',
  },
  {
    name: 'Contemporary Arts Center',
    city: 'Cincinnati',
    drive: '55 min',
    description:
      'A cutting-edge contemporary art museum in a stunning Zaha Hadid building — constantly rotating exhibitions of modern and contemporary art.',
    isFree: false,
    priceRange: '$',
    priceDetail: '$10 adult · Free on Mondays',
    url: 'https://www.contemporaryartscenter.org',
    category: 'Arts & Culture',
  },
  {
    name: 'Taft Museum of Art',
    city: 'Cincinnati',
    drive: '55 min',
    description:
      'An intimate art museum in a stunning Federal-style mansion from 1820. Houses Old Masters including Rembrandt, Hals, Gainsborough, and Ingres alongside stunning decorative arts.',
    isFree: false,
    priceRange: '$',
    priceDetail: '$12 adult · $10 senior · Free on Sundays',
    url: 'https://www.taftmuseum.org',
    category: 'Arts & Culture',
  },
  {
    name: 'Little Art Theatre',
    city: 'Yellow Springs',
    drive: '25 min',
    description:
      "Ohio's oldest continuously operating movie theater (since 1929) — indie films, foreign films, documentaries, and classics in a wonderfully quirky single-screen theater. A Yellow Springs institution.",
    isFree: false,
    priceRange: '$',
    priceDetail: '$9–$12 per film',
    url: 'https://www.littleart.com',
    category: 'Arts & Culture',
  },
  {
    name: 'Dayton Philharmonic Orchestra',
    city: 'Dayton',
    drive: '5 min',
    description:
      'One of the Midwest\'s finest orchestras performing at the Schuster Center — classical masterworks, pops series, and family concerts. Occasional free performances in the parks.',
    isFree: false,
    priceRange: '$$',
    priceDetail: '$20–$100+ depending on series',
    url: 'https://www.daytonlive.org/dayton-philharmonic',
    category: 'Arts & Culture',
  },
  {
    name: 'Krohn Conservatory',
    city: 'Cincinnati',
    drive: '55 min',
    description:
      'A stunning Art Deco greenhouse in Eden Park housing thousands of exotic plants from around the world. Famous for its annual butterfly show — tens of thousands of free-flying butterflies in a tropical rainforest setting. Truly magical.',
    isFree: false,
    priceRange: '$',
    priceDetail: '$6 adult · $4 child · Butterfly show $12/$8',
    url: 'https://www.cincinnatiparks.com/krohn-conservatory/',
    category: 'Arts & Culture',
  },
  {
    name: 'Columbus Museum of Art',
    city: 'Columbus',
    drive: '55 min',
    description:
      'A dynamic art museum with an outstanding Wonder Room (hands-on creativity space for all ages), strong American and European collections, and impressive rotating exhibitions. The Wonder Room alone is worth the trip with kids.',
    isFree: false,
    priceRange: '$$',
    priceDetail: '$18 adult · $12 child (4–17) · Free Sundays 10am–noon',
    url: 'https://www.columbusmuseum.org',
    category: 'Arts & Culture',
  },
  {
    name: 'Sorg Opera House',
    city: 'Middletown',
    drive: '30 min',
    description:
      'A beautifully restored 1891 opera house — one of the finest intact Victorian theaters in the Midwest. Hosts live performances, concerts, comedy, and community events. A real hidden gem just south of Dayton.',
    isFree: false,
    priceRange: '$',
    priceDetail: '$15–$50 depending on show',
    url: 'https://sorgoperahouse.org',
    category: 'Arts & Culture',
  },
  {
    name: 'Yellow Springs Village',
    city: 'Yellow Springs',
    drive: '25 min',
    description:
      "Dayton's favorite day trip — a quirky, artistic small town with independent shops, galleries, restaurants, and street performers. Home to the Tom's Ice Cream Bowl, Winds Café, and Miles of Smiles mural.",
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to explore · Shopping & dining extra',
    url: 'https://www.yellowspringsohio.org',
    category: 'Local Gems',
  },
  {
    name: 'Young\'s Jersey Dairy',
    city: 'Yellow Springs',
    drive: '25 min',
    description:
      'A working family dairy farm with a bakery, ice cream shop, miniature golf, batting cages, and putt-putt. The Dairy Store serves ice cream made fresh on-site. Beloved by Daytonians of all ages.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to visit · Food & activities from $3',
    url: 'https://www.youngsdairy.com',
    category: 'Local Gems',
  },
  {
    name: 'Oregon District',
    city: 'Dayton',
    drive: '5 min',
    description:
      "Dayton's historic entertainment and arts district — Victorian architecture, locally owned restaurants, craft breweries, live music venues, and boutique shops. The heart of Dayton's nightlife.",
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to explore · Dining & drinks extra',
    url: 'https://www.daytonoregondistrict.com',
    category: 'Local Gems',
  },
  {
    name: 'Wright Brothers National Memorial — Huffman Prairie',
    city: 'Fairborn',
    drive: '10 min',
    description:
      'The actual field where Wilbur and Orville Wright mastered controlled flight in 1904–05 — right here in the Dayton area. A National Park site. Interpretive signs and walking path mark the history.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free (National Park)',
    url: 'https://www.nps.gov/daav',
    category: 'Local Gems',
  },
  {
    name: 'Dayton Dragons Baseball',
    city: 'Dayton',
    drive: '5 min',
    description:
      "The Cincinnati Reds' Single-A affiliate plays at Day Air Ballpark in the heart of downtown. Dayton's most beloved sports team — sold out nearly every home game for 20+ consecutive years.",
    isFree: false,
    priceRange: '$',
    priceDetail: '$10–$25 per ticket',
    url: 'https://www.daytondragons.com',
    category: 'Local Gems',
  },
  {
    name: 'Jungle Jim\'s International Market',
    city: 'Fairfield',
    drive: '50 min',
    description:
      'A legendary 300,000+ sq ft international grocery experience — more entertainment than shopping. International foods from 70+ countries, an indoor waterfall, animatronic characters, and a wine shop with 50,000+ bottles.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to browse',
    url: 'https://www.junglejims.com',
    category: 'Local Gems',
  },
  {
    name: 'Hartman Rock Garden',
    city: 'Springfield',
    drive: '20 min',
    description:
      'A one-of-a-kind folk art environment created by Ben Hartman from 1932–1944 — thousands of quartz rocks assembled into miniature castles, biblical scenes, and American landmarks. Genuinely unique.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free',
    url: 'https://www.cityofspringfieldohio.com',
    category: 'Local Gems',
  },
  {
    name: 'Hawthorn Hill — Wright Brothers Home',
    city: 'Oakwood',
    drive: '15 min',
    description:
      "The Italian Renaissance Revival mansion Wilbur and Orville Wright built at the height of their fame. Orville lived here until his death in 1948. Guided tours reveal original furnishings and inventions.",
    isFree: false,
    priceRange: '$',
    priceDetail: '$15 adult · $10 child',
    url: 'https://www.daytonhistory.org/visit/hawthorn-hill/',
    category: 'Local Gems',
  },
  {
    name: 'Carriage Hill MetroPark & Farm',
    city: 'Huber Heights',
    drive: '20 min',
    description:
      'A living history farm from the 1880s — costumed interpreters demonstrate daily life in 19th-century Ohio. Draft horses, heritage breed animals, a farmhouse, and miles of beautiful trails.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free',
    url: 'https://www.metroparks.org/places-to-go/carriage-hill/',
    category: 'Local Gems',
  },
  {
    name: 'RiverScape MetroPark',
    city: 'Dayton',
    drive: '5 min',
    description:
      "Dayton's downtown riverfront park at the confluence of the Great Miami and Mad Rivers. Seasonal ice skating rink, summer festivals, water bikes, and beautiful river views. Free year-round.",
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free (some rentals & events extra)',
    url: 'https://www.metroparks.org/places-to-go/riverscape/',
    category: 'Local Gems',
  },
  {
    name: 'Newport on the Levee',
    city: 'Newport, KY',
    drive: '55 min',
    description:
      'A riverfront entertainment complex just across the Ohio River from downtown Cincinnati — restaurants, bars, a bowling alley, comedy club, mini-golf, and stunning skyline views. Newport Aquarium is right here too. Great for a full evening out.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to explore · Dining & activities extra',
    url: 'https://www.newportonthelevee.com',
    category: 'Local Gems',
  },
  {
    name: 'Waynesville Antique Capital',
    city: 'Waynesville',
    drive: '30 min',
    description:
      'A charming historic village with 30+ antique and specialty shops packed into a few walkable blocks — plus boutiques, bakeries, and a great small-town atmosphere. A beloved day trip for antique hunters and casual browsers alike.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to browse · Shopping extra',
    url: 'https://www.waynesvilleohio.com',
    category: 'Local Gems',
  },
  {
    name: 'The Golden Lamb',
    city: 'Lebanon',
    drive: '35 min',
    description:
      "Ohio's oldest continuously operating inn and restaurant, open since 1803. Charles Dickens, 10 U.S. Presidents, and Mark Twain all stayed here. The dining room is beloved for its comfort food; the Shaker antique collection throughout the building is remarkable.",
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to visit · Dining $20–$50/person',
    url: 'https://www.goldenlamb.com',
    category: 'Local Gems',
  },
  {
    name: 'German Village',
    city: 'Columbus',
    drive: '55 min',
    description:
      "A stunning 233-acre historic neighborhood of 1800s German brick homes, flower-filled sidewalks, and independent restaurants — just south of downtown Columbus. Free to walk, with some of the best brunch spots and bakeries in Ohio. The Book Loft (32-room independent bookstore) is a must.",
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to explore · Dining & shopping extra',
    url: 'https://www.germanvillage.com',
    category: 'Local Gems',
  },
  {
    name: 'Dayton Arcade',
    city: 'Dayton',
    drive: '5 min',
    description:
      'A stunning 1904 Beaux-Arts arcade building in the heart of downtown Dayton — completely revitalized with local restaurants, creative businesses, a food hall, and a rooftop bar. One of the best adaptive reuse projects in Ohio. Gorgeous architecture.',
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to explore · Dining & drinks extra',
    url: 'https://www.daytonarcade.com',
    category: 'Local Gems',
  },
  {
    name: 'Warped Wing Brewing Company',
    city: 'Dayton',
    drive: '5 min',
    description:
      "Dayton's flagship craft brewery in a beautifully converted 1890s industrial building — named after the Wright Brothers' wing-warping flight technique. Award-winning beers, a full food menu, and one of the best patios in the city. A great introduction to Dayton's beer scene.",
    isFree: true,
    priceRange: 'FREE',
    priceDetail: 'Free to visit · Beers from $6',
    url: 'https://www.warpedwing.com',
    category: 'Local Gems',
  },
];

const CATEGORIES: Category[] = [
  'All',
  'Museums & History',
  'Nature & Outdoors',
  'Amusement & Thrills',
  'Arts & Culture',
  'Local Gems',
];

function PriceBadge({ isFree, range }: { isFree: boolean; range: string }) {
  if (isFree) {
    return (
      <div className="inline-block px-2 py-1 rounded-md text-xs font-bold bg-green-100 text-green-800">
        FREE
      </div>
    );
  }
  return (
    <div className="inline-block px-2 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700">
      {range}
    </div>
  );
}

export default function ThingsToDoPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filtered =
    selectedCategory === 'All'
      ? ATTRACTIONS
      : ATTRACTIONS.filter((a) => a.category === selectedCategory);

  return (
    <main className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal text-cream py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            Things to Do
          </h1>
          <p className="text-lg opacity-90">
            73+ attractions in Dayton and beyond
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-charcoal border-b border-gold/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 overflow-x-auto">
          <div className="flex gap-2 whitespace-nowrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'btn-gold text-charcoal'
                    : 'border border-gold/30 text-gold hover:bg-gold/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-charcoal/70 mb-8 font-semibold">
            {filtered.length} attraction{filtered.length !== 1 ? 's' : ''}
          </p>

          <div className="grid gap-6">
            {filtered.map((attraction) => (
              <div
                key={attraction.name}
                className="card bg-white border border-charcoal/10 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-charcoal mb-2">
                        {attraction.name}
                      </h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-charcoal/60 flex items-center gap-1">
                          <Car className="w-4 h-4" /> {attraction.drive}
                        </span>
                        <span className="text-sm text-charcoal/60 flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {attraction.city}
                        </span>
                      </div>
                    </div>
                    <PriceBadge
                      isFree={attraction.isFree}
                      range={attraction.priceRange}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-charcoal/70 mb-4">
                    {attraction.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                    <p className="text-xs text-charcoal/60">
                      {attraction.priceDetail}
                    </p>
                    <a
                      href={attraction.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold inline-block text-sm py-1 px-3"
                    >
                      Website →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
