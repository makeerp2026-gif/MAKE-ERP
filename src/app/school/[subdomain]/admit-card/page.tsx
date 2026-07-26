"use client"

import Link from 'next/link'

export default function AdmitCardPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600 font-bold text-sm mb-6 inline-block hover:underline">
          ← Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-emerald-600 p-8 text-white text-center">
            <div className="text-4xl mb-3">🎫</div>
            <h1 className="text-2xl font-black uppercase tracking-wide">Admit Card</h1>
            <p className="text-emerald-100 text-sm mt-2">Download hall ticket for upcoming examinations</p>
          </div>

          <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Admission No. / Roll No. *</label>
              <input type="text" required placeholder="Enter your ID" className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none transition" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Registered Mobile Number *</label>
              <input type="tel" required placeholder="Enter parents mobile no." className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none transition" />
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg mt-4">
              Generate Admit Card
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}