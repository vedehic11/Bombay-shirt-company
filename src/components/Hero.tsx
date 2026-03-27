import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const slides = [
  {
    title: 'Custom Fitted Linen',
    subtitle: 'Luxury linen and affordable linen-cotton blends, tailored strictly to your measurements.',
    cta: 'DESIGN YOUR FIT',
    video: 'https://player.vimeo.com/external/517090081.sd.mp4?s=d98dc43de7069811bb1f20b852dbb09b4db0c5a2&profile_id=164&oauth2_token_id=57447761',
    image: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=1920&h=1080&fit=crop&crop=center',
    isVideo: false
  },
  {
    title: 'The Essential Blend',
    subtitle: 'Experience the elegance of linen combined with cotton for ultimate affordability and breathability.',
    cta: 'SHOP BLENDS',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1920&h=1080&fit=crop&crop=center',
    isVideo: false
  },
  {
    title: 'Your Exact Size',
    subtitle: 'No more standard sizes. Custom tailoring for a flawless fit, every single time.',
    cta: 'HOW IT WORKS',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1920&h=1080&fit=crop&crop=center',
    isVideo: false
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const fallbackHeroImage = 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=1920&h=1080&fit=crop&crop=center';

  const handleImageError = (event: { currentTarget: HTMLImageElement }) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';
    target.src = fallbackHeroImage;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentSlide]);

  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Layer (Image or Video) */}
          <div className="absolute inset-0 bg-stone-800">
            {slide.isVideo ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={slide.video}
                poster={slide.image}
                className="w-full h-full object-cover object-center"
                muted={isMuted}
                loop
                playsInline
              />
            ) : (
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                loading="eager"
                decoding="async"
                onError={handleImageError}
              />
            )}
            {/* Elegant dark overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-800/55 via-stone-700/20 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-end pb-24 md:pb-32 px-6 md:px-16 max-w-7xl mx-auto w-full">
            <div className="max-w-2xl text-left animate-in slide-in-from-bottom-8 duration-700 fade-in fill-mode-both">
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-light mb-4 text-stone-50 leading-tight">
                {slide.title}
              </h2>
              <p className="text-base md:text-lg mb-8 text-stone-100/90 font-light max-w-lg">
                {slide.subtitle}
              </p>
              <button className="px-8 py-3.5 border border-stone-100 text-stone-100 text-sm font-medium tracking-widest hover:bg-stone-100 hover:text-stone-900 transition-colors rounded-full uppercase">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Dots / Bars */}
      <div className="absolute bottom-10 right-6 md:right-16 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group py-2"
          >
            <div
              className={`h-0.5 transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-stone-100' : 'w-4 bg-stone-100/50 group-hover:bg-stone-100/80'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Audio Toggle (Only for video slide) */}
      {slides[currentSlide].isVideo && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-8 right-32 md:right-48 z-20 text-stone-100/70 hover:text-stone-100 p-2 transition-colors"
          aria-label="Toggle sound"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </div>
  );
}
