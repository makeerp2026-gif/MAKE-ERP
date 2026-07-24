import Link from 'next/link';

export default function MainLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* 🟢 1. HEADER (NAVBAR) */}
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

      {/* 🔵 2. HERO SECTION */}
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-20 px-4 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
          🚀 India's #1 School Management SaaS
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-tight max-w-4xl">
          The Smartest Way to <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Manage Your Institution</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 max-w-2xl">
          Make ERP brings all your administration, student management, and daily operations into one powerful, easy-to-use platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login" className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 text-lg">
            Start Free Trial
          </Link>
          <button className="bg-white border border-slate-200 text-slate-700 font-bold py-4 px-10 rounded-xl hover:bg-slate-50 transition-all shadow-sm text-lg">
            View Features
          </button>
        </div>
      </main>

      {/* 🟡 3. TRUST SECTION (LIVE SUBDOMAIN LINKS) */}
      <section className="border-t border-slate-200 py-16 bg-white w-full">
        <p className="text-center text-sm font-black text-slate-400 uppercase tracking-widest mb-8">
          Trusted by 45+ Schools Across India
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto px-4">
          {/* Note: Ab yahan production URLs hain (makeerp.com) */}
          <a href="https://raunkschool.makeerp.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-all shadow-sm flex items-center gap-2">
            🏫 Raunk School
          </a>
          <a href="https://dps.makeerp.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-all shadow-sm flex items-center gap-2">
            🏫 Delhi Public School
          </a>
          <a href="https://ryan.makeerp.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-all shadow-sm flex items-center gap-2">
            🏫 Ryan International
          </a>
          <span className="px-6 py-3 text-slate-400 font-bold flex items-center">
            +42 More...
          </span>
        </div>
      </section>

      {/* 🟤 4. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-xl font-black text-white tracking-tight mb-4 block">MAKE ERP</span>
            <p className="text-sm">Empowering educational institutions with next-generation management tools.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>support@makeerp.com</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
          © 2026 MAKE ERP. All rights reserved. Built with ❤️ in India.
        </div>
      </footer>

    </div>
  );
}