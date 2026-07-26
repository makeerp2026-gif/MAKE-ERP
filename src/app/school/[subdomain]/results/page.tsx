"use client"

import Link from 'next/link'

export default function DownloadResultPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600 font-bold text-sm mb-6 inline-block hover:underline">
          ← Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-blue-600 p-8 text-white text-center">
            <div className="text-4xl mb-3">📊</div>
            <h1 className="text-2xl font-black uppercase tracking-wide">Download Result</h1>
            <p className="text-blue-100 text-sm mt-2">Enter details to view your academic performance</p>
          </div>

          <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Registration / Roll Number *</label>
              <input type="text" required placeholder="e.g. 2026/XYZ/001" className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Date of Birth *</label>
              <input type="date" required className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Term / Examination *</label>
              <select className="w-full p-4 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-600 outline-none transition">
                <option>Final Examination 2025-26</option>
                <option>Half-Yearly Examination 2025-26</option>
                <option>Unit Test 2</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition shadow-lg mt-4">
              Get Report Card 📥
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}