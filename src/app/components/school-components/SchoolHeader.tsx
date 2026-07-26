import Link from 'next/link';

interface SchoolHeaderProps {
  schoolName: string;
  logoUrl?: string; // Future ke liye jab DB se asli logo aayega
}

export default function SchoolHeader({ schoolName, logoUrl }: SchoolHeaderProps) {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* 🏫 School Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          {logoUrl ? (
            <img src={logoUrl} alt={schoolName} className="h-10 w-auto object-contain" />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
              {schoolName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-xl md:text-2xl font-black tracking-tight uppercase group-hover:text-blue-400 transition-colors">
            {schoolName}
          </span>
        </Link>
        
        {/* 🔗 Desktop Links */}
        <nav className="hidden md:flex gap-8 font-semibold text-sm text-slate-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="#about" className="hover:text-white transition">About Us</Link>
          <Link href="#academics" className="hover:text-white transition">Academics</Link>
          <Link href="#contact" className="hover:text-white transition">Contact</Link>
        </nav>
        
        {/* 🚀 Action Buttons */}
        <div className="flex gap-3">
          <Link href="/admission" className="hidden sm:flex px-5 py-2.5 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition shadow-sm items-center">
            Admissions 🎓
          </Link>
          <Link href="/login" className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm flex items-center">
            Portal Login 🔒
          </Link>
        </div>

      </div>
    </header>
  );
}