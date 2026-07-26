"use client"

import Link from 'next/link'

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600 font-bold text-sm mb-6 inline-block hover:underline">
          ← Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-slate-800 p-8 text-white text-center">
            <div className="text-4xl mb-3">📜</div>
            <h1 className="text-2xl font-black uppercase tracking-wide">Certificates & TC</h1>
            <p className="text-slate-300 text-sm mt-2">Download digitally signed school certificates</p>
          </div>

          <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Student ID / Admission Number *</label>
              <input type="text" required placeholder="Enter Admission No." className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-800 outline-none transition" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Certificate Type *</label>
              <select className="w-full p-4 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-slate-800 outline-none transition">
                <option>Bonafide Certificate</option>
                <option>Character Certificate</option>
                <option>Transfer Certificate (TC)</option>
                <option>Fee Estimate Certificate</option>
              </select>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-xs font-medium leading-relaxed">
              <strong>Note:</strong> Original TC requires physical clearance from the library and accounts department. You can download the provisional copy here.
            </div>

            <button type="submit" className="w-full bg-slate-800 text-white font-black py-4 rounded-xl hover:bg-slate-900 transition shadow-lg mt-4">
              Verify & Download
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}