import { registerSchool } from '@/actions/auth' // Action ka naam aap chaho toh registerSanstha kar sakte ho baad mein

export default function SansthaOnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        {/* 🚀 Header Update Kar Diya Hai */}
        <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Sanstha Registration</h2>
        <p className="text-sm text-gray-500 text-center mb-8">Register your Trust/Society for Super Admin verification</p>

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

          {/* 📱 NAYA FIELD: Contact Number (KYC ke liye) */}
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
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
              placeholder="••••••••" 
            />
          </div>

          {/* Submit Button Update */}
          <button type="submit" className="w-full bg-blue-600 text-white p-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 mt-2">
            Submit Sanstha Application
          </button>

        </form>
      </div>
    </div>
  )
}