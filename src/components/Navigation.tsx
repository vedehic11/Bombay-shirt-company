import { Menu, Search, ShoppingBag, User, X, Phone } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  theme?: 'light' | 'dark';
  isAbsolute?: boolean;
}

export default function Navigation({ theme = 'light', isAbsolute = true }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const promotions = [
    'BUY 6 PRODUCTS AND GET 1 FREE',
    'USE WELCOME10 TO GET 10% OFF ON YOUR 1ST ORDER',
    'MRP REDUCED ON PRODUCTS TO PASS GST BENEFIT WHEREVER APPLICABLE',
    'USE PANTS20 GET 20% OFF ON PANTS WITH EVERY SHIRT YOU BUY'
  ];

  const textColor = theme === 'dark' ? 'text-gray-900' : 'text-white';
  const hoverColor = theme === 'dark' ? 'hover:text-gray-500' : 'hover:text-white/70';

  return (
    <>
      <nav className={`${isAbsolute ? 'absolute z-50' : 'relative z-50 bg-white'} top-0 w-full transition-colors duration-300`}>
        {/* Promotion Banner */}
        <div className="bg-[#111] text-white/90 py-2.5 text-[11px] font-medium tracking-widest overflow-hidden border-b border-white/10">
          <div className="flex items-center animate-scroll whitespace-nowrap">
            {[...promotions, ...promotions, ...promotions].map((promo, idx) => (
              <span key={idx} className="inline-block px-4">
                {idx !== 0 && <span className="mr-8">★</span>}
                {promo}
              </span>
            ))}
          </div>
        </div>

        {/* Main Navbar */}
        <div className={`w-full px-6 md:px-12 ${theme === 'dark' ? 'border-b border-gray-100' : ''}`}>
          <div className={`flex items-center justify-between h-20 ${textColor}`}>
            {/* Left Box: Menu, Search, Phone */}
            <div className="flex items-center space-x-6 w-1/3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${hoverColor} transition-colors`}
                aria-label="Menu"
              >
                {isMenuOpen ? <X strokeWidth={1} size={28} /> : <Menu strokeWidth={1} size={28} />}
              </button>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`${hoverColor} transition-colors hidden sm:block`}
                aria-label="Search"
              >
                <Search strokeWidth={1} size={22} />
              </button>
              <button className={`${hoverColor} transition-colors hidden sm:block`} aria-label="Contact">
                <Phone strokeWidth={1} size={22} />
              </button>
            </div>

            {/* Center Box: Brand Logo */}
            <div className="flex-1 flex justify-center w-1/3">
              <h1 className="text-[22px] md:text-2xl font-light tracking-[0.2em] transform scale-y-110">
                BOMBAY SHIRT COMPANY
              </h1>
            </div>

            {/* Right Box: Wishlist, Account, Cart */}
            <div className="flex items-center justify-end space-x-6 w-1/3">
              <button className={`${hoverColor} transition-colors hidden sm:block`} aria-label="Wishlist">
                {/* Custom Heart Icon to match exactly */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <button className={`${hoverColor} transition-colors`} aria-label="Account">
                <User strokeWidth={1} size={22} />
              </button>
              <button className={`${hoverColor} transition-colors relative`} aria-label="Cart">
                <ShoppingBag strokeWidth={1} size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#111] text-white border-t border-white/10">
            <div className="p-6 space-y-4">
              <a href="#" className="block text-lg font-light hover:text-gray-300">New Arrivals</a>
              <a href="#" className="block text-lg font-light hover:text-gray-300">Shirts</a>
              <a href="#" className="block text-lg font-light hover:text-gray-300">Pants</a>
            </div>
          </div>
        )}
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-xl">
            <div className="flex items-center p-4 border-b">
              <Search className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 outline-none text-black"
                autoFocus
              />
              <button onClick={() => setIsSearchOpen(false)}>
                <X className="text-gray-400" size={20} />
              </button>
            </div>
            <div className="p-4 text-gray-500 text-sm">
              Try searching for "shirts", "chinos", or "blazers"
            </div>
          </div>
        </div>
      )}
    </>
  );
}
