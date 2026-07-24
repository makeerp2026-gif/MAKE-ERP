"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function AdmissionPage() {
  const params = useParams()
  const subdomain = params?.subdomain as string || "School"
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 🚀 Form Submit Handle karne ka dummy function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Asli backend aane tak 2 second ka timer lagaya hai
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  // 🎉 Agar form submit ho gaya toh Success Message dikhao
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ✅
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Application Submitted!</h2>
          <p className="text-slate-500 font-medium mb-8">
            Thank you for applying to <span className="text-blue-600 font-bold uppercase">{subdomain}</span>. Our Admission Department will review your application and contact you soon.
          </p>
          <Link href={`/`} className="bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-all">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  // 📝 Normal Admission Form UI
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-blue-600 uppercase tracking-wide">{subdomain}</h1>
          <p className="text-slate-500 font-medium mt-2 text-lg">New Student Admission Portal 🎓</p>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-blue-600 p-6 text-white text-center">
            <h2 className="text-xl font-bold">Academic Session 2026-27</h2>
            <p className="text-blue-100 text-sm mt-1">Please fill all the details correctly.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* 1. Student Details */}
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                  <input type="text" required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" placeholder="Rahul" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                  <input type="text" required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" placeholder="Sharma" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
                  <input type="date" required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all text-slate-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class Applying For *</label>
                  <select required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all text-slate-600 bg-white">
                    <option value="">Select Class</option>
                    <option value="nursery">Nursery</option>
                    <option value="kg">Kindergarten (KG)</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    {/* Aur classes add kar sakte hain */}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Parent Details */}
            <div className="pt-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Parent / Guardian Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Father/Mother Name *</label>
                  <input type="text" required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" placeholder="Enter Full Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input type="tel" required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" placeholder="+91 9876543210" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input type="email" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" placeholder="email@example.com" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full text-white py-4 rounded-xl font-black text-sm transition-all shadow-lg ${
                  isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/30'
                }`}
              >
                {isLoading ? 'Submitting Application... ⏳' : 'Submit Admission Form 🚀'}
              </button>
            </div>

          </form>
        </div>
        
      </div>
    </div>
  )
}