import { loginUser } from '@/actions/auth';
import { redirect } from 'next/navigation'; // 🚀 Ise add karna zaroori hai

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const sp = await searchParams;
  const error = sp.error;

  // 🚀 NAYA WRAPPER FUNCTION (TS Error Fix)
  const handleServerLogin = async (formData: FormData) => {
    "use server"
    const result = await loginUser(formData)
    
    // Agar error aaya toh URL mein daal kar refresh karo
    if (result?.error) {
      redirect(`/login?error=${encodeURIComponent(result.error)}`)
    } 
    // Agar success hua aur URL mila, toh wahan bhej do
    else if (result?.redirectUrl) {
      redirect(result.redirectUrl)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back!</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* 🚀 ACTION MEIN NAYA WRAPPER FUNCTION LAGA DIYA */}
        <form action={handleServerLogin} className="flex flex-col gap-4">
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