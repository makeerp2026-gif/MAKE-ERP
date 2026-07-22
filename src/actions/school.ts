'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import Razorpay from 'razorpay'

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
    const trialDaysStr = formData.get('trialDays') as string 
    const subscriptionPlan = formData.get('subscriptionPlan') as string

    if (!schoolName || !subdomain || !adminEmail || !adminPassword) {
      return { error: "Saari zaroori details bharna zaroori hai!" }
    }

    const formattedSubdomain = subdomain.toLowerCase()

    // Trial Date Calculate
    const trialDays = parseInt(trialDaysStr) || 0
    let trialEndsAt = null
    let currentBillingStatus = 'active'

    if (trialDays > 0) {
      const date = new Date()
      date.setDate(date.getDate() + trialDays)
      trialEndsAt = date.toISOString()
      currentBillingStatus = 'trial'
    }

    // 🚀 DUMMY RAZORPAY LOGIC (Agar Keys nahi hain toh nakli ID banayega)
    let rzpCustomerId = `cust_dummy_${Math.floor(Math.random() * 1000000)}` 

    // Agar future mein aapne .env mein keys daal di, toh asli Razorpay call chalega
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      try {
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        })
        const customer = await razorpay.customers.create({
          name: adminName,
          email: adminEmail,
          contact: adminPhone,
          notes: { school_name: schoolName, subdomain: formattedSubdomain }
        })
        rzpCustomerId = customer.id
      } catch (rzpError: any) {
        return { error: "Razorpay Customer banane mein error: " + rzpError.message }
      }
    }

    // 2️⃣ Supabase Auth mein Principal ka login banayein
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    })

    if (authError) {
      return { error: "Login Account error: " + authError.message }
    }

    // 3️⃣ Database mein School Save karein
    const { data: newSchool, error: schoolError } = await supabase
      .from('schools')
      .insert([
        { 
          name: schoolName, 
          subdomain: formattedSubdomain,
          slug: formattedSubdomain,
          address: address,
          billing_status: currentBillingStatus,
          trial_ends_at: trialEndsAt,
          subscription_plan: subscriptionPlan,   
          razorpay_customer_id: rzpCustomerId    // Yahan Asli ya Dummy ID save hogi
        }
      ])
      .select()
      .single()

    if (schoolError) {
      if (authData?.user?.id) await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return { error: schoolError.message }
    }

    // 4️⃣ Principal Details Save karein
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
      return { error: "Admin details save nahi ho payi." }
    }

    revalidatePath('/dashboard/schools')

    return { success: true, message: `School Registered! Razorpay Cust ID: ${rzpCustomerId} 🎉` }

  } catch (err: any) {
    return { error: "Kuch gadbad ho gayi: " + err.message }
  }
}