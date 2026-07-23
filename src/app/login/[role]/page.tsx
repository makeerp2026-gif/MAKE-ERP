import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { loginUser } from '@/actions/auth' 

function LoginForm() {
  const params = useParams()
  const searchParams = useSearchParams()
  
  const role = (params?.role as string) || 'master'
  const error = searchParams?.get('error')
  const message = searchParams?.get('message')

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 4000 })
      setIsLoading(false) 
    }
    if (message) {
      toast.success(message, { duration: 4000 })
      setIsLoading(false) 
    }
  }, [error, message])

  const getTitle = () => {
    if (role === 'superadmin') return 'Super Admin Login'
    if (role === 'master') return 'Master Admin Login'
    if (role === 'teacher') return 'Teacher Portal'
    if (role === 'student') return 'Student Portal'
    if (role === 'parent') return 'Parent Portal'
    if (role === 'accountant') return 'Accountant Login'
    if (role === 'librarian') return 'Librarian Login'
    if (role === 'receptionist') return 'Receptionist Login'
    return 'Login'
  }

  // 🚀 NAYA WRAPPER FUNCTION (TS Error Fix)
  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true)
    const result = await loginUser(formData)

    // Agar backend se error aaya, toh toast dikhao aur loading roko
    if (result?.error) {
      toast.error(result.error, { duration: 4000 })
      setIsLoading(false)
    } 
    // Agar sab sahi raha, toh dashboard par bhej do
    else if (result?.success && result.redirectUrl) {
      toast.success("Login Successful! Redirecting... 🚀")
      window.location.href = result.redirectUrl
    }
  }

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-black text-gray-900 text-center mb-2 capitalize">
        {getTitle()}
      </h2>
      <p className="text-center text-sm text-gray-500 mb-8">
        Welcome back! Please enter your credentials.
      </p>

      {/* 🚀 ACTION MEIN WRAPPER FUNCTION LAGA DIYA */}
      <form action={handleFormSubmit} className="space-y-5">
        <input type="hidden" name="role" value={role} /> 
        
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Email ID
          </label>
          <input 
            name="email" 
            type="email" 
            required 
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            placeholder="admin@school.com"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Password
          </label>
          <div className="relative">
            <input 
              name="password" 
              type={showPassword ? "text" : "password"} 
              required 
              className="w-full p-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
              placeholder="••••••••"
            />
            
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showPassword ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
              )}
            </button>
          </div>
          
          <div className="text-right mt-1">
            <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full text-white p-3.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
 Ṁ         {isLoading ? 'Verifying... ⏳' : `Login as ${role} 🚀`}
        </button>
      </form>
    </div>
  )
}

export default function RoleLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Suspense fallback={<div className="text-gray-500 font-semibold">Loading Page...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}