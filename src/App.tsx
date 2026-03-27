import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Stats from './components/Stats';
import CategoryScroller from './components/CategoryScroller';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'detail'>('home');
  const [lastListingView, setLastListingView] = useState<'home' | 'shop'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const openShop = () => {
    setSelectedProductId(null);
    setCurrentView('shop');
    window.scrollTo(0, 0);
  };

  const openProductDetail = (productId: string, source: 'home' | 'shop') => {
    setSelectedProductId(productId);
    setLastListingView(source);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  };

  if (currentView === 'detail' && selectedProductId) {
    return (
      <div className="min-h-screen bg-[#e8e3dc]">
        <Navigation theme="dark" isAbsolute={false} />
        <ProductDetail
          productId={selectedProductId}
          onBack={() => {
            setSelectedProductId(null);
            setCurrentView(lastListingView);
          }}
          onShopRedirect={openShop}
        />
        <Footer />
      </div>
    );
  }

  if (currentView === 'shop') {
    return (
      <div className="min-h-screen bg-[#e8e3dc]">
        <Navigation theme="dark" isAbsolute={false} />

        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          <div className="flex flex-col items-center mb-10">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6a745f] mb-4">Shop</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#4f5b44] tracking-tight">
              Our Collection
            </h2>
            <div className="relative w-full max-w-md mx-auto mt-8 flex justify-center">
              <div className="w-12 h-[1px] bg-[#cfc7bb]"></div>
            </div>
          </div>

          <ProductGrid onProductClick={(id) => openProductDetail(id, 'shop')} />
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e3dc]">
      <Navigation />
      <Hero onShopRedirect={openShop} />
      <Stats />
      <CategoryScroller />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6a745f] mb-4">Curated For You</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#4f5b44] tracking-tight">
            Bestselling Collection
          </h2>
          <div className="relative w-full max-w-md mx-auto mt-8 flex justify-center">
            <div className="w-12 h-[1px] bg-[#cfc7bb]"></div>
          </div>
        </div>
        <ProductGrid onProductClick={(id) => openProductDetail(id, 'home')} />
      </section>

      <section className="bg-[#efeae3] py-16 border-y border-[#d1c8bc]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-light text-[#4f5b44] mb-6 tracking-tight">
                Redefining Linen, Custom Fit to You
              </h2>
              <p className="text-[#66705e] mb-6 leading-relaxed">
                Premium linen doesn't have to be out of reach. We've introduced breathable linen-cotton blends to make luxury affordable. Partnered with our signature custom tailoring, every shirt is crafted to your exact measurements—no more compromising on standard sizing.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-[#8b9382] mr-3">—</span>
                  <span className="text-[#5f6853]">Affordable Linen-Cotton blends</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8b9382] mr-3">—</span>
                  <span className="text-[#5f6853]">Custom tailored to your unique size</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8b9382] mr-3">—</span>
                  <span className="text-[#5f6853]">100% fit guarantee</span>
                </li>
              </ul>
              <button
                onClick={openShop}
                className="bg-[#7a8572] text-[#f7f4ef] text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-[#66705e] transition-colors"
              >
                Start Customizing
              </button>
            </div>
            <div className="relative h-[600px] bg-[#ddd5ca] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1400&q=80"
                  alt="Tailoring process"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(event) => {
                    const target = event.currentTarget;
                    if (target.dataset.fallbackApplied === 'true') return;
                    target.dataset.fallbackApplied = 'true';
                    target.src = 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1400&q=80';
                  }}
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
