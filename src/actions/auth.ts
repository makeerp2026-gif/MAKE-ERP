'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// ==========================================
// 1. LOGIN FUNCTION (Traffic Police Logic)
// ==========================================
export async function loginAdmin(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    redirect(`/login?error=${encodeURIComponent("Email aur Password dono zaroori hain!")}`)
  }

  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !authData.user) {
    redirect(`/login?error=${encodeURIComponent("Email ya Password galat hai!")}`)
  }

  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('status')
    .eq('id', authData.user.id)
    .single()

  if (profileError && profileError.code !== 'PGRST116') {
    console.error("Profile check error:", profileError.message)
  }

  const userStatus = profile?.status || 'incomplete' 

  if (userStatus === 'incomplete') {
    redirect('/setup-profile')
  } else if (userStatus === 'pending') {
    redirect('/pending-approval')
  } else if (userStatus === 'approved') {
    redirect('/dashboard')
  } else {
    redirect('/login')
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

  // Supabase mein naya account banayein
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

  // Registration successful hone par OTP verification page par bhej dein
  redirect('/verify-otp') 
} // <-- YAHAN PAR MISSING THA BRACKET! 🚨

// ==========================================
// 3. FORGOT PASSWORD FUNCTION
// ==========================================
export async function resetPassword(formData: FormData) {
  const email = formData.get('email')?.toString()

  if (!email) {
    redirect(`/forgot-password?error=${encodeURIComponent("Email zaroori hai!")}`)
  }

  const supabase = await createClient()

  // Supabase ko bolenge ki is email par reset link bhej do
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    // Jab user email ke link par click karega, toh wo is page par aayega
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/update-password`,
  })

  if (error) {
    console.error("Reset Password Error:", error.message)
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`)
  }

  // Success hone par user ko message dikhayenge
  redirect('/forgot-password?message=' + encodeURIComponent('Password reset link aapke email par bhej diya gaya hai!'))
}