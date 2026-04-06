'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContentItems } from '@/lib/mission-control/use-content'
import type { ContentType, Platform } from '@/lib/mission-control/types'
import { PLATFORM_CONFIG, CONTENT_TYPE_CONFIG } from '@/lib/mission-control/types'

const CONTENT_TYPES: { type: ContentType; title: string; desc: string; emoji: string; features: string[] }[] = [
  {
    type: 'brand_template',
    title: 'Brand Template',
    desc: 'A designed graphic post using DaytonRelo brand colors and style.',
    emoji: '🎨',
    features: ['Instagram square/reel cover', 'Facebook post image', 'LinkedIn graphic'],
  },
  {
    type: 'long_form',
    title: 'Long-Form Post',
    desc: 'In-depth caption with value — tips, guides, market updates.',
    emoji: '📝',
    features: ['Platform-optimized captions', 'Hashtag suggestions', 'Multi-platform scheduling'],
  },
  {
    type: 'story_video',
    title: 'Story Video',
    desc: 'Short-form vertical video for Reels, TikTok, or YouTube Shorts.',
    emoji: '🎬',
    features: ['Video script outline', 'Hook + CTA suggestions', 'Caption for all platforms'],
  },
]

const PLATFORMS: Platform[] = ['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'x']

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < step
                ? 'bg-[#C9A84C] text-[#070F1E]'
                : i === step
                ? 'bg-[#C9A84C]/20 border-2 border-[#C9A84C] text-[#C9A84C]'
                : 'bg-white/[0.07] text-gray-600'
            }`}
          >
            {i < step ? '✓' : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`w-8 h-0.5 rounded-full ${i < step ? 'bg-[#C9A84C]' : 'bg-white/[0.07]'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

const STEP_LABELS = ['Content Type', 'Details & Platforms', 'AI Caption Draft', 'Schedule & Publish']

// Generate content id in DR-YYYY-XXXX format
function generateContentId() {
  const year = new Date().getFullYear()
  const num = String(Math.floor(Math.random() * 9000) + 1000)
  return `DR-${year}-${num}`
}

export default function CreateContentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { createItem } = useContentItems()

  const [step, setStep] = useState(0)
  const [selectedType, setSelectedType] = useState<ContentType | null>(
    (searchParams.get('type') as ContentType) ?? null
  )
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram', 'facebook'])
  const [captions, setCaptions] = useState<Partial<Record<Platform, string>>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('09:00')
  const [publishStatus, setPublishStatus] = useState<'draft' | 'approved' | 'scheduled'>('draft')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const typeParam = searchParams.get('type') as ContentType
    if (typeParam && CONTENT_TYPES.find(c => c.type === typeParam)) {
      setSelectedType(typeParam)
      setStep(1)
    }
  }, [searchParams])

  const canAdvance = () => {
    if (step === 0) return selectedType !== null
    if (step === 1) return title.trim().length > 0 && selectedPlatforms.length > 0
    if (step === 2) return true
    if (step === 3) return true
    return false
  }

  const togglePlatform = (p: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    )
  }

  const handleGenerateCaptions = async () => {
    setIsGenerating(true)
    // Simulate AI generation (placeholder for Claude API call)
    await new Promise(r => setTimeout(r, 1800))

    const typeCfg = selectedType ? CONTENT_TYPE_CONFIG[selectedType] : null
    const generated: Partial<Record<Platform, string>> = {}

    if (selectedPlatforms.includes('instagram')) {
      generated.instagram = `${title}\n\n${topic ? topic + '\n\n' : ''}Moving to Dayton? Whether you're PCS'ing to Wright-Patterson or relocating for work, this is your guide. Drop a 🏠 in the comments if you found this helpful!\n\n#DaytonRelo #DaytonOhio #WPAFB #RelocationTips #DaytonRealEstate #MilitaryPCS #OhioRealtor`
    }
    if (selectedPlatforms.includes('facebook')) {
      generated.facebook = `${title}\n\n${topic ? topic + '\n\n' : ''}If you or someone you know is relocating to the Dayton area, share this post! Questions? Drop them below or send me a message — I'm always happy to help. 👋\n\n📱 (937) 241-3484 | DaytonRelo.com`
    }
    if (selectedPlatforms.includes('tiktok')) {
      generated.tiktok = `${title} 🏡\n\n${topic || 'Everything you need to know about relocating to Dayton, Ohio.'}\n\n#DaytonOhio #WPAFB #MilitaryLife #PCSMove #RealEstate #DaytonRelo`
    }
    if (selectedPlatforms.includes('youtube')) {
      generated.youtube = `${title}\n\n${topic || 'In this video, we cover everything you need to know about relocating to Dayton, Ohio.'}\n\nChris Jurgens | Team Flory · eXp Realty\n📞 (937) 241-3484\n🌐 DaytonRelo.com\n\n#DaytonOhio #DaytonRealEstate #WPAFB`
    }
    if (selectedPlatforms.includes('linkedin')) {
      generated.linkedin = `${title}\n\n${topic ? topic + '\n\n' : ''}As a Dayton-area REALTOR® specializing in relocation and military PCS moves, I've seen firsthand what matters most to families arriving in the area.\n\nWould love to connect with anyone navigating this process. Feel free to reach out!\n\n#DaytonOhio #Relocation #WPAFB #RealEstate`
    }
    if (selectedPlatforms.includes('x')) {
      generated.x = `${title.length > 100 ? title.slice(0, 97) + '…' : title}\n\n${topic ? topic.slice(0, 100) + '\n\n' : ''}Full guide → DaytonRelo.com #DaytonOhio #WPAFB`
    }

    setCaptions(generated)
    setIsGenerating(false)
  }

  const handleSubmit = async () => {
    if (!selectedType) return
    setSubmitting(true)
    try {
      const scheduledDatetime = scheduledDate
        ? `${scheduledDate}T${scheduledTime}:00`
        : undefined

      await createItem({
        content_id: generateContentId(),
        title: title.trim(),
        content_type: selectedType,
        status: publishStatus === 'scheduled' && scheduledDatetime ? 'scheduled' : publishStatus,
        target_platforms: selectedPlatforms,
        scheduled_date: scheduledDatetime,
        topic: topic.trim() || undefined,
        caption_draft: captions[selectedPlatforms[0]] || undefined,
      })
      router.push('/mission-control/queue')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-full p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create Content</h1>
        <p className="text-gray-500 text-sm mt-0.5">Build and schedule a new social post</p>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-4">
        <StepIndicator step={step} total={4} />
        <span className="text-gray-400 text-sm">{STEP_LABELS[step]}</span>
      </div>

      <div className="max-w-3xl">
        {/* ─── Step 0: Pick type ─── */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white mb-4">What type of content are you creating?</h2>
            {CONTENT_TYPES.map(ct => (
              <button
                key={ct.type}
                onClick={() => setSelectedType(ct.type)}
                className={`w-full text-left p-5 rounded-xl border transition-all ${
                  selectedType === ct.type
                    ? 'border-[#C9A84C] bg-[#C9A84C]/10'
                    : 'border-white/[0.07] bg-[#0C1A32] hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{ct.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`text-base font-bold ${selectedType === ct.type ? 'text-[#C9A84C]' : 'text-white'}`}>
                        {ct.title}
                      </h3>
                      {selectedType === ct.type && (
                        <span className="text-[10px] font-bold text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/30 px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{ct.desc}</p>
                    <div className="flex gap-2 flex-wrap">
                      {ct.features.map(f => (
                        <span key={f} className="text-[11px] text-gray-500 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ─── Step 1: Details ─── */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-white mb-1">Tell us about this post</h2>
            {selectedType && (
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold ${CONTENT_TYPE_CONFIG[selectedType].color}`}>
                {CONTENT_TYPE_CONFIG[selectedType].emoji} {CONTENT_TYPE_CONFIG[selectedType].label}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Title / Post Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. WPAFB Neighborhood Guide — Beavercreek vs Fairborn"
                className="w-full px-4 py-3 bg-[#0C1A32] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]/50 transition text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Topic / Notes
              </label>
              <textarea
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="Key points to cover, source material, angle, target audience..."
                rows={4}
                className="w-full px-4 py-3 bg-[#0C1A32] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]/50 transition text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Target Platforms <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(p => {
                  const cfg = PLATFORM_CONFIG[p]
                  const selected = selectedPlatforms.includes(p)
                  return (
                    <button
                      key={p}
                      onClick={() => togglePlatform(p)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                        selected
                          ? 'border-white/20 text-white'
                          : 'border-white/[0.07] text-gray-500 hover:text-gray-300 hover:border-white/15'
                      }`}
                      style={selected ? { backgroundColor: cfg.color + '25', borderColor: cfg.color + '60' } : {}}
                    >
                      <span
                        className="inline-flex items-center justify-center w-5 h-5 rounded font-bold text-white text-[9px]"
                        style={{ backgroundColor: cfg.color }}
                      >
                        {cfg.icon}
                      </span>
                      {cfg.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── Step 2: AI Caption ─── */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">AI Caption Draft</h2>
              <button
                onClick={handleGenerateCaptions}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] hover:bg-[#A07830] disabled:bg-gray-700 disabled:text-gray-500 text-[#070F1E] font-bold text-sm rounded-lg transition-colors"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#070F1E] border-t-transparent rounded-full animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate with AI
                  </>
                )}
              </button>
            </div>

            <div className="bg-[#0C1A32] border border-[#C9A84C]/20 rounded-xl p-4 flex items-start gap-3">
              <span className="text-[#C9A84C] text-lg flex-shrink-0">⚡</span>
              <div>
                <p className="text-sm text-gray-300 font-medium">&ldquo;{title}&rdquo;</p>
                {topic && <p className="text-xs text-gray-500 mt-1">{topic}</p>}
              </div>
            </div>

            {Object.keys(captions).length === 0 && !isGenerating && (
              <div className="text-center py-12 text-gray-600">
                <p className="text-4xl mb-3">✨</p>
                <p className="text-sm">Click &ldquo;Generate with AI&rdquo; to create platform-optimized captions</p>
                <p className="text-xs text-gray-700 mt-1">Powered by Claude API</p>
              </div>
            )}

            {Object.keys(captions).length > 0 && (
              <div className="space-y-4">
                {selectedPlatforms.map(platform => {
                  const cfg = PLATFORM_CONFIG[platform]
                  const caption = captions[platform] || ''
                  return (
                    <div key={platform} className="bg-[#0C1A32] border border-white/[0.07] rounded-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07]">
                        <span
                          className="inline-flex items-center justify-center w-5 h-5 rounded font-bold text-white text-[9px]"
                          style={{ backgroundColor: cfg.color }}
                        >
                          {cfg.icon}
                        </span>
                        <span className="text-sm font-semibold text-gray-300">{cfg.label}</span>
                        <span className="ml-auto text-xs text-gray-600">{caption.length} chars</span>
                      </div>
                      <textarea
                        value={caption}
                        onChange={e => setCaptions(prev => ({ ...prev, [platform]: e.target.value }))}
                        rows={5}
                        className="w-full px-4 py-3 bg-transparent text-sm text-gray-300 placeholder-gray-700 focus:outline-none resize-none"
                        placeholder="Caption will appear here after generation…"
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ─── Step 3: Schedule ─── */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Review & Schedule</h2>

            {/* Summary card */}
            <div className="bg-[#0C1A32] border border-white/[0.07] rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Summary</h3>
              {selectedType && (
                <div className="flex items-center gap-2">
                  <span className="text-xl">{CONTENT_TYPE_CONFIG[selectedType].emoji}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${CONTENT_TYPE_CONFIG[selectedType].color}`}>
                    {CONTENT_TYPE_CONFIG[selectedType].label}
                  </span>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500">Title</p>
                <p className="text-white font-semibold">{title}</p>
              </div>
              {topic && (
                <div>
                  <p className="text-xs text-gray-500">Topic</p>
                  <p className="text-gray-300 text-sm">{topic}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 mb-1">Platforms</p>
                <div className="flex gap-1">
                  {selectedPlatforms.map(p => {
                    const cfg = PLATFORM_CONFIG[p]
                    return (
                      <span
                        key={p}
                        className="inline-flex items-center justify-center w-6 h-6 rounded font-bold text-white text-[9px]"
                        style={{ backgroundColor: cfg.color }}
                        title={cfg.label}
                      >
                        {cfg.icon}
                      </span>
                    )
                  })}
                </div>
              </div>
              {Object.keys(captions).length > 0 && (
                <div>
                  <p className="text-xs text-gray-500">Captions drafted for</p>
                  <p className="text-gray-300 text-sm">{Object.keys(captions).join(', ')}</p>
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Save as</label>
              <div className="flex gap-3">
                {(['draft', 'approved', 'scheduled'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setPublishStatus(s)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold border capitalize transition-all ${
                      publishStatus === s
                        ? 'bg-[#C9A84C]/15 border-[#C9A84C]/40 text-[#C9A84C]'
                        : 'border-white/[0.07] text-gray-500 hover:text-gray-300 hover:border-white/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule date/time */}
            {publishStatus === 'scheduled' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={e => setScheduledDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0C1A32] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A84C]/50 transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Time</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={e => setScheduledTime(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0C1A32] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A84C]/50 transition text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.07]">
          <button
            onClick={() => step > 0 ? setStep(s => s - 1) : router.push('/mission-control')}
            className="flex items-center gap-2 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {step === 0 ? 'Cancel' : 'Back'}
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance()}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#C9A84C] hover:bg-[#A07830] disabled:bg-gray-700 disabled:text-gray-500 text-[#070F1E] font-bold text-sm rounded-lg transition-colors"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#C9A84C] hover:bg-[#A07830] disabled:bg-gray-700 disabled:text-gray-500 text-[#070F1E] font-bold text-sm rounded-lg transition-colors"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#070F1E] border-t-transparent rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  Save to Queue
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
