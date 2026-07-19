import { loginAdmin } from '@/actions/auth';

// searchParams se hum URL mein aane wale error ko pakad sakte hain
export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back!</h1>
        
        {/* 🔥 Agar backend se koi error aayega toh yahan laal rang mein dikhega */}
        {searchParams?.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center font-medium">
            {searchParams.error}
          </div>
        )}

        {/* action={loginAdmin} likhne se yeh form seedha backend se jud gaya */}
        <form action={loginAdmin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input 
              type="email" 
              name="email"
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black" 
              placeholder="admin@school.com" 
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input 
              type="password" 
              name="password"
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black" 
              placeholder="********" 
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-4 bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}