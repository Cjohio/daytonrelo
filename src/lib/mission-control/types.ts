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

export const PLATFORM_CONFIG: Record<Platform, { label: string; color: string; bg: string; icon: string }> = {
  instagram: { label: 'Instagram', color: '#E4405F', bg: 'bg-[#E4405F]', icon: '📷' },
  facebook:  { label: 'Facebook',  color: '#1877F2', bg: 'bg-[#1877F2]', icon: '👤' },
  tiktok:    { label: 'TikTok',    color: '#69C9D0', bg: 'bg-[#69C9D0]', icon: '♪' },
  youtube:   { label: 'YouTube',   color: '#FF0000', bg: 'bg-[#FF0000]', icon: '▶' },
  linkedin:  { label: 'LinkedIn',  color: '#0A66C2', bg: 'bg-[#0A66C2]', icon: 'in' },
  x:         { label: 'X',         color: '#FFFFFF', bg: 'bg-gray-800',  icon: 'X' },
}

export const STATUS_CONFIG: Record<ContentStatus, { label: string; color: string; textColor: string; borderColor: string }> = {
  draft:     { label: 'Draft',     color: 'bg-gray-700',         textColor: 'text-gray-300',   borderColor: 'border-gray-600' },
  review:    { label: 'Review',    color: 'bg-yellow-900/40',    textColor: 'text-yellow-300', borderColor: 'border-yellow-700/50' },
  approved:  { label: 'Approved',  color: 'bg-blue-900/40',      textColor: 'text-blue-300',   borderColor: 'border-blue-700/50' },
  scheduled: { label: 'Scheduled', color: 'bg-purple-900/40',    textColor: 'text-purple-300', borderColor: 'border-purple-700/50' },
  posted:    { label: 'Posted',    color: 'bg-green-900/40',     textColor: 'text-green-300',  borderColor: 'border-green-700/50' },
}

export const CONTENT_TYPE_CONFIG: Record<ContentType, { label: string; color: string; emoji: string }> = {
  brand_template: { label: 'Brand Template', color: 'bg-gold/20 text-gold border-gold/30',           emoji: '🎨' },
  long_form:      { label: 'Long-Form Post',  color: 'bg-blue-900/30 text-blue-300 border-blue-700/40', emoji: '📝' },
  story_video:    { label: 'Story Video',     color: 'bg-pink-900/30 text-pink-300 border-pink-700/40', emoji: '🎬' },
}
