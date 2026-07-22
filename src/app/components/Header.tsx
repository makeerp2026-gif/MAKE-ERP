import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm border-b relative z-50">
      {/* Logo */}
      <div className="text-2xl font-black text-gray-900 tracking-tight">
        MAKE ERP
      </div>

      {/* Navigation & Login */}
      <nav className="flex items-center gap-6">
        <Link href="/" className="text-gray-600 hover:text-black font-medium">Home</Link>
        <Link href="/about" className="text-gray-600 hover:text-black font-medium">About</Link>

        {/* 🚀 CLEAN LOGIN BUTTON (Dropdown Hata Diya) */}
        <Link 
          href="/login" 
          className="px-5 py-2.5 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition shadow-sm"
        >
          Login
        </Link>
      </nav>
    </header>
  )
}