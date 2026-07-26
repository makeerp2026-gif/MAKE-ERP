"use client"

import Link from 'next/link'

export default function PayFeesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600 font-bold text-sm mb-6 inline-block hover:underline">
          ← Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-indigo-600 p-8 text-white text-center">
            <div className="text-4xl mb-3">💳</div>
            <h1 className="text-2xl font-black uppercase tracking-wide">Online Fee Payment</h1>
            <p className="text-indigo-100 text-sm mt-2">Securely pay school dues and download receipts</p>
          </div>

          <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Student Admission Number *</label>
              <input type="text" required placeholder="e.g. ADM-2026-045" className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Date of Birth *</label>
              <input type="date" required className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition" />
            </div>

            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-slate-500 justify-center">
              <span>🔒 100% Secure Payment Gateway</span>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg mt-2">
              Fetch Dues & Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}