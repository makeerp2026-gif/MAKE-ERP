import Link from 'next/link';

export default function SchoolFooter({ schoolName }: { schoolName: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Column 1: About School */}
        <div className="md:col-span-2">
          <span className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-4 block">
            {schoolName}
          </span>
          <p className="text-slate-500 font-medium leading-relaxed max-w-md">
            Dedicated to providing excellent education, fostering holistic development, and shaping the leaders of tomorrow. 
          </p>
        </div>

        {/* Column 2: Academics */}
        <div>
          <h4 className="text-slate-900 font-black mb-4 uppercase tracking-wider text-sm">Academics</h4>
          <ul className="space-y-3 text-slate-500 font-medium text-sm">
            <li><Link href="#" className="hover:text-blue-600 transition">Admission Procedure</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Fee Structure</Link></li>
            <li><Link href="#" className="hover:text-white transition">Academic Calendar</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Syllabus</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="text-slate-900 font-black mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
          <ul className="space-y-3 text-slate-500 font-medium text-sm">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>123 Education Hub, Knowledge Park, City, State - 110001</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <span>info@{schoolName.toLowerCase().replace(/\s+/g, '')}.edu</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
        <p>© {currentYear} {schoolName}. All rights reserved.</p>
        <p>
          Powered by <Link href="https://makeerp.com" className="font-bold text-slate-600 hover:text-blue-600 transition">MAKE ERP</Link>
        </p>
      </div>
    </footer>
  );
}