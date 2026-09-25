"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";

const products = [
  {
    name: "Royal Banarasi Silk",
    type: "Banarasi",
    price: "₹24,500",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Midnight Kanjeevaram",
    type: "Kanjeevaram",
    price: "₹32,000",
    img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b19?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Lavender Organza",
    type: "Organza",
    price: "₹18,900",
    img: "https://images.unsplash.com/photo-1584282862083-d021c1762145?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Heritage Chanderi",
    type: "Chanderi",
    price: "₹14,500",
    img: "https://images.unsplash.com/photo-1615887023516-9b6bbb798246?auto=format&fit=crop&q=80&w=800",
  },
];

export default function SignatureSarees() {
  return (
    <section className="py-24 bg-luxury-purple-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12 border-b border-luxury-gold/20 pb-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-5xl text-luxury-ivory mb-2"
            >
              Our Signature Sarees
            </motion.h2>
            <p className="text-luxury-gold tracking-widest uppercase text-sm">Timeless Elegance</p>
          </div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block text-luxury-ivory uppercase tracking-wider text-sm font-medium hover:text-luxury-gold transition-colors"
          >
            View All
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product, idx) => (
            <motion.div 
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[2/3] overflow-hidden mb-6 bg-[#0D0612]">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-luxury-ivory hover:text-luxury-gold hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                  <Heart className="w-5 h-5" />
                </button>

                {/* Add to Cart Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full py-3 bg-luxury-gold/90 hover:bg-luxury-gold text-luxury-purple-900 font-medium tracking-wider uppercase text-sm flex items-center justify-center space-x-2 transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-luxury-ivory/60 text-xs tracking-widest uppercase mb-2">{product.type}</p>
                <h3 className="font-serif text-lg text-luxury-ivory mb-2 group-hover:text-luxury-gold transition-colors">{product.name}</h3>
                <p className="text-luxury-gold font-light">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
