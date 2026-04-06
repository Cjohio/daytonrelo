'use client'

const ASSET_CATEGORIES = [
  {
    label: 'Logos',
    items: [
      { name: 'DaytonRelo Primary Logo (White)', format: 'PNG', size: '480×160', desc: 'Main horizontal logo for dark backgrounds' },
      { name: 'DaytonRelo Primary Logo (Black)', format: 'PNG', size: '480×160', desc: 'Main horizontal logo for light backgrounds' },
      { name: 'DR Icon Mark', format: 'SVG', size: '120×120', desc: 'Square icon for profile photos, favicons' },
    ],
  },
  {
    label: 'Colors',
    items: null,
    colors: [
      { name: 'Navy', hex: '#0C1A32', usage: 'Primary background, sidebar' },
      { name: 'Gold', hex: '#C9A84C', usage: 'Primary accent, CTAs, highlights' },
      { name: 'Gold Light', hex: '#E2C97E', usage: 'Hover states, subtle accents' },
      { name: 'Gold Dark', hex: '#A07830', usage: 'Pressed states, deep accent' },
      { name: 'Charcoal', hex: '#1A1A1A', usage: 'Body text, site header' },
      { name: 'Cream', hex: '#F8F6F0', usage: 'Light background, off-white' },
    ],
  },
  {
    label: 'Brand Templates',
    items: [
      { name: 'Instagram Square Template', format: 'Canva', size: '1080×1080', desc: 'Base template for feed posts' },
      { name: 'Instagram Story Template', format: 'Canva', size: '1080×1920', desc: 'Story / Reel cover frame' },
      { name: 'Facebook Post Template', format: 'Canva', size: '1200×630', desc: 'Link preview optimized' },
      { name: 'LinkedIn Banner', format: 'Canva', size: '1584×396', desc: 'Profile cover image' },
    ],
  },
  {
    label: 'Photography',
    items: [
      { name: 'Chris Jurgens Headshot', format: 'JPG', size: '800×800', desc: 'Professional headshot, square crop' },
      { name: 'WPAFB Area Aerial Shot', format: 'JPG', size: '1920×1080', desc: 'Aerial view of Wright-Patterson area' },
      { name: 'Dayton Skyline', format: 'JPG', size: '1920×1080', desc: 'Downtown Dayton skyline at dusk' },
      { name: 'Beavercreek Neighborhood', format: 'JPG', size: '1920×1080', desc: 'Aerial of Beavercreek residential' },
    ],
  },
]

export default function AssetsPage() {
  return (
    <div className="min-h-full p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Brand Assets</h1>
          <p className="text-gray-500 text-sm mt-0.5">Logos, colors, templates, and photography</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm rounded-lg transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Asset
        </button>
      </div>

      {/* Coming soon banner */}
      <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-xl px-5 py-4 flex items-start gap-3">
        <span className="text-[#C9A84C] text-lg flex-shrink-0">ℹ️</span>
        <div>
          <p className="text-[#C9A84C] font-semibold text-sm">Asset management coming soon</p>
          <p className="text-gray-400 text-xs mt-0.5">
            Full asset upload, storage, and linking to content_assets table is in development.
            Asset catalog below is reference only.
          </p>
        </div>
      </div>

      {/* Asset categories */}
      {ASSET_CATEGORIES.map(cat => (
        <section key={cat.label}>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{cat.label}</h2>

          {/* Color swatches */}
          {cat.colors && (
            <div className="grid grid-cols-6 gap-3">
              {cat.colors.map(c => (
                <div key={c.hex} className="group">
                  <div
                    className="w-full aspect-square rounded-xl border border-white/10 mb-2 cursor-pointer transition-transform group-hover:scale-105"
                    style={{ backgroundColor: c.hex }}
                    title={c.hex}
                  />
                  <p className="text-xs text-white font-semibold">{c.name}</p>
                  <p className="text-[10px] font-mono text-gray-500">{c.hex}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{c.usage}</p>
                </div>
              ))}
            </div>
          )}

          {/* Asset list */}
          {cat.items && (
            <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl overflow-hidden">
              <div className="divide-y divide-white/[0.05]">
                {cat.items.map(item => (
                  <div key={item.name} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <span className="text-xs font-mono text-gray-400 bg-white/[0.05] px-2 py-0.5 rounded">{item.format}</span>
                        <p className="text-[11px] text-gray-600 mt-0.5">{item.size}</p>
                      </div>
                      <button
                        className="p-2 text-gray-600 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 rounded-lg transition-colors"
                        title="Download"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  )
}
