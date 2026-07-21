'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function registerNewSchool(formData: FormData) {
  try {
    const supabase = await createClient()

    // Form se saara data nikal rahe hain
    const schoolName = formData.get('schoolName') as string
    const subdomain = formData.get('subdomain') as string
    const address = formData.get('address') as string
    const adminName = formData.get('adminName') as string
    const adminEmail = formData.get('adminEmail') as string
    const adminPhone = formData.get('adminPhone') as string

    if (!schoolName || !subdomain || !adminEmail) {
      return { error: "Saari zaroori details bharna zaroori hai!" }
    }

    // 1️⃣ Sabse pehle 'schools' table mein data save karein
    const { data: newSchool, error: schoolError } = await supabase
      .from('schools')
      .insert([
        { 
          name: schoolName, 
          subdomain: subdomain.toLowerCase(), 
          address: address 
        }
      ])
      .select()
      .single()

    if (schoolError) {
      // Agar subdomain pehle se kisi ne le liya hai
      if (schoolError.code === '23505') {
        return { error: "Yeh Subdomain pehle se kisi aur school ke paas hai. Kripya doosra chunein." }
      }
      return { error: schoolError.message }
    }

    // 2️⃣ Ab us school ke Principal (Admin) ki details 'school_admins' table mein save karein
    const { error: adminError } = await supabase
      .from('school_admins')
      .insert([
        {
          school_id: newSchool.id,
          name: adminName,
          email: adminEmail,
          phone: adminPhone
        }
      ])

    if (adminError) {
      return { error: adminError.message }
    }

    // Dashboard ka data refresh karne ke liye
    revalidatePath('/dashboard')

    return { success: true, message: "School successfully register ho gaya hai! 🎉" }

  } catch (err: any) {
    return { error: "Kuch gadbad ho gayi: " + err.message }
  }
}