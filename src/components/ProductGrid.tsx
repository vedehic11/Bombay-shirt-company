import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  name: string;
  price: number;
  sale_price: number | null;
  image_url: string;
}

interface ProductGridProps {
  onProductClick?: (productId: string) => void;
}

const fallbackProducts: Product[] = [
  {
    id: '1',
    name: 'Brushed Herringbone Linen - Navy',
    price: 3000,
    sale_price: 2490,
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Classic White Pure Linen',
    price: 2890,
    sale_price: 1990,
    image_url: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Olive Green Premium Linen',
    price: 2990,
    sale_price: 2490,
    image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'Beige Blend Casual Linen',
    price: 2190,
    sale_price: 1590,
    image_url: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    name: 'Light Blue Striped Linen',
    price: 2790,
    sale_price: 1890,
    image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    name: 'Charcoal Grey Linen Resort',
    price: 2590,
    sale_price: 1790,
    image_url: 'https://images.unsplash.com/photo-1588359348347-9bc6cbea68fa?auto=format&fit=crop&q=80',
  },
  {
    id: '7',
    name: 'Mustard Yellow Pure Linen',
    price: 2690,
    sale_price: 2190,
    image_url: 'https://images.unsplash.com/photo-1604056157813-f661005bdfef?auto=format&fit=crop&q=80',
  },
  {
    id: '8',
    name: 'Rustic Red Breathable Linen',
    price: 2390,
    sale_price: 1390,
    image_url: 'https://images.unsplash.com/photo-1617137968427-85924c8008b8?auto=format&fit=crop&q=80',
  }
];

export default function ProductGrid({ onProductClick }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Deliberately bypassing Supabase to enforce the new Linen catalog and pricing (1300-3000)
    setProducts(fallbackProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-stone-100 aspect-[4/5] mb-4" />
            <div className="h-3 bg-stone-200 mb-2 w-3/4" />
            <div className="h-3 bg-stone-200 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          salePrice={product.sale_price || undefined}
          imageUrl={product.image_url}
          colors={['#1a1a1a', '#ffffff', '#4a90e2', '#e8b4b8']}
          onClick={() => onProductClick && onProductClick(product.id)}
        />
      ))}
    </div>
  );
}
