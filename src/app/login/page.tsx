import { headers } from 'next/headers';
import { loginUser } from '@/actions/auth';
import { redirect } from 'next/navigation';
import SchoolFormClient from './SchoolFormClient'; // 👈 Humne jo nayi file banayi use import kar liya

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const sp = await searchParams;
  const error = sp.error;

  // 👮‍♂️ TRAFFIC POLICE: Domain Check Karo
  const headersList = await headers();
  const host = headersList.get('host') || '';
  
  // Agar URL mein localhost ya main domain hai, toh wo Main Website hai
  const isMainDomain = host === 'localhost:3000' || host === 'makeerp.com' || host === 'www.makeerp.com';
  
  // Agar isMainDomain false hai, toh dot (.) se pehle wala naam nikal lo (e.g., 'raunkschool')
  const subdomain = isMainDomain ? null : host.split('.')[0];


  // 🏫 SCENARIO 1: AGAR USER SCHOOL KE URL PAR AAYA HAI (Subdomain)
  if (subdomain) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-blue-600 uppercase tracking-wide">{subdomain}</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">School Portal Login</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm text-center font-bold">
              {error}
            </div>
          )}

          {/* School wala form dikha do (Dropdown ke sath) */}
          <SchoolFormClient subdomain={subdomain} />
        </div>
      </div>
    )
  }


  // 👑 SCENARIO 2: AGAR USER MAIN WEBSITE PAR AAYA HAI (Master Admin)
  const handleMainLogin = async (formData: FormData) => {
    "use server"
    const result = await loginUser(formData)
    if (result?.error) {
      redirect(`/login?error=${encodeURIComponent(result.error)}`)
    } else if (result?.redirectUrl) {
      redirect(result.redirectUrl)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900">MAKE ERP</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">SaaS Platform Login</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm text-center font-bold">
            {error}
          </div>
        )}

        {/* Master Admin ka Form (Bina Dropdown ke) */}
        <form action={handleMainLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email ID</label>
            <input 
              type="email" name="email" required
              className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
              placeholder="admin@makeerp.com" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
            <input 
              type="password" name="password" required
              className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="mt-2 bg-blue-600 text-white py-4 rounded-xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30">
            Login as Master Admin 🚀
          </button>
        </form>
      </div>
    </div>
  )
}