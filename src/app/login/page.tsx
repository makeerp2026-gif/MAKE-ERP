import { headers } from 'next/headers';
import SchoolFormClient from './SchoolFormClient'; 
import MasterFormClient from './MasterFormClient'; // 👈 Master form yahan import kiya

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const sp = await searchParams;
  const error = sp.error;

  // 👮‍♂️ TRAFFIC POLICE: Domain Check
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const isMainDomain = host === 'localhost:3000' || host === 'makeerp.com' || host === 'www.makeerp.com';
  const subdomain = isMainDomain ? null : host.split('.')[0];

  // 🏫 SCENARIO 1: SCHOOL URL
  if (subdomain) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-blue-600 uppercase tracking-wide">{subdomain}</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">School Portal Login</p>
          </div>
          {error && <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm text-center font-bold">{error}</div>}
          
          <SchoolFormClient subdomain={subdomain} />
        </div>
      </div>
    )
  }

  // 👑 SCENARIO 2: MAIN WEBSITE URL
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900">MAKE ERP</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">SaaS Platform Login</p>
        </div>
        {error && <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm text-center font-bold">{error}</div>}

        {/* 👈 Yahan Master Client Form Laga Diya */}
        <MasterFormClient /> 
      </div>
    </div>
  )
}