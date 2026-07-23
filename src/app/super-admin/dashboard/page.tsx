import Link from 'next/link';

export default function SuperAdminDashboard() {
  
  // 🚀 Yeh Dummy Data hai (Baad mein hum isko Supabase se replace karenge)
  const masterAdmins = [
    { id: 1, name: "Niraj Gupta", email: "nodomain87@gmail.com", schools: 3, students: 1250, subStatus: "Paid", amount: "₹15,000", date: "23 July 2026" },
    { id: 2, name: "Rahul Sharma", email: "rahul@school.com", schools: 1, students: 800, subStatus: "Pending", amount: "₹5,000", date: "20 July 2026" },
    { id: 3, name: "Amit Singh", email: "amit@trust.com", schools: 5, students: 4500, subStatus: "Unpaid", amount: "₹25,000", date: "15 July 2026" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      
      {/* 👑 HEADER SECTION */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Super Admin Command Center 👑</h1>
        <p className="text-slate-500 font-medium mt-1">Platform overview, revenue, and Master Admin controls.</p>
      </div>

      {/* 📊 SUPER POWER STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-blue-600">
          <p className="text-sm font-bold text-slate-500 uppercase">Total Master Admins</p>
          <p className="text-3xl font-black text-slate-800 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-indigo-600">
          <p className="text-sm font-bold text-slate-500 uppercase">Total Schools</p>
          <p className="text-3xl font-black text-slate-800 mt-2">45</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-emerald-600">
          <p className="text-sm font-bold text-slate-500 uppercase">Total Students</p>
          <p className="text-3xl font-black text-slate-800 mt-2">18,500</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-rose-600">
          <p className="text-sm font-bold text-slate-500 uppercase">Monthly Revenue</p>
          <p className="text-3xl font-black text-slate-800 mt-2">₹1.2L</p>
        </div>
      </div>

      {/* 🏫 MASTER ADMINS LIST TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-black text-slate-800">Master Admins (SaaS Clients)</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">
            + Add New Client
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="p-4 border-b border-slate-100">Client Info</th>
                <th className="p-4 border-b border-slate-100 text-center">Schools</th>
                <th className="p-4 border-b border-slate-100 text-center">Students</th>
                <th className="p-4 border-b border-slate-100">Subscription</th>
                <th className="p-4 border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              
              {masterAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Client Info */}
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{admin.name}</div>
                    <div className="text-xs text-slate-500">{admin.email}</div>
                  </td>
                  
                  {/* Schools Count */}
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs">
                      {admin.schools} Schools
                    </span>
                  </td>
                  
                  {/* Students Count */}
                  <td className="p-4 text-center font-bold text-slate-600">
                    {admin.students.toLocaleString()}
                  </td>
                  
                  {/* Subscription Status */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      {admin.subStatus === "Paid" && <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md w-max">✅ Paid ({admin.amount})</span>}
                      {admin.subStatus === "Pending" && <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md w-max">⏳ Pending ({admin.amount})</span>}
                      {admin.subStatus === "Unpaid" && <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded-md w-max">❌ Unpaid ({admin.amount})</span>}
                      <span className="text-[10px] text-slate-400 font-medium">Since: {admin.date}</span>
                    </div>
                  </td>
                  
                  {/* Action Button */}
                  <td className="p-4 text-right">
                    <Link 
                      href={`/super-admin/client/${admin.id}`} 
                      className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm"
                    >
                      View Details 👁️
                    </Link>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}