"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitProfileForApproval } from '@/actions/profile'

export default function SetupProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Step aage-peeche karne ke functions
  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  // Final submit function jo backend ko call karega
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Status update karke pending-approval page par bhej dega
    await submitProfileForApproval()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-semibold ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>1. Personal</span>
            <span className={`text-sm font-semibold ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>2. School Details</span>
            <span className={`text-sm font-semibold ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>3. Documents</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
            ></div>
          </div>
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Personal Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input type="text" required className="w-full mt-1 p-2 border rounded-md" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <input type="tel" required className="w-full mt-1 p-2 border rounded-md" placeholder="+91 9876543210" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: School Details */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">School Details</h2>
              <div>
                <label className="text-sm font-medium">School Name</label>
                <input type="text" required className="w-full mt-1 p-2 border rounded-md" placeholder="Delhi Public School" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Board (e.g., CBSE, ICSE)</label>
                  <input type="text" required className="w-full mt-1 p-2 border rounded-md" placeholder="CBSE" />
                </div>
                <div>
                  <label className="text-sm font-medium">Affiliation Number</label>
                  <input type="text" required className="w-full mt-1 p-2 border rounded-md" placeholder="1234567" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Document Upload (KYC) */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">KYC & Documents</h2>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:bg-gray-50 transition">
                <label className="cursor-pointer">
                  <span className="text-blue-600 font-semibold hover:underline">Click to upload</span>
                  <span className="text-gray-500"> or drag and drop</span>
                  <p className="text-xs text-gray-400 mt-1">School Registration Certificate (PDF/JPG)</p>
                  <input type="file" className="hidden" required />
                </label>
              </div>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:bg-gray-50 transition">
                <label className="cursor-pointer">
                  <span className="text-blue-600 font-semibold hover:underline">Click to upload</span>
                  <span className="text-gray-500"> or drag and drop</span>
                  <p className="text-xs text-gray-400 mt-1">Admin ID Proof / Aadhar (PDF/JPG)</p>
                  <input type="file" className="hidden" required />
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="px-6 py-2 border rounded-lg font-medium hover:bg-gray-50">
                Back
              </button>
            ) : <div></div>}
            
            <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800">
              {step === 3 ? 'Submit to Super Admin' : 'Save & Next'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}