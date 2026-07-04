'use client';

import { Product } from '@/lib/csv-loader';
import { useCart } from '@/lib/cart-store';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border-2 border-black hover:border-orange-500">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {product.stock && product.stock <= 5 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            Low Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-black font-sora mb-1">{product.name}</h3>
        
        {product.category && (
          <p className="text-xs text-orange-600 font-semibold mb-2 uppercase">{product.category}</p>
        )}

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-orange-600 font-sora">${product.price.toFixed(2)}</span>
          {product.stock !== undefined && (
            <span className="text-xs text-gray-500">Stock: {product.stock}</span>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded font-bold text-black transition-colors"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 h-8 text-center border-2 border-black rounded font-bold"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded font-bold text-black transition-colors"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded font-bold font-sora flex items-center justify-center gap-2 transition-colors ${
            isAdded
              ? 'bg-green-600 text-white'
              : product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          <ShoppingCart size={18} />
          {isAdded ? 'Added!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
