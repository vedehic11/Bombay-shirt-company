interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  colors?: string[];
  onClick?: () => void;
}

export default function ProductCard({
  name,
  price,
  salePrice,
  imageUrl,
  colors = [],
  onClick
}: ProductCardProps) {
  const discount = salePrice
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden bg-stone-100 aspect-[4/5] mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-stone-50/95 backdrop-blur-sm shadow-sm text-stone-800 px-2 py-1 text-[10px] uppercase font-bold tracking-widest leading-none">
            {discount}% OFF
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <button className="w-full bg-[#f7f4ef]/95 backdrop-blur-sm hover:bg-[#7a8572] border border-[#d1c8bc] hover:border-[#7a8572] text-[#4f5b44] hover:text-[#f7f4ef] text-xs font-semibold tracking-widest uppercase py-3.5 transition-colors shadow-lg">
            Quick Add
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start mt-4 px-1">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-light text-stone-900 group-hover:text-stone-600 transition-colors line-clamp-1">
            {name}
          </h3>

          <div className="flex items-center gap-2">
            {salePrice ? (
              <>
                <span className="text-stone-900 text-sm">₹{salePrice}</span>
                <span className="text-stone-400 line-through text-xs">₹{price}</span>
              </>
            ) : (
              <span className="text-stone-900 text-sm">₹{price}</span>
            )}
          </div>
        </div>

        {colors.length > 0 && (
          <div className="flex gap-1.5 pt-0.5">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
