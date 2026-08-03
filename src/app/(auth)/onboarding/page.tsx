import { registerSchool } from '@/actions/auth' 

// 🚀 NAYA: searchParams add kiya taaki URL se error padh sakein
export default async function SansthaOnboardingPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const sp = await searchParams
  const error = sp.error

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Sanstha Registration</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Register your Trust/Society for Super Admin verification</p>

        {/* 🚨 ERROR BOX: Agar backend se error aayega toh yahan lal rang mein dikhega */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center font-bold">
            {error === '{}' ? 'Email already registered or password too short (Min 6 chars).' : error}
          </div>
        )}

        <form action={registerSchool} className="space-y-5">
          
          {/* Sanstha Name Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Sanstha / Trust Name</label>
            <input 
              name="sansthaName" 
              type="text" 
              required 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
              placeholder="e.g. Vidya Vikas Educational Trust" 
            />
          </div>

          {/* Admin Name Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Authorized Admin Name</label>
            <input 
              name="adminName" 
              type="text" 
              required 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
              placeholder="President / Secretary Name" 
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Official Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
              placeholder="admin@sanstha.com" 
            />
          </div>

          {/* 📱 Contact Number (KYC ke liye) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Contact Number</label>
            <input 
              name="phone" 
              type="tel" 
              required 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
              placeholder="+91 98765 43210" 
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              minLength={6}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
              placeholder="Min 6 characters" 
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white p-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 mt-2">
            Submit Sanstha Application
          </button>

        </form>
      </div>
    </div>
  )
}