import Link from 'next/link';
import { Leaf, Beer, Flag, Mic2, Car, PartyPopper } from 'lucide-react';

interface ExploreCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

const EXPLORE_SECTIONS: ExploreCard[] = [
  {
    title: 'Parks & Outdoor Spaces',
    description: 'Discover Dayton\'s 41 parks with trails, playgrounds, and scenic views. Find your perfect spot.',
    href: '/explore/parks',
    icon: <Leaf className="w-12 h-12" />,
    color: 'from-green-500/20 to-green-600/20',
  },
  {
    title: 'Breweries & Bars',
    description: 'Explore 19 local breweries with unique atmospheres, food options, and live music venues.',
    href: '/explore/breweries',
    icon: <Beer className="w-12 h-12" />,
    color: 'from-amber-600/20 to-amber-700/20',
  },
  {
    title: 'Golf Courses',
    description: 'Tee off at 13 public, municipal, and private courses. From municipal to championship layouts.',
    href: '/explore/golf',
    icon: <Flag className="w-12 h-12" />,
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    title: 'Things to Do',
    description: 'Experience 73 attractions: museums, nature, amusement parks, arts, and hidden gems.',
    href: '/explore/things-to-do',
    icon: <Mic2 className="w-12 h-12" />,
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    title: 'Day Trips',
    description: 'Venture beyond Dayton to Yellow Springs, Hocking Hills, Columbus, Kings Island, and more.',
    href: '/explore/day-trips',
    icon: <Car className="w-12 h-12" />,
    color: 'from-orange-500/20 to-orange-600/20',
  },
  {
    title: 'Events & Entertainment',
    description: 'Stay up-to-date with Dayton\'s best events, festivals, concerts, and entertainment happenings.',
    href: '/dayton-events',
    icon: <PartyPopper className="w-12 h-12" />,
    color: 'from-red-500/20 to-red-600/20',
  },
];

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-charcoal text-cream px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Explore Dayton</h1>
          <p className="text-xl text-cream/90">
            Discover parks, breweries, golf courses, attractions, day trips, and events. Everything you need to explore your new home.
          </p>
        </div>
      </section>

      {/* Explore Cards Grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPLORE_SECTIONS.map(section => (
              <Link
                key={section.href}
                href={section.href}
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl"
              >
                <div className="card bg-white p-8 h-full border-2 border-charcoal/10 hover:border-gold transition-colors">
                  {/* Background gradient accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${section.color} rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110`} />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4 text-charcoal">{section.icon}</div>
                    <h2 className="text-2xl font-bold text-charcoal mb-3 group-hover:text-gold transition-colors">
                      {section.title}
                    </h2>
                    <p className="text-charcoal/70 text-base leading-relaxed mb-6">
                      {section.description}
                    </p>

                    {/* Arrow indicator */}
                    <div className="inline-flex items-center gap-2 text-gold font-bold">
                      <span>Explore</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-charcoal/5 border-t border-charcoal/10 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Ready to explore?</h2>
          <p className="text-charcoal/70 mb-8">
            Use the filters on each page to find exactly what you're looking for, or browse everything Dayton has to offer.
          </p>
          <Link
            href="/explore/parks"
            className="btn-gold inline-block px-8 py-3 bg-gold text-charcoal font-bold rounded-lg hover:bg-gold/90 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </main>
  );
}
