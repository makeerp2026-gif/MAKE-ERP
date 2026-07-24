"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache' // 👈 Yeh Naya Jaadu Hai

// 1. Pending Users ko laane ka function (Yeh waisa hi rahega)
export async function getPendingUsers() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('admissions') 
    .select('*')
    .eq('status', 'Pending')
    .order('created_at', { ascending: false })

  if (error) {
    return { error: error.message }
  }
  
  return { data }
}

// 2. User ko Approve karne ka function
export async function approveUser(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('admissions') 
    .update({ status: 'Approved' })
    .eq('id', id)

  if (error) {
    console.error("Approve karne mein error:", error.message)
  }
  
  // 🚀 JAISE HI APPROVE HO, PAGE KO BINA RELOAD KIYE REFRESH KAR DO
  revalidatePath('/master-admin')
}

// 3. User ko Reject karne ka function
export async function rejectUser(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('admissions')
    .update({ status: 'Rejected' })
    .eq('id', id)

  if (error) {
    console.error("Reject karne mein error:", error.message)
  }
  
  // 🚀 JAISE HI REJECT HO, PAGE KO BINA RELOAD KIYE REFRESH KAR DO
  revalidatePath('/master-admin')
}