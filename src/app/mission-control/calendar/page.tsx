'use client'

import { useState, useMemo } from 'react'
import { useContentItems } from '@/lib/mission-control/use-content'
import type { Platform } from '@/lib/mission-control/types'
import { PLATFORM_CONFIG, CONTENT_TYPE_CONFIG } from '@/lib/mission-control/types'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function PlatformDot({ platform }: { platform: Platform }) {
  const cfg = PLATFORM_CONFIG[platform]
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ backgroundColor: cfg.color }}
      title={cfg.label}
    />
  )
}

export default function CalendarPage() {
  const { items, loading, usingMock } = useContentItems()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  // Build calendar grid
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7

  // Map day-of-month → scheduled items
  const itemsByDay = useMemo(() => {
    const map: Record<number, typeof items> = {}
    items.forEach(item => {
      if (!item.scheduled_date) return
      const d = new Date(item.scheduled_date)
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate()
        if (!map[day]) map[day] = []
        map[day].push(item)
      }
    })
    return map
  }, [items, year, month])

  const selectedDayItems = selectedDay ? (itemsByDay[selectedDay] ?? []) : []

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDay(null)
  }
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDay(null)
  }

  const today = new Date()
  const isToday = (day: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day

  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.07] flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Calendar</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {Object.values(itemsByDay).flat().length} posts this month
            {usingMock && <span className="ml-2 text-[#C9A84C] text-xs">(mock data)</span>}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-white font-bold text-lg min-w-[200px] text-center">{monthName}</span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="flex gap-5">
          {/* Calendar grid */}
          <div className="flex-1">
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS_OF_WEEK.map(d => (
                <div key={d} className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: totalCells }).map((_, idx) => {
                const dayNum = idx - firstDayOfMonth + 1
                const isValid = dayNum >= 1 && dayNum <= daysInMonth
                const dayItems = isValid ? (itemsByDay[dayNum] ?? []) : []
                const isSelected = selectedDay === dayNum && isValid
                const isTodayDay = isValid && isToday(dayNum)

                // Collect unique platforms for this day
                const platforms = Array.from(
                  new Set(dayItems.flatMap(i => i.target_platforms))
                ).slice(0, 4)

                return (
                  <button
                    key={idx}
                    onClick={() => isValid && setSelectedDay(selectedDay === dayNum ? null : dayNum)}
                    disabled={!isValid}
                    className={`relative min-h-[80px] p-2 rounded-lg text-left transition-all ${
                      !isValid
                        ? 'opacity-0 pointer-events-none'
                        : isSelected
                        ? 'bg-[#C9A84C]/20 border border-[#C9A84C]/40'
                        : isTodayDay
                        ? 'bg-white/[0.08] border border-white/20'
                        : dayItems.length > 0
                        ? 'bg-[#0C1A32] border border-white/[0.07] hover:border-white/20 cursor-pointer'
                        : 'bg-[#0C1A32] border border-white/[0.04] hover:border-white/10 cursor-pointer'
                    }`}
                  >
                    {isValid && (
                      <>
                        <div className={`text-sm font-bold mb-1.5 ${
                          isSelected ? 'text-[#C9A84C]' : isTodayDay ? 'text-white' : 'text-gray-400'
                        }`}>
                          {isTodayDay && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C9A84C] text-[#070F1E] text-xs font-black">
                              {dayNum}
                            </span>
                          )}
                          {!isTodayDay && dayNum}
                        </div>

                        {/* Post count chip */}
                        {dayItems.length > 0 && (
                          <div className="space-y-1">
                            <div className="flex gap-0.5 flex-wrap">
                              {platforms.map(p => (
                                <PlatformDot key={p} platform={p} />
                              ))}
                            </div>
                            <div className="text-[10px] text-gray-500 font-medium">
                              {dayItems.length} post{dayItems.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Platform legend */}
            <div className="mt-4 flex flex-wrap gap-3">
              {(Object.entries(PLATFORM_CONFIG) as [Platform, typeof PLATFORM_CONFIG[Platform]][]).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                  <span className="text-xs text-gray-500">{cfg.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day detail panel */}
          {selectedDay && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl overflow-hidden sticky top-0">
                <div className="px-4 py-3 border-b border-white/[0.07] flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      {new Date(year, month, selectedDay).toLocaleDateString('en-US', {
                        weekday: 'long', month: 'long', day: 'numeric',
                      })}
                    </p>
                    <p className="text-white font-bold">
                      {selectedDayItems.length} post{selectedDayItems.length !== 1 ? 's' : ''} scheduled
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {selectedDayItems.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-600 text-sm">No posts scheduled</p>
                    <a
                      href={`/mission-control/create`}
                      className="mt-3 inline-flex items-center gap-1 text-xs text-[#C9A84C] hover:underline"
                    >
                      + Schedule something
                    </a>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.05]">
                    {selectedDayItems.map(item => {
                      const typeCfg = CONTENT_TYPE_CONFIG[item.content_type]
                      const t = item.scheduled_date
                        ? new Date(item.scheduled_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                        : null
                      return (
                        <div key={item.id} className="px-4 py-3 space-y-2">
                          {t && <p className="text-xs text-[#C9A84C] font-semibold">{t}</p>}
                          <div className="flex items-start gap-2">
                            <span className="text-lg flex-shrink-0">{typeCfg.emoji}</span>
                            <div>
                              <p className="text-sm text-white font-medium leading-snug">{item.title}</p>
                              <p className="text-[11px] text-gray-500 font-mono mt-0.5">{item.content_id}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {item.target_platforms.map(p => {
                              const cfg = PLATFORM_CONFIG[p]
                              return (
                                <span
                                  key={p}
                                  className="inline-flex items-center justify-center w-5 h-5 rounded font-bold text-white text-[9px]"
                                  style={{ backgroundColor: cfg.color }}
                                >
                                  {cfg.icon}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
