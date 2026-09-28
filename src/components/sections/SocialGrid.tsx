"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const categories = [
  { name: "Georgette", gradient: "from-[#2A1437] to-[#160B1E]" },
  { name: "Pattu", gradient: "from-[#3A2222] to-[#1A0A0A]" },
  { name: "Chiffon", gradient: "from-[#1B2A37] to-[#0A111A]" },
  { name: "Chinon", gradient: "from-[#372A14] to-[#1E160B]" },
  { name: "Digital", gradient: "from-[#14372A] to-[#0B1E16]" },
  { name: "Tussore", gradient: "from-[#37142A] to-[#1E0B16]" },
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
            <Camera className="w-4 h-4" /> <span>@deepuscollection</span>
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-ivory mb-6">
            Follow Our Story
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative aspect-square group cursor-pointer overflow-hidden bg-gradient-to-br ${cat.gradient} flex items-center justify-center border border-luxury-gold/10`}
            >
              <div className="absolute inset-2 border border-luxury-gold/5 group-hover:scale-95 transition-transform duration-500" />
              
              <span className="font-serif text-luxury-gold/70 text-lg md:text-xl group-hover:opacity-0 transition-opacity duration-300">
                {cat.name}
              </span>

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
