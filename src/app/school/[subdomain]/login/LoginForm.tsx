"use client"

import { useState } from 'react'

export default function LoginForm() {
  const [mainRole, setMainRole] = useState('')
  const [specificRole, setSpecificRole] = useState('')

  return (
    <form className="space-y-6">
      
      {/* 1. Main Portal Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">Select Portal Type *</label>
        <select 
          value={mainRole} 
          onChange={(e) => {
            setMainRole(e.target.value)
            setSpecificRole('') // Main role badalne par specific role reset kar do
          }}
          className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition font-medium text-slate-700"
        >
          <option value="" disabled>Choose your portal...</option>
          <option value="student_parent">🎓 Student / Parent</option>
          <option value="staff">💼 Staff / Employee</option>
          <option value="admin">👑 Management / Admin</option>
        </select>
      </div>

      {/* 2. Specific Role Selection (Yeh tabhi dikhega jab Main Role select hoga) */}
      {mainRole && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block text-xs font-bold text-slate-700 mb-2">Select Specific Role *</label>
          <select 
            value={specificRole}
            onChange={(e) => setSpecificRole(e.target.value)}
            className="w-full p-4 border border-slate-200 rounded-xl bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition font-medium text-blue-900"
          >
            <option value="" disabled>Choose your exact role...</option>
            
            {mainRole === 'student_parent' && (
              <>
                <option value="student">Student</option>
                <option value="parent">Parent / Guardian</option>
              </>
            )}

            {mainRole === 'staff' && (
              <>
                <option value="teacher">Teacher / Faculty</option>
                <option value="accountant">Accountant / Finance</option>
                <option value="receptionist">Front Desk / Receptionist</option>
                <option value="transport">Transport Manager</option>
                <option value="librarian">Librarian</option>
                <option value="hr">HR / Payroll</option>
              </>
            )}

            {mainRole === 'admin' && (
              <>
                <option value="principal">Principal / Vice-Principal</option>
                <option value="management">Management / Trustee</option>
                <option value="system_admin">System Admin / IT</option>
              </>
            )}
          </select>
        </div>
      )}

      {/* 3. Credentials (Yeh tabhi dikhega jab Specific Role bhi select ho jaye) */}
      {specificRole && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">User ID / Registration No. *</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. STU-001 or EMP-102" 
              className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition" 
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-700">Password *</label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition" 
            />
          </div>

          <button 
            type="button" 
            className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition shadow-lg mt-4"
          >
            Secure Login 🔒
          </button>
        </div>
      )}

    </form>
  )
}