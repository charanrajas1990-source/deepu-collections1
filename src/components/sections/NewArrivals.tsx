"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { getNewArrivals, formatPrice } from "@/lib/data";
import Link from "next/link";

export default function NewArrivals() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const newArrivalsData = getNewArrivals();

  return (
    <section className="py-24 bg-luxury-purple-900 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
        <div>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-ivory mb-2">New Arrivals</h2>
          <p className="text-luxury-gold tracking-widest uppercase text-sm">Latest Additions to our Collection</p>
        </div>
      </div>

      <div className="pl-6 md:pl-12 flex space-x-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
        {newArrivalsData.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex-none w-[80vw] sm:w-[280px] md:w-[350px] snap-center group"
          >
            <Link href={`/product/${item.slug}`} className="block">
              <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-[#0D0612]">
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 80vw, 350px"
                />
                <div className="absolute inset-0 bg-luxury-purple-900/0 group-hover:bg-luxury-purple-900/20 transition-colors duration-300" />
                {item.stock <= 2 && item.stock > 0 && (
                  <span className="absolute top-4 right-4 bg-[#0D0612] text-luxury-gold text-xs px-3 py-1 font-semibold uppercase tracking-wider">
                    Only {item.stock} left
                  </span>
                )}
                {item.stock === 0 && (
                  <span className="absolute top-4 right-4 bg-red-900 text-luxury-ivory text-xs px-3 py-1 font-semibold uppercase tracking-wider">
                    Sold Out
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-lg text-luxury-ivory group-hover:text-luxury-gold transition-colors">{item.name}</h3>
                  <p className="text-luxury-gold font-light">{formatPrice(item.price)}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-ivory group-hover:bg-luxury-gold group-hover:text-luxury-purple-900 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
