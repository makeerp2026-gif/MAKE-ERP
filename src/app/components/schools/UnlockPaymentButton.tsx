"use client"

import { useState } from 'react'
import Script from 'next/script'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
// Import aapke purane Server Actions
import { createSaaSSubscriptionOrder, verifySaaSPayment } from '../../../actions/saas-subscription'

interface PaymentProps {
  schoolId: string
  schoolName: string
  amount: number
}

export default function UnlockPaymentButton({ schoolId, schoolName, amount }: PaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    setIsLoading(true)
    toast.loading('Initiating Payment...', { id: 'unlock' })

    // 1. Order banayein
    const orderRes = await createSaaSSubscriptionOrder(schoolId, 15) // ₹15 rate assume kar rahe hain

    if (!orderRes.success || !orderRes.order) {
      toast.error('Payment order creation failed!', { id: 'unlock' })
      setIsLoading(false)
      return
    }

    // 2. Razorpay Window Options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderRes.order.amount,
      currency: orderRes.order.currency,
      name: "MAKE ERP",
      description: `Unlock ERP Access for ${schoolName}`,
      order_id: orderRes.order.id,
      handler: async function (paymentResponse: any) {
        toast.loading('Verifying payment...', { id: 'unlock' })
        
        // 3. Payment Verify karein
        const verifyRes = await verifySaaSPayment(
          paymentResponse.razorpay_order_id,
          paymentResponse.razorpay_payment_id,
          paymentResponse.razorpay_signature,
          schoolId
        )

        if (verifyRes.success) {
          toast.success('Payment Successful! School Unlocked 🚀', { id: 'unlock' })
          // Page ko refresh karein taaki Locked UI hat jaye
          router.refresh()
        } else {
          toast.error(verifyRes.error || 'Verification Failed', { id: 'unlock' })
        }
        setIsLoading(false)
      },
      prefill: {
        name: "Master Admin",
        contact: "9999999999"
      },
      theme: { color: "#DC2626" } // Red theme matching the locked warning
    }

    const rzp = new (window as any).Razorpay(options)
    
    rzp.on('payment.failed', function (response: any) {
      toast.error(`Payment Failed: ${response.error.description}`, { id: 'unlock' })
      setIsLoading(false)
    })

    rzp.open()
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button 
        onClick={handlePayment}
        disabled={isLoading}
        className={`px-8 py-4 rounded-xl font-black text-sm transition shadow-lg whitespace-nowrap ${
          isLoading ? 'bg-red-400 text-white cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 shadow-red-500/30 hover:shadow-xl hover:-translate-y-0.5'
        }`}
      >
        {isLoading ? 'Processing... ⏳' : `Pay ₹${amount} to Unlock 🔓`}
      </button>
    </>
  )
}