import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

export default function MainLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* 🟢 HEADER (Imported from app/components) */}
      <Header />

      {/* 🔵 HERO SECTION (Imported from app/components) */}
      <Hero />

      {/* 🟡 TRUST SECTION (Live Subdomain Links) */}
      <section className="border-t border-slate-200 py-16 bg-white w-full flex-grow">
        <p className="text-center text-sm font-black text-slate-400 uppercase tracking-widest mb-8">
          Trusted by 45+ Schools Across India
        </p>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto px-4">
          <a href="https://raunkschool.makeerp.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-all shadow-sm flex items-center gap-2">
            🏫 Raunk School
          </a>
          <a href="https://dps.makeerp.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-all shadow-sm flex items-center gap-2">
            🏫 Delhi Public School
          </a>
        </div>
      </section>

      {/* 🟤 FOOTER (Imported from app/components) */}
      <Footer />

    </div>
  );
}