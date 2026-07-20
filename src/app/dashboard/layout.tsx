import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* 🚀 FIXED SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-black text-blue-600 tracking-tight">MAKE ERP</h2>
          <p className="text-xs text-gray-500 mt-1">Master Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/dashboard" className="block px-4 py-3 rounded-xl bg-blue-50 text-blue-700 font-semibold transition">
            📊 Overview
          </Link>
          <Link href="/dashboard/teachers" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-black font-medium transition">
            👩‍🏫 Manage Teachers
          </Link>
          <Link href="/dashboard/students" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-black font-medium transition">
            🎓 Manage Students
          </Link>
          <Link href="/dashboard/fees" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-black font-medium transition">
            💰 Fees & Finance
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full text-left px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition">
            Logout 🚪
          </button>
        </div>
      </aside>

      {/* 🚀 MAIN CONTENT AREA (Yeh right side mein dikhega) */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>

    </div>
  )
}