"use client"

import React from 'react'
// Agar aapse School type import mein error aaye toh ise abhi any kar lena ya type file update kar lena.
// import { School } from '@/app/types/school' 

export default function SchoolTable({ schools }: { schools: any[] }) {
  
  // Date format karne ka helper function
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-wider">School Name</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-wider">School URL</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-wider">Principal / Admin</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-wider">Address</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-wider">Register Date</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {schools.map((school) => {
              
              // Safe Data Extraction
              const admin = school.school_admins?.[0] || { name: 'N/A', email: 'N/A' }
              const fullUrl = school.subdomain ? `${school.subdomain}.makeerp.com` : null

              return (
                <tr key={school.id} className="hover:bg-slate-50/80 transition group">
                  
                  {/* School Name */}
                  <td className="p-5">
                    <p className="text-sm font-bold text-slate-900">{school.name}</p>
                  </td>

                  {/* School URL */}
                  <td className="p-5">
                    {fullUrl ? (
                      <a href={`https://${fullUrl}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline">
                        {fullUrl}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-slate-400">Setup Pending</span>
                    )}
                  </td>

                  {/* Admin Details */}
                  <td className="p-5">
                    <p className="text-sm font-bold text-slate-900">{admin.name}</p>
                    {admin.email !== 'N/A' && (
                      <p className="text-xs font-medium text-slate-500">{admin.email}</p>
                    )}
                  </td>

                  {/* Address */}
                  <td className="p-5">
                    <p className="text-sm font-medium text-slate-700 uppercase line-clamp-1 max-wxs">
                      {school.address || '-'}
                    </p>
                  </td>

                  {/* Register Date */}
                  <td className="p-5">
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold rounded-lg">
                      {formatDate(school.created_at)}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="p-5 text-center">
                    <button className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition shadow-sm">
                      Manage
                    </button>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {/* Fallback if no schools exist */}
      {schools.length === 0 && (
        <div className="p-10 text-center text-slate-500 font-medium bg-slate-50/50">
          Koi school nahi mila. Jaldi se ek naya school add karein! 🚀
        </div>
      )}
    </div>
  )
}