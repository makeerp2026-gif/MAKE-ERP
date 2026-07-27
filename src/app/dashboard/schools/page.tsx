import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
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
    <div className="p-8 max-w-7xl mx-auto font-sans">
      
      {/* Page Header (Premium UI) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Manage Schools 🏫</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Aapke sabhi registered branches ki list yahan hai.</p>
        </div>
        <Link 
          href="/dashboard/schools/create" 
          className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition shadow-lg whitespace-nowrap"
        >
          + Add New School
        </Link>
      </div>

      {/* 🚀 CLIENT COMPONENT TABLE KO YAHAN CALL KIYA */}
      <SchoolTable schools={schools} />

    </div>
  )
}