"use client" // Click event ko kaam karwane ke liye yeh bohot zaroori hai

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  // Dropdown khula hai ya band, iska record rakhne ke liye
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm border-b relative z-50">
      {/* Logo */}
      <div className="text-2xl font-black text-gray-900 tracking-tight">
        MAKE ERP
      </div>

      {/* Navigation & Login */}
      <nav className="flex items-center gap-6">
        <Link href="/" className="text-gray-600 hover:text-black font-medium">Home</Link>
        <Link href="/about" className="text-gray-600 hover:text-black font-medium">About</Link>

        {/* 🚦 CLICK DROPDOWN */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Click karne par menu khulega/band hoga
            className="px-5 py-2.5 bg-black text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-800 transition shadow-sm"
          >
            Login
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          {/* Dropdown Menu - Jo sirf tab dikhega jab isDropdownOpen true hoga */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-fade-in">
              
              <Link href="/login/superadmin" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-b border-gray-50">
                👑 Super Admin (You)
              </Link>
              <Link href="/login/master" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-b border-gray-50">
                🏫 Master Admin
              </Link>
              <Link href="/login/teacher" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-b border-gray-50">
                👩‍🏫 Teacher
              </Link>
              <Link href="/login/student" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-b border-gray-50">
                🎓 Student
              </Link>
              <Link href="/login/parent" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-b border-gray-50">
                👨‍👩‍👦 Parent
              </Link>
              <Link href="/login/subadmin" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                💼 Sub-Admin (Staff)
              </Link>

            </div>
          )}
        </div>
      </nav>
    </header>
  )
}