import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl leading-none">M</span>
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">MAKE ERP</span>
        </div>
        
        <nav className="hidden md:flex gap-8 font-semibold text-slate-600 text-sm">
          <Link href="#features" className="hover:text-blue-600 transition">Features</Link>
          <Link href="#pricing" className="hover:text-blue-600 transition">Pricing</Link>
          <Link href="#contact" className="hover:text-blue-600 transition">Contact</Link>
        </nav>
        
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
            School Login
          </Link>
          <button className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm hidden sm:block">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}