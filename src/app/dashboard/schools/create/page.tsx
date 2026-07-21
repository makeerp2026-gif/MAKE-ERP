"use client"

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { registerNewSchool } from '@/actions/school'

export default function CreateSchoolPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [subdomain, setSubdomain] = useState('')

  // Subdomain ko hamesha lowercase aur bina space ke rakhne ke liye
  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')
    setSubdomain(val)
  }

  // 🚀 ASLI FORM SUBMIT LOGIC
  const handleCreateSchool = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    // Subdomain wala field hum state se manually append kar rahe hain kyunki wo combined input hai
    formData.set('subdomain', subdomain)

    // Backend ko data bhej rahe hain
    const response = await registerNewSchool(formData)

    if (response.error) {
      toast.error(response.error, { duration: 5000 })
      setIsLoading(false)
    } else if (response.success) {
      toast.success(response.message, { duration: 5000 })
      // Form successfully bharne ke baad reset kar do
      e.currentTarget.reset()
      setSubdomain('')
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition shadow-sm">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Register New School 🏫</h1>
          <p className="text-gray-500 mt-1">Ek naya school (branch) banayein aur uska School Admin assign karein.</p>
        </div>
      </div>

      {/* 🚀 FORM KO UPDATE KIYA GAYA HAI */}
      <form onSubmit={handleCreateSchool} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
        
        {/* Section 1: School Details */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">1. School Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">School Full Name</label>
              <input name="schoolName" type="text" required className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. SVP High School (Delhi Branch)" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Subdomain (Website URL)</label>
              <div className="flex">
                <input 
                  type="text" 
                  required 
                  value={subdomain}
                  onChange={handleSubdomainChange}
                  className="w-full p-3.5 border border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-blue-700 transition-all" 
                  placeholder="svpdelhi" 
                />
                <span className="bg-gray-50 border border-l-0 border-gray-200 text-gray-500 p-3.5 rounded-r-xl font-medium">
                  .makeerp.com
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">School Address</label>
              <input name="address" type="text" required className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Complete address of the branch" />
            </div>
          </div>
        </div>

        {/* Section 2: School Admin Details */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">2. School Admin (Principal) Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Admin Name</label>
              <input name="adminName" type="text" required className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. Mr. Sharma" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Admin Email ID (For Login)</label>
              <input name="adminEmail" type="email" required className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="principal@svpdelhi.com" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Contact Number</label>
              <input name="adminPhone" type="tel" required className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="+91 9876543210" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full text-white p-4 rounded-xl font-black text-lg transition-all shadow-lg ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'
            }`}
          >
            {isLoading ? 'Registering School in Database... ⏳' : 'Launch New School 🚀'}
          </button>
        </div>

      </form>
    </div>
  )
}