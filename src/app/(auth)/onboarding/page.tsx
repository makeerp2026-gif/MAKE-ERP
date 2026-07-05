import { registerSchool } from '../../../actions/admin'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-black text-gray-900 text-center mb-2">School Onboarding</h2>
        <p className="text-sm text-gray-500 text-center mb-8">Submit details for Super Admin verification</p>

        <form action={registerSchool} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">School/College Name</label>
            <input name="schoolName" type="text" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" placeholder="e.g. Imperial College" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Master Admin Name</label>
            <input name="adminName" type="text" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" placeholder="Principal / Owner Name" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Official Email</label>
            <input name="email" type="email" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" placeholder="admin@school.com" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
            <input name="password" type="password" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-black text-white p-3.5 rounded-xl font-bold text-sm hover:bg-gray-900 transition-all">
            Register as Master Admin
          </button>
        </form>
      </div>
    </div>
  )
}