"use client"

import { useState } from 'react'

export default function LoginForm() {
  // 🚀 Ab default 'student_parent' select rahega taaki form direct open rahe
  const [mainRole, setMainRole] = useState('student_parent')
  const [specificRole, setSpecificRole] = useState('student')

  const portalTypes = [
    { id: 'student_parent', label: 'Student / Parent', icon: '🎓', defaultRole: 'student' },
    { id: 'staff', label: 'Staff / Faculty', icon: '💼', defaultRole: 'teacher' },
    { id: 'admin', label: 'Management', icon: '👑', defaultRole: 'principal' },
  ]

  return (
    <form className="space-y-5"> {/* Gap kam kar diya (10 se 5) */}
      
      {/* 1. COMPACT TABS (Cards ki height aur padding kam kar di hai) */}
      <div>
        <label className="block text-xs font-bold text-slate-800 mb-3">Select Portal Type</label>
        <div className="grid grid-cols-3 gap-3">
          {portalTypes.map((portal) => (
            <button
              key={portal.id}
              type="button"
              onClick={() => {
                setMainRole(portal.id)
                setSpecificRole(portal.defaultRole) // Auto-select specific role
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                mainRole === portal.id
                  ? 'bg-blue-50 border-blue-600 shadow-sm scale-[1.02]'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white'
              }`}
            >
              <span className="text-2xl mb-1">{portal.icon}</span>
              <span className={`text-[10px] sm:text-xs font-black ${mainRole === portal.id ? 'text-blue-900' : 'text-slate-600'}`}>
                {portal.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        
        {/* 2. SPECIFIC ROLE (Compact Padding) */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Exact Role</label>
          <select 
            value={specificRole}
            required
            onChange={(e) => setSpecificRole(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition font-semibold text-blue-900 text-sm shadow-inner"
          >
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
              </>
            )}

            {mainRole === 'admin' && (
              <>
                <option value="principal">Principal</option>
                <option value="management">Management / Trustee</option>
                <option value="system_admin">IT / System Admin</option>
              </>
            )}
          </select>
        </div>

        {/* 3. CREDENTIALS (Compact Inputs) */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1.5">User ID / Registration No. *</label>
          <input 
            type="text" 
            required 
            placeholder="e.g. STU-001 or EMP-102" 
            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition text-sm" 
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-[11px] font-bold text-slate-700">Password *</label>
            <a href="#" className="text-[11px] font-bold text-blue-600 hover:underline">Forgot Password?</a>
          </div>
          <input 
            type="password" 
            required 
            placeholder="••••••••" 
            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition text-sm" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-black py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 mt-2 text-sm hover:scale-[1.02]"
        >
          Secure Login 🔒
        </button>

      </div>
    </form>
  )
}