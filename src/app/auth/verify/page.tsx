'use client'

import Link from 'next/link'

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Verify your email</h1>
          <p className="text-gray-400 mb-4">
            We've sent a confirmation link to your email address.
          </p>
          <p className="text-gray-500 text-sm">
            Click the link in the email to verify your account and get started with Dayton Relo.
          </p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <div className="text-4xl mb-4">✉️</div>
          <p className="text-gray-300 text-sm">
            Once verified, you'll be able to log in on both the website and mobile app with the same account.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/auth/login"
            className="inline-block w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg transition"
          >
            Back to Sign In
          </Link>
          <Link
            href="/"
            className="inline-block w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition border border-gray-700"
          >
            Back to Home
          </Link>
        </div>

        <p className="text-gray-500 text-xs mt-8">
          Didn't receive the email? Check your spam folder or try signing in again.
        </p>
      </div>
    </div>
  )
}
