import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { approveMasterAdmin } from '@/actions/super-admin'

export default async function SuperAdminDashboard() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // 🚀 Auth Check: Sirf SUPER_ADMIN hi is page ko dekh payega
  const userRole = profile?.role?.toUpperCase()
  if (userRole !== 'SUPER_ADMIN') {
    return <div className="p-8 text-red-600 font-bold text-center mt-20 text-2xl">Unauthorized Access! 🛑<br/><span className="text-sm text-gray-500">Sirf Platform Owner yahan aa sakta hai.</span></div>
  }

  // 🚀 Fetch Pending Master Admins (Case insensitive search with .ilike)
  const { data: pendingAdmins } = await supabase
    .from('user_profiles')
    .select('*')
    .ilike('role', 'MASTER_ADMIN') // ilike se uppercase/lowercase dono aa jayenge
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h1 className="text-3xl font-black text-white">Owner Control Room 👑</h1>
          <p className="text-gray-400 mt-1">Naye Master Admins (SaaS Registrations) ko yahan se approve ya reject karein.</p>
        </div>

        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700 bg-gray-850">
            <h2 className="font-bold text-gray-300">Pending Approvals ({pendingAdmins?.length || 0})</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-750 text-gray-400 text-xs font-bold uppercase border-b border-gray-700">
                  <th className="p-4">Full Name</th>
                  <th className="p-4">Phone Number</th>
                  <th className="p-4">Request Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {!pendingAdmins || pendingAdmins.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 font-medium">
                      Koi bhi pending request nahi hai. Sab kuch up-to-date hai! 😎
                    </td>
                  </tr>
                ) : (
                  pendingAdmins.map((admin) => {
                    const date = admin.created_at ? new Date(admin.created_at).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    }) : 'N/A'

                    return (
                      <tr key={admin.id} className="hover:bg-gray-750 transition-colors">
                        <td className="p-4 font-bold text-white">{admin.full_name || 'N/A'}</td>
                        <td className="p-4 text-gray-300">{admin.phone_number || 'N/A'}</td>
                        <td className="p-4 text-sm text-gray-400">{date}</td>
                        <td className="p-4 text-right">
                          <form action={async () => {
                            'use server'
                            await approveMasterAdmin(admin.id)
                          }}>
                            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md">
                              Approve Access ✓
                            </button>
                          </form>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}