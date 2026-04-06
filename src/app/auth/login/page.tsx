'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showMagicLinkSent, setShowMagicLinkSent] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/profile'

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
      } else {
        router.push(next)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      })

      if (magicLinkError) {
        setError(magicLinkError.message)
      } else {
        setShowMagicLinkSent(true)
        setEmail('')
      }
    } catch (err) {
      setError('Failed to send magic link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back to Dayton Relo</h1>
          <p className="text-gray-400">Same account, app or website.</p>
        </div>

        {showMagicLinkSent && (
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-6 text-green-200">
            <p className="font-medium">Check your email</p>
            <p className="text-sm mt-1">We sent you a magic link. Click it to sign in.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6 text-red-200">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Password Sign In */}
          <form onSubmit={handlePasswordSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">or continue with</span>
            </div>
          </div>

          {/* Magic Link */}
          <button
            onClick={handleMagicLink}
            disabled={loading || !email}
            className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition border border-gray-700"
          >
            {loading ? 'Sending...' : 'Magic Link'}
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-6 space-y-3 text-center text-sm">
          <div>
            <Link
              href="/auth/forgot-password"
              className="text-amber-500 hover:text-amber-400 transition"
            >
              Forgot password?
            </Link>
          </div>
          <div>
            <span className="text-gray-400">Don't have an account? </span>
            <Link
              href="/auth/signup"
              className="text-amber-500 hover:text-amber-400 transition font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
