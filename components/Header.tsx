'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { useState } from 'react';
import Cart from './Cart';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = useCart((state) => state.getItemCount());

  return (
    <>
      <header className="bg-black text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center font-bold text-xl">
              GF
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-sora">Gabi Fox Games</h1>
              <p className="text-xs text-orange-500 font-sora">Game Store</p>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors font-sora font-semibold"
          >
            <ShoppingCart size={24} />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Cart Modal */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
