import Link from 'next/link'

export default function RoleLoginPage({ params }: { params: { role: string } }) {
  // URL se role nikal lenge
  const role = params.role 

  // Role ke hisaab se page ka title set karenge
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        {/* Dynamic Title */}
        <h2 className="text-3xl font-black text-gray-900 text-center mb-2 capitalize">
          {getTitle()}
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Welcome back! Please enter your credentials.
        </p>

        {/* Login Form */}
        <form className="space-y-5">
          <input 
            type="hidden" 
            name="role" 
            value={role} 
          /> {/* Backend ko batane ke liye ki kaun login kar raha hai */}
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email ID</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
            />
            
            {/* 🚀 Forgot Password Link */}
            <div className="text-right mt-1">
              <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
            Login as {role}
          </button>
        </form>

      </div>
    </div>
  )
}