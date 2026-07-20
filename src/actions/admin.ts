'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// 1. Sirf 'pending' wale users ko database se nikalne ka function
export async function getPendingUsers() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false }) // Naye application sabse upar

  if (error) {
    console.error("Error fetching users:", error)
    return []
  }
  return data || []
}

// 2. User ko Approve karne ka function (status -> approved)
export async function approveUser(userId: string) {
  const supabase = await createClient()
  
  await supabase
    .from('user_profiles')
    .update({ status: 'approved' })
    .eq('id', userId)

  // Page ko auto-refresh karne ke liye
  revalidatePath('/master-admin')
}

// 3. User ko Reject karne ka function (status -> incomplete, taaki wo wapas form bhare)
export async function rejectUser(userId: string) {
  const supabase = await createClient()
  
  await supabase
    .from('user_profiles')
    .update({ status: 'incomplete' })
    .eq('id', userId)

  // Page ko auto-refresh karne ke liye
  revalidatePath('/master-admin')
}