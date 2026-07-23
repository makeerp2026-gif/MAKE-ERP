import Link from 'next/link';

export default async function ClientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const clientId = resolvedParams.id;

  // 🚀 DUMMY DATA (Baad mein Supabase se aayega is 'clientId' ke base par)
  const clientData = {
    id: clientId,
    name: "Niraj Gupta",
    email: "nodomain87@gmail.com",
    phone: "+91 9876543210",
    joinDate: "23 July 2026",
    status: "Active",
    subscription: {
      plan: "Premium SaaS Plan",
      amount: "₹15,000 / month",
      status: "Paid",
      lastPayment: "23 July 2026",
      nextDue: "23 August 2026"
    },
    schools: [
      { id: 101, name: "Delhi Public School", students: 800, location: "New Delhi" },
      { id: 102, name: "Ryan International", students: 450, location: "Mumbai" },
      { id: 103, name: "St. Xavier's High", students: 0, location: "Setup Pending" }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      
      {/* 🔙 BACK BUTTON & HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/super-admin/dashboard" className="text-sm font-bold text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Client Details</h1>
          <p className="text-slate-500 font-medium mt-1">Master Admin Profile & Overview</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all">
            Reset Password
          </button>
          <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all">
            Suspend Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 👤 LEFT COLUMN: PROFILE & SUBSCRIPTION */}
        <div className="space-y-8">
          
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-slate-800">Profile Info</h2>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                {clientData.status}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Full Name</p>
                <p className="font-semibold text-slate-800">{clientData.name}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Email Address</p>
                <p className="font-semibold text-slate-800">{clientData.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Phone Number</p>
                <p className="font-semibold text-slate-800">{clientData.phone}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Joined On</p>
                <p className="font-semibold text-slate-800">{clientData.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-blue-600">
            <h2 className="text-lg font-black text-slate-800 mb-4">Subscription & Billing</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Current Plan</p>
                <p className="font-semibold text-blue-700 bg-blue-50 w-max px-2 py-1 rounded mt-1">{clientData.subscription.plan}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Amount</p>
                  <p className="font-black text-slate-800 text-lg">{clientData.subscription.amount}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
                  <p className="font-bold text-emerald-600">{clientData.subscription.status} ✅</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Last Paid</p>
                  <p className="font-semibold text-slate-800 text-sm">{clientData.subscription.lastPayment}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Next Due</p>
                  <p className="font-semibold text-rose-600 text-sm">{clientData.subscription.nextDue}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 🏫 RIGHT COLUMN: CONNECTED SCHOOLS */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-slate-800">Connected Schools ({clientData.schools.length})</h2>
              <button className="text-sm font-bold text-blue-600 hover:underline">
                + Assign New School
              </button>
            </div>

            <div className="space-y-4">
              {clientData.schools.map((school, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-black text-lg">
                      {school.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{school.name}</h3>
                      <p className="text-xs font-medium text-slate-500">📍 {school.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-800">{school.students}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Students</p>
                  </div>
                </div>
              ))}

              {clientData.schools.length === 0 && (
                <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl">
                  <p className="text-slate-500 font-medium">No schools assigned to this Master Admin yet.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}