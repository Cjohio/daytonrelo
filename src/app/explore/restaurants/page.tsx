import type { Metadata } from 'next';
import RestaurantsClient from './RestaurantsClient';

export const metadata: Metadata = {
  title: 'Dayton Restaurants Guide — Iconic & Best of Dayton | Dayton Relo',
  description:
    "Chris's local food guide to Dayton, Ohio. The iconic historic staples every Daytonian loves, plus the best modern restaurants from the Oregon District to Beavercreek.",
};

export default function RestaurantsPage() {
  return <RestaurantsClient />;
}
