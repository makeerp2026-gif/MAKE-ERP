"use client"

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { loginUser } from '@/actions/auth' // Aapka wo secure login wala action

export default function SchoolLoginForm({ subdomain }: { subdomain: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const response = await loginUser(formData)

    if (response?.error) {
      toast.error(response.error, { duration: 5000 })
      setIsLoading(false)
    } else if (response?.success) {
      toast.success("Login Successful! Redirecting... 🚀")
      // Action page ko automatically redirect kar dega
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* 🚀 ROLE SELECTOR (Aapke Screenshot Ke Hisaab Se) */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Login As</label>
        <div className="relative">
          <select 
            name="roleType" 
            className="w-full appearance-none p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 font-medium text-gray-800 cursor-pointer"
          >
            <option value="principal">👑 Principal / Admin</option>
            <option value="teacher">👩‍🏫 Teacher</option>
            <option value="student">🎓 Student</option>
            <option value="parent">👨‍👩‍👧‍👦 Parent</option>
            <option value="accountant">💰 Accountant</option>
            <option value="librarian">📚 Librarian</option>
            <option value="receptionist">📞 Receptionist</option>
          </select>
          {/* Dropdown Arrow Icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">User ID (Email)</label>
        <input 
          name="email" 
          type="email" 
          required 
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          placeholder="your.id@school.com" 
        />
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
        <input 
          name="password" 
          type="password" 
          required 
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          placeholder="••••••••" 
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full text-white p-4 rounded-xl font-black text-lg transition-all shadow-lg ${
            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'
          }`}
        >
          {isLoading ? 'Authenticating... ⏳' : 'Secure Login 🔒'}
        </button>
      </div>

      {/* Forgot Password Link */}
      <div className="text-center mt-4">
        <a href="#" className="text-sm font-bold text-blue-600 hover:underline">Forgot your password?</a>
      </div>

    </form>
  )
}