"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Ruler, Truck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductBySlug, formatPrice } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { notFound } from "next/navigation";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) {
    notFound();
  }

  const isWished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0612] pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs text-luxury-ivory/50 uppercase tracking-widest mb-10">
            <span className="hover:text-luxury-gold cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-luxury-gold cursor-pointer transition-colors">{product.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-luxury-gold">{product.type}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Image Gallery */}
            <div className="space-y-6">
              {/* Desktop view: Main image */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden md:block relative aspect-[3/4] w-full overflow-hidden bg-luxury-purple-900 group cursor-zoom-in"
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Mobile view: Swipeable gallery */}
              <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4 pb-4 -mx-6 px-6">
                {product.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-[3/4] w-[85vw] flex-shrink-0 snap-center overflow-hidden bg-luxury-purple-900">
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
              
              {/* Desktop view: Thumbnails */}
              <div className="hidden md:grid grid-cols-3 gap-4">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-[3/4] cursor-pointer overflow-hidden ${
                      activeImage === idx ? 'border-2 border-luxury-gold' : 'border border-transparent opacity-60 hover:opacity-100'
                    } transition-all`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col relative"
            >
              <h1 className="font-serif text-3xl md:text-5xl text-luxury-ivory mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-8">
                <p className="text-2xl text-luxury-gold font-light">{formatPrice(product.price)}</p>
                {product.originalPrice && (
                  <p className="text-lg text-luxury-ivory/40 line-through font-light">{formatPrice(product.originalPrice)}</p>
                )}
              </div>
              
              {product.stock <= 2 && product.stock > 0 && (
                <div className="absolute top-0 right-0 bg-luxury-gold/10 text-luxury-gold px-3 py-1 text-xs tracking-widest uppercase border border-luxury-gold/30">
                  Only {product.stock} left
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute top-0 right-0 bg-red-900/30 text-red-400 px-3 py-1 text-xs tracking-widest uppercase border border-red-900/50">
                  Sold Out
                </div>
              )}

              <div className="w-full h-[1px] bg-luxury-gold/20 mb-8" />
              
              <p className="text-luxury-ivory/80 font-light leading-relaxed mb-8 text-lg">
                {product.description}
              </p>

              <div className="space-y-4 mb-10">
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-luxury-ivory/50 uppercase tracking-widest">Fabric</span>
                  <span className="col-span-2 text-luxury-ivory/90">{product.fabric}</span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-luxury-ivory/50 uppercase tracking-widest">Color</span>
                  <span className="col-span-2 text-luxury-ivory/90">{product.color}</span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-luxury-ivory/50 uppercase tracking-widest">Occasion</span>
                  <span className="col-span-2 text-luxury-ivory/90">{product.occasion}</span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-luxury-ivory/50 uppercase tracking-widest">SKU</span>
                  <span className="col-span-2 text-luxury-ivory/90">{product.sku}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center border border-luxury-gold/40 text-luxury-ivory h-14 shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 h-full hover:bg-luxury-gold/10 transition-colors"
                  >-</button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 h-full hover:bg-luxury-gold/10 transition-colors"
                  >+</button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 min-w-[200px] h-14 font-semibold uppercase tracking-wider text-sm transition-all flex items-center justify-center space-x-2 ${
                    product.stock === 0 
                      ? 'bg-luxury-ivory/10 text-luxury-ivory/40 cursor-not-allowed' 
                      : 'bg-luxury-gold text-luxury-purple-900 hover:bg-white hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>
                
                <button 
                  onClick={() => toggleItem(product)}
                  className={`w-14 h-14 border flex items-center justify-center transition-colors shrink-0 ${
                    isWished 
                      ? 'border-luxury-gold bg-luxury-gold text-luxury-purple-900' 
                      : 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-purple-900'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWished ? 'fill-luxury-purple-900' : ''}`} />
                </button>
              </div>

              {/* Extras */}
              <div className="w-full h-[1px] bg-luxury-gold/20 mb-8" />
              <div className="grid grid-cols-2 gap-4 text-sm text-luxury-ivory/70">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-luxury-gold" />
                  <span>Free shipping within India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Ruler className="w-5 h-5 text-luxury-gold" />
                  <span>Complimentary edge-finishing</span>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
