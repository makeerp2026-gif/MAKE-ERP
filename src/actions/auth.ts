'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  // 1. Supabase se Login check karein
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Agar password galat hai, toh wapas error ke sath login page par bhejein
  if (authError || !authData.user) {
    redirect(`/login?error=${encodeURIComponent("Email ya Password galat hai!")}`)
  }

  // 2. User ki Profile aur uska 'Status' check karein
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('status')
    .eq('id', authData.user.id)
    .single()

  // 3. 🚦 TRAFFIC POLICE LOGIC 🚦
  // Agar profile table mein status nahi milta, toh use 'incomplete' manenge
  const userStatus = profile?.status || 'incomplete' 

  if (userStatus === 'incomplete') {
    // Case 1: Naya user hai, isne abhi tak KYC aur School details nahi di hain
    redirect('/setup-profile')
    
  } else if (userStatus === 'pending') {
    // Case 2: Form bhar diya hai, par Super Admin (Aap) ke approval ka wait hai
    redirect('/pending-approval')
    
  } else if (userStatus === 'approved') {
    // Case 3: Super Admin ne Approve kar diya hai! Seedha Dashboard par bhejein!
    redirect('/dashboard')
    
  } else {
    // Agar status mein koi ajeeb error ho, toh default login par rakhein
    redirect('/login')
  }
}