'use client';

import { useCart } from '@/lib/cart-store';
import { X, Trash2, Plus, Minus } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const total = useCart((state) => state.getTotal());

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-sora">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-orange-600 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-lg font-sora">Your cart is empty</p>
              <p className="text-sm">Add some games to get started!</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b-2 border-gray-200 pb-4"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded border-2 border-black"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-black font-sora">{item.name}</h3>
                  <p className="text-orange-600 font-semibold">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="text-sm text-gray-600 mt-2">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t-2 border-black p-4 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-2xl font-bold font-sora">
              <span>Total:</span>
              <span className="text-orange-600">${total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded transition-colors font-sora">
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded transition-colors font-sora"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
