import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="text-xl font-black text-white tracking-tight mb-4 block">MAKE ERP</span>
          <p className="text-sm">Empowering educational institutions with next-generation management tools.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>support@makeerp.com</li>
            <li>+91 98765 43210</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
        © 2026 MAKE ERP. All rights reserved. Built with ❤️ in India.
      </div>
    </footer>
  );
}