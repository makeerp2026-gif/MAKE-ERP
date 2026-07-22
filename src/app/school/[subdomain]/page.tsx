import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import SchoolLoginForm from './SchoolLoginForm'

// 🚀 Yeh page URL se 'subdomain' nikalega (e.g., 'dps' ya 'svpdelhi')
export default async function SchoolLoginPage({ params }: { params: { subdomain: string } }) {
  const supabase = await createClient()

  // 1. Database se check karo ki kya yeh school exist karta hai?
  const { data: school } = await supabase
    .from('schools')
    .select('id, name, logo_url')
    .eq('subdomain', params.subdomain)
    .single()

  // Agar school nahi mila (galat URL daala kisine), toh 404 page dikha do
  if (!school) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        
        {/* 🏫 School Logo ya Initial */}
        {school.logo_url ? (
          <img src={school.logo_url} alt={school.name} className="mx-auto h-24 w-auto object-contain" />
        ) : (
          <div className="mx-auto h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl font-black text-white">{school.name.charAt(0)}</span>
          </div>
        )}

        <h2 className="mt-6 text-center text-3xl font-black text-gray-900 uppercase tracking-tight">
          {school.name}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 font-medium">
          Welcome to your official school portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-gray-100">
          
          {/* 🚀 LOGIN FORM COMPONENT CALL KIYA */}
          <SchoolLoginForm subdomain={params.subdomain} />
          
        </div>
      </div>
    </div>
  )
}