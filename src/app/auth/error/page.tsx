'use client'

import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Authentication Error</h1>
          <p className="text-gray-400">
            Something went wrong with your sign in. Please try again.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/auth/login"
            className="inline-block w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-block w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition border border-gray-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
