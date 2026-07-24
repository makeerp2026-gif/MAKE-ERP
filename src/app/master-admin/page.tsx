import { getPendingUsers, approveUser, rejectUser } from '@/actions/admin'

export default async function MasterAdminDashboard() {
  // Backend se saare pending users ko le aao aur safely data extract karo
  const response = await getPendingUsers()
  const pendingUsersList = response?.data || [] // TypeScript khush, hum bhi khush!

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Boss Dashboard 👑</h1>
            <p className="text-gray-500 mt-1">Review and manage pending school registrations.</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
            Pending Applications: {pendingUsersList.length}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {pendingUsersList.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-xl">Koi nayi application nahi hai. Sab shanti hai! ☕</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">User ID (Ref)</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsersList.map((user: any) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="p-4 text-sm font-mono text-gray-600 truncate max-w-[200px]">
                      {user.id}
                    </td>
                    <td className="p-4">
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
                        Pending Review
                      </span>
                    </td>
                    <td className="p-4 flex justify-end gap-3">
                      
                      {/* Reject Button Form */}
                      <form action={rejectUser.bind(null, user.id)}>
                        <button 
                          type="submit" 
                          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                        >
                          Reject ❌
                        </button>
                      </form>

                      {/* Approve Button Form */}
                      <form action={approveUser.bind(null, user.id)}>
                        <button 
                          type="submit" 
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition shadow-sm"
                        >
                          Approve ✅
                        </button>
                      </form>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}