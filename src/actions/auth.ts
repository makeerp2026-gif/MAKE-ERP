'use server'

import { createClient } from '../lib/supabase/server'
import { redirect } from 'next/navigation'

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  // Supabase se check karein ki kya user sahi hai
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Agar email ya password galat hua toh wapas login page par error bhejein
  if (error) {
    redirect(`/login?error=${encodeURIComponent("Email ya Password galat hai!")}`)
  }

  // Agar sab sahi raha toh seedha dashboard par bhej de
  redirect('/dashboard')
}