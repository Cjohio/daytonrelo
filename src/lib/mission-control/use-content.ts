'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ContentItem, ContentStatus } from './types'
import { MOCK_CONTENT_ITEMS } from './mock-data'

// This hook attempts to load content from Supabase, falls back to mock data.
// Once the `content_items` table exists, queries will work automatically.
export function useContentItems() {
  const [items, setItems] = useState<ContentItem[]>(MOCK_CONTENT_ITEMS)
  const [loading, setLoading] = useState(false)
  const [usingMock, setUsingMock] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data, error } = await supabase
          .from('content_items')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        if (data && data.length > 0) {
          setItems(data as ContentItem[])
          setUsingMock(false)
        }
      } catch {
        // Table not yet created — stay on mock data
        setUsingMock(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const updateStatus = useCallback(async (id: string, newStatus: ContentStatus) => {
    // Optimistic local update
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
    )
    if (!usingMock) {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        await supabase.from('content_items').update({ status: newStatus }).eq('id', id)
      } catch {
        // silently ignore
      }
    }
  }, [usingMock])

  const createItem = useCallback(async (item: Omit<ContentItem, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString()
    const newItem: ContentItem = {
      ...item,
      id: Date.now().toString(),
      created_at: now,
      updated_at: now,
    }
    setItems(prev => [newItem, ...prev])
    if (!usingMock) {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        await supabase.from('content_items').insert([newItem])
      } catch {
        // silently ignore
      }
    }
    return newItem
  }, [usingMock])

  return { items, loading, usingMock, updateStatus, createItem }
}
