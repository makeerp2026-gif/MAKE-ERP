import { resetPassword } from '@/actions/auth'
import Link from 'next/link'

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { message?: string; error?: string }
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        <h2 className="text-3xl font-black text-gray-900 text-center mb-2">
          Forgot Password? 🔒
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Apna registered email daalein. Hum aapko password reset karne ka link bhejenge.
        </p>

        {/* Success ya Error Message Dikhane ke liye */}
        {searchParams?.error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium text-center">
            {searchParams.error}
          </div>
        )}
        {searchParams?.message && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg font-medium text-center animate-fade-in">
            {searchParams.message}
          </div>
        )}

        {/* Form */}
        <form action={resetPassword} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Registered Email ID
            </label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              placeholder="admin@school.com" 
            />
          </div>

          <button type="submit" className="w-full bg-black text-white p-3.5 rounded-xl font-bold text-sm hover:bg-gray-900 transition-all">
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login/master" className="text-sm font-semibold text-blue-600 hover:underline">
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  )
}