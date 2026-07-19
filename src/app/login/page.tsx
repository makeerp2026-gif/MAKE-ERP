export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back!</h1>
        
        <form className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input 
              type="email" 
              name="email"
              className="w-full mt-1 p-2 border rounded-md" 
              placeholder="admin@school.com" 
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input 
              type="password" 
              name="password"
              className="w-full mt-1 p-2 border rounded-md" 
              placeholder="********" 
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-4 bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}