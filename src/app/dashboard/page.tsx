export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Master Admin Dashboard</h1>
        <p className="text-gray-600">Aapka swagat hai! Yahan aap apne school aur ERP ka saara data manage kar sakte hain.</p>
        
        {/* Yahan baad mein hum charts aur tables lagayenge */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-800">✅ Supabase Login Successful!</p>
        </div>
      </div>
    </div>
  )
}