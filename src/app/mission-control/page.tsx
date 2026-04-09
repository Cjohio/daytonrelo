'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Palette, PenSquare, Film } from 'lucide-react'
import { useContentItems } from '@/lib/mission-control/use-content'
import type { Platform, ContentStatus } from '@/lib/mission-control/types'
import { PLATFORM_CONFIG, STATUS_CONFIG, CONTENT_TYPE_CONFIG } from '@/lib/mission-control/types'

const PLATFORMS: Platform[] = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'x']
const STATUSES: ContentStatus[] = ['draft', 'review', 'approved', 'scheduled', 'posted']

function PlatformIcon({ platform, size = 'sm' }: { platform: Platform; size?: 'sm' | 'md' }) {
  const cfg = PLATFORM_CONFIG[platform]
  const sz = size === 'sm' ? 'w-5 h-5 text-[9px]' : 'w-7 h-7 text-xs'
  return (
    <span
      className={`inline-flex items-center justify-center ${sz} rounded font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: cfg.color }}
      title={cfg.label}
    >
      {cfg.icon}
    </span>
  )
}

const QUICK_CREATE = [
  {
    type: 'brand_template' as const,
    title: 'Brand Template',
    desc: 'Graphic post with DR branding',
    icon: <Palette className="w-6 h-6" />,
    color: 'from-[#C9A84C]/20 to-[#C9A84C]/5 border-[#C9A84C]/30',
    textColor: 'text-[#C9A84C]',
  },
  {
    type: 'long_form' as const,
    title: 'Long-Form Post',
    desc: 'In-depth caption + multi-platform',
    icon: <PenSquare className="w-6 h-6" />,
    color: 'from-blue-900/30 to-blue-900/10 border-blue-700/40',
    textColor: 'text-blue-300',
  },
  {
    type: 'story_video' as const,
    title: 'Story Video',
    desc: 'Short-form reel / TikTok / YouTube',
    icon: <Film className="w-6 h-6" />,
    color: 'from-pink-900/30 to-pink-900/10 border-pink-700/40',
    textColor: 'text-pink-300',
  },
]

export default function DashboardPage() {
  const { items, loading, usingMock } = useContentItems()

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const thisMonthItems = useMemo(
    () => items.filter(i => {
      const d = new Date(i.created_at)
      return d >= startOfMonth && d <= endOfMonth
    }),
    [items]
  )

  const statusCounts = useMemo(() => {
    const counts: Record<ContentStatus, number> = { draft: 0, review: 0, approved: 0, scheduled: 0, posted: 0 }
    thisMonthItems.forEach(i => { counts[i.status] = (counts[i.status] || 0) + 1 })
    return counts
  }, [thisMonthItems])

  const platformCounts = useMemo(() => {
    const counts: Record<Platform, number> = { instagram: 0, facebook: 0, tiktok: 0, youtube: 0, linkedin: 0, x: 0 }
    items.forEach(i => i.target_platforms.forEach(p => { counts[p] = (counts[p] || 0) + 1 }))
    return counts
  }, [items])

  const upcoming = useMemo(() => {
    const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    return items
      .filter(i => i.scheduled_date && (i.status === 'scheduled' || i.status === 'approved'))
      .filter(i => {
        const d = new Date(i.scheduled_date!)
        return d >= now && d <= sevenDays
      })
      .sort((a, b) => new Date(a.scheduled_date!).getTime() - new Date(b.scheduled_date!).getTime())
  }, [items])

  return (
    <div className="min-h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            {usingMock && <span className="ml-2 text-[#C9A84C] text-xs">(mock data)</span>}
          </p>
        </div>
        <Link
          href="/mission-control/create"
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] hover:bg-[#A07830] text-[#070F1E] font-bold text-sm rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Content
        </Link>
      </div>

      {/* Status cards */}
      <section>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">This Month by Status</h2>
        <div className="grid grid-cols-5 gap-3">
          {STATUSES.map(status => {
            const cfg = STATUS_CONFIG[status]
            return (
              <div key={status} className={`${cfg.color} border ${cfg.borderColor} rounded-xl p-4`}>
                <div className={`text-3xl font-black ${cfg.textColor}`}>{statusCounts[status]}</div>
                <div className={`text-xs font-semibold mt-1 ${cfg.textColor} opacity-80`}>{cfg.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="grid grid-cols-3 gap-6">
        {/* Upcoming posts */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Upcoming — Next 7 Days</h2>
            <Link href="/mission-control/calendar" className="text-xs text-[#C9A84C] hover:underline">View calendar →</Link>
          </div>
          <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-600 text-sm">Loading…</div>
            ) : upcoming.length === 0 ? (
              <div className="p-8 text-center text-gray-600 text-sm">No posts scheduled in the next 7 days.</div>
            ) : (
              <div className="divide-y divide-white/[0.05]">
                {upcoming.map(item => {
                  const d = new Date(item.scheduled_date!)
                  const typeCfg = CONTENT_TYPE_CONFIG[item.content_type]
                  const statusCfg = STATUS_CONFIG[item.status]
                  return (
                    <div key={item.id} className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.03] transition-colors">
                      {/* Date block */}
                      <div className="flex-shrink-0 w-12 text-center">
                        <div className="text-[10px] text-gray-500 uppercase">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="text-xl font-black text-white leading-none">{d.getDate()}</div>
                        <div className="text-[10px] text-gray-500">{d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</div>
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${typeCfg.color}`}>
                            {typeCfg.icon} {typeCfg.label}
                          </span>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${statusCfg.color} ${statusCfg.borderColor} ${statusCfg.textColor}`}>
                            {statusCfg.label}
                          </span>
                        </div>
                        <p className="text-sm text-white font-medium truncate">{item.title}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{item.content_id}</p>
                      </div>
                      {/* Platforms */}
                      <div className="flex gap-1 flex-shrink-0">
                        {item.target_platforms.map(p => (
                          <PlatformIcon key={p} platform={p} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Quick create */}
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Quick Create</h2>
            <div className="space-y-2">
              {QUICK_CREATE.map(({ type, title, desc, icon, color, textColor }) => (
                <Link
                  key={type}
                  href={`/mission-control/create?type=${type}`}
                  className={`flex items-center gap-3 p-3 bg-gradient-to-r ${color} border rounded-xl hover:brightness-110 transition-all`}
                >
                  <div className="text-[#C9A84C]">{icon}</div>
                  <div>
                    <div className={`text-sm font-bold ${textColor}`}>{title}</div>
                    <div className="text-[11px] text-gray-500">{desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Per-platform counts */}
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Posts by Platform</h2>
            <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl p-3 space-y-2">
              {PLATFORMS.map(platform => {
                const cfg = PLATFORM_CONFIG[platform]
                const count = platformCounts[platform]
                const maxCount = Math.max(...Object.values(platformCounts), 1)
                const pct = Math.round((count / maxCount) * 100)
                return (
                  <div key={platform} className="flex items-center gap-3">
                    <PlatformIcon platform={platform} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-300">{cfg.label}</span>
                        <span className="text-xs font-bold text-white">{count}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: cfg.color }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recent Content</h2>
          <Link href="/mission-control/queue" className="text-xs text-[#C9A84C] hover:underline">View all in queue →</Link>
        </div>
        <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="divide-y divide-white/[0.05]">
            {items.slice(0, 5).map(item => {
              const typeCfg = CONTENT_TYPE_CONFIG[item.content_type]
              const statusCfg = STATUS_CONFIG[item.status]
              return (
                <div key={item.id} className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.03] transition-colors">
                  <div className="flex-shrink-0">{typeCfg.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{item.title}</p>
                    <p className="text-[11px] text-gray-500">{item.content_id} · {new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex gap-1">
                      {item.target_platforms.slice(0, 3).map(p => (
                        <PlatformIcon key={p} platform={p} />
                      ))}
                      {item.target_platforms.length > 3 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-white/10 text-[9px] text-gray-400">
                          +{item.target_platforms.length - 3}
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${statusCfg.color} ${statusCfg.borderColor} ${statusCfg.textColor}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
