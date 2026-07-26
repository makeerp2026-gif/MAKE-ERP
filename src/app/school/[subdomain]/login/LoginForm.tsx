"use client"

import { useState } from 'react'

export default function LoginForm() {
  const [mainRole, setMainRole] = useState('')
  const [specificRole, setSpecificRole] = useState('')

  // 🚀 Premium Card Data
  const portalTypes = [
    { id: 'student_parent', label: 'Student / Parent', icon: '🎓', subtitle: 'View Results, Pay Fees' },
    { id: 'staff', label: 'Staff / Faculty', icon: '💼', subtitle: 'Manage Classes, Attendance' },
    { id: 'admin', label: 'Admin / Principal', icon: '👑', subtitle: 'Full School Management' },
  ]

  return (
    <form className="space-y-10">
      
      {/* 1. INTERACTIVE CARDS (Zero Boring, Smart UI) */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-5">Select Your Portal *</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portalTypes.map((portal) => (
            <button
              key={portal.id}
              type="button"
              onClick={() => {
                setMainRole(portal.id)
                setSpecificRole('') // Reset step 2
              }}
              className={`group flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 text-center space-y-2 h-full ${
                mainRole === portal.id
                  ? 'bg-blue-50 border-blue-600 shadow-lg shadow-blue-500/10 scale-105'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white hover:scale-105'
              }`}
            >
              <span className={`text-4xl transition-transform group-hover:scale-110 ${mainRole === portal.id ? 'scale-110' : ''}`}>
                {portal.icon}
              </span>
              <span className={`font-black text-sm ${mainRole === portal.id ? 'text-blue-900' : 'text-slate-900'}`}>
                {portal.label}
              </span>
              <span className={`text-xs font-medium ${mainRole === portal.id ? 'text-blue-700' : 'text-slate-500'}`}>
                {portal.subtitle}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. SPECIFIC ROLE (Smooth Dynamic Slide-in) */}
      {mainRole && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500 pt-8 border-t border-slate-100">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Select Exact Role *</label>
            <select 
              value={specificRole}
              required
              onChange={(e) => setSpecificRole(e.target.value)}
              className="w-full p-4 border border-slate-200 rounded-xl bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition font-semibold text-blue-900 text-lg shadow-inner"
            >
              <option value="" disabled>Who are you exactly?</option>
              
              {mainRole === 'student_parent' && (
                <>
                  <option value="student">I am a Student</option>
                  <option value="parent">I am a Parent / Guardian</option>
                </>
              )}

              {mainRole === 'staff' && (
                <>
                  <option value="teacher">Teacher / Faculty</option>
                  <option value="accountant">Accountant</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="transport">Transport Manager</option>
                  <option value="librarian">Librarian</option>
                </> /* 👈 YAHAN FIX KIYA HAI */
              )}

              {mainRole === 'admin' && (
                <>
                  <option value="principal">Principal</option>
                  <option value="management">Management / Trustee</option>
                  <option value="system_admin">IT / System Admin</option>
                </> /* 👈 YAHAN BHI FIX KIYA HAI */
              )}
            </select>
          </div>

          {/* 3. CREDENTIALS (Appears only after role select) */}
          {specificRole && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500 pt-8 border-t border-slate-100">
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
                type="submit" 
                className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 mt-4 text-lg hover:scale-[1.02]"
              >
                Secure Login 🔒
              </button>
            </div>
          )}
        </div>
      )}

    </form>
  )
}