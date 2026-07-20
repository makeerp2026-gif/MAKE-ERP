import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Pata lagayein ki kaunsa user login hai
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  // Agar user login nahi hai (ya direct URL daal kar aaya hai), toh wapas login par bhej dein
  if (authError || !user) {
    redirect('/login')
  }

  // 2. User ki profile nikaalein (Master Admin ka naam aur School ID lene ke liye)
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 3. School ka naam nikaalein (Profile mein mili School ID ka use karke)
  let schoolName = "School Not Found"
  if (profile && profile.school_id) {
    const { data: school } = await supabase
      .from('schools')
      .select('name')
      .eq('id', profile.school_id)
      .single()
    
    if (school) {
      schoolName = school.name
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {profile?.full_name || 'Admin'}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Aap <span className="font-bold text-blue-600 uppercase">{schoolName}</span> ka Master Dashboard dekh rahe hain.
          </p>
        </div>

        {/* Stats Cards Section (Dummy Data for now) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-gray-500 text-sm">Total Students</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">0</p>
          </div>
          
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-gray-500 text-sm">Total Teachers</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">0</p>
          </div>
          
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-gray-500 text-sm">Active Vendors</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">0</p>
          </div>
          
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-gray-500 text-sm">Pending Fees</h3>
            <p className="text-3xl font-bold mt-2 text-red-600">₹0</p>
          </div>
        </div>

      </div>
    </div>
  )
}