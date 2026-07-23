"use client"
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { loginUser } from '@/actions/auth'

export default function SchoolLoginForm({ subdomain }: { subdomain: string }) {
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
      
      {/* 🚀 FILTERED ROLE SELECTOR (No Master/Super Admin) */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Login As</label>
        <div className="relative">
          <select 
            name="roleType" 
            className="w-full appearance-none p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 font-semibold text-gray-800 cursor-pointer text-sm"
          >
            <option value="principal">👑 Principal</option>
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

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">User ID</label>
        <input 
          name="email" 
          type="email" 
          required 
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
          placeholder="your.id@school.com" 
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
        <div className="relative">
          <input 
            name="password" 
            type={showPassword ? "text" : "password"} 
            required 
            className="w-full p-3.5 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            placeholder="••••••••" 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-700 transition-colors"
          >
            {showPassword ? (
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            ) : (
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
            )}
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className={`w-full text-white p-4 rounded-xl font-black text-sm transition-all shadow-md mt-2 ${
          isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
        }`}
      >
        {isLoading ? 'Authenticating... ⏳' : 'Secure Login 🔒'}
      </button>

    </form>
  )
}