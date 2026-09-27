"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function EditorialLookbook() {
  return (
    <section className="py-24 bg-[#0D0612]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl text-luxury-gold mb-4"
          >
            The Art of Draping
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-luxury-ivory/70 max-w-2xl mx-auto font-light"
          >
            An editorial journey through our most exquisite pieces, styled for the modern aesthete.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
          {/* Large Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-span-1 md:col-span-8 md:row-span-2 relative group overflow-hidden"
          >
            <Image
              src="https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Editorial luxury saree draping — Deepu's Collection lookbook"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          </motion.div>

          {/* Top Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-1 md:col-span-4 md:row-span-1 relative group overflow-hidden"
          >
            <Image
              src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Banarasi silk saree editorial — Deepu's Collection"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </motion.div>

          {/* Bottom Right — Text Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="col-span-1 md:col-span-4 md:row-span-1 relative group overflow-hidden bg-luxury-purple-800 flex items-center justify-center p-6 md:p-8 text-center"
          >
            <div>
              <p className="text-luxury-gold tracking-[0.2em] uppercase text-xs mb-3">SS 2024</p>
              <h3 className="font-serif text-xl md:text-2xl text-luxury-ivory mb-4">The Regal <br/> Collection</h3>
              <button className="text-xs uppercase tracking-widest border-b border-luxury-gold pb-1 hover:text-luxury-gold transition-colors">
                View Lookbook
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
