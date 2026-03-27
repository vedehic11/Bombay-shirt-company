import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1c1b1b] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">LUXE THREADS</h3>
            <p className="text-gray-400 text-sm">
              Premium custom tailoring and ready-to-wear clothing for the modern individual.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Shirts</a></li>
              <li><a href="#" className="hover:text-white">Bottoms</a></li>
              <li><a href="#" className="hover:text-white">Outerwear</a></li>
              <li><a href="#" className="hover:text-white">Casualwear</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Size Guide</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Luxe Threads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
