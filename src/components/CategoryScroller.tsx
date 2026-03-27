import { useEffect, useRef, useState } from 'react';

// Elegant, premium categories
const categories = [
  'Ready to Wear Shirts',
  'Custom Made Shirts',
  'Winterwear',
  'Formal Pants',
  'Casual Pants',
  'Jeans',
  'Jackets',
  'Tees & Polos',
  'Blazers',
  'Linen Shirts',
  'Chinos',
  'Kurta Shirts'
];

export default function CategoryScroller() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      if (!listRef.current || !viewportRef.current) return;
      const listHeight = listRef.current.scrollHeight;
      const viewportHeight = viewportRef.current.clientHeight;
      setMaxTranslate(Math.max(0, listHeight - viewportHeight));
    };

    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);

    const resizeObserver = new ResizeObserver(updateMeasurements);
    if (listRef.current) resizeObserver.observe(listRef.current);
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);

    return () => {
      window.removeEventListener('resize', updateMeasurements);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateScrollProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) {
        setProgress(0);
        return;
      }

      const p = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const easedProgress = Math.min(Math.max((progress - 0.08) / 0.84, 0), 1);
  const translateY = -(maxTranslate * easedProgress);

  return (
    <section ref={sectionRef} className="relative isolate z-0 w-full h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex items-start h-full pt-20 md:pt-24 px-8 md:px-20">
          <div className="max-w-lg w-full bg-black/45 backdrop-blur-md text-white p-8 md:p-10 rounded-2xl shadow-xl">
            <p className="text-lg md:text-xl tracking-widest text-gray-200 mb-8 font-light uppercase">CATEGORIES</p>
            <div ref={viewportRef} className="h-[58vh] overflow-hidden">
              <nav
                ref={listRef}
                aria-label="Category navigation"
                className="space-y-5 will-change-transform"
                style={{ transform: `translate3d(0, ${translateY}px, 0)` }}
              >
                {categories.map((category) => (
                  <a
                    key={category}
                    href="#"
                    className="block text-3xl md:text-4xl font-light leading-tight text-white/95 hover:text-white transition-colors"
                    style={{ letterSpacing: '0.01em' }}
                  >
                    {category}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
