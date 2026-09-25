"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1615887023516-9b6bbb798246?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1596455607563-ad6193f76b19?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1584282862083-d021c1762145?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1615886737525-45a8947614e5?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1583391733975-69dc67ebdf56?auto=format&fit=crop&q=80&w=600",
];

export default function SocialGrid() {
  return (
    <section className="py-24 bg-[#0D0612]">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-luxury-gold tracking-[0.2em] uppercase text-xs mb-3 flex items-center justify-center space-x-2">
            <Camera className="w-4 h-4" /> <span>@aurasarees</span>
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-ivory mb-6">
            Follow Our Story
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative aspect-square group cursor-pointer overflow-hidden"
            >
              <Image
                src={img}
                alt={`Instagram look ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-luxury-purple-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="text-luxury-gold w-8 h-8 scale-50 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12">
          <button className="px-8 py-3 border border-luxury-gold text-luxury-gold font-semibold uppercase tracking-wider text-sm transition-all hover:bg-luxury-gold hover:text-luxury-purple-900">
            Follow Us
          </button>
        </div>
      </div>
    </section>
  );
}
