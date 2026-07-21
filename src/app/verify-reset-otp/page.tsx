import { verifyResetOtpAndUpdate } from '@/actions/auth'
import Link from 'next/link'

export default function VerifyResetOtpPage({
  searchParams,
}: {
  searchParams: { email: string; error?: string }
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        <h2 className="text-3xl font-black text-gray-900 text-center mb-2">
          Enter OTP 🔑
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Humne <span className="font-bold text-black">{searchParams.email}</span> par ek OTP bheja hai.
        </p>

        {searchParams?.error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium text-center">
            {searchParams.error}
          </div>
        )}

        <form action={verifyResetOtpAndUpdate} className="space-y-5">
          {/* Email ko hidden input mein bhej rahe hain taaki backend ko pata rahe kiska OTP hai */}
          <input type="hidden" name="email" value={searchParams.email} />

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              6-Digit OTP
            </label>
            <input 
              name="otp" 
              type="text" 
              maxLength={6}
              required 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-center tracking-[0.5em] font-bold text-xl" 
              placeholder="••••••" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              New Password
            </label>
            <input 
              name="newPassword" 
              type="password" 
              required 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              placeholder="Naya password daalein" 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
            Update Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/forgot-password" className="text-sm font-semibold text-blue-600 hover:underline">
            Wrong email? Go back
          </Link>
        </div>

      </div>
    </div>
  )
}