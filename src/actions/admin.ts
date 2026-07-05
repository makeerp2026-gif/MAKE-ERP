'use server'

import { createClient } from '../lib/supabase/server'
import { redirect } from 'next/navigation'

export async function registerSchool(formData: FormData) {
  const supabase = await createClient()
  
  const schoolName = formData.get('schoolName') as string
  const adminName = formData.get('adminName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 1. Supabase Auth mein Master Admin ka account banayein
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    console.error("Auth Error:", authError.message)
    return // BINA KUCH BHEJE RETURN KAR RAHE HAIN TAAKI TYPESCRIPT KHUSH RAHE
  }

  // 2. School ki details 'schools' table mein daalein
  const slug = schoolName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  
  const { data: schoolData, error: schoolError } = await supabase
    .from('schools')
    .insert([{ name: schoolName, slug: slug, status: 'pending' }])
    .select()
    .single()

  if (schoolError) {
    console.error("School DB Error:", schoolError.message)
    return
  }

  // 3. User ki details 'user_profiles' table mein daalein
  if (authData.user && schoolData) {
    const { error: profileError } = await supabase.from('user_profiles').insert([{
      id: authData.user.id,
      school_id: schoolData.id,
      full_name: adminName,
      role: 'MASTER_ADMIN'
    }])

    if (profileError) {
      console.error("Profile DB Error:", profileError.message)
      return
    }
  }

  // Sab sahi hone par user ko pending screen par redirect karein
  redirect('/pending-approval')
}