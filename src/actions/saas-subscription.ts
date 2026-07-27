'use server'

import Razorpay from 'razorpay'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'

// Razorpay Initialize
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// 1. Order Banane ka logic
export async function createSaaSSubscriptionOrder(schoolId: string, ratePerStudent: number = 15) {
  try {
    // Abhi ke liye hum 120 bacche maan rahe hain, baad mein isko database se real count karenge
    const totalActiveStudents = 120
    const calculatedAmount = totalActiveStudents * ratePerStudent

    const options = {
      amount: calculatedAmount * 100, // Paise mein
      currency: "INR",
      receipt: `sub_${schoolId.slice(0, 5)}_${Date.now()}`,
      notes: {
        school_id: schoolId,
        billing_type: "monthly_subscription"
      }
    }

    const order = await razorpay.orders.create(options)
    return { success: true, order }

  } catch (err: any) {
    console.error("SaaS Subscription Order Error:", err)
    return { success: false, error: "Payment order fail ho gaya." }
  }
}

// 2. Payment Verify karke School Unlock karne ka logic
export async function verifySaaSPayment(
  razorpay_order_id: string, 
  razorpay_payment_id: string, 
  razorpay_signature: string,
  schoolId: string
) {
  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return { success: false, error: "Invalid payment signature! Security alert." }
    }

    const supabase = await createClient()
    
    // School ko wapas ACTIVE kar do
    await supabase
      .from('schools')
      .update({ billing_status: 'active' })
      .eq('id', schoolId)

    return { success: true }

  } catch (err: any) {
    return { success: false, error: "Payment verification failed" }
  }
}