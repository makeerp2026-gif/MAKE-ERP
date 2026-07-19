import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          The Smartest Way to <br className="hidden md:block" />
          <span className="text-blue-600">Manage Your Institution</span>
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          Make ERP brings all your administration, student management, and operations into one powerful, easy-to-use platform. 
        </p>
        
        <div className="flex gap-4">
          <Link href="/onboarding" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 shadow-lg transition transform hover:-translate-y-1">
            Get Started for Free
          </Link>
          <Link href="#features" className="bg-white text-gray-800 px-8 py-4 rounded-lg font-bold text-lg border border-gray-300 hover:bg-gray-50 transition">
            View Features
          </Link>
        </div>
      </div>
    </section>
  );
}