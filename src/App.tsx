import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Stats from './components/Stats';
import CategoryScroller from './components/CategoryScroller';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';

function App() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  if (selectedProductId) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation theme="dark" isAbsolute={false} />
        <ProductDetail onBack={() => setSelectedProductId(null)} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Stats />
      <CategoryScroller />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">Curated For You</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
            Bestselling Collection
          </h2>
          <div className="relative w-full max-w-md mx-auto mt-8 flex justify-center">
            <div className="w-12 h-[1px] bg-gray-300"></div>
          </div>
        </div>
        <ProductGrid onProductClick={setSelectedProductId} />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
                Redefining Linen, Custom Fit to You
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Premium linen doesn't have to be out of reach. We've introduced breathable linen-cotton blends to make luxury affordable. Partnered with our signature custom tailoring, every shirt is crafted to your exact measurements—no more compromising on standard sizing.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">—</span>
                  <span className="text-gray-700">Affordable Linen-Cotton blends</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">—</span>
                  <span className="text-gray-700">Custom tailored to your unique size</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">—</span>
                  <span className="text-gray-700">100% fit guarantee</span>
                </li>
              </ul>
              <button className="bg-black text-white text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-gray-800 transition-colors">
                Start Customizing
              </button>
            </div>
            <div className="relative h-[600px] bg-gray-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594938298596-10fd97e6be95?auto=format&fit=crop&q=80"
                  alt="Tailoring process"
                  className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
