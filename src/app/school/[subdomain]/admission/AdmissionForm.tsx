"use client"

import { useState } from 'react'
import Link from 'next/link'
import { submitAdmissionForm } from '@/actions/admission'
export default function AdmissionForm({ subdomain }: { subdomain: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setErrorMsg("")
    
    // Server action ko call kar rahe hain
    const result = await submitAdmissionForm(formData)

    if (result.error) {
      setErrorMsg(result.error)
      setIsLoading(false)
    } else if (result.success) {
      setIsSubmitted(true)
    }
  }

  // 🎉 Success Screen
  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto text-center border border-slate-100">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Application Submitted!</h2>
        <p className="text-slate-500 font-medium mb-8">
          Thank you for applying to <span className="text-blue-600 font-bold uppercase">{subdomain}</span>. Our Admission Department will contact you soon.
        </p>
        <Link href={`/`} className="bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-all">
          Return to Home
        </Link>
      </div>
    )
  }

  // 📝 Main Form
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-blue-600 p-6 text-white text-center">
        <h2 className="text-xl font-bold">Academic Session 2026-27</h2>
        <p className="text-blue-100 text-sm mt-1">Please fill all the details correctly.</p>
      </div>

      <form action={handleSubmit} className="p-8 space-y-6">
        {/* Backend ko batane ke liye ki kaunse school ka form hai */}
        <input type="hidden" name="subdomain" value={subdomain} />

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg text-center border border-red-200">
            {errorMsg}
          </div>
        )}

        <div>
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label><input name="firstName" type="text" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label><input name="lastName" type="text" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label><input name="dob" type="date" required className="w-full p-3 border border-slate-200 rounded-xl text-slate-600" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Class Applying For *</label>
              <select name="classApplied" required className="w-full p-3 border border-slate-200 rounded-xl bg-white">
                <option value="">Select Class</option><option value="Nursery">Nursery</option><option value="Class 1">Class 1</option><option value="Class 2">Class 2</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Parent / Guardian Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Parent Name *</label><input name="parentName" type="text" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
            <div><label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label><input name="phone" type="tel" required className="w-full p-3 border border-slate-200 rounded-xl" /></div>
          </div>
        </div>
        
        <button type="submit" disabled={isLoading} className={`w-full text-white py-4 rounded-xl font-black text-sm transition-all shadow-lg ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {isLoading ? 'Submitting Data... ⏳' : 'Submit Application 🚀'}
        </button>
      </form>
    </div>
  )
}