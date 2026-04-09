import { Camera, User, Music, Palette, PenSquare, Film } from 'lucide-react'
import type { ReactNode } from 'react'

export type Platform = 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin' | 'x'
export type ContentType = 'brand_template' | 'long_form' | 'story_video'
export type ContentStatus = 'draft' | 'review' | 'approved' | 'scheduled' | 'posted'

export interface ContentItem {
  id: string
  content_id: string // DR-YYYY-XXXX
  title: string
  content_type: ContentType
  status: ContentStatus
  target_platforms: Platform[]
  scheduled_date?: string
  topic?: string
  caption_draft?: string
  created_at: string
  updated_at: string
}

export interface PostResult {
  id: string
  content_item_id: string
  platform: Platform
  posted_at: string
  likes: number
  comments: number
  shares: number
  views: number
  reach: number
}

export const PLATFORM_CONFIG: Record<Platform, { label: string; color: string; bg: string; icon: ReactNode }> = {
  instagram: { label: 'Instagram', color: '#E4405F', bg: 'bg-[#E4405F]', icon: <Camera className="w-3 h-3" /> },
  facebook:  { label: 'Facebook',  color: '#1877F2', bg: 'bg-[#1877F2]', icon: <User className="w-3 h-3" /> },
  tiktok:    { label: 'TikTok',    color: '#69C9D0', bg: 'bg-[#69C9D0]', icon: <Music className="w-3 h-3" /> },
  youtube:   { label: 'YouTube',   color: '#FF0000', bg: 'bg-[#FF0000]', icon: <span className="text-xs font-bold">▶</span> },
  linkedin:  { label: 'LinkedIn',  color: '#0A66C2', bg: 'bg-[#0A66C2]', icon: <span className="text-xs font-bold">in</span> },
  x:         { label: 'X',         color: '#FFFFFF', bg: 'bg-gray-800',  icon: <span className="text-xs font-bold">X</span> },
}

export const STATUS_CONFIG: Record<ContentStatus, { label: string; color: string; textColor: string; borderColor: string }> = {
  draft:     { label: 'Draft',     color: 'bg-gray-700',         textColor: 'text-gray-300',   borderColor: 'border-gray-600' },
  review:    { label: 'Review',    color: 'bg-yellow-900/40',    textColor: 'text-yellow-300', borderColor: 'border-yellow-700/50' },
  approved:  { label: 'Approved',  color: 'bg-blue-900/40',      textColor: 'text-blue-300',   borderColor: 'border-blue-700/50' },
  scheduled: { label: 'Scheduled', color: 'bg-purple-900/40',    textColor: 'text-purple-300', borderColor: 'border-purple-700/50' },
  posted:    { label: 'Posted',    color: 'bg-green-900/40',     textColor: 'text-green-300',  borderColor: 'border-green-700/50' },
}

export const CONTENT_TYPE_CONFIG: Record<ContentType, { label: string; color: string; icon: ReactNode }> = {
  brand_template: { label: 'Brand Template', color: 'bg-gold/20 text-gold border-gold/30',           icon: <Palette className="w-3 h-3" /> },
  long_form:      { label: 'Long-Form Post',  color: 'bg-blue-900/30 text-blue-300 border-blue-700/40', icon: <PenSquare className="w-3 h-3" /> },
  story_video:    { label: 'Story Video',     color: 'bg-pink-900/30 text-pink-300 border-pink-700/40', icon: <Film className="w-3 h-3" /> },
}
