export default async function SchoolLandingPage({ 
  params 
}: { 
  params: { domain: string } 
}) {
  const domain = params.domain // Yeh aapko dega 'dps' ya jo bhi school ka naam hai

  // Yahan hum database (Supabase) se check kar sakte hain ki is domain ka school hai ya nahi
  // Abhi ke liye hum UI banate hain:

  return (
    <div className="min-h-screen bg-white">
      
      {/* 🚀 School ka Custom Header */}
      <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-blue-50">
        <h1 className="text-3xl font-black text-blue-900 uppercase tracking-wider">
          {domain} Public School
        </h1>
        <div className="flex gap-4">
          {/* Main ERP par login karne ka link */}
          <a href="http://localhost:3000/login/master" className="px-5 py-2.5 bg-white text-blue-600 rounded-lg font-bold border border-blue-200 hover:bg-blue-100 transition shadow-sm">
            Staff Login
          </a>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
            Admission Enquiry
          </button>
        </div>
      </header>

      {/* 🚀 Hero Section */}
      <main className="max-w-5xl mx-auto py-20 px-8 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to {domain.toUpperCase()} Portal
        </h2>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          We provide the best education and facilities for your children. Apply for admission today or login to your parent portal.
        </p>

        {/* Dummy Admission Form */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-left">
          <h3 className="text-xl font-bold mb-6 border-b pb-4">Student Admission Form</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Student Name</label>
              <input type="text" className="w-full p-3 border rounded-xl" placeholder="Full Name" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Parent's Email</label>
              <input type="email" className="w-full p-3 border rounded-xl" placeholder="email@example.com" />
            </div>
            <button className="w-full bg-black text-white p-3 rounded-xl font-bold">Submit Form</button>
          </div>
        </div>
      </main>

    </div>
  )
}