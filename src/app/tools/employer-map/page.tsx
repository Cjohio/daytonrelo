// ─────────────────────────────────────────────────────────────────────────────
//  /tools/employer-map — Major Dayton-area employers (server component)
//
//  Reads from public.employers in Supabase (same table the mobile app uses) so
//  edits in the dashboard show up on both surfaces with no rebuild required.
// ─────────────────────────────────────────────────────────────────────────────

import { Building2, MapPin, Car, Home } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Dayton Employer Directory | Dayton Relocation',
  description:
    'Major employers in Dayton by industry with locations, contact info, and nearest neighborhoods.',
};

// Re-render at most every 5 minutes so editorial updates land quickly without
// hammering Supabase on every request.
export const revalidate = 300;

interface EmployerRow {
  id: string;
  name: string;
  industry: string;
  employees: string;
  address: string;
  nearest_neighborhoods: string[] | null;
  avg_commute: string;
  maps_url: string;
  notes: string | null;
  sort_order: number;
}

export default async function EmployerMapPage() {
  const supabase = await createClient();

  const { data: employers, error } = await supabase
    .from('employers')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })
    .returns<EmployerRow[]>();

  if (error) {
    console.error('[employer-map] fetch error:', error);
  }

  const rows = employers ?? [];

  // Derive the industry order from the data (preserving sort_order).
  const industries = Array.from(new Set(rows.map((r) => r.industry)));

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-3">Dayton Employer Directory</h1>
          <p className="text-lg text-gray-600">
            Major employers across the Dayton metro area. Click on an employer to see nearby
            neighborhoods and average commute times.
          </p>
        </div>

        {rows.length === 0 ? (
          <div className="card bg-white border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No employers listed yet.</p>
          </div>
        ) : (
          industries.map((industry) => {
            const industryEmployers = rows.filter((e) => e.industry === industry);
            if (industryEmployers.length === 0) return null;

            return (
              <div key={industry} className="mb-16">
                <h2 className="section-label mb-8">{industry}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {industryEmployers.map((emp) => (
                    <div key={emp.id} className="card bg-white border border-gray-200">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-charcoal flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-gold" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-charcoal">{emp.name}</h3>
                          <p className="text-sm text-gray-600">{emp.employees} employees</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4 pb-4 border-t border-gray-200 pt-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-semibold text-charcoal">{emp.address}</p>
                        </div>

                        <div className="flex items-start gap-3">
                          <Car className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-semibold text-charcoal">
                            Avg Commute: {emp.avg_commute}
                          </p>
                        </div>

                        {emp.nearest_neighborhoods && emp.nearest_neighborhoods.length > 0 && (
                          <div className="flex items-start gap-3">
                            <Home className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                            <p className="text-sm font-semibold text-charcoal mb-1">
                              Nearby: {emp.nearest_neighborhoods.join(', ')}
                            </p>
                          </div>
                        )}
                      </div>

                      <a
                        href={emp.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold w-full text-center text-sm py-2 block"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {/* CTA */}
        <section className="bg-charcoal text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gold mb-3">Not seeing your employer?</h2>
          <p className="text-gray-300 mb-6">
            We cover all of the Dayton metro area and work with professionals across every industry.
          </p>
          <a href="/contact" className="btn-gold inline-block">
            Ask an Agent
          </a>
        </section>
      </div>
    </main>
  );
}
