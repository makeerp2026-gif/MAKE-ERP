import Link from 'next/link';
import AdmissionForm from './AdmissionForm'; // 👈 Form ko yahan import kiya

export default async function AdmissionPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-blue-600 uppercase tracking-wide">{subdomain}</h1>
          <p className="text-slate-500 font-medium mt-2 text-lg">New Student Admission Portal 🎓</p>
        </div>

        {/* 🚀 FORM COMPONENT */}
        <AdmissionForm subdomain={resolvedParams.subdomain} />
        
        <div className="text-center mt-6">
          <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-600">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}