"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0D0612]">
      {/* Background Image with subtle Parallax / Slow Zoom effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.03, opacity: 1 }}
        transition={{ 
          opacity: { duration: 1.5, ease: "easeOut" },
          scale: { duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }
        }}
      >
        <Image 
          src="/hero-saree.jpg"
          alt="Premium luxury saree"
          fill
          priority
          className="object-cover object-[75%_top] md:object-right"
          sizes="100vw"
        />
      </motion.div>
      
      {/* Gradients: 
          Mobile: Strong vertical gradient from bottom to allow text to sit at the bottom.
          Desktop: Horizontal gradient on the left side to allow text to sit on the left.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0612] via-[#0D0612]/80 to-transparent md:hidden" />
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0D0612]/95 via-[#0D0612]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0612] via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-6 md:px-16 lg:px-24 pt-[env(safe-area-inset-top)] pb-32 md:pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="font-serif text-luxury-ivory mb-6 tracking-wide drop-shadow-lg leading-tight text-[clamp(2.5rem,8vw,4.5rem)]"
          >
            Elegance Woven <br className="hidden md:block" /> Into Every Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            className="text-[clamp(1rem,3vw,1.25rem)] text-luxury-ivory/90 mb-10 tracking-wide font-light max-w-xl"
          >
            Discover timeless sarees crafted for moments that deserve to be remembered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.1 }}
            className="flex flex-wrap gap-3 md:gap-0 md:flex-row md:space-x-6"
          >
            <button className="px-5 py-[10px] text-[13px] rounded-[8px] md:px-8 md:py-3 md:text-sm md:rounded-none bg-luxury-gold text-luxury-purple-900 font-semibold uppercase tracking-wider transition-all hover:bg-white hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              Explore Collection
            </button>
            <button className="px-5 py-[10px] text-[13px] rounded-[8px] md:px-8 md:py-3 md:text-sm md:rounded-none border border-luxury-gold text-luxury-gold font-semibold uppercase tracking-wider transition-all hover:bg-luxury-gold hover:text-luxury-purple-900">
              Shop Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-luxury-ivory/60 text-xs tracking-[0.2em] uppercase mb-2">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-luxury-gold/50"
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
