import Link from 'next/link'

export default function PendingApproval() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          ⏳
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Application Received</h2>
        <p className="text-sm text-gray-500 mb-6">
          Thank you for registering your school. Your account is currently in <strong>Pending</strong> status. 
          Our Super Admin will verify your details and activate your account shortly.
        </p>
        <Link href="/" className="inline-block bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-900 transition-all">
          Return to Home
        </Link>
      </div>
    </div>
  )
}