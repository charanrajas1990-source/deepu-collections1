"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const collections = [
  {
    name: "Banarasi",
    desc: "Woven with zari, fine silk and opulent embroidery.",
    img: "https://images.unsplash.com/photo-1610189013580-5a3d75ea94f5?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Kanjeevaram",
    desc: "The queen of silks, characterized by gold-dipped silver thread.",
    img: "https://images.unsplash.com/photo-1596455581295-d1fb789ab23a?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Organza",
    desc: "Lightweight, sheer, and perfect for modern silhouettes.",
    img: "https://images.unsplash.com/photo-1615886737525-45a8947614e5?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Chanderi",
    desc: "Traditional ethnic fabric characterized by its sheer texture.",
    img: "https://images.unsplash.com/photo-1583391733975-69dc67ebdf56?auto=format&fit=crop&q=80&w=800",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-24 bg-[#0D0612]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-5xl text-luxury-gold mb-4"
          >
            Curated Collections
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-luxury-ivory/70 max-w-2xl text-lg font-light"
          >
            Explore our handpicked selections, representing the pinnacle of Indian craftsmanship.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((col, idx) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative overflow-hidden rounded-t-full rounded-b-md aspect-[3/4] cursor-pointer bg-luxury-purple-900"
            >
              <Image
                src={col.img}
                alt={col.name}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-luxury-purple-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-serif text-2xl text-luxury-gold mb-2">{col.name}</h3>
                <p className="text-luxury-ivory/80 text-sm font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {col.desc}
                </p>
                
                <div className="flex items-center space-x-2 text-luxury-ivory text-sm font-medium uppercase tracking-wider group-hover:text-luxury-gold transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              
              {/* Subtle gold animated border line at the bottom */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-luxury-gold group-hover:w-full transition-all duration-700 ease-in-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
