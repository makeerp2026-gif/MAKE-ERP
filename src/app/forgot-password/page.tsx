import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900">Reset Password</h1>
          <p className="text-sm text-gray-500 font-medium mt-2">
            Enter your email ID and we will send you a link to reset your password.
          </p>
        </div>

        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Registered Email ID</label>
            <input 
              type="email" 
              name="email" 
              required
              className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
              placeholder="id@school.com" 
            />
          </div>

          <button 
            type="submit" 
            className="mt-2 bg-blue-600 text-white py-4 rounded-xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30"
          >
            Send Reset Link 📧
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-black transition-all">
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  )
}