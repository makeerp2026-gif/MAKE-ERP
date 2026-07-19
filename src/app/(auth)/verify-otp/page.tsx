'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

function OtpForm() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Browser ke liye Supabase client banayein
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // OTP Verify karne ka Supabase function
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email || '',
      token: otp,
      type: 'signup'
    })

    if (verifyError) {
      setError("Galat OTP! Kripaya email check karke sahi code daalein.")
      setLoading(false)
      return
    }

    // OTP sahi hone par user ko final page par bhej dein
    router.push('/pending-approval')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-2">Verify Your Email</h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Humne <strong>{email}</strong> par ek 6-digit ka OTP bheja hai. Kripaya apna inbox ya spam folder check karein.
        </p>
        
        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <input
              type="text"
              maxLength={6}
              required
              placeholder="Enter 6-digit OTP"
              className="w-full p-4 border rounded text-center text-2xl tracking-widest font-mono outline-none focus:border-black"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded font-bold hover:bg-gray-800 transition-colors"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}

// Next.js 14 strict mode ke liye Suspense wrapper zaroori hai
export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <OtpForm />
    </Suspense>
  )
}