export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">MAKE ERP</h3>
          <p className="text-sm text-gray-400">
            Simplifying management for schools and businesses with next-generation tools.
          </p>
        </div>
        
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Features</a></li>
            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
          <p className="text-sm text-gray-400">Email: support@makeerp.com</p>
          <p className="text-sm text-gray-400 mt-2">Location: India</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Make ERP. All rights reserved.
      </div>
    </footer>
  );
}