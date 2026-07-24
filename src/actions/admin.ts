"use server"

import { createClient } from '@/lib/supabase/server'

// 1. Pending Users ko laane ka function
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
    return { error: error.message }
  }
  
  return { success: true }
}

// 3. User ko Reject karne ka function
export async function rejectUser(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('admissions')
    .update({ status: 'Rejected' })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }
  
  return { success: true }
}