'use client'

import { useState, useMemo } from 'react'
import { useContentItems } from '@/lib/mission-control/use-content'
import type { Platform, ContentStatus, ContentItem } from '@/lib/mission-control/types'
import { PLATFORM_CONFIG, STATUS_CONFIG, CONTENT_TYPE_CONFIG } from '@/lib/mission-control/types'

const COLUMNS: ContentStatus[] = ['draft', 'review', 'approved', 'scheduled', 'posted']

const NEXT_STATUS: Partial<Record<ContentStatus, ContentStatus>> = {
  draft: 'review',
  review: 'approved',
  approved: 'scheduled',
  scheduled: 'posted',
}
const PREV_STATUS: Partial<Record<ContentStatus, ContentStatus>> = {
  review: 'draft',
  approved: 'review',
  scheduled: 'approved',
  posted: 'scheduled',
}

function PlatformIcon({ platform }: { platform: Platform }) {
  const cfg = PLATFORM_CONFIG[platform]
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded font-bold text-white text-[9px] flex-shrink-0"
      style={{ backgroundColor: cfg.color }}
      title={cfg.label}
    >
      {cfg.icon}
    </span>
  )
}

function KanbanCard({
  item,
  onMove,
}: {
  item: ContentItem
  onMove: (id: string, status: ContentStatus) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const typeCfg = CONTENT_TYPE_CONFIG[item.content_type]
  const statusCfg = STATUS_CONFIG[item.status]
  const next = NEXT_STATUS[item.status]
  const prev = PREV_STATUS[item.status]

  return (
    <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl p-3 space-y-2.5 hover:border-white/15 transition-colors group">
      {/* ID + type */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-gray-500">{item.content_id}</span>
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${typeCfg.color} w-fit`}>
            {typeCfg.emoji} {typeCfg.label}
          </span>
        </div>
        {/* Move menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="p-1 rounded text-gray-600 hover:text-gray-300 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
            title="Move to…"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-6 z-10 bg-[#0F1F3D] border border-white/10 rounded-lg shadow-xl py-1 min-w-[140px]">
              <div className="px-3 py-1.5 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Move to</div>
              {COLUMNS.filter(s => s !== item.status).map(s => {
                const cfg = STATUS_CONFIG[s]
                return (
                  <button
                    key={s}
                    onClick={() => { onMove(item.id, s); setMenuOpen(false) }}
                    className={`w-full text-left px-3 py-1.5 text-xs ${cfg.textColor} hover:bg-white/[0.05] transition-colors`}
                  >
                    {cfg.label}
                  </button>
                )
              })}
              <div className="border-t border-white/10 mt-1" />
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-white/[0.05]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <p className="text-sm text-white font-medium leading-snug line-clamp-2">{item.title}</p>

      {/* Platforms */}
      <div className="flex items-center gap-1 flex-wrap">
        {item.target_platforms.map(p => (
          <PlatformIcon key={p} platform={p} />
        ))}
      </div>

      {/* Date */}
      {item.scheduled_date && (
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(item.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          {' '}
          {new Date(item.scheduled_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </div>
      )}

      {/* Quick move arrows */}
      <div className="flex gap-1 pt-0.5">
        {prev && (
          <button
            onClick={() => onMove(item.id, prev)}
            className="flex items-center gap-1 px-2 py-1 text-[10px] text-gray-500 hover:text-gray-200 bg-white/[0.03] hover:bg-white/10 rounded transition-colors"
          >
            ← {STATUS_CONFIG[prev].label}
          </button>
        )}
        {next && (
          <button
            onClick={() => onMove(item.id, next)}
            className="flex items-center gap-1 px-2 py-1 text-[10px] text-gray-500 hover:text-gray-200 bg-white/[0.03] hover:bg-white/10 rounded transition-colors ml-auto"
          >
            {STATUS_CONFIG[next].label} →
          </button>
        )}
      </div>
    </div>
  )
}

export default function QueuePage() {
  const { items, loading, usingMock, updateStatus } = useContentItems()
  const [filterType, setFilterType] = useState<string>('all')
  const [filterPlatform, setFilterPlatform] = useState<string>('all')

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (filterType !== 'all' && item.content_type !== filterType) return false
      if (filterPlatform !== 'all' && !item.target_platforms.includes(filterPlatform as Platform)) return false
      return true
    })
  }, [items, filterType, filterPlatform])

  const byStatus = useMemo(() => {
    const map: Record<ContentStatus, ContentItem[]> = { draft: [], review: [], approved: [], scheduled: [], posted: [] }
    filteredItems.forEach(item => map[item.status].push(item))
    return map
  }, [filteredItems])

  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.07] flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Content Queue</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {items.length} total items
              {usingMock && <span className="ml-2 text-[#C9A84C] text-xs">(mock data)</span>}
            </p>
          </div>
          {/* Filters */}
          <div className="flex items-center gap-3">
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="bg-[#0C1A32] border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#C9A84C]/50"
            >
              <option value="all">All types</option>
              <option value="brand_template">Brand Template</option>
              <option value="long_form">Long-Form Post</option>
              <option value="story_video">Story Video</option>
            </select>
            <select
              value={filterPlatform}
              onChange={e => setFilterPlatform(e.target.value)}
              className="bg-[#0C1A32] border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#C9A84C]/50"
            >
              <option value="all">All platforms</option>
              {(Object.keys(PLATFORM_CONFIG) as Platform[]).map(p => (
                <option key={p} value={p}>{PLATFORM_CONFIG[p].label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4 p-5 h-full min-w-max">
          {COLUMNS.map(status => {
            const cfg = STATUS_CONFIG[status]
            const col = byStatus[status]
            return (
              <div key={status} className="w-72 flex flex-col flex-shrink-0">
                {/* Column header */}
                <div className={`flex items-center justify-between mb-3 px-3 py-2 rounded-lg ${cfg.color} border ${cfg.borderColor}`}>
                  <span className={`text-sm font-bold ${cfg.textColor}`}>{cfg.label}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-black/20 ${cfg.textColor}`}>
                    {col.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-4">
                  {loading ? (
                    <div className="text-gray-600 text-sm text-center py-8">Loading…</div>
                  ) : col.length === 0 ? (
                    <div className="text-gray-700 text-sm text-center py-8 border border-dashed border-white/[0.05] rounded-xl">
                      No items
                    </div>
                  ) : (
                    col.map(item => (
                      <KanbanCard key={item.id} item={item} onMove={updateStatus} />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
