"use client"

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { loginUser } from '@/actions/auth'

export default function SchoolFormClient({ subdomain }: { subdomain: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    const result = await loginUser(formData)

    if (result?.error) {
      toast.error(result.error, { duration: 4000 })
      setIsLoading(false)
    } else if (result?.success && result.redirectUrl) {
      toast.success("Login Successful! Redirecting... 🚀")
      window.location.href = result.redirectUrl
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      
      {/* 🚀 1. ROLE DROPDOWN */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Login As</label>
        <div className="relative">
          <select 
            name="roleType" 
            className="w-full appearance-none p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 font-semibold text-gray-800 cursor-pointer text-sm"
          >
            <option value="principal">👑 Principal / Admin</option>
            <option value="teacher">👩‍🏫 Teacher</option>
            <option value="student">🎓 Student</option>
            <option value="parent">👨‍👩‍👧‍👦 Parent</option>
            <option value="accountant">💰 Accountant</option>
            <option value="librarian">📚 Librarian</option>
            <option value="receptionist">📞 Receptionist</option>
            <option value="transport">🚌 Transport / Driver</option>
            <option value="store">👕 Uniform / Store</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* 🚀 2. USER ID FIELD */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">User ID</label>
        <input 
          name="email" type="email" required 
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
          placeholder="id@school.com" 
        />
      </div>

      {/* 🚀 3. SINGLE PASSWORD FIELD */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
        
        <div className="relative">
          <input 
            name="password" type={showPassword ? "text" : "password"} required 
            className="w-full p-3.5 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            placeholder="••••••••" 
          />
          <button
            type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-sm font-medium text-gray-400 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        
        {/* 👈 Forgot Password Neeche Aa Gaya */}
        <div className="text-right mt-2">
          <a href="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline transition-all">
            Forgot Password?
          </a>
        </div>
      </div>

      {/* 🚀 4. SUBMIT BUTTON */}
      <button 
        type="submit" disabled={isLoading}
        className={`w-full text-white p-4 rounded-xl font-black text-sm transition-all shadow-md mt-2 ${
          isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
        }`}
      >
        {isLoading ? 'Authenticating... ⏳' : 'Secure Login 🔒'}
      </button>

    </form>
  )
}