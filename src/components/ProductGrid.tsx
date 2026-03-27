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

const normalizePrice = (value: number) => Math.min(3000, Math.max(1000, value));

const fallbackProducts: Product[] = [
  
  {
    id: '3',
    name: 'White Premium Linen',
    price: 1390,
    sale_price: 1190,
    image_url: '/shirts/shirt3/1.png',
  },
  {
    id: '4',
    name: 'Light Blue Striped Linen',
    price: 1490,
    sale_price: 1290,
    image_url: '/shirts/shirt4/1.png',
  },
  {
    id: '5',
    name: 'Beige Blend Casual Linen',
    price: 1790,
    sale_price: 1590,
    image_url: '/shirts/shirt5/1.png',
  },
  {
    id: '7',
    name: 'Olive Green Premium Linen',
    price: 1690,
    sale_price: 1190,
    image_url: '/shirts/shirt7/1.png',
  }
];

export default function ProductGrid({ onProductClick }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Deliberately bypassing Supabase to enforce the new Linen catalog and pricing (1000-3000)
    const normalizedProducts = fallbackProducts.map((product) => {
      const normalizedPrice = normalizePrice(product.price);
      const normalizedSalePrice =
        product.sale_price === null
          ? null
          : Math.min(normalizedPrice, normalizePrice(product.sale_price));

      return {
        ...product,
        price: normalizedPrice,
        sale_price: normalizedSalePrice,
      };
    });

    setProducts(normalizedProducts);
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
