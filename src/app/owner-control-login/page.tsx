import { loginSuperAdmin } from '@/actions/auth'
import { redirect } from 'next/navigation'

// Next.js 15+ searchParams Promise Fix
export default async function SecretOwnerLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const sp = await searchParams
  const error = sp.error

  // 🚀 TS Error Fix wala Wrapper
  const handleOwnerLogin = async (formData: FormData) => {
    "use server"
    const result = await loginSuperAdmin(formData)
    
    if (result?.error) {
      redirect(`/owner-control-login?error=${encodeURIComponent(result.error)}`)
    } else if (result?.redirectUrl) {
      redirect(result.redirectUrl)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950"> {/* Dark Theme */}
      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
        
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gray-800 rounded-full mb-4 shadow-inner">
            <span className="text-4xl">👑</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase">Platform Owner</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium tracking-wide">RESTRICTED ACCESS ONLY</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-xl text-sm text-center font-bold">
            {error}
          </div>
        )}

        <form action={handleOwnerLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Master Email</label>
            <input 
              type="email" 
              name="email"
              required
              className="w-full mt-2 p-3.5 bg-gray-950 border border-gray-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
              placeholder="owner@makeerp.com" 
            />
          </div>
          
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Master Password</label>
            <input 
              type="password" 
              name="password"
              required
              className="w-full mt-2 p-3.5 bg-gray-950 border border-gray-800 text-white rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
              placeholder="••••••••" 
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-4 w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-600/20"
          >
            AUTHORIZE ACCESS
          </button>
        </form>

      </div>
    </div>
  )
}