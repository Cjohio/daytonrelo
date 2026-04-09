'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

// ── Types ──────────────────────────────────────────────────────────────────────

interface UserStats {
  total_users: number
  new_today: number
  new_this_week: number
  new_this_month: number
  total_leads: number
  leads_today: number
  leads_this_week: number
}

interface AppUser {
  user_id: string
  email: string
  joined_at: string
  total_events: number
  chat_count: number
  calc_count: number
  listing_count: number
  last_seen: string | null
  top_tools: string[]
}

interface ToolUsage {
  event_type: string
  total: number
  unique_users: number
  today: number
  this_week: number
}

interface RecentLead {
  id: string
  name: string
  email: string
  phone: string
  move_timeline: string
  employer: string
  message: string | null
  source: string
  submitted_at: string
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return 'Never'
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatEvent(type: string): string {
  return type
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace('Calculated', 'Calc')
    .replace('Bah', 'BAH')
    .replace('Va ', 'VA ')
}

function engagementColor(events: number): string {
  if (events >= 20) return 'text-red-400'
  if (events >= 10) return 'text-orange-400'
  if (events >= 5)  return 'text-[#C9A84C]'
  if (events >= 1)  return 'text-blue-400'
  return 'text-gray-600'
}

function engagementLabel(events: number): { label: string; color: string; bg: string } {
  if (events >= 20) return { label: '🔥 Hot',    color: 'text-red-300',    bg: 'bg-red-900/30 border-red-700/40' }
  if (events >= 10) return { label: '⚡ Active',  color: 'text-orange-300', bg: 'bg-orange-900/30 border-orange-700/40' }
  if (events >= 5)  return { label: '👀 Warm',    color: 'text-yellow-300', bg: 'bg-yellow-900/30 border-yellow-700/40' }
  if (events >= 1)  return { label: '🌱 New',     color: 'text-blue-300',   bg: 'bg-blue-900/30 border-blue-700/40' }
  return               { label: '😴 Inactive', color: 'text-gray-500',   bg: 'bg-gray-800/30 border-gray-700/40' }
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color, icon }: {
  label: string; value: string | number; sub?: string; color?: string; icon: string
}) {
  return (
    <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{label}</p>
        <span className="text-lg">{icon}</span>
      </div>
      <p className={`text-3xl font-black ${color ?? 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-600">{sub}</p>}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [stats, setStats]     = useState<UserStats | null>(null)
  const [users, setUsers]     = useState<AppUser[]>([])
  const [tools, setTools]     = useState<ToolUsage[]>([])
  const [leads, setLeads]     = useState<RecentLead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState<'all' | 'hot' | 'active' | 'new'>('all')
  const [activeTab, setActiveTab] = useState<'users' | 'tools' | 'leads'>('users')

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()

      const [statsRes, usersRes, toolsRes, leadsRes] = await Promise.all([
        supabase.rpc('admin_user_stats'),
        supabase.rpc('admin_user_list'),
        supabase.rpc('admin_tool_usage'),
        supabase.rpc('admin_recent_leads', { lim: 25 }),
      ])

      if (statsRes.error) throw new Error(statsRes.error.message)
      if (usersRes.error) throw new Error(usersRes.error.message)

      setStats(statsRes.data as UserStats)
      setUsers(usersRes.data as AppUser[] ?? [])
      setTools(toolsRes.data as ToolUsage[] ?? [])
      setLeads(leadsRes.data as RecentLead[] ?? [])
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // ── Filtered users ──────────────────────────────────────────────────────────
  const filteredUsers = users.filter(u => {
    const matchesSearch = !search || u.email.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all'    ? true :
      filter === 'hot'    ? u.total_events >= 20 :
      filter === 'active' ? u.total_events >= 5 && u.total_events < 20 :
      filter === 'new'    ? u.total_events < 5 : true
    return matchesSearch && matchesFilter
  })

  const now = new Date()

  return (
    <div className="min-h-full p-6 space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">App Users</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            {' · '}Real-time data from Supabase
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#0C1A32] border border-white/10 hover:border-[#C9A84C]/40 text-gray-300 hover:text-white text-sm rounded-lg transition-all disabled:opacity-50"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="bg-red-900/20 border border-red-700/40 rounded-xl px-5 py-4 text-red-300 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* ── Overview Stat Cards ── */}
      {loading && !stats ? (
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#0C1A32] border border-white/[0.07] rounded-xl p-5 h-28 animate-pulse" />
          ))}
        </div>
      ) : stats && (
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Users"    value={stats.total_users}    icon="👥" color="text-white"        sub={`+${stats.new_this_month} this month`} />
          <StatCard label="New Today"      value={stats.new_today}      icon="🌅" color="text-[#C9A84C]"   sub={`+${stats.new_this_week} this week`} />
          <StatCard label="Total Leads"    value={stats.total_leads}    icon="🎯" color="text-emerald-400" sub={`+${stats.leads_this_week} this week`} />
          <StatCard label="Leads Today"    value={stats.leads_today}    icon="🔔" color="text-blue-400"    sub="New inbound inquiries" />
        </div>
      )}

      {/* ── Hot Users Banner ── */}
      {!loading && users.filter(u => u.total_events >= 10).length > 0 && (
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-700/40 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-white font-semibold text-sm">
                {users.filter(u => u.total_events >= 10).length} hot {users.filter(u => u.total_events >= 10).length === 1 ? 'user' : 'users'} right now
              </p>
              <p className="text-gray-400 text-xs mt-0.5">
                {users.filter(u => u.total_events >= 10).map(u => u.email).slice(0, 3).join(', ')}
                {users.filter(u => u.total_events >= 10).length > 3 && ` +${users.filter(u => u.total_events >= 10).length - 3} more`}
                {' '}&mdash; high engagement, worth reaching out
              </p>
            </div>
            <button
              onClick={() => { setFilter('hot'); setActiveTab('users') }}
              className="ml-auto px-3 py-1.5 text-xs font-semibold text-red-300 bg-red-900/30 border border-red-700/40 rounded-lg hover:bg-red-900/50 transition-colors"
            >
              View hot users →
            </button>
          </div>
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-[#0C1A32] border border-white/[0.07] rounded-xl p-1 w-fit">
        {(['users', 'tools', 'leads'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-[#C9A84C] text-[#070F1E]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'users' ? `👥 Users (${users.length})` :
             tab === 'tools' ? `🛠 Tool Usage` :
             `📋 Leads (${leads.length})`}
          </button>
        ))}
      </div>

      {/* ══ USERS TAB ══════════════════════════════════════════════════════════ */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Search + filter bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#0C1A32] border border-white/10 text-white text-sm rounded-lg placeholder:text-gray-600 focus:outline-none focus:border-[#C9A84C]/40"
              />
            </div>
            <div className="flex gap-1">
              {(['all', 'hot', 'active', 'new'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    filter === f
                      ? 'bg-[#C9A84C]/20 text-[#C9A84C] border-[#C9A84C]/40'
                      : 'bg-transparent text-gray-500 border-white/10 hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'hot' ? '🔥 Hot (20+)' : f === 'active' ? '⚡ Active (5+)' : '🌱 New'}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 ml-auto">{filteredUsers.length} users</p>
          </div>

          {/* Users table */}
          <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] px-5 py-3 border-b border-white/[0.07]">
              {['User', 'Events', 'Chat', 'Status', 'Last Seen', ''].map((h, i) => (
                <div key={i} className="text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</div>
              ))}
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-600 text-sm">Loading users…</div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-600 text-sm">No users match this filter.</div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {filteredUsers.map(u => {
                  const badge = engagementLabel(u.total_events)
                  return (
                    <div key={u.user_id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] px-5 py-3.5 hover:bg-white/[0.02] transition-colors items-center">
                      {/* Email + top tools */}
                      <div className="min-w-0">
                        <p className="text-sm text-white font-medium truncate">{u.email}</p>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {u.top_tools.slice(0, 3).map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-white/[0.06] text-gray-400">
                              {formatEvent(t)}
                            </span>
                          ))}
                          {u.top_tools.length === 0 && (
                            <span className="text-[10px] text-gray-700">No activity yet</span>
                          )}
                        </div>
                      </div>
                      {/* Total events */}
                      <div className={`text-lg font-black ${engagementColor(u.total_events)}`}>
                        {u.total_events}
                      </div>
                      {/* Chat count */}
                      <div className="text-sm text-gray-400 font-mono">{u.chat_count}</div>
                      {/* Status badge */}
                      <div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${badge.bg} ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      {/* Last seen */}
                      <div className="text-xs text-gray-500">{timeAgo(u.last_seen)}</div>
                      {/* Actions */}
                      <div className="flex gap-2">
                        <a
                          href={`mailto:${u.email}?subject=Following up on your Dayton Relo inquiry&body=Hi there,%0D%0A%0D%0AI noticed you've been exploring the Dayton Relo app and wanted to personally reach out...`}
                          className="px-3 py-1.5 text-[11px] font-semibold text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-lg hover:bg-[#C9A84C]/20 transition-colors whitespace-nowrap"
                          title="Send email"
                        >
                          ✉ Reach Out
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ TOOLS TAB ══════════════════════════════════════════════════════════ */}
      {activeTab === 'tools' && (
        <div className="space-y-4">
          {tools.length === 0 && !loading ? (
            <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl p-12 text-center">
              <p className="text-gray-500 text-sm">No tool usage data yet.</p>
              <p className="text-gray-700 text-xs mt-1">Events will appear here as users interact with the app.</p>
            </div>
          ) : (
            <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl overflow-hidden">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-3 border-b border-white/[0.07]">
                {['Tool / Event', 'All Time', 'Unique Users', 'This Week', 'Today'].map((h, i) => (
                  <div key={i} className={`text-xs font-bold text-gray-500 uppercase tracking-wider ${i > 0 ? 'text-right' : ''}`}>{h}</div>
                ))}
              </div>
              <div className="divide-y divide-white/[0.04]">
                {tools.map(t => {
                  const maxTotal = Math.max(...tools.map(x => x.total), 1)
                  const barPct = Math.round((t.total / maxTotal) * 100)
                  return (
                    <div key={t.event_type} className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center">
                        <div>
                          <p className="text-sm text-white font-medium">{formatEvent(t.event_type)}</p>
                          <div className="mt-1.5 h-1 bg-white/5 rounded-full overflow-hidden w-48">
                            <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: `${barPct}%` }} />
                          </div>
                        </div>
                        <div className="text-sm text-white font-black text-right">{t.total.toLocaleString()}</div>
                        <div className="text-sm text-gray-400 text-right">{t.unique_users}</div>
                        <div className="text-sm text-gray-400 text-right">{t.this_week}</div>
                        <div className="text-sm text-gray-400 text-right">{t.today}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* No-data hint */}
          {tools.length === 0 && !loading && (
            <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-xl px-5 py-4 text-sm text-[#C9A84C]">
              💡 Tool usage populates automatically as users open the app. DaytonBot chat events are already tracked.
              Calculator and screen events will appear after the next app build.
            </div>
          )}
        </div>
      )}

      {/* ══ LEADS TAB ══════════════════════════════════════════════════════════ */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          {leads.length === 0 && !loading ? (
            <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl p-12 text-center">
              <p className="text-gray-500 text-sm">No leads yet.</p>
            </div>
          ) : (
            <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl overflow-hidden">
              <div className="grid grid-cols-[2fr_1.5fr_1fr_1.5fr_1fr] px-5 py-3 border-b border-white/[0.07]">
                {['Name / Email', 'Phone', 'Timeline', 'Employer', 'Submitted'].map((h, i) => (
                  <div key={i} className="text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              <div className="divide-y divide-white/[0.04]">
                {leads.map(lead => (
                  <div key={lead.id} className="grid grid-cols-[2fr_1.5fr_1fr_1.5fr_1fr] px-5 py-3.5 hover:bg-white/[0.02] transition-colors items-start">
                    <div>
                      <p className="text-sm text-white font-medium">{lead.name}</p>
                      <a href={`mailto:${lead.email}`} className="text-xs text-[#C9A84C] hover:underline">{lead.email}</a>
                      {lead.message && (
                        <p className="text-[11px] text-gray-600 mt-1 italic truncate max-w-xs">"{lead.message}"</p>
                      )}
                    </div>
                    <div>
                      <a href={`tel:${lead.phone}`} className="text-sm text-gray-300 hover:text-white">{lead.phone}</a>
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-900/30 text-emerald-300 border border-emerald-700/40">
                        {lead.move_timeline?.replace(/-/g, '–') ?? '—'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">{lead.employer || '—'}</div>
                    <div className="text-xs text-gray-500">{timeAgo(lead.submitted_at)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="pb-6" />
    </div>
  )
}
