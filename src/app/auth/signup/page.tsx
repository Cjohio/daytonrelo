'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Award, Briefcase, Home } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    moveTimeline: '',
    persona: '',
  })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePersonaChange = (value: string) => {
    setFormData((prev) => ({ ...prev, persona: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!termsAccepted) {
      setError('Please accept the terms and conditions')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()

      // Sign up user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/profile`,
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (!authData.user) {
        setError('Failed to create account. Please try again.')
        return
      }

      // Insert profile data
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        move_timeline: formData.moveTimeline || null,
        persona: formData.persona || null,
      })

      if (profileError) {
        console.error('Profile creation error:', profileError)
        // Continue anyway - user is created, profile can be completed later
      }

      // Redirect to verification page
      router.push('/auth/verify')
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join Dayton Relo</h1>
          <p className="text-gray-400 text-sm">
            Your account works on both the website and mobile app.
          </p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6 text-red-200">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Smith"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password (min 8 characters)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Move Timeline */}
          <div>
            <label
              htmlFor="moveTimeline"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Move Timeline
            </label>
            <select
              id="moveTimeline"
              name="moveTimeline"
              value={formData.moveTimeline}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
            >
              <option value="">Select timeline...</option>
              <option value="Already searching">Already searching</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="Just exploring">Just exploring</option>
            </select>
          </div>

          {/* Persona */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              What brings you to Dayton?
            </label>
            <div className="space-y-2">
              {[
                { value: 'military', label: 'Military/PCS', Icon: Award },
                { value: 'relocation', label: 'Corporate Relocation', Icon: Briefcase },
                { value: 'discover', label: 'Local Buyer', Icon: Home },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:border-amber-500 transition"
                >
                  <input
                    type="radio"
                    name="persona"
                    value={option.value}
                    checked={formData.persona === option.value}
                    onChange={(e) => handlePersonaChange(e.target.value)}
                    className="w-4 h-4 text-amber-600"
                  />
                  <span className="ml-3 text-white flex items-center gap-2">
                    <option.Icon className="w-4 h-4" />
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded mt-1"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
              I agree to the{' '}
              <Link href="#" className="text-amber-500 hover:text-amber-400 transition">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-amber-500 hover:text-amber-400 transition">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition mt-6"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-gray-400 text-sm">Already have an account? </span>
          <Link href="/auth/login" className="text-amber-500 hover:text-amber-400 transition">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}