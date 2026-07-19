import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-extrabold text-blue-600 tracking-tight">
          <Link href="/">MAKE ERP</Link>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex gap-6 items-center">
          <Link href="/onboarding" className="text-gray-600 hover:text-blue-600 font-medium">
            Register School
          </Link>
          <Link href="/login" className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}