import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server' // Aapka DB Connection

export default async function SchoolHomePage({ params }: { params: Promise<{ subdomain: string }> }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain;

  // 🚀 DATABASE CHECK (Aapke purane code se)
  const supabase = await createClient();
  const { data: school } = await supabase
    .from('schools')
    .select('id, name, logo_url')
    .eq('subdomain', subdomain)
    .single();

  // Agar school DB mein nahi mila, toh 404 Page dikhao
  if (!school) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl w-full text-center border border-slate-100">
        
        {/* 🏫 REAL SCHOOL LOGO / INITIALS */}
        {school.logo_url ? (
          <img src={school.logo_url} alt={school.name} className="mx-auto h-24 w-auto object-contain mb-6" />
        ) : (
          <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-black shadow-lg">
            {school.name.charAt(0).toUpperCase()}
          </div>
        )}
        
        <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase">{school.name}</h1>
        <p className="text-slate-500 font-medium mb-8 text-lg">
          Welcome to our official school portal. Manage your academics, fees, and operations seamlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href={`/login`} className="bg-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition-all shadow-md">
            School Login 🔒
          </Link>
          <Link href={`/admission`} className="bg-slate-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-slate-800 transition-all shadow-md">
            New Admission 🎓
          </Link>
        </div>

        <div className="text-sm text-slate-400 font-medium border-t pt-6">
          <Link href="#" className="hover:text-blue-600 mx-2">Privacy Policy</Link> | 
          <Link href="#" className="hover:text-blue-600 mx-2">Terms of Service</Link> | 
          <Link href="#" className="hover:text-blue-600 mx-2">Contact Us</Link>
          <p className="mt-2 text-xs">Powered by MAKE ERP</p>
        </div>
      </div>
    </div>
  )
}