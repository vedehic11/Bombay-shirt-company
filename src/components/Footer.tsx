import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#ddd5ca] text-[#4f5b44] border-t border-[#cfc5b8]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">LUXE THREADS</h3>
            <p className="text-[#6a745f] text-sm">
              Premium custom tailoring and ready-to-wear clothing for the modern individual.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-[#6a745f]">
              <li><a href="#" className="hover:text-[#4f5b44]">Shirts</a></li>
              <li><a href="#" className="hover:text-[#4f5b44]">Bottoms</a></li>
              <li><a href="#" className="hover:text-[#4f5b44]">Outerwear</a></li>
              <li><a href="#" className="hover:text-[#4f5b44]">Casualwear</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-[#6a745f]">
              <li><a href="#" className="hover:text-[#4f5b44]">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#4f5b44]">Size Guide</a></li>
              <li><a href="#" className="hover:text-[#4f5b44]">Shipping Info</a></li>
              <li><a href="#" className="hover:text-[#4f5b44]">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#4f5b44]">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#4f5b44]">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#4f5b44]">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#4f5b44]">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#cfc5b8] pt-8 text-center text-sm text-[#6a745f]">
          <p>&copy; 2026 Luxe Threads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
