'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user as User)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user as User)
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setShowMenu(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return null
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/auth/login"
          className="px-4 py-2 text-white hover:text-amber-400 transition text-sm"
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition text-sm"
        >
          Sign Up
        </Link>
      </div>
    )
  }

  const initials = (user.user_metadata?.full_name || user.email || 'U')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {initials}
        </div>
        <span className="text-white text-sm hidden sm:inline">
          {user.user_metadata?.full_name || 'Account'}
        </span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm text-gray-300">{user.email}</p>
          </div>
          <Link
            href="/profile"
            className="block px-4 py-2 text-white hover:bg-gray-700 transition"
            onClick={() => setShowMenu(false)}
          >
            My Profile
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-red-300 hover:bg-gray-700 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
