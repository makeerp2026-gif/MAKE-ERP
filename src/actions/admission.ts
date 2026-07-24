"use server"

import { createClient } from '@/lib/supabase/server'

export async function submitAdmissionForm(formData: FormData) {
  const supabase = await createClient();

  const admissionData = {
    subdomain: formData.get('subdomain') as string,
    first_name: formData.get('firstName') as string,
    last_name: formData.get('lastName') as string,
    dob: formData.get('dob') as string,
    class_applied: formData.get('classApplied') as string,
    parent_name: formData.get('parentName') as string,
    phone: formData.get('phone') as string,
    status: 'Pending' 
  };

  const { error } = await supabase.from('admissions').insert([admissionData]);

  if (error) {
    return { error: error.message };
  }
  
  return { success: true };
}