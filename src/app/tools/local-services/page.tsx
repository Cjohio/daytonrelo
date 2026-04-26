// ─────────────────────────────────────────────────────────────────────────────
//  /tools/local-services — Server component that fetches the live list and
//  hands it off to the client component for filter UI.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@/lib/supabase/server';
import LocalServicesClient, { type Service } from './LocalServicesClient';

export const metadata = {
  title: 'Local Services Directory | Dayton Relocation',
  description:
    'Chris-curated local services for new Dayton residents — movers, plumbers, HVAC, cleaning, electricians, contractors, furniture and more.',
};

export const revalidate = 300;

interface ServiceRow {
  id: string;
  name: string;
  category: string;
  phone: string | null;
  website: string | null;
  neighborhood: string | null;
  description: string | null;
  is_featured: boolean;
  sort_order: number;
}

export default async function LocalServicesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('local_services')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })
    .returns<ServiceRow[]>();

  if (error) {
    console.error('[local-services] fetch error:', error);
  }

  const services: Service[] = (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    category: r.category,
    phone: r.phone ?? '',
    website: r.website ?? '',
    neighborhood: r.neighborhood ?? '',
    description: r.description ?? '',
    featured: r.is_featured,
  }));

  return <LocalServicesClient services={services} />;
}
