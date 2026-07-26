import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function SchoolLoginPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain;

  // Database se School ki details nikalna
  const supabase = await createClient();
  const { data: school } = await supabase
    .from('schools')
    .select('id, name, logo_url')
    .eq('subdomain', subdomain)
    .single();

  if (!school) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* 🔵 Left Side: School Branding */}
        <div className="w-full md:w-5/12 bg-blue-600 p-10 text-white flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <Link href="/" className="text-blue-200 text-sm font-bold hover:text-white transition flex items-center gap-2 mb-8 justify-center">
              ← Back to Website
            </Link>
            {school.logo_url ? (
              <img src={school.logo_url} alt={school.name} className="h-24 w-auto mx-auto mb-6 bg-white p-2 rounded-xl object-contain" />
            ) : (
              <div className="w-20 h-20 bg-white text-blue-600 rounded-2xl flex items-center justify-center font-black text-4xl mx-auto mb-6 shadow-lg">
                {school.name.charAt(0).toUpperCase()}
              </div>
            )}
            <h1 className="text-3xl font-black uppercase tracking-wide leading-tight">
              {school.name}
            </h1>
            <p className="text-blue-200 mt-4 text-sm font-medium">
              Official ERP Portal
            </p>
          </div>
          
          <div className="mt-12 text-xs font-medium text-blue-200">
            Powered by <span className="font-bold text-white">MAKE ERP</span>
          </div>
        </div>

        {/* ⚪ Right Side: Login Form */}
        <div className="w-full md:w-7/12 p-10 md:p-14">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Welcome Back 👋</h2>
          <p className="text-slate-500 text-sm font-medium mb-8">Please login to your account to continue.</p>

          <form className="space-y-6">
            
            {/* Smart Role Selection (Unified Portal) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Login As *</label>
              <select defaultValue="" className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition font-medium text-slate-700">
                <option value="" disabled>Select your portal...</option>
                <option value="student_parent">🎓 Student / Parent Portal</option>
                <option value="staff">💼 Staff / Employee Portal</option>
                <option value="admin">👑 Principal / Admin Portal</option>
              </select>
            </div>

            {/* User ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">User ID / Registration No. *</label>
              <input 
                type="text" 
                required 
                placeholder="Enter your ID" 
                className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition" 
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-700">Password *</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot Password?</a>
              </div>
              <input 
                type="password" 
                required 
                placeholder="••••••••" 
                className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition" 
              />
            </div>

            {/* Login Button */}
            <button 
              type="button" 
              className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition shadow-lg mt-4"
            >
              Secure Login 🔒
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}