import { useState } from 'react';
import { X, Heart } from 'lucide-react';

interface CustomizerProps {
  onClose: () => void;
  productName: string;
  price: number;
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

export default function Customizer({ onClose, productName, price }: CustomizerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('Style');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('Style');
  const [previewShirt, setPreviewShirt] = useState(false);

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

  const featureImages: Record<string, string> = {
    collar: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80',
    pocket: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&crop=edges&w=800&h=800',
    default: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&q=80'
  };

  return (
    <div className="fixed inset-0 z-[100] flex bg-[#f5f5f5] animate-in fade-in duration-300">
      
      {/* LEFT PANEL */}
      <div className={`relative ${activeFeature ? 'w-1/2' : 'w-2/3'} flex flex-col transition-all duration-500`}>
        
        {/* Header Left */}
        <div className="flex items-center justify-between p-6 px-8 z-10">
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
            <X className="w-6 h-6" />
          </button>
          
          <h1 className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-900 absolute left-1/2 -translate-x-1/2">
            CUSTOMISE
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">PREVIEW SHIRT</span>
            <button 
              onClick={() => setPreviewShirt(!previewShirt)}
              className={`w-11 h-6 rounded-full border border-gray-300 p-0.5 transition-colors ${previewShirt ? 'bg-gray-900' : 'bg-transparent'}`}
            >
              <div className={`w-4 h-4 rounded-full transition-transform ${previewShirt ? 'translate-x-5 bg-white' : 'bg-gray-400'}`} />
            </button>
          </div>
        </div>

        {/* Top Tabs */}
        {!activeFeature && (
          <div className="flex justify-center mt-2 z-10 px-4">
            <div className="flex border border-gray-200 rounded-full rounded-l-full rounded-r-full p-1 bg-[#f5f5f5]">
              {['Style', 'Contrast', 'Monogram'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as TabType)}
                  className={`px-12 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    activeTab === tab ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-900'
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
              src={featureImages[activeFeature] || featureImages.default} 
              alt="Zoomed Feature"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full max-w-[600px] aspect-square transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80" 
                alt="Shirt Canvas"
                className="w-full h-full object-contain"
              />
              
              {/* Overlay styling for ghost mannequin effect */}
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>

              {/* Hotpoints - STYLE TAB */}
              {activeTab === 'Style' && (
                <>
                  <Hotspot top="20%" left="50%" label="COLLAR" onClick={() => setActiveFeature('collar')} />
                  <Hotspot top="38%" left="62%" label="POCKET" onClick={() => setActiveFeature('pocket')} />
                  <Hotspot top="48%" left="50%" label="PLACKET" onClick={() => setActiveFeature('placket')} />
                  <Hotspot top="60%" left="50%" label="BUTTONS" onClick={() => setActiveFeature('buttons')} />
                  <Hotspot top="70%" left="75%" label="SLEEVE & CUFF" onClick={() => setActiveFeature('cuff')} />
                  <Hotspot top="85%" left="50%" label="BACK" onClick={() => setActiveFeature('back')} />
                </>
              )}

              {/* Hotpoints - CONTRAST TAB */}
              {activeTab === 'Contrast' && (
                <>
                  <Hotspot top="22%" left="50%" label="ON COLLAR" onClick={() => setActiveFeature('collar')} />
                  <Hotspot top="45%" left="50%" label="ON CHEST" onClick={() => setActiveFeature('pocket')} />
                  <Hotspot top="70%" left="72%" label="ON CUFF" onClick={() => setActiveFeature('cuff')} />
                  <Hotspot top="82%" left="48%" label="ON RIB" onClick={() => setActiveFeature('back')} />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={`relative ${activeFeature ? 'w-1/2' : 'w-1/3'} bg-white h-full shadow-2xl transition-all duration-500 flex flex-col`}>
        
        {/* Default View (No feature selected) */}
        {!activeFeature ? (
          <div className="flex-1 flex flex-col p-12 lg:p-16">
            <div className="flex gap-2 mb-6 mt-32">
              <span className="px-3 py-1 bg-[#fdf5ed] text-[#d69f69] text-xs font-medium rounded-full">Customisable</span>
              <span className="px-3 py-1 bg-[#eaf7ed] text-[#4ea065] text-xs font-medium rounded-full">New</span>
            </div>

            <h2 className="text-[28px] font-light text-gray-900 mb-3 leading-tight">{productName}</h2>
            <p className="text-gray-900 mb-12">
              <span className="text-[20px] font-medium">₹ {price.toLocaleString('en-IN')}</span>
              <span className="text-[11px] text-gray-500 ml-2 uppercase tracking-wide">Incl. of all taxes</span>
            </p>

            <div className="h-px bg-gray-200 mb-12 w-full max-w-[100px]"></div>

            <div className="flex gap-4 mt-auto mb-8">
              <button className="flex-1 bg-black text-white py-4 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-gray-900 transition-colors shadow-lg shadow-black/10">
                ADD TO BAG
              </button>
              <button className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full hover:border-gray-900 transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        ) : (
          /* Editing View (Feature selected e.g. Collar, Pocket) */
          <div className="flex-1 flex flex-col h-full bg-white">
            
            {/* Top Navigation for editing inside right panel */}
            <div className="flex items-center justify-between border-b border-gray-100 px-8 py-5 min-h-[72px]">
              {activeFeature === 'collar' ? (
                <>
                  <div className="flex space-x-12">
                    {['Style', 'Top Button', 'Stiffness'].map((subtab) => (
                      <button 
                        key={subtab}
                        onClick={() => setActiveSubTab(subtab as SubTabType)}
                        className={`text-sm font-medium tracking-wide transition-colors ${
                          activeSubTab === subtab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {subtab}
                      </button>
                    ))}
                  </div>
                  <button className="text-sm font-semibold tracking-wide text-blue-600 hover:text-blue-800">
                    Guide
                  </button>
                </>
              ) : activeFeature === 'pocket' ? (
                <div className="w-full text-center">
                  <span className="text-sm font-medium text-gray-900">Pocket</span>
                </div>
              ) : (
                <div className="w-full text-center capitalize">
                  <span className="text-sm font-medium text-gray-900">{activeFeature}</span>
                </div>
              )}
            </div>

            {/* Grid Options Container */}
            <div className="flex-1 overflow-y-auto p-8">
              {activeFeature === 'collar' && (
                <div className="grid grid-cols-3 gap-4">
                  {COLLAR_OPTIONS.map((opt, idx) => (
                    <button 
                      key={opt.id}
                      className={`aspect-square border rounded-[4px] p-4 flex flex-col items-center justify-center gap-4 transition-all
                        ${idx === 0 ? 'border-gray-900 shadow-sm' : 'border-gray-200 hover:border-gray-400'}
                      `}
                    >
                      {renderCollarIcon()}
                      <span className="text-[11px] text-gray-600 font-medium tracking-wide text-center">{opt.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeFeature === 'pocket' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {POCKET_OPTIONS.map((opt, idx) => (
                    <button 
                      key={opt.id}
                      className={`aspect-square border rounded-[4px] flex flex-col items-center justify-center gap-6 transition-all
                        ${idx === 0 ? 'border-gray-900 shadow-sm' : 'border-gray-200 hover:border-gray-400'}
                      `}
                    >
                      <div className="text-gray-800">{renderPocketIcon(opt.id)}</div>
                      <span className="text-[10px] text-gray-600 font-medium tracking-wide text-center px-2">{opt.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Bottom Actions */}
            <div className="p-8 border-t border-gray-100 bg-white grid grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveFeature(null)}
                className="py-4 border-2 border-gray-900 rounded-full text-xs font-bold tracking-[0.15em] uppercase text-gray-900 hover:bg-gray-50 transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={() => setActiveFeature(null)}
                className="py-4 bg-[#1a1a1a] rounded-full text-xs font-bold tracking-[0.15em] uppercase text-white hover:bg-black transition-colors"
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
function Hotspot({ top, left, label, onClick }: { top: string; left: string; label: string; onClick: () => void }) {
  return (
    <div 
      className="absolute flex items-center group cursor-pointer -translate-x-4 -translate-y-4 shadow-sm"
      style={{ top, left }}
      onClick={onClick}
    >
      <div className="relative z-10 w-8 h-8 rounded-full bg-[#df564d] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
        <span className="text-xl font-light leading-none mb-0.5">+</span>
      </div>
      <div className="bg-white/95 backdrop-blur-md h-7 rounded-r-full px-4 flex items-center -ml-4 pl-6 text-[10px] font-bold tracking-widest text-[#1a1a1a] shadow-sm uppercase group-hover:bg-gray-50 transition-colors">
        {label}
      </div>
    </div>
  );
}
