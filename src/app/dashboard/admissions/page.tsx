"use client"

import { useState } from 'react'
import { toast } from 'react-hot-toast'

// Dummy Data (Backend lagne ke baad yeh Supabase se aayega)
const initialPendingStudents = [
  { id: 1, name: "Rahul Kumar", class: "Class 5", parentName: "Ramesh Kumar", email: "ramesh@example.com", date: "21 July 2026" },
  { id: 2, name: "Priya Singh", class: "Class 8", parentName: "Vikram Singh", email: "vikram@example.com", date: "21 July 2026" },
]

export default function PendingAdmissionsPage() {
  const [students, setStudents] = useState(initialPendingStudents)
  const [isApproving, setIsApproving] = useState<number | null>(null)

  // 🚀 APPROVE LOGIC (Jab Admin Approve dabayega)
  const handleApprove = async (id: number, email: string) => {
    setIsApproving(id)
    
    // Yahan hum apna backend (Server Action) call karenge jo Supabase Auth mein account banayega
    // Simulate API Call for now
    setTimeout(() => {
      setStudents(students.filter(student => student.id !== id))
      setIsApproving(null)
      
      // ✅ Success Message
      toast.success(`Account created! Password sent to ${email}`, {
        icon: '✉️',
        duration: 5000
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pending Admissions 📝</h1>
        <p className="text-gray-500 mt-1">Review aur approve karein naye students ke applications ko.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Details</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applied Class</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Parent's Email</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 font-medium">
                    🎉 Koi naya pending admission nahi hai!
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{student.name}</div>
                      <div className="text-xs text-gray-500">Parent: {student.parentName}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        {student.class}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-600">{student.email}</td>
                    <td className="p-4 text-sm text-gray-500">{student.date}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button 
                        className="px-4 py-2 text-xs font-bold bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => handleApprove(student.id, student.email)}
                        disabled={isApproving === student.id}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition text-white ${
                          isApproving === student.id ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isApproving === student.id ? 'Approving... ⏳' : 'Approve & Create Account ✅'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}