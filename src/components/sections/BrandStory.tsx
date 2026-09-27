"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-[#0D0612] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative h-[320px] md:h-[600px] w-full rounded-tr-[50px] rounded-bl-[50px] md:rounded-tr-[100px] md:rounded-bl-[100px] overflow-hidden"
          >
            <Image
              src="https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Handcrafted luxury saree — Deepu's Collection heritage"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-luxury-purple-900/20 mix-blend-multiply" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col justify-center space-y-6 md:space-y-8"
          >
            <div>
              <p className="text-luxury-gold tracking-[0.3em] uppercase text-xs font-semibold mb-3 md:mb-4">
                Our Heritage
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-luxury-ivory leading-tight mb-4 md:mb-6">
                Woven With Tradition.<br/>Designed For You.
              </h2>
            </div>
            
            <div className="space-y-4 md:space-y-6 text-luxury-ivory/80 font-light text-base md:text-lg leading-relaxed">
              <p>
                At Deepu&apos;s Collection, we believe that a saree is more than just six yards of fabric — it is a canvas of art, heritage, and timeless elegance.
              </p>
              <p>
                Our collections are meticulously handcrafted by skilled artisans across India, celebrating centuries-old weaving techniques while embracing contemporary aesthetics.
              </p>
              <p className="hidden md:block">
                Experience the luxury of pure silk, the delicate grace of organza, and the royal opulence of Banarasi, tailored for the modern woman who values tradition and style.
              </p>
            </div>

            <button className="self-start relative group pb-2">
              <span className="text-luxury-gold uppercase tracking-widest text-sm font-semibold">Discover Our Story</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold/40 group-hover:bg-luxury-gold transition-colors"></span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-ivory group-hover:w-full transition-all duration-500"></span>
            </button>
          </motion.div>

        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-luxury-purple-700/10 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none" />
    </section>
  );
}

