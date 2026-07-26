import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// 🚀 EK-DUM SAHI IMPORTS (Aapke naye folder ke hisaab se)
import SchoolHeader from '../../components/school-components/SchoolHeader'
import SchoolFooter from '../../components/school-components/SchoolFooter'
import SchoolNoticeBoard from '../../components/school-components/SchoolNoticeBoard'

export default async function SchoolHomePage({ params }: { params: Promise<{ subdomain: string }> }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain;

  // Database se School ki details nikalna
  const supabase = await createClient();
  const { data: school } = await supabase
    .from('schools')
    .select('id, name, logo_url')
    .eq('subdomain', subdomain)
    .single();

  // Agar URL mein galat school ka naam hai toh 404 Page dikhao
  if (!school) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* 🟢 CUSTOM SCHOOL HEADER */}
      <SchoolHeader schoolName={school.name} logoUrl={school.logo_url} />

      {/* 🔵 MAIN CONTENT AREA */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12">
        
        {/* Welcome Section */}
        <div className="text-center mb-16 pt-10">
          <h1 className="text-5xl font-black text-slate-900 mb-6 uppercase">
            Welcome to {school.name}
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Empowering students to achieve their full potential through quality education and discipline.
          </p>
        </div>

        {/* Dashboard Grid (Notice Board + Admission Banner) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-blue-600 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center">
            <h2 className="text-3xl font-black mb-4">Admissions Open 2026-27</h2>
            <p className="text-blue-100 mb-8 max-w-md text-lg leading-relaxed">
              Secure your child's future with our world-class facilities and expert faculty. Apply online today!
            </p>
            {/* 🚀 FIXED LINK: Sirf /admission rakha hai */}
            <a href="/admission" className="w-max bg-white text-blue-900 font-black py-4 px-10 rounded-xl shadow-lg hover:scale-105 transition-transform">
              Apply Now 🚀
            </a>
          </div>
          <div className="lg:col-span-1">
            <SchoolNoticeBoard />
          </div>
        </div>

        {/* 🚀 FIXED LINKS: INDUSTRY STANDARD STUDENT SERVICES SECTION */}
        <div className="mt-16">
          <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase border-l-4 border-blue-600 pl-4">
            Student Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Saare links se `/school/${subdomain}` hata diya hai */}
            <a href="/results" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group flex flex-col items-center text-center">
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">📊</span>
              <span className="font-bold text-slate-700 text-sm">Download Result</span>
            </a>
            <a href="/certificates" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group flex flex-col items-center text-center">
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">📜</span>
              <span className="font-bold text-slate-700 text-sm">Certificates & TC</span>
            </a>
            <a href="/admit-card" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group flex flex-col items-center text-center">
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">🎫</span>
              <span className="font-bold text-slate-700 text-sm">Download Admit Card</span>
            </a>
            <a href="/pay-fees" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group flex flex-col items-center text-center">
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">💳</span>
              <span className="font-bold text-slate-700 text-sm">Pay Online Fees</span>
            </a>
          </div>
        </div>
      </main>

      {/* 🟤 CUSTOM SCHOOL FOOTER */}
      <SchoolFooter schoolName={school.name} />

    </div>
  )
}