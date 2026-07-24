import Link from 'next/link';

export default function Hero() {
  return (
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
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/login" className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 text-lg">
          Start Free Trial
        </Link>
        <button className="bg-white border border-slate-200 text-slate-700 font-bold py-4 px-10 rounded-xl hover:bg-slate-50 transition-all shadow-sm text-lg">
          View Features
        </button>
      </div>
    </main>
  );
}