import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import UnlockPaymentButton from '../../../components/schools/UnlockPaymentButton'

export default async function SchoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  
  // 1. School ki details nikal rahe hain
  const { data: school } = await supabase
    .from('schools')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (!school) {
    return <div className="p-10 text-center font-bold text-slate-500">School Data Not Found!</div>
  }

  // 2. Billing Status Logic
  const isLocked = school.billing_status === 'unpaid' || school.billing_status === 'locked' 
  
  // TODO: Future mein yahan 'students' table se actual count nikalenge
  const activeStudents = 120 
  const pendingAmount = activeStudents * 15 // ₹15 per student

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans space-y-6">
      
      {/* Back Button & Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link href="/dashboard/schools" className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition shadow-sm">
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900">{school.name}</h1>
          <p className="text-sm font-bold text-slate-500 tracking-wide mt-1">ID: {school.id} | {school.subdomain}.makeerp.com</p>
        </div>
      </div>

      {/* 🚨 ACCOUNT LOCKED ALERT BAR */}
      {isLocked && (
        <div className="bg-red-50 border-2 border-red-200 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse-slow shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-5xl">⚠️</span>
            <div>
              <h3 className="text-red-900 font-black text-xl">ERP Access is Locked!</h3>
              <p className="text-red-700 text-sm font-medium mt-1">Is college ka login access band kar diya gaya hai kyunki subscription payment pending hai.</p>
            </div>
          </div>
          
          {/* 🚀 CLIENT COMPONENT: Razorpay Payment Button */}
          <UnlockPaymentButton 
            schoolId={school.id} 
            schoolName={school.name} 
            amount={pendingAmount} 
          />
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Billing Status</p>
          <div className="flex items-center gap-2 mt-2">
            {isLocked ? (
               <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-lg text-sm font-black tracking-wide border border-red-200">UNPAID / LOCKED</span>
            ) : (
               <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-lg text-sm font-black tracking-wide border border-emerald-200">ACTIVE</span>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Active Students</p>
          <p className="text-3xl font-black text-slate-900">{activeStudents}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Monthly Dues (₹15/Student)</p>
          <p className="text-3xl font-black text-blue-600">₹{pendingAmount}</p>
        </div>
      </div>
    </div>
  )
}