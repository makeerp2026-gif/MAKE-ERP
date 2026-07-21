import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* 🚀 MASTER ADMIN SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-10">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-black text-blue-600 tracking-tight">MAKE ERP</h2>
          <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">Super / Master Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/dashboard" className="block px-4 py-3 rounded-xl bg-blue-50 text-blue-700 font-semibold transition">
            📊 Global Overview
          </Link>
          <Link href="/dashboard/schools" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-black font-medium transition">
            🏫 Manage Schools
          </Link>
          <Link href="/dashboard/reports" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-black font-medium transition">
            📈 System Reports
          </Link>
          <Link href="/dashboard/billing" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-black font-medium transition">
            💰 ERP Billing
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full text-left px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition">
            Logout 🚪
          </button>
        </div>
      </aside>

      {/* 🚀 MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>

    </div>
  )
}