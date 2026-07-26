"use client"

import { useState } from 'react'

export default function AdmissionForm({ subdomain }: { subdomain: string }) {
  const [isLoading, setIsLoading] = useState(false)

  // Form Submit Handler (Abhi sirf UI hai)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
    alert("Form Submitted (UI Preview)!")
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-4xl mx-auto">
      <div className="bg-blue-600 p-8 text-white text-center">
        <h2 className="text-2xl font-black">Comprehensive Admission Form</h2>
        <p className="text-blue-100 text-sm mt-2">Academic Session 2026-27. All fields marked with * are mandatory.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-10">
        
        {/* SECTION 1: STUDENT DETAILS */}
        <section>
          <h3 className="text-sm font-black text-blue-600 uppercase tracking-wider mb-4 border-b-2 border-slate-100 pb-2">1. Student Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label><input type="text" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label><input type="text" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label><input type="date" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
              <select required className="w-full p-3 border border-slate-200 rounded-xl bg-white"><option>Male</option><option>Female</option></select>
            </div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Student ID Number (Govt ID) *</label><input type="text" placeholder="Enter ID Number" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Applying For Class *</label>
              <select required className="w-full p-3 border border-slate-200 rounded-xl bg-white"><option>Class 1</option><option>Class 2</option><option>Class 10</option></select>
            </div>
          </div>
        </section>

        {/* SECTION 2: ACADEMIC HISTORY */}
        <section>
          <h3 className="text-sm font-black text-blue-600 uppercase tracking-wider mb-4 border-b-2 border-slate-100 pb-2">2. Previous Academic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Previous School Name</label><input type="text" className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Last Class Attended</label><input type="text" className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Percentage / Grade Obtained</label><input type="text" className="w-full p-3 border border-slate-200 rounded-xl" /></div>
          </div>
        </section>

        {/* SECTION 3: FAMILY DETAILS */}
        <section>
          <h3 className="text-sm font-black text-blue-600 uppercase tracking-wider mb-4 border-b-2 border-slate-100 pb-2">3. Family Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Father's Name *</label><input type="text" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Father's Govt ID Number *</label><input type="text" placeholder="Enter Father's ID Number" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Mother's Name *</label><input type="text" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Primary Phone Number *</label><input type="tel" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-700 mb-1">Full Residential Address *</label><textarea rows={3} required className="w-full p-3 border border-slate-200 rounded-xl"></textarea></div>
          </div>
        </section>

        {/* SECTION 4: DOCUMENT UPLOADS */}
        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-black text-blue-600 uppercase tracking-wider mb-4 border-b-2 border-slate-200 pb-2">4. Mandatory Document Uploads</h3>
          <p className="text-xs text-slate-500 mb-6">Accepted formats: JPG, PNG, PDF (Max 2MB each)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Upload Boxes */}
            <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl text-center bg-white">
              <label className="block text-xs font-bold text-slate-700 mb-2">Student Passport Photo *</label>
              <input type="file" required className="text-xs w-full text-slate-500" accept="image/*" />
            </div>
            <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl text-center bg-white">
              <label className="block text-xs font-bold text-slate-700 mb-2">Student Govt ID / Birth Cert. *</label>
              <input type="file" required className="text-xs w-full text-slate-500" accept=".pdf,image/*" />
            </div>
            <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl text-center bg-white">
              <label className="block text-xs font-bold text-slate-700 mb-2">Previous Class Marksheet</label>
              <input type="file" className="text-xs w-full text-slate-500" accept=".pdf,image/*" />
            </div>
            <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl text-center bg-white">
              <label className="block text-xs font-bold text-slate-700 mb-2">Transfer Certificate (TC / CLC)</label>
              <input type="file" className="text-xs w-full text-slate-500" accept=".pdf,image/*" />
            </div>
            <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl text-center bg-white">
              <label className="block text-xs font-bold text-slate-700 mb-2">Father/Guardian ID Copy *</label>
              <input type="file" required className="text-xs w-full text-slate-500" accept=".pdf,image/*" />
            </div>
            <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl text-center bg-white">
              <label className="block text-xs font-bold text-slate-700 mb-2">Student / Parent Signature *</label>
              <input type="file" required className="text-xs w-full text-slate-500" accept="image/*" />
            </div>

          </div>
        </section>
        
        <button type="submit" disabled={isLoading} className="w-full text-white py-4 rounded-xl font-black text-lg transition-all shadow-lg bg-blue-600 hover:bg-blue-700">
          {isLoading ? 'Uploading Documents & Submitting... ⏳' : 'Final Submit Application 🚀'}
        </button>
      </form>
    </div>
  )
}