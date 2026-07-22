'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function approveMasterAdmin(userId: string) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Session expired. Phirse login karein." }

    const { data: currentUserProfile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // 🚀 Uppercase aur lowercase dono check karega
    const currentRole = currentUserProfile?.role?.toUpperCase()

    if (currentRole !== 'SUPER_ADMIN') {
      return { error: "Uff! Aapke paas is action ki permission nahi hai. ❌" }
    }

    const { error } = await supabase
      .from('user_profiles')
      .update({ status: 'approved' })
      .eq('id', userId)

    if (error) {
      return { error: "Approve karne mein dikkat aayi: " + error.message }
    }

    revalidatePath('/super-admin/dashboard')

    return { success: true, message: "Master Admin successfully approve ho gaya! 🎉" }

  } catch (err: any) {
    return { error: "Something went wrong: " + err.message }
  }
}