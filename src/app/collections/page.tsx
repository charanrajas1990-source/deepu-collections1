"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, ChevronDown, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const products = [
  { id: 1, name: "Royal Banarasi Silk", type: "Banarasi", price: "₹24,500", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Midnight Kanjeevaram", type: "Kanjeevaram", price: "₹32,000", img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b19?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Lavender Organza", type: "Organza", price: "₹18,900", img: "https://images.unsplash.com/photo-1584282862083-d021c1762145?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Heritage Chanderi", type: "Chanderi", price: "₹14,500", img: "https://images.unsplash.com/photo-1615887023516-9b6bbb798246?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Crimson Silk", type: "Silk", price: "₹28,000", img: "https://images.unsplash.com/photo-1596455607563-ad6193f76b19?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Pearl White Organza", type: "Organza", price: "₹21,000", img: "https://images.unsplash.com/photo-1584282862083-d021c1762145?auto=format&fit=crop&q=80&w=800" },
];

export default function Collections() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-luxury-purple-900 pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl text-luxury-ivory mb-4">All Collections</h1>
            <p className="text-luxury-ivory/70 font-light max-w-2xl mx-auto">
              Explore our complete range of exquisite handwoven sarees, each telling a unique story of Indian craftsmanship.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar / Filters (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0 space-y-10">
              <div>
                <h3 className="text-luxury-gold tracking-widest uppercase text-sm mb-6 flex items-center justify-between">
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </h3>
                <ul className="space-y-4 text-luxury-ivory/80 font-light">
                  {["All Sarees", "Banarasi", "Kanjeevaram", "Organza", "Chanderi", "Silk"].map((cat) => (
                    <li key={cat} className="hover:text-luxury-gold cursor-pointer transition-colors">
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-luxury-gold tracking-widest uppercase text-sm mb-6 flex items-center justify-between">
                  <span>Price Range</span>
                  <ChevronDown className="w-4 h-4" />
                </h3>
                <ul className="space-y-4 text-luxury-ivory/80 font-light">
                  {["Under ₹15,000", "₹15,000 - ₹30,000", "₹30,000 - ₹50,000", "Above ₹50,000"].map((price) => (
                    <li key={price} className="hover:text-luxury-gold cursor-pointer transition-colors flex items-center space-x-3">
                      <div className="w-4 h-4 border border-luxury-gold/50 rounded-sm" />
                      <span>{price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex justify-between items-center border-y border-luxury-gold/20 py-4 mb-8">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 text-luxury-ivory uppercase tracking-widest text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <div className="flex items-center space-x-2 text-luxury-ivory uppercase tracking-widest text-sm">
                <span>Sort By</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {products.map((product, idx) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <Link href={`/product/royal-banarasi-silk`}>
                      <div className="relative aspect-[2/3] overflow-hidden mb-6 bg-[#0D0612]">
                        <Image
                          src={product.img}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-luxury-ivory hover:text-luxury-gold hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 z-10"
                                onClick={(e) => e.preventDefault()}
                        >
                          <Heart className="w-5 h-5" />
                        </button>

                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <button 
                            className="w-full py-3 bg-luxury-gold/90 hover:bg-luxury-gold text-luxury-purple-900 font-medium tracking-wider uppercase text-sm flex items-center justify-center space-x-2 transition-colors"
                            onClick={(e) => e.preventDefault()}
                          >
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
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-16 flex justify-center space-x-2">
                <button className="w-10 h-10 border border-luxury-gold text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-purple-900 transition-colors">1</button>
                <button className="w-10 h-10 border border-luxury-gold/30 text-luxury-ivory flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-colors">2</button>
                <button className="w-10 h-10 border border-luxury-gold/30 text-luxury-ivory flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-colors">3</button>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
