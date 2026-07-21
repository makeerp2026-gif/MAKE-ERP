"use client" // Yeh ab ek client component hai jisme buttons aur popups kaam karenge

import { verifyResetOtpAndUpdate } from '@/actions/auth'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'

function OTPForm() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const error = searchParams.get('error')

  // 1. Password dikhane ya chupane ka switch
  const [showPassword, setShowPassword] = useState(false)
  
  // 2. Button par loading ghumane ka state (Blank screen rokne ke liye)
  const [isLoading, setIsLoading] = useState(false)

  // 3. Jab bhi URL mein error aaye, ek mast Toast popup dikhayein
  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 4000 })
      setIsLoading(false) // Error aane par loading band kar dein
    }
  }, [error])

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      
      <h2 className="text-3xl font-black text-gray-900 text-center mb-2">
        Enter OTP 🔑
      </h2>
      <p className="text-center text-sm text-gray-500 mb-8">
        Humne <span className="font-bold text-black">{email}</span> par ek 6-digit OTP bheja hai.
      </p>

      {/* Form Submit hone par setIsLoading(true) ho jayega jisse loading shuru hogi */}
      <form 
        action={verifyResetOtpAndUpdate} 
        onSubmit={() => setIsLoading(true)} 
        className="space-y-5"
      >
        {/* Backend ke liye hidden email */}
        <input type="hidden" name="email" value={email} />

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            6-Digit OTP
          </label>
          <input 
            name="otp" 
            type="text" 
            maxLength={6}
            required 
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center tracking-[0.5em] font-bold text-2xl" 
            placeholder="••••••" 
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            New Password
          </label>
          <div className="relative">
            {/* Input type change hoga showPassword ke hisaab se */}
            <input 
              name="newPassword" 
              type={showPassword ? "text" : "password"} 
              required 
              className="w-full p-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              placeholder="Naya password set karein" 
            />
            
            {/* 👀 EYE ICON BUTTON 👀 */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showPassword ? (
                // Aankh khuli hui (Eye Open)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              ) : (
                // Aankh band (Eye Closed)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Loading Button */}
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full text-white p-3.5 rounded-xl font-bold text-sm transition-all ${
            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Updating Password... ⏳' : 'Update Password ✅'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/forgot-password" className="text-sm font-semibold text-blue-600 hover:underline">
          Wrong email? Go back
        </Link>
      </div>

    </div>
  )
}

// Next.js mein Client Component ko Suspense mein wrap karna zaroori hota hai jab searchParams use karein
export default function VerifyResetOtpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Suspense fallback={<div className="text-gray-500 font-semibold">Loading Page...</div>}>
        <OTPForm />
      </Suspense>
    </div>
  )
}