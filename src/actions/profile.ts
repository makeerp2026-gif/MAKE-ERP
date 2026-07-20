'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function submitProfileForApproval() {
  const supabase = await createClient()

  // 1. Pata lagayein ki kaunsa user login hai
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 2. User ka status database mein 'incomplete' se 'pending' kar dein
  const { error } = await supabase
    .from('user_profiles')
    .update({ status: 'pending' })
    .eq('id', user.id)

  if (error) {
    console.error("Status update error:", error)
    return { error: "Submission failed. Please try again." }
  }

  // 3. Status update hone ke baad user ko Pending page par bhej dein
  redirect('/pending-approval')
}