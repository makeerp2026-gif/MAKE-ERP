import Link from 'next/link';

export default function MainLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 🚀 Main Hero Section */}
      <div className="flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <h1 className="text-6xl font-black text-slate-900 tracking-tight mb-6">
          The Smartest Way to <br/> <span className="text-blue-600">Manage Your Institution</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium mb-10 max-w-2xl">
          Make ERP brings all your administration, student management, and operations into one powerful, easy-to-use platform.
        </p>
        <div className="flex gap-4">
          <Link href="/login" className="bg-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30">
            Get Started for Free
          </Link>
          <button className="bg-white border border-slate-200 text-slate-700 font-bold py-4 px-8 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            View Features
          </button>
        </div>
      </div>

      {/* 🏫 TRUST SECTION - CONNECTED SCHOOLS */}
      <div className="mt-10 border-t border-slate-200 pt-16 pb-20 bg-white">
        <p className="text-center text-sm font-black text-slate-400 uppercase tracking-widest mb-8">
          Trusted by 45+ Schools Across India
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto px-4">
          {/* 👉 Future: Yeh Database se fetch hokar automatic generate honge */}
          <a href="http://raunkschool.localhost:3000" className="px-6 py-3 bg-white border border-slate-200 rounded-full font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm flex items-center gap-2">
            🏫 Raunk School
          </a>
          <a href="http://dps.localhost:3000" className="px-6 py-3 bg-white border border-slate-200 rounded-full font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm flex items-center gap-2">
            🏫 Delhi Public School
          </a>
          <a href="http://ryan.localhost:3000" className="px-6 py-3 bg-white border border-slate-200 rounded-full font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm flex items-center gap-2">
            🏫 Ryan International
          </a>
          <span className="px-6 py-3 text-slate-400 font-bold flex items-center">
            +42 More...
          </span>
        </div>
      </div>

    </div>
  );
}