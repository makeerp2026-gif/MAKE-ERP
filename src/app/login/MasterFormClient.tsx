"use client"

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { loginUser } from '@/actions/auth'

export default function MasterFormClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    const result = await loginUser(formData)

    if (result?.error) {
      toast.error(result.error, { duration: 4000 })
      setIsLoading(false)
    } else if (result?.success && result.redirectUrl) {
      toast.success("Welcome Back Admin! 🚀")
      window.location.href = result.redirectUrl
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email ID</label>
        <input 
          type="email" name="email" required
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
          placeholder="admin@makeerp.com" 
        />
      </div>

      <div>
        {/* Label and Forgot Password */}
        <div className="flex justify-between items-center mb-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
          <a href="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline transition-all">
            Forgot Password?
          </a>
        </div>
        
        {/* Password Input with Show/Hide */}
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} name="password" required
            className="w-full p-3.5 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
            placeholder="••••••••" 
          />
          <button
            type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-sm font-medium text-gray-400 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <button 
        type="submit" disabled={isLoading} 
        className={`mt-2 text-white py-4 rounded-xl font-black text-sm transition-all shadow-lg ${
          isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/30'
        }`}
      >
        {isLoading ? 'Verifying... ⏳' : 'Login as Master Admin 🚀'}
      </button>
    </form>
  )
}