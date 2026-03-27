import { useState } from 'react';
import { X, Heart } from 'lucide-react';

interface CustomizerProps {
  onClose: () => void;
  productName: string;
  price: number;
  onShopRedirect?: () => void;
  baseImage?: string;
}

type TabType = 'Style' | 'Contrast' | 'Monogram';
type SubTabType = 'Style' | 'Top Button' | 'Stiffness' | 'Guide';

const COLLAR_OPTIONS = [
  { id: 'polo', name: 'Polo' },
  { id: 'spread', name: 'Spread Collar' },
  { id: 'bandhgala', name: 'Bandhgala' },
  { id: 'club', name: 'Club Collar' },
  { id: 'concealed', name: 'Concealed' },
  { id: 'cuban', name: 'Cuban Collar' },
  { id: 'hipster', name: 'Hipster' },
  { id: 'hipster_rounded', name: 'Hipster Rounded' },
  { id: 'madmen', name: 'Madmen' },
  { id: 'prince', name: 'Prince Charlie' }
];

const POCKET_OPTIONS = [
  { id: 'no_pocket', name: 'No Pocket' },
  { id: 'double_flap', name: 'Double Pocket with Flap' },
  { id: 'single', name: 'Single Pocket' },
  { id: 'single_flap', name: 'Single Pocket with Flap' }
];

const COLOR_OPTIONS = [
  { id: 'white', name: 'White', hex: '#ffffff', border: '#e5e5e5' },
  { id: 'navy', name: 'Navy Blue', hex: '#001f3f', border: '#001f3f' },
  { id: 'black', name: 'Black', hex: '#1a1a1a', border: '#1a1a1a' },
  { id: 'charcoal', name: 'Charcoal Grey', hex: '#36454f', border: '#36454f' },
  { id: 'khaki', name: 'Khaki', hex: '#f0e68c', border: '#d4af37' },
  { id: 'olive', name: 'Olive Green', hex: '#808000', border: '#808000' },
  { id: 'dusty_blue', name: 'Dusty Blue', hex: '#a4b4c4', border: '#8092a8' },
  { id: 'burgundy', name: 'Burgundy', hex: '#800020', border: '#800020' }
];

const PLACKET_OPTIONS = [
  { id: 'regular', name: 'Regular Placket' },
  { id: 'french', name: 'French Front' },
  { id: 'hidden', name: 'Hidden Placket' },
  { id: 'contrast', name: 'Contrast Placket' }
];

const BUTTON_OPTIONS = [
  { id: 'mother_pearl', name: 'Mother of Pearl' },
  { id: 'resin', name: 'Resin Button' },
  { id: 'matte', name: 'Matte Button' },
  { id: 'metal', name: 'Metal Accent' }
];

const CUFF_OPTIONS = [
  { id: 'single_round', name: 'Single Round Cuff' },
  { id: 'single_square', name: 'Single Square Cuff' },
  { id: 'double_cuff', name: 'Double Cuff' },
  { id: 'convertible', name: 'Convertible Cuff' }
];

const BACK_OPTIONS = [
  { id: 'plain', name: 'Plain Back' },
  { id: 'box_pleat', name: 'Box Pleat' },
  { id: 'side_pleats', name: 'Side Pleats' },
  { id: 'darted', name: 'Darted Back' }
];

const BASE_CUSTOMIZER_IMAGE = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1400&q=80';
const FALLBACK_FEATURE_IMAGE = 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1400&q=80';

const FEATURE_DEFAULT_IMAGES: Record<string, string> = {
  collar: '/customizer/collars/polo-collar.png',
  pocket: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&crop=edges&w=800&h=800',
  placket: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
  buttons: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1000&q=80',
  cuff: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80',
  back: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=1000&q=80',
  color: BASE_CUSTOMIZER_IMAGE,
  default: FALLBACK_FEATURE_IMAGE
};

const COLLAR_IMAGES: Record<string, string> = {
  polo: '/customizer/collars/polo-collar.png',
  spread: '/customizer/collars/spread-collar.png',
  bandhgala: '/customizer/collars/bandgala.png',
  club: '/customizer/collars/club-collar.png',
  concealed: '/customizer/collars/polo-collar.png',
  cuban: '/customizer/collars/spread-collar.png',
  hipster: '/customizer/collars/bandgala.png',
  hipster_rounded: '/customizer/collars/club-collar.png',
  madmen: '/customizer/collars/polo-collar.png',
  prince: '/customizer/collars/spread-collar.png'
};

const POCKET_IMAGES: Record<string, string> = {
  no_pocket: '/customizer/pockets/no-pocket.png',
  double_flap: '/customizer/pockets/no-pocket.png',
  single: '/customizer/pockets/single-pocket.png',
  single_flap: '/customizer/pockets/single-pocket.png'
};

const PLACKET_IMAGES: Record<string, string> = {
  regular: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&crop=center&w=1200&q=80',
  french: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&crop=left&w=1200&q=80',
  hidden: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&crop=right&w=1200&q=80',
  contrast: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&crop=top&w=1200&q=80'
};

const BUTTON_IMAGES: Record<string, string> = {
  mother_pearl: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&crop=center&w=1200&q=80',
  resin: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&crop=left&w=1200&q=80',
  matte: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&crop=right&w=1200&q=80',
  metal: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&crop=top&w=1200&q=80'
};

const CUFF_IMAGES: Record<string, string> = {
  single_round: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&crop=center&w=1200&q=80',
  single_square: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&crop=left&w=1200&q=80',
  double_cuff: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&crop=right&w=1200&q=80',
  convertible: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&crop=top&w=1200&q=80'
};

const BACK_IMAGES: Record<string, string> = {
  plain: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&crop=center&w=1200&q=80',
  box_pleat: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&crop=left&w=1200&q=80',
  side_pleats: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&crop=right&w=1200&q=80',
  darted: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&crop=top&w=1200&q=80'
};

const COLOR_IMAGES: Record<string, string> = {
  white: BASE_CUSTOMIZER_IMAGE,
  navy: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
  black: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1200&q=80',
  charcoal: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=1200&q=80',
  khaki: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&w=1200&q=80',
  olive: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
  dusty_blue: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=80',
  burgundy: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&crop=right&w=1200&q=80'
};

const getOptionPlaceholderImage = (feature: string, option: string) =>
  `https://placehold.co/1200x1600/e8e3dc/4f5b44?text=${encodeURIComponent(
    `${feature.toUpperCase()} - ${option.replace(/_/g, ' ').toUpperCase()}`
  )}`;

export default function Customizer({ onClose, productName, price, onShopRedirect, baseImage }: CustomizerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('Style');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('Style');
  const [previewShirt, setPreviewShirt] = useState(false);
  const [selectedCollar, setSelectedCollar] = useState<string>('polo');
  const [selectedColor, setSelectedColor] = useState<string>('navy');
  const [selectedPocket, setSelectedPocket] = useState<string>('single_flap');
  const [selectedPlacket, setSelectedPlacket] = useState<string>('regular');
  const [selectedButton, setSelectedButton] = useState<string>('mother_pearl');
  const [selectedCuff, setSelectedCuff] = useState<string>('single_round');
  const [selectedBack, setSelectedBack] = useState<string>('plain');
  const canvasBaseImage = baseImage || BASE_CUSTOMIZER_IMAGE;

  const handleCanvasImageError = (event: { currentTarget: HTMLImageElement }) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';
    target.src = FALLBACK_FEATURE_IMAGE;
  };

  const handleFeatureImageError = (event: { currentTarget: HTMLImageElement }, fallbackSrc: string) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';
    target.src = fallbackSrc;
  };

  // Simplified collar drawing for the grid
  const renderCollarIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
      <path d="M10 16 C 14 26, 20 30, 24 30 C 28 30, 34 26, 38 16 L 36 12 L 24 20 L 12 12 Z" fill="#1a1a1a" />
      <circle cx="24" cy="27" r="2" fill="white" stroke="none" />
    </svg>
  );

  const renderPocketIcon = (id: string) => {
    switch (id) {
      case 'no_pocket':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
            <circle cx="20" cy="20" r="14" />
            <line x1="10" y1="10" x2="30" y2="30" />
          </svg>
        );
      case 'double_flap':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M8 16 v8 l5 4 l5 -4 v-8" />
            <path d="M8 16 l5 4 l5 -4" />
            
            <path d="M22 16 v8 l5 4 l5 -4 v-8" />
            <path d="M22 16 l5 4 l5 -4" />
          </svg>
        );
      case 'single':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M12 12 h16 v12 l-8 5 l-8 -5 z" />
            <path d="M12 12 h16" strokeDasharray="1 1" />
          </svg>
        );
      case 'single_flap':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M12 16 v10 l8 5 l8 -5 v-10" />
            <path d="M12 14 h16 l-8 5 z" />
            <circle cx="20" cy="16" r="1" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  const activeFeatureImage = (() => {
    if (!activeFeature) return FEATURE_DEFAULT_IMAGES.default;

    if (activeFeature === 'collar') return COLLAR_IMAGES[selectedCollar] || FEATURE_DEFAULT_IMAGES.collar;
    if (activeFeature === 'pocket') return POCKET_IMAGES[selectedPocket] || FEATURE_DEFAULT_IMAGES.pocket;
    if (activeFeature === 'placket') return PLACKET_IMAGES[selectedPlacket] || FEATURE_DEFAULT_IMAGES.placket;
    if (activeFeature === 'buttons') return BUTTON_IMAGES[selectedButton] || FEATURE_DEFAULT_IMAGES.buttons;
    if (activeFeature === 'cuff') return CUFF_IMAGES[selectedCuff] || FEATURE_DEFAULT_IMAGES.cuff;
    if (activeFeature === 'back') return BACK_IMAGES[selectedBack] || FEATURE_DEFAULT_IMAGES.back;
    if (activeFeature === 'color') {
      if (selectedColor === 'white') return canvasBaseImage;
      return COLOR_IMAGES[selectedColor] || canvasBaseImage;
    }

    return FEATURE_DEFAULT_IMAGES[activeFeature] || FEATURE_DEFAULT_IMAGES.default;
  })();

  const activeFeatureOptionId = (() => {
    if (!activeFeature) return 'default';
    if (activeFeature === 'collar') return selectedCollar;
    if (activeFeature === 'pocket') return selectedPocket;
    if (activeFeature === 'placket') return selectedPlacket;
    if (activeFeature === 'buttons') return selectedButton;
    if (activeFeature === 'cuff') return selectedCuff;
    if (activeFeature === 'back') return selectedBack;
    if (activeFeature === 'color') return selectedColor;
    return 'default';
  })();

  const activeFeatureFallbackImage = getOptionPlaceholderImage(activeFeature || 'style', activeFeatureOptionId);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col lg:flex-row bg-stone-100 animate-in fade-in duration-300 overflow-hidden">
      
      {/* LEFT PANEL */}
      <div className={`relative w-full ${activeFeature ? 'h-[48%] lg:h-auto lg:w-1/2' : 'h-[55%] lg:h-auto lg:w-2/3'} flex flex-col transition-all duration-500`}>
        
        {/* Header Left */}
        <div className="flex items-center justify-between p-4 sm:p-6 sm:px-8 z-10">
          <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors cursor-pointer">
            <X className="w-6 h-6" />
          </button>
          
          <h1 className="text-[11px] sm:text-sm font-semibold tracking-[0.2em] uppercase text-stone-900 absolute left-1/2 -translate-x-1/2">
            CUSTOMISE
          </h1>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline text-[10px] font-semibold tracking-widest text-stone-500 uppercase">PREVIEW SHIRT</span>
            <button 
              onClick={() => setPreviewShirt(!previewShirt)}
              className={`w-11 h-6 rounded-full border border-[#cfc5b8] p-0.5 transition-colors ${previewShirt ? 'bg-[#7a8572]' : 'bg-transparent'}`}
            >
              <div className={`w-4 h-4 rounded-full transition-transform ${previewShirt ? 'translate-x-5 bg-stone-50' : 'bg-stone-400'}`} />
            </button>
          </div>
        </div>

        {/* Top Tabs */}
        {!activeFeature && (
          <div className="flex justify-center mt-1 sm:mt-2 z-10 px-2 sm:px-4">
            <div className="flex border border-stone-300 rounded-full rounded-l-full rounded-r-full p-1 bg-stone-100 max-w-full overflow-x-auto">
              {['Style', 'Contrast', 'Monogram'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as TabType)}
                  className={`px-5 sm:px-8 lg:px-12 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
                    activeTab === tab ? 'bg-[#7a8572] text-[#f7f4ef]' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Image & Hotspots Container */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          
          {activeFeature ? (
            <img 
              src={activeFeatureImage} 
              alt="Zoomed Feature"
              className="w-full h-full object-cover"
              onError={(event) => handleFeatureImageError(event, activeFeatureFallbackImage)}
            />
          ) : (
            <div className="relative w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[600px] aspect-[3/4] transition-transform duration-700">
              <img 
                src={canvasBaseImage}
                alt="Shirt Canvas"
                className="w-full h-full object-contain"
                onError={handleCanvasImageError}
              />
              
              {/* Overlay styling for ghost mannequin effect */}
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>

              {/* Hotpoints - STYLE TAB */}
              {activeTab === 'Style' && (
                <>
                  <Hotspot top="8%" left="50%" label="COLOR" onClick={() => setActiveFeature('color')} />
                  <Hotspot top="30%" left="50%" label="COLLAR" onClick={() => setActiveFeature('collar')} />
                  <Hotspot top="47%" left="60%" label="POCKET" onClick={() => setActiveFeature('pocket')} />
                  <Hotspot top="55%" left="50%" label="PLACKET" onClick={() => setActiveFeature('placket')} />
                  <Hotspot top="74%" left="50%" label="BUTTONS" onClick={() => setActiveFeature('buttons')} />
                  <Hotspot top="62%" left="69%" label="SLEEVE & CUFF" align="left" onClick={() => setActiveFeature('cuff')} />
                  <Hotspot top="93%" left="50%" label="BACK" onClick={() => setActiveFeature('back')} />
                </>
              )}

              {/* Hotpoints - CONTRAST TAB */}
              {activeTab === 'Contrast' && (
                <>
                  <Hotspot top="15%" left="50%" label="ON COLLAR" onClick={() => setActiveFeature('collar')} />
                  <Hotspot top="44%" left="56%" label="ON CHEST" onClick={() => setActiveFeature('pocket')} />
                  <Hotspot top="84%" left="82%" label="ON CUFF" align="left" onClick={() => setActiveFeature('cuff')} />
                  <Hotspot top="93%" left="50%" label="ON BACK" onClick={() => setActiveFeature('back')} />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={`relative w-full ${activeFeature ? 'h-[52%] lg:h-full lg:w-1/2' : 'h-[45%] lg:h-full lg:w-1/3'} bg-stone-50 shadow-2xl transition-all duration-500 flex flex-col`}>
        
        {/* Default View (No feature selected) */}
        {!activeFeature ? (
          <div className="flex-1 flex flex-col p-5 sm:p-8 lg:p-16">
            <div className="flex gap-2 mb-4 sm:mb-6 mt-2 sm:mt-8 lg:mt-32">
              <span className="px-3 py-1 bg-[#fdf5ed] text-[#d69f69] text-xs font-medium rounded-full">Customisable</span>
              <span className="px-3 py-1 bg-[#eaf7ed] text-[#4ea065] text-xs font-medium rounded-full">New</span>
            </div>

            <h2 className="text-2xl sm:text-[28px] font-light text-stone-900 mb-3 leading-tight">{productName}</h2>
            <p className="text-stone-900 mb-6 sm:mb-10 lg:mb-12">
              <span className="text-lg sm:text-[20px] font-medium">₹ {price.toLocaleString('en-IN')}</span>
              <span className="text-[11px] text-stone-500 ml-2 uppercase tracking-wide">Incl. of all taxes</span>
            </p>

            <div className="h-px bg-stone-300 mb-6 sm:mb-10 lg:mb-12 w-full max-w-[100px]"></div>

            <div className="flex gap-3 sm:gap-4 mt-auto mb-2 sm:mb-6 lg:mb-8">
              <button
                onClick={onShopRedirect}
                className="flex-1 bg-[#7a8572] text-[#f7f4ef] py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#66705e] transition-colors shadow-lg shadow-[#66705e]/20"
              >
                ADD TO BAG
              </button>
              <button className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-[#cfc5b8] rounded-full hover:border-[#7a8572] transition-colors">
                <Heart className="w-5 h-5 text-stone-600" />
              </button>
            </div>
          </div>
        ) : (
          /* Editing View (Feature selected e.g. Collar, Pocket) */
          <div className="flex-1 flex flex-col h-full bg-stone-50">
            
            {/* Top Navigation for editing inside right panel */}
            <div className="flex items-center justify-between border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 min-h-[64px] sm:min-h-[72px]">
              {activeFeature === 'collar' ? (
                <>
                  <div className="flex flex-wrap gap-4 sm:gap-8 lg:gap-12">
                    {['Style', 'Top Button', 'Stiffness'].map((subtab) => (
                      <button 
                        key={subtab}
                        onClick={() => setActiveSubTab(subtab as SubTabType)}
                        className={`text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                          activeSubTab === subtab ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        {subtab}
                      </button>
                    ))}
                  </div>
                  <button className="text-xs sm:text-sm font-semibold tracking-wide text-amber-700 hover:text-amber-800">
                    Guide
                  </button>
                </>
              ) : activeFeature === 'pocket' ? (
                <div className="w-full text-center">
                  <span className="text-sm font-medium text-stone-900">Pocket</span>
                </div>
              ) : activeFeature === 'color' ? (
                <div className="w-full text-center">
                  <span className="text-sm font-medium text-stone-900">Color</span>
                </div>
              ) : (
                <div className="w-full text-center capitalize">
                  <span className="text-sm font-medium text-stone-900">{activeFeature}</span>
                </div>
              )}
            </div>

            {/* Grid Options Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {activeFeature === 'collar' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {COLLAR_OPTIONS.map((opt) => (
                    <button 
                      key={opt.id}
                      onClick={() => setSelectedCollar(opt.id)}
                      className={`aspect-square border rounded-[4px] p-4 flex flex-col items-center justify-center gap-4 transition-all
                        ${selectedCollar === opt.id ? 'border-[#7a8572] bg-stone-100 shadow-sm' : 'border-[#cfc5b8] hover:border-[#8b9382]'}
                      `}
                    >
                      {renderCollarIcon()}
                      <span className="text-[11px] text-stone-600 font-medium tracking-wide text-center">{opt.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeFeature === 'pocket' && (
                <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
                  {POCKET_OPTIONS.map((opt) => (
                    <button 
                      key={opt.id}
                      onClick={() => setSelectedPocket(opt.id)}
                      className={`aspect-square border-2 rounded-lg flex flex-col items-center justify-center gap-4 p-4 transition-all group
                        ${selectedPocket === opt.id ? 'border-[#7a8572] bg-stone-100 shadow-lg' : 'border-[#cfc5b8] hover:border-[#8b9382]'}
                      `}
                    >
                      <div className={`text-4xl transition-colors ${selectedPocket === opt.id ? 'text-stone-900' : 'text-stone-400'}`}>
                        {renderPocketIcon(opt.id)}
                      </div>
                      <span className="text-[11px] text-stone-700 font-semibold tracking-wide text-center">{opt.name}</span>
                      {selectedPocket === opt.id && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#7a8572]"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {activeFeature === 'placket' && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
                  {PLACKET_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedPlacket(opt.id)}
                      className={`aspect-square border rounded-[4px] p-4 flex items-center justify-center text-center transition-all
                        ${selectedPlacket === opt.id ? 'border-[#7a8572] bg-stone-100 shadow-sm text-stone-900' : 'border-[#cfc5b8] text-stone-600 hover:border-[#8b9382]'}
                      `}
                    >
                      <span className="text-sm font-medium">{opt.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeFeature === 'buttons' && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
                  {BUTTON_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedButton(opt.id)}
                      className={`aspect-square border rounded-[4px] p-4 flex items-center justify-center text-center transition-all
                        ${selectedButton === opt.id ? 'border-[#7a8572] bg-stone-100 shadow-sm text-stone-900' : 'border-[#cfc5b8] text-stone-600 hover:border-[#8b9382]'}
                      `}
                    >
                      <span className="text-sm font-medium">{opt.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeFeature === 'cuff' && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
                  {CUFF_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedCuff(opt.id)}
                      className={`aspect-square border rounded-[4px] p-4 flex items-center justify-center text-center transition-all
                        ${selectedCuff === opt.id ? 'border-[#7a8572] bg-stone-100 shadow-sm text-stone-900' : 'border-[#cfc5b8] text-stone-600 hover:border-[#8b9382]'}
                      `}
                    >
                      <span className="text-sm font-medium">{opt.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeFeature === 'back' && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
                  {BACK_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedBack(opt.id)}
                      className={`aspect-square border rounded-[4px] p-4 flex items-center justify-center text-center transition-all
                        ${selectedBack === opt.id ? 'border-[#7a8572] bg-stone-100 shadow-sm text-stone-900' : 'border-[#cfc5b8] text-stone-600 hover:border-[#8b9382]'}
                      `}
                    >
                      <span className="text-sm font-medium">{opt.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeFeature === 'color' && (
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className="flex flex-col items-center gap-3 group transition-all"
                      >
                        <div 
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 shadow-md transition-all group-hover:scale-105 flex items-center justify-center
                            ${selectedColor === color.id ? 'border-[#7a8572] ring-2 ring-[#d1c8bc]' : 'border-[#cfc5b8] hover:border-[#8b9382]'}
                          `}
                          style={{ backgroundColor: color.hex, borderColor: color.border }}
                        >
                          {selectedColor === color.id && (
                            <div className="text-2xl text-stone-200 mix-blend-screen">✓</div>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-600 font-medium tracking-wide text-center">{color.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="bg-stone-100 p-4 sm:p-6 rounded-lg border border-stone-300">
                    <p className="text-xs text-stone-500 font-semibold tracking-wide uppercase mb-2">Preview</p>
                    <div className="flex items-center gap-4 sm:gap-8">
                      <div 
                        className="w-24 h-32 sm:w-32 sm:h-40 rounded-lg shadow-lg" 
                        style={{ backgroundColor: COLOR_OPTIONS.find(c => c.id === selectedColor)?.hex }}
                      ></div>
                      <div>
                        <p className="text-sm text-stone-900 font-medium">Your Selected Color:</p>
                        <p className="text-lg font-semibold text-stone-900 mt-1">{COLOR_OPTIONS.find(c => c.id === selectedColor)?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Bottom Actions */}
            <div className="p-4 sm:p-6 lg:p-8 border-t border-stone-200 bg-stone-50 grid grid-cols-2 gap-3 sm:gap-4">
              <button 
                onClick={() => setActiveFeature(null)}
                className="py-3.5 sm:py-4 border-2 border-[#7a8572] rounded-full text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#5f6853] hover:bg-[#efeae3] transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={() => {
                  setActiveFeature(null);
                  onShopRedirect?.();
                }}
                className="py-3.5 sm:py-4 bg-[#7a8572] rounded-full text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#f7f4ef] hover:bg-[#66705e] transition-colors"
              >
                APPLY
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

// Reusable hotspot component
function Hotspot({ top, left, label, align = 'right', onClick }: { top: string; left: string; label: string; align?: 'left' | 'right'; onClick: () => void }) {
  return (
    <div 
      className="absolute flex items-center group cursor-pointer -translate-x-4 -translate-y-4 shadow-sm"
      style={{ top, left }}
      onClick={onClick}
    >
      {align === 'left' ? (
        <>
          <div className="hidden sm:flex bg-stone-50/95 backdrop-blur-md h-7 rounded-l-full px-4 items-center -mr-4 pr-6 text-[10px] font-bold tracking-widest text-stone-900 shadow-sm uppercase group-hover:bg-stone-100 transition-colors whitespace-nowrap">
            {label}
          </div>
          <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-700 text-stone-50 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-lg sm:text-xl font-light leading-none mb-0.5">+</span>
          </div>
        </>
      ) : (
        <>
          <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-700 text-stone-50 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-lg sm:text-xl font-light leading-none mb-0.5">+</span>
          </div>
          <div className="hidden sm:flex bg-stone-50/95 backdrop-blur-md h-7 rounded-r-full px-4 items-center -ml-4 pl-6 text-[10px] font-bold tracking-widest text-stone-900 shadow-sm uppercase group-hover:bg-stone-100 transition-colors whitespace-nowrap">
            {label}
          </div>
        </>
      )}
    </div>
  );
}
