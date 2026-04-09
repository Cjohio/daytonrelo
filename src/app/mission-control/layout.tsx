'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  {
    href: '/mission-control',
    label: 'Dashboard',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/mission-control/calendar',
    label: 'Content Calendar',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/mission-control/queue',
    label: 'Content Queue',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: '/mission-control/create',
    label: 'Create Content',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 4v16m8-8H4" />
      </svg>
    ),
    highlight: true,
  },
  {
    href: '/mission-control/assets',
    label: 'Brand Assets',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/mission-control/analytics',
    label: 'Analytics',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: '/mission-control/users',
    label: 'App Users',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function MissionControlLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth/login?next=/mission-control')
      } else {
        setAuthed(true)
      }
    }
    checkAuth()
  }, [router])

  if (authed === null) {
    return (
      <div className="fixed inset-0 z-[60] bg-[#070F1E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading Mission Control…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[60] bg-[#070F1E] flex overflow-hidden font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-[#0C1A32] border-r border-white/[0.07] flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="px-5 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#C9A84C] text-[#070F1E] font-black text-xs">DR</span>
            <span className="text-white font-bold text-sm tracking-wide">Mission Control</span>
          </div>
          <p className="text-[11px] text-gray-500 pl-8">Social Marketing Hub</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon, highlight }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/25'
                    : highlight
                    ? 'text-[#C9A84C] hover:bg-[#C9A84C]/10 border border-[#C9A84C]/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className={isActive ? 'text-[#C9A84C]' : highlight ? 'text-[#C9A84C]' : 'text-gray-500'}>
                  {icon}
                </span>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Status indicator */}
        <div className="px-4 py-3 border-t border-white/[0.07]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-gray-500">Live · Mock data active</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-2 py-1.5 text-xs text-gray-500 hover:text-gray-300 rounded hover:bg-white/[0.05] transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Site
          </Link>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
