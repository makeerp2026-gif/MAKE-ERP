import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function MasterDashboardPage() {
  const supabase = await createClient()

  // 1. Pata lagayein ki kaunsa user login hai
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  // Agar user login nahi hai, toh wapas login par bhej dein
  if (authError || !user) {
    redirect('/login/master')
  }

  // 2. User ki profile nikaalein (Sirf Master Admin ka naam lene ke liye)
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Welcome back, {profile?.full_name?.toUpperCase() || 'MASTER ADMIN'}! 👑
            </h1>
            <p className="text-gray-500">
              Aap <span className="font-bold text-blue-600">MAKE ERP</span> ka Global Dashboard dekh rahe hain.
            </p>
          </div>
          
          {/* 🚀 BADA BUTTON NAYA SCHOOL BANANE KE LIYE */}
          <Link href="/dashboard/schools/create" className="bg-black text-white px-6 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2">
            <span>+</span> Register New School
          </Link>
        </div>

        {/* 📊 STATS CARDS (Global Aggregates - Dummy Data for now) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Schools */}
          <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-md text-white">
            <h3 className="font-semibold text-blue-100 text-sm uppercase tracking-wider">Total Schools</h3>
            <p className="text-4xl font-black mt-2">12</p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Total Students</h3>
            <p className="text-3xl font-bold mt-2 text-gray-900">4,520</p>
          </div>
          
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Total Teachers</h3>
            <p className="text-3xl font-bold mt-2 text-gray-900">340</p>
          </div>
          
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Total Parents</h3>
            <p className="text-3xl font-bold mt-2 text-gray-900">4,100</p>
          </div>

        </div>

      </div>
    </div>
  )
}