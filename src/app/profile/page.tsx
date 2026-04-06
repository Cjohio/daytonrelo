'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Profile {
  id: string
  full_name: string
  email: string
  phone: string
  move_timeline: string
  persona: string
}

interface SavedItem {
  id: string
  item_type: string
  item_id: string
  title: string
  subtitle: string
  route: string
  created_at: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<Profile>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      // Check authentication
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth/login?next=/profile')
        return
      }

      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      if (profileData) {
        setProfile(profileData)
        setEditData(profileData)
      } else {
        // Create minimal profile if doesn't exist
        setProfile({
          id: session.user.id,
          full_name: session.user.user_metadata?.full_name || '',
          email: session.user.email || '',
          phone: '',
          move_timeline: '',
          persona: '',
        })
      }

      // Load saved items
      const { data: items, error: itemsError } = await supabase
        .from('saved_items')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (!itemsError && items) {
        setSavedItems(items)
      }
    } catch (err) {
      console.error('Error loading profile:', err)
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!profile) return
    setSaving(true)
    setError('')

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          full_name: editData.full_name || '',
          email: editData.email || '',
          phone: editData.phone || '',
          move_timeline: editData.move_timeline || '',
          persona: editData.persona || '',
        })

      if (updateError) throw updateError

      setProfile({
        ...profile,
        ...editData,
      })
      setIsEditing(false)
    } catch (err) {
      console.error('Error saving profile:', err)
      setError('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleRemoveSavedItem = async (itemId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('saved_items')
        .delete()
        .eq('id', itemId)

      if (deleteError) throw deleteError

      setSavedItems((prev) => prev.filter((item) => item.id !== itemId))
    } catch (err) {
      console.error('Error removing saved item:', err)
      setError('Failed to remove item')
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Profile not found</p>
          <Link
            href="/"
            className="text-amber-500 hover:text-amber-400 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6 text-red-200">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* User Info Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
              {!isEditing && (
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white">{profile.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">{profile.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Move Timeline</p>
                    <p className="text-white">{profile.move_timeline || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Persona</p>
                    <p className="text-white">{profile.persona || 'Not set'}</p>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                if (isEditing) {
                  setEditData(profile)
                  setIsEditing(false)
                } else {
                  setIsEditing(true)
                }
              }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition text-sm"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {isEditing && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editData.full_name || ''}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, full_name: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editData.email || ''}
                  disabled
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 disabled:opacity-50"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editData.phone || ''}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Move Timeline
                </label>
                <select
                  value={editData.move_timeline || ''}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, move_timeline: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
                >
                  <option value="">Select timeline...</option>
                  <option value="Already searching">Already searching</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="Just exploring">Just exploring</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Persona
                </label>
                <select
                  value={editData.persona || ''}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, persona: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
                >
                  <option value="">Select persona...</option>
                  <option value="military">Military/PCS</option>
                  <option value="relocation">Corporate Relocation</option>
                  <option value="discover">Local Buyer</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={saving}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>

        {/* Saved Items Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Your Saved Items</h2>
          {savedItems.length === 0 ? (
            <p className="text-gray-400">No saved items yet.</p>
          ) : (
            <div className="space-y-3">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{item.title}</h3>
                    {item.subtitle && (
                      <p className="text-sm text-gray-400">{item.subtitle}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {item.item_type} · {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {item.route && (
                      <Link
                        href={item.route}
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded transition"
                      >
                        View
                      </Link>
                    )}
                    <button
                      onClick={() => handleRemoveSavedItem(item.id)}
                      className="px-3 py-1 bg-red-900/30 hover:bg-red-900/50 text-red-300 text-sm rounded transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile App Section */}
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">Take Dayton Relo with you</h2>
          <p className="text-gray-300 mb-4">
            Download the mobile app to access your profile and saved items on the go. Use the same account on both platforms.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition text-sm"
            >
              Download on App Store
            </a>
            <a
              href="#"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition text-sm"
            >
              Get on Google Play
            </a>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Account</h2>
          <div className="space-y-3">
            <Link
              href="/auth/forgot-password"
              className="block px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition text-center"
            >
              Change Password
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
