'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

export async function registerNewSchool(formData: FormData) {
  try {
    const supabase = await createClient()
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const schoolName = formData.get('schoolName') as string
    const subdomain = formData.get('subdomain') as string
    const address = formData.get('address') as string
    const adminName = formData.get('adminName') as string
    const adminEmail = formData.get('adminEmail') as string
    const adminPhone = formData.get('adminPhone') as string
    const adminPassword = formData.get('adminPassword') as string 
    const trialDaysStr = formData.get('trialDays') as string // 🚀 Naya: Trial Days nikalna

    if (!schoolName || !subdomain || !adminEmail || !adminPassword) {
      return { error: "Saari zaroori details (password sahit) bharna zaroori hai!" }
    }

    const formattedSubdomain = subdomain.toLowerCase()

    // 🚀 LOGIC: Trial Expiry Date Calculate karna
    const trialDays = parseInt(trialDaysStr) || 0
    let trialEndsAt = null
    let currentBillingStatus = 'active'

    if (trialDays > 0) {
      const date = new Date()
      date.setDate(date.getDate() + trialDays) // Aaj ki date mein trial days add kiye
      trialEndsAt = date.toISOString()
      currentBillingStatus = 'trial' // Status 'trial' set kar diya
    }

    // 1️⃣ Sabse pehle Supabase Auth (Login System) mein user banayein
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    })

    if (authError) {
      if (authError.message.includes('already exists')) {
         return { error: "Yeh Email ID pehle se kisi aur account mein registered hai." }
      }
      return { error: "Login Account banane mein error: " + authError.message }
    }

    // 2️⃣ Phir 'schools' table mein data save karein (with Billing Status)
    const { data: newSchool, error: schoolError } = await supabase
      .from('schools')
      .insert([
        { 
          name: schoolName, 
          subdomain: formattedSubdomain,
          slug: formattedSubdomain,
          address: address,
          billing_status: currentBillingStatus, // 🚀 Saved Billing Status
          trial_ends_at: trialEndsAt            // 🚀 Saved Trial Expiry Date
        }
      ])
      .select()
      .single()

    if (schoolError) {
      if (authData?.user?.id) await supabaseAdmin.auth.admin.deleteUser(authData.user.id)

      if (schoolError.code === '23505') {
        return { error: "Yeh Subdomain pehle se kisi aur school ke paas hai. Kripya doosra chunein." }
      }
      return { error: schoolError.message }
    }

    // 3️⃣ Ab Principal ki details 'school_admins' table mein save karein
    const { error: adminError } = await supabase
      .from('school_admins')
      .insert([
        {
          id: authData.user.id,
          school_id: newSchool.id,
          name: adminName,
          email: adminEmail,
          phone: adminPhone
        }
      ])

    if (adminError) {
      await supabase.from('schools').delete().eq('id', newSchool.id)
      if (authData?.user?.id) await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return { error: "Admin details save nahi ho payi. Process cancel kar diya gaya." }
    }

    revalidatePath('/dashboard/schools')

    return { success: true, message: `School, Login aur ${trialDays} din ka Trial successfully ban gaya hai! 🎉` }

  } catch (err: any) {
    return { error: "Kuch gadbad ho gayi: " + err.message }
  }
}