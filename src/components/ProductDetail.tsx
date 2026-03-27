import { useState, useEffect } from 'react';
import { Heart, ChevronLeft } from 'lucide-react';
import Customizer from './Customizer';

interface ProductDetailProps {
  onBack: () => void;
}

export default function ProductDetail({ onBack }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sizes = ['36', '38', '40', '42', '44', '46'];

  return (
    <>
      <div className="min-h-screen bg-stone-50 pt-8 pb-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back button */}
        <button 
          onClick={onBack}
          className="flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors text-sm uppercase tracking-widest relative z-[60] cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Images Section - Left Column */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-stone-100 aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80" 
                alt="Collar Detail" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-stone-100 aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80" 
                alt="Shirt Full View" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-stone-100 aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&q=80" 
                alt="Fabric Detail" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-stone-100 aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80" 
                alt="Cuff Detail" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info Section - Right Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              
              {/* Tags */}
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-[#fdf5ed] text-[#d69f69] text-xs font-medium rounded-full">
                  Customisable
                </span>
                <span className="px-3 py-1 bg-[#eaf7ed] text-[#4ea065] text-xs font-medium rounded-full">
                  New
                </span>
              </div>

              {/* Title & Price */}
              <h1 className="text-2xl font-light text-stone-900 mb-2">
                Brushed Herringbone Shirt - Navy
              </h1>
              <p className="text-stone-900 mb-1">
                <span className="text-lg">₹ 3,490</span>
                <span className="text-xs text-stone-500 ml-2">Incl. of all taxes</span>
              </p>

              <div className="h-px bg-stone-300 my-8"></div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-stone-900">Select Standard Size</span>
                  <button className="text-xs text-amber-700 font-medium tracking-wide hover:text-amber-800">SIZE GUIDE</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center border text-sm transition-colors rounded-full
                        ${selectedSize === size 
                          ? 'border-[#7a8572] bg-[#7a8572] text-[#f7f4ef]' 
                          : 'border-[#cfc5b8] text-[#6a745f] hover:border-[#7a8572] hover:text-[#4f5b44]'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Size Option */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm text-stone-900">Prefer a Custom Size?</span>
                <button className="text-xs text-amber-700 font-medium tracking-wide hover:text-amber-800">ADD CUSTOM SIZE</button>
              </div>

              {/* Design Details Box */}
              <div className="border border-stone-300 rounded-lg p-5 mb-8 bg-stone-50">
                <h3 className="text-sm text-stone-900 font-medium mb-2">Design Details</h3>
                <p className="text-sm text-stone-500 mb-4">
                  Soft Polo Collar | Single Button Cuffs | Regular Placket
                </p>
                <button 
                  onClick={() => setIsCustomizing(true)}
                  className="w-full border border-[#7a8572] text-[#5f6853] py-3 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-[#efeae3] transition-colors"
                >
                  EDIT DESIGN
                </button>
              </div>

              {/* Add to Bag */}
              <div className="flex gap-4">
                <button className="flex-1 bg-[#7a8572] text-[#f7f4ef] py-4 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-[#66705e] transition-colors">
                  ADD TO BAG
                </button>
                <button className="w-14 h-14 flex items-center justify-center border border-[#cfc5b8] rounded-full hover:border-[#7a8572] transition-colors">
                  <Heart className="w-5 h-5 text-stone-600" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Looking For More Section */}
        <div className="mt-32">
          <h2 className="text-2xl font-light text-stone-900 mb-8 border-b border-stone-300 pb-4">Looking For More</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Solid Shirts', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80' },
              { name: 'Casual Shirts', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80' },
              { name: 'Blue Shirts', img: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&q=80' },
              { name: 'Flannel Shirts', img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80' },
              { name: 'All Shirts', img: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80' }
            ].map((cat, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-stone-100 mb-3 overflow-hidden">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="text-sm text-stone-500 group-hover:text-stone-900 transition-colors">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pair With Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-light text-stone-900 mb-8 border-b border-stone-300 pb-4">Pair With</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80' },
              { img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80' },
              { img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80' }
            ].map((pair, i) => (
              <div key={i} className="aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer group">
                <img src={pair.img} alt="Pair with pants" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    
    {isCustomizing && (
      <Customizer 
        onClose={() => setIsCustomizing(false)} 
        productName="Brushed Herringbone Shirt - Navy"
        price={3490}
      />
    )}
  </>
  );
}
