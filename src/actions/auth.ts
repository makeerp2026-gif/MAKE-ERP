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
  const adminName = formData.get('adminName') as string // Naya form field yahan add kiya hai

  // Supabase mein naya account banayein
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        school_name: schoolName,
        full_name: adminName, // Aapke form se Admin ka naam database mein jayega
      }
    }
  })

  if (error) {
    console.error("Signup Error:", error.message)
    redirect(`/onboarding?error=${encodeURIComponent(error.message)}`)
  }

  // Registration successful hone par OTP verification page par bhej dein
  redirect('/verify-otp') 
}