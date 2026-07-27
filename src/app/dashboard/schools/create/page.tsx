"use client"

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { registerNewSchool } from '@/actions/school'

export default function CreateSchoolPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [subdomain, setSubdomain] = useState('')

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sirf small letters aur numbers allow karenge
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')
    setSubdomain(val)
  }

  const handleCreateSchool = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    formData.set('subdomain', subdomain)

    toast.loading('Registering school in database...', { id: 'setup' })
    
    // Direct Database mein School Banayenge (Bina Payment Ke)
    const response = await registerNewSchool(formData)

    if (response.error) {
      toast.error(response.error || 'Registration failed!', { id: 'setup' })
      setIsLoading(false)
    } else {
      toast.success('School successfully registered & activated! 🚀', { id: 'setup' })
      e.currentTarget.reset()
      setSubdomain('')
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard" className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition shadow-sm">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Register New School 🏫</h1>
          <p className="text-gray-500 mt-1 font-medium">Ek naya school (branch) banayein aur usko free ya paid mode mein assign karein.</p>
        </div>
      </div>

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

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Admin Password</label>
              <input name="adminPassword" type="text" required minLength={6} className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Set a secure password" />
            </div>
          </div>
        </div>

        {/* Section 3: SaaS Billing Model (Freemium Strategy) */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">3. Initial Setup & Billing Mode</h3>
          <div className="grid grid-cols-1 gap-6">
            
            <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl">
              <label className="block text-xs font-black text-blue-900 uppercase mb-3">Set Billing Status</label>
              
              <select name="billingMode" required className="w-full p-4 border border-blue-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold text-slate-800 shadow-sm cursor-pointer">
                <option value="free_50">🎁 Free Tier (Up to 50 Students Allowed)</option>
                <option value="paid">💳 Premium Tier (₹15 / Active Student / Month)</option>
              </select>

              {/* Bilingual Notice */}
              <div className="mt-4 p-4 bg-white/60 rounded-xl border border-blue-100 space-y-3">
                <p className="text-xs text-slate-700 leading-relaxed">
                  <span className="font-black text-blue-700 uppercase tracking-wide text-[10px] bg-blue-100 px-2 py-1 rounded mr-2">English</span>
                  <strong>Free plan is limited to 50 active students.</strong> Exceeding this limit will automatically switch the account to the Premium tier and billing will start at ₹15 per student/month.
                </p>
                <div className="h-px w-full bg-blue-200/50"></div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  <span className="font-black text-orange-700 uppercase tracking-wide text-[10px] bg-orange-100 px-2 py-1 rounded mr-2">Hindi</span>
                  <strong>फ्री प्लान में केवल 50 छात्रों (Students) तक की अनुमति है।</strong> 50 से अधिक छात्र ऐड करने पर अकाउंट अपने आप प्रीमियम में बदल जाएगा और ₹15 प्रति छात्र/महीने का चार्ज लगना शुरू हो जाएगा।
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full text-white p-4 rounded-xl font-black text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/20'
            }`}
          >
            {isLoading ? 'Registering School... ⏳' : 'Launch New School 🚀'}
          </button>
        </div>

      </form>
    </div>
  )
}