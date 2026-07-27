import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function SuperAdminDashboard() {
  const supabase = await createClient()

  // 1. VIP Security Check
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) redirect('/owner-control-login')

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  // 🚀 NAYA LOGIC: Direct Server Logout (Bina 404 Error Ke)
  const handleLogout = async () => {
    "use server"
    const supabaseServer = await createClient()
    await supabaseServer.auth.signOut()
    redirect('/owner-control-login')
  }

  // 🛡️ Loop-Proof Safe UI Error
  if (profile?.role !== 'SUPER_ADMIN') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-6 font-sans">
        <span className="text-6xl mb-4">🚫</span>
        <h1 className="text-3xl font-black text-red-500 tracking-widest uppercase">Access Denied</h1>
        <p className="text-gray-400 mt-2 font-medium">Aapka account Platform Owner (SUPER_ADMIN) role par set nahi hai.</p>
        
        {/* Yahan /auth/signout hata kar action={handleLogout} laga diya */}
        <form action={handleLogout} className="mt-8">
          <button type="submit" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg">
            Force Logout & Retry
          </button>
        </form>
      </div>
    )
  }

  // 2. Fetch Pending Sanstha Requests
  const { data: pendingRequests } = await supabase
    .from('user_profiles')
    .select('id, full_name, email, created_at')
    .eq('role', 'MASTER_ADMIN')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  // 3. Approval Server Action
  const approveSanstha = async (formData: FormData) => {
    "use server"
    const adminId = formData.get('adminId') as string
    
    const supabaseServer = await createClient()
    await supabaseServer
      .from('user_profiles')
      .update({ status: 'approved' })
      .eq('id', adminId)
      
    revalidatePath('/owner-control/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8 font-sans text-gray-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">👑</span>
              <h1 className="text-3xl font-black text-white tracking-wide">Owner Command Center</h1>
            </div>
            <p className="text-gray-400 font-medium">Welcome back, {profile.full_name || 'Boss'}! Yahan se poora MAKE ERP control karein.</p>
          </div>
          
          {/* Main Dashboard Logout Button bhi fix kar diya */}
          <form action={handleLogout}>
            <button type="submit" className="bg-red-600/10 text-red-500 border border-red-500/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all shadow-sm">
              Lock Terminal (Logout)
            </button>
          </form>
        </div>

        {/* Global Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600/20 text-blue-400 text-[10px] font-black px-3 py-1.5 rounded-bl-xl uppercase">Live</div>
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Total Sanstha</p>
            <p className="text-4xl font-black text-white">24</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600/20 text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-bl-xl uppercase">Live</div>
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Active Schools</p>
            <p className="text-4xl font-black text-white">142</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-sm">
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Total Students</p>
            <p className="text-4xl font-black text-white">18.5k</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 to-gray-900 p-6 rounded-3xl border border-blue-800 shadow-sm">
            <p className="text-xs font-black text-blue-300 uppercase tracking-widest mb-2">Monthly MRR</p>
            <p className="text-4xl font-black text-white">₹2.4L</p>
          </div>
        </div>

        {/* Pending Approvals Section */}
        <div className="bg-gray-900 rounded-3xl shadow-xl border border-gray-800 overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
            <h2 className="text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Pending Sanstha Approvals
            </h2>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
              {pendingRequests?.length || 0} Requests
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800/30">
                  <th className="p-5 text-xs font-black text-gray-500 uppercase tracking-widest">Sanstha Admin Name</th>
                  <th className="p-5 text-xs font-black text-gray-500 uppercase tracking-widest">Registered Email</th>
                  <th className="p-5 text-xs font-black text-gray-500 uppercase tracking-widest">Date Applied</th>
                  <th className="p-5 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {!pendingRequests || pendingRequests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-gray-500 font-medium">
                      Koi pending request nahi hai. Sab clear hai! ✨
                    </td>
                  </tr>
                ) : (
                  pendingRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-800/50 transition">
                      <td className="p-5 font-bold text-white">{req.full_name || 'N/A'}</td>
                      <td className="p-5 text-gray-400 font-medium">{req.email}</td>
                      <td className="p-5 text-gray-400 text-sm">
                        {new Date(req.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-5 text-right">
                        <form action={approveSanstha}>
                          <input type="hidden" name="adminId" value={req.id} />
                          <button 
                            type="submit" 
                            className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-emerald-500 transition shadow-lg hover:shadow-emerald-600/20"
                          >
                            Verify & Approve ✓
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}