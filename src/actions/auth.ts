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
// ==========================================
// 3. SEND OTP FOR PASSWORD RESET
// ==========================================
export async function sendPasswordResetOtp(formData: FormData) {
  const email = formData.get('email')?.toString()

  if (!email) {
    redirect(`/forgot-password?error=${encodeURIComponent("Email zaroori hai!")}`)
  }

  const supabase = await createClient()

  // Supabase ko bolenge ki is email par OTP (Recovery code) bhej do
  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    console.error("OTP Send Error:", error.message)
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`)
  }

  // OTP send hone ke baad user ko OTP daalne wale page par bhejenge
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

  // Step A: OTP verify karein (Supabase mein password reset ke liye 'recovery' type use hota hai)
  const { error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: 'recovery',
  })

  if (verifyError) {
    redirect(`/verify-reset-otp?email=${email}&error=${encodeURIComponent("Galat OTP! Kripya dobara check karein.")}`)
  }

  // Step B: OTP sahi hone par user login ho jata hai, ab hum uska naya password set kar denge
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (updateError) {
    redirect(`/verify-reset-otp?email=${email}&error=${encodeURIComponent(updateError.message)}`)
  }

  // Password update hone ke baad login page par wapas bhej dein
  redirect('/login/master?message=' + encodeURIComponent('Password successfully change ho gaya hai! Ab naye password se login karein.'))
}