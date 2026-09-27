"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#0D0612]">
      {/* Background Image — simple fade-in only (no heavy scale animation) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image 
          src="/hero-saree.jpg"
          alt="Deepu's Collection — Premium luxury sarees from Andhra Pradesh"
          fill
          priority
          className="object-cover object-[75%_center] md:object-right"
          sizes="100vw"
        />
      </motion.div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0612]/95 via-[#0D0612]/60 to-[#0D0612]/20 md:hidden" />
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0D0612]/95 via-[#0D0612]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0612] via-transparent to-transparent opacity-60" />

      {/* Content — centered on all screens */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 md:pt-0">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-luxury-gold tracking-[0.3em] uppercase text-xs font-semibold mb-4"
          >
            Deepu&apos;s Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="font-serif text-luxury-ivory mb-5 tracking-wide drop-shadow-lg leading-tight text-[clamp(2rem,7vw,4.5rem)]"
          >
            Elegance Woven<br />Into Every Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            className="text-[clamp(0.9rem,2.5vw,1.2rem)] text-luxury-ivory/90 mb-8 tracking-wide font-light max-w-lg"
          >
            Handpicked sarees from Andhra Pradesh — crafted for moments that deserve to be remembered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.1 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/collections"
              className="px-6 py-3 text-sm rounded-md md:rounded-none bg-luxury-gold text-luxury-purple-900 font-semibold uppercase tracking-wider transition-all hover:bg-white hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              Explore Collection
            </Link>
            <a
              href={`https://wa.me/919182319328?text=${encodeURIComponent("Hi, I'd like to browse your saree collection. Please share your latest designs!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm rounded-md md:rounded-none border border-luxury-gold text-luxury-gold font-semibold uppercase tracking-wider transition-all hover:bg-luxury-gold hover:text-luxury-purple-900"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-luxury-ivory/60 text-xs tracking-[0.2em] uppercase mb-2">Scroll</span>
        <motion.div
          className="w-[1px] h-10 bg-luxury-gold/50"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
