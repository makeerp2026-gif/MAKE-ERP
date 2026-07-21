"use client"

import { School } from '@/app/types/school'

interface SchoolTableProps {
  schools: School[]
}

export default function SchoolTable({ schools }: SchoolTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">School Name</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">School URL</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Principal / Admin</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Address</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Register Date</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {schools.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400 font-medium">
                  Abhi tak koi school register nahi hua hai.
                </td>
              </tr>
            ) : (
              schools.map((school) => {
                const date = new Date(school.created_at).toLocaleDateString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric'
                })
                
                const admin = school.school_admins && school.school_admins.length > 0 
                  ? school.school_admins[0] 
                  : { name: 'N/A', email: 'N/A' }

                return (
                  <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">{school.name}</td>
                    <td className="p-4">
                      <a 
                        href={`http://${school.subdomain}.makeerp.com`} 
                        target="_blank" 
                        className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                      >
                        {school.subdomain}.makeerp.com
                      </a>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-bold text-gray-800">{admin.name}</div>
                      <div className="text-xs text-gray-500">{admin.email}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 truncate max-w-[150px]">
                      {school.address}
                    </td>
                    <td className="p-4">
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                        {date}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-bold text-sm px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                        Manage
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}