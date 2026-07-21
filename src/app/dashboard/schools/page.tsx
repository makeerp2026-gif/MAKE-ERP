import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

// 🚀 NAYE IMPORTS (Aapke existing folder structure ke hisaab se)
import SchoolTable from '@/app/components/schools/SchoolTable'
import { School } from '@/app/types/school'

export default async function ManageSchoolsPage() {
  const supabase = await createClient()

  // 1. Supabase se saare schools aur unke admins ka data nikal rahe hain
  const { data, error } = await supabase
    .from('schools')
    .select(`
      id,
      name,
      subdomain,
      address,
      created_at,
      school_admins ( name, email )
    `)
    .order('created_at', { ascending: false }) // Naye school upar dikhenge

  // Data ko School type mein set kar rahe hain
  const schools: School[] = (data as any) || []

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Manage Schools 🏫</h1>
            <p className="text-gray-500 mt-1">Aapke sabhi registered branches ki list yahan hai.</p>
          </div>
          <Link href="/dashboard/schools/create" className="bg-black text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-md">
            + Add New School
          </Link>
        </div>

        {/* 🚀 CLIENT COMPONENT TABLE KO YAHAN CALL KIYA (Data Pass Karke) */}
        <SchoolTable schools={schools} />

      </div>
    </div>
  )
}