'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// ==========================================
// 1. LOGIN FUNCTION (Traffic Police & Tenant Security)
// ==========================================
export async function loginUser(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return { error: "Email aur Password dono daalna zaroori hai!" }
  }

  const supabase = await createClient()

  // 1️⃣ Pata lagayein ki user kis URL par login kar raha hai
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const isMainDomain = host.includes('localhost') || host === 'makeerp.com' || host === 'www.makeerp.com'
  const subdomain = isMainDomain ? null : host.split('.')[0]

  // 2️⃣ Supabase se ID Password check karein
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { error: "❌ Invalid Email ID ya Password! Kripya dobara check karein." }
  }

  const userId = authData.user.id

  // 3️⃣ 🚀 MAIN DOMAIN LOGIC (Super Admin & Master Admin)
  if (isMainDomain) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role, status')
      .eq('id', userId)
      .single()

    if (!profile || (profile.role !== 'SUPER_ADMIN' && profile.role !== 'MASTER_ADMIN')) {
      await supabase.auth.signOut()
      return { error: "🚫 Invalid Access! Kripya apne school ki specific link (URL) se login karein." }
    }

    // Aapka Status Routing Logic
    const userStatus = profile.status || 'incomplete' 

    if (userStatus === 'incomplete') {
      redirect('/setup-profile')
    } else if (userStatus === 'pending') {
      redirect('/pending-approval')
    } else if (userStatus === 'approved') {
       if (profile.role === 'SUPER_ADMIN') {
         redirect('/super-admin/dashboard')
       } else {
         redirect('/dashboard')
       }
    } else {
      await supabase.auth.signOut()
      return { error: "Account status unknown. Kripya admin se sampark karein." }
    }
  } 
  // 4️⃣ 🚀 SUBDOMAIN LOGIC (School Principals, Staff, Students)
  else {
    const { data: schoolData } = await supabase
      .from('schools')
      .select('id')
      .eq('subdomain', subdomain)
      .single()

    if (!schoolData) {
      await supabase.auth.signOut()
      return { error: "🚫 Yeh school URL exist nahi karta!" }
    }

    // Check ki kya yeh user IS school ka Principal hai
    const { data: schoolAdmin } = await supabase
      .from('school_admins')
      .select('id')
      .eq('id', userId)
      .eq('school_id', schoolData.id)
      .single()

    if (!schoolAdmin) {
      await supabase.auth.signOut()
      return { error: `🚫 Access Denied! Yeh login ID '${subdomain}' school ke liye valid nahi hai.` }
    }

    // Sab theek hone par Client Component ko Success bhejenge
    return { success: true, redirectUrl: '/school-admin/dashboard' }
  }
}

// ==========================================
// 2. REGISTRATION FUNCTION (Onboarding)
// ==========================================
export async function registerSchool(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const schoolName = formData.get('schoolName') as string
  const adminName = formData.get('adminName') as string 

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        school_name: schoolName,
        full_name: adminName, 
      }
    }
  })

  if (error) {
    console.error("Signup Error:", error.message)
    redirect(`/onboarding?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/verify-otp') 
} 

// ==========================================
// 3. SEND OTP FOR PASSWORD RESET
// ==========================================
export async function sendPasswordResetOtp(formData: FormData) {
  const email = formData.get('email')?.toString()

  if (!email) {
    redirect(`/forgot-password?error=${encodeURIComponent("Email zaroori hai!")}`)
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    console.error("OTP Send Error:", error.message)
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect(`/verify-reset-otp?email=${encodeURIComponent(email)}`)
}

// ==========================================
// 4. VERIFY OTP & UPDATE PASSWORD
// ==========================================
export async function verifyResetOtpAndUpdate(formData: FormData) {
  const email = formData.get('email')?.toString()
  const otp = formData.get('otp')?.toString()
  const newPassword = formData.get('newPassword')?.toString()

  if (!email || !otp || !newPassword) {
    redirect(`/verify-reset-otp?email=${email}&error=${encodeURIComponent("Saari details bharna zaroori hai!")}`)
  }

  const supabase = await createClient()

  const { error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: 'recovery',
  })

  if (verifyError) {
    redirect(`/verify-reset-otp?email=${email}&error=${encodeURIComponent("Galat OTP! Kripya dobara check karein.")}`)
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (updateError) {
    redirect(`/verify-reset-otp?email=${email}&error=${encodeURIComponent(updateError.message)}`)
  }

  redirect('/login/master?message=' + encodeURIComponent('Password successfully change ho gaya hai! Ab naye password se login karein.'))
}

// ==========================================
// 5. SECRET SUPER ADMIN LOGIN (VIP ENTRY)
// ==========================================
export async function loginSuperAdmin(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return { error: "Email aur Password dono daalna zaroori hai!" }
  }

  const supabase = await createClient()

  // 1. Supabase se ID/Password check karein
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { error: "❌ Invalid Email ID ya Password! Kripya dobara check karein." }
  }

  // 2. 🚀 STRICT VIP CHECK: Kya yeh sach mein SUPER ADMIN hai?
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single()

  // Agar role SUPER_ADMIN nahi hai, toh turant logout karo aur error do!
  if (profile?.role !== 'SUPER_ADMIN') {
    await supabase.auth.signOut()
    return { error: "🚨 ACCESS DENIED! Yeh login page sirf Platform Owner ke liye hai." }
  }

  // Agar sab theek hai toh seedha VIP Dashboard (Owner Control Room) par bhej do
  return { success: true, redirectUrl: '/super-admin/dashboard' }
}