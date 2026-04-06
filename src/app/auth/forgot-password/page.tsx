'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (resetError) {
        setError(resetError.message)
      } else {
        setSuccess(true)
        setEmail('')
      }
    } catch (err) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-400">Enter your email to receive a reset link.</p>
        </div>

        {success && (
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-6 text-green-200">
            <p className="font-medium">Check your email</p>
            <p className="text-sm mt-1">We sent you a password reset link. Click it to set a new password.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6 text-red-200">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              disabled={success}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/auth/login" className="text-amber-500 hover:text-amber-400 transition text-sm">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
