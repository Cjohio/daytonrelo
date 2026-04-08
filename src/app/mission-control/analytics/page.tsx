'use client'

import { useMemo } from 'react'
import { useContentItems } from '@/lib/mission-control/use-content'
import { MOCK_POST_RESULTS } from '@/lib/mission-control/mock-data'
import type { Platform } from '@/lib/mission-control/types'
import { PLATFORM_CONFIG } from '@/lib/mission-control/types'

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">{label}</p>
      <p className={`text-3xl font-black ${color ?? 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-600 mt-1">{sub}</p>}
    </div>
  )
}

const PLATFORMS: Platform[] = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'x']

export default function AnalyticsPage() {
  const { items, usingMock } = useContentItems()

  const postedItems = items.filter(i => i.status === 'posted')

  const totalReach = MOCK_POST_RESULTS.reduce((s, r) => s + r.reach, 0)
  const totalLikes = MOCK_POST_RESULTS.reduce((s, r) => s + r.likes, 0)
  const totalComments = MOCK_POST_RESULTS.reduce((s, r) => s + r.comments, 0)
  const totalShares = MOCK_POST_RESULTS.reduce((s, r) => s + r.shares, 0)
  const totalViews = MOCK_POST_RESULTS.reduce((s, r) => s + r.views, 0)
  const avgEngagement = MOCK_POST_RESULTS.length
    ? Math.round(((totalLikes + totalComments + totalShares) / totalViews) * 100 * 10) / 10
    : 0

  const byPlatform = useMemo(() => {
    const map: Partial<Record<Platform, { reach: number; likes: number; comments: number; shares: number; views: number; posts: number }>> = {}
    MOCK_POST_RESULTS.forEach(r => {
      if (!map[r.platform]) map[r.platform] = { reach: 0, likes: 0, comments: 0, shares: 0, views: 0, posts: 0 }
      const p = map[r.platform]!
      p.reach += r.reach
      p.likes += r.likes
      p.comments += r.comments
      p.shares += r.shares
      p.views += r.views
      p.posts += 1
    })
    return map
  }, [])

  return (
    <div className="min-h-full p-6 space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Based on {MOCK_POST_RESULTS.length} posts
            {usingMock && <span className="ml-2 text-[#C9A84C] text-xs">(mock data)</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-[#0C1A32] border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-1.5 focus:outline-none">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This month</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Coming soon banner */}
      <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-xl px-5 py-4 flex items-start gap-3">
        <span className="text-[#C9A84C] text-lg flex-shrink-0">📊</span>
        <div>
          <p className="text-[#C9A84C] font-semibold text-sm">Live analytics coming soon</p>
          <p className="text-gray-400 text-xs mt-0.5">
            Once the <code className="bg-white/10 px-1 rounded font-mono">post_results</code> table is live and API integrations are connected,
            real engagement data will populate here. Preview below uses mock data.
          </p>
        </div>
      </div>

      {/* Overview stats */}
      <section>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Overall Performance</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Total Reach" value={totalReach.toLocaleString()} sub="People reached" color="text-[#C9A84C]" />
          <StatCard label="Total Views" value={totalViews.toLocaleString()} sub="Post impressions" />
          <StatCard label="Engagement Rate" value={`${avgEngagement}%`} sub="(likes + comments + shares) / views" color="text-emerald-400" />
          <StatCard label="Total Likes" value={totalLikes.toLocaleString()} />
          <StatCard label="Total Comments" value={totalComments.toLocaleString()} />
          <StatCard label="Total Shares" value={totalShares.toLocaleString()} />
        </div>
      </section>

      {/* Per-platform breakdown */}
      <section>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Per-Platform Breakdown</h2>
        <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="grid grid-cols-7 px-5 py-3 border-b border-white/[0.07]">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Platform</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Posts</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Reach</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Views</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Likes</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Comments</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Shares</div>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {PLATFORMS.map(platform => {
              const cfg = PLATFORM_CONFIG[platform]
              const data = byPlatform[platform]
              return (
                <div key={platform} className="grid grid-cols-7 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded font-bold text-white text-[9px] flex-shrink-0"
                      style={{ backgroundColor: cfg.color }}
                    >
                      {cfg.icon}
                    </span>
                    <span className="text-sm text-gray-300 font-medium">{cfg.label}</span>
                  </div>
                  {data ? (
                    <>
                      <div className="text-sm text-white text-right font-mono">{data.posts}</div>
                      <div className="text-sm text-white text-right font-mono">{data.reach.toLocaleString()}</div>
                      <div className="text-sm text-white text-right font-mono">{data.views.toLocaleString()}</div>
                      <div className="text-sm text-white text-right font-mono">{data.likes.toLocaleString()}</div>
                      <div className="text-sm text-white text-right font-mono">{data.comments.toLocaleString()}</div>
                      <div className="text-sm text-white text-right font-mono">{data.shares.toLocaleString()}</div>
                    </>
                  ) : (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="text-sm text-gray-700 text-right">—</div>
                      ))}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Top performing posts */}
      <section>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Top Performing Posts</h2>
        <div className="space-y-3">
          {MOCK_POST_RESULTS
            .sort((a, b) => b.reach - a.reach)
            .slice(0, 3)
            .map((result, idx) => {
              const item = items.find(i => i.id === result.content_item_id)
              const cfg = PLATFORM_CONFIG[result.platform]
              return (
                <div key={result.id} className="bg-[#0C1A32] border border-white/[0.07] rounded-xl px-5 py-4 flex items-center gap-5">
                  <div className="text-2xl font-black text-gray-700 w-8 flex-shrink-0">#{idx + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="inline-flex items-center justify-center w-5 h-5 rounded font-bold text-white text-[9px] flex-shrink-0"
                        style={{ backgroundColor: cfg.color }}
                      >
                        {cfg.icon}
                      </span>
                      <span className="text-xs text-gray-500">{cfg.label}</span>
                    </div>
                    <p className="text-sm text-white font-medium truncate">
                      {item?.title ?? 'Unknown post'}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {new Date(result.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex gap-6 flex-shrink-0">
                    <div className="text-center">
                      <p className="text-lg font-black text-[#C9A84C]">{result.reach.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-600">Reach</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-black text-white">{result.likes.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-600">Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-black text-white">{result.views.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-600">Views</p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </section>

      {/* Posting frequency note */}
      <section className="pb-6">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Content by Type</h2>
        <div className="grid grid-cols-3 gap-4">
          {(['brand_template', 'long_form', 'story_video'] as const).map(type => {
            const count = items.filter(i => i.content_type === type).length
            const labels = { brand_template: '🎨 Brand Template', long_form: '📝 Long-Form', story_video: '🎬 Story Video' }
            return (
              <div key={type} className="bg-[#0C1A32] border border-white/[0.07] rounded-xl p-5 text-center">
                <p className="text-3xl font-black text-white">{count}</p>
                <p className="text-xs text-gray-500 mt-1">{labels[type]}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
