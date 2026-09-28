"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#0D0612] border-l border-luxury-gold/20 z-[80] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 pt-[max(1.5rem,env(safe-area-inset-top))] border-b border-luxury-gold/20 flex justify-between items-center">
              <h2 className="font-serif text-2xl text-luxury-gold flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Your Cart</span>
              </h2>
              <button 
                onClick={onClose}
                className="text-luxury-ivory hover:text-luxury-gold transition-colors p-2 -mr-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-luxury-ivory/50">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-50" />
                  <p>Your cart is currently empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex space-x-4">
                    <div className="relative w-24 h-32 bg-luxury-purple-900 flex-shrink-0">
                      <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div>
                        <h3 className="font-serif text-lg text-luxury-ivory leading-tight">{item.product.name}</h3>
                        <p className="text-luxury-gold text-sm mt-1">{formatPrice(item.product.price)}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-luxury-gold/40 text-luxury-ivory text-sm">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-luxury-gold/10"
                          >-</button>
                          <span className="px-3 py-1 border-x border-luxury-gold/40 min-w-[2rem] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-luxury-gold/10"
                          >+</button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="text-luxury-ivory/50 hover:text-red-400 transition-colors p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-luxury-gold/20 bg-luxury-purple-900/50">
                <div className="flex justify-between items-center mb-6 text-luxury-ivory">
                  <span className="text-lg font-light tracking-wide">Subtotal</span>
                  <span className="font-serif text-xl text-luxury-gold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-luxury-ivory/50 text-xs mb-6 font-light">Taxes and shipping calculated at checkout.</p>
                <Link href="/checkout" onClick={onClose} className="w-full py-4 bg-luxury-gold text-luxury-purple-900 font-semibold uppercase tracking-wider text-sm transition-all hover:bg-white hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] flex justify-center items-center text-center">
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
