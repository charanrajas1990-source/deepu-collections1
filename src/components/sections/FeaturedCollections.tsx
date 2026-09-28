"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const collections = [
  {
    name: "Georgette Sarees",
    desc: "Lightweight, flowing fabric with a beautiful drape for any occasion.",
    gradient: "from-rose-900/80 via-purple-900/60 to-purple-950",
  },
  {
    name: "Pattu Sarees",
    desc: "Rich silk weaves with gold zari, perfect for weddings and festivities.",
    gradient: "from-amber-900/70 via-yellow-900/50 to-purple-950",
  },
  {
    name: "Fancy Sarees",
    desc: "Contemporary designs with embellishments for a glamorous look.",
    gradient: "from-fuchsia-900/70 via-pink-900/50 to-purple-950",
  },
  {
    name: "Chinon Sarees",
    desc: "Soft, elegant chinon fabric with a luxurious matte finish.",
    gradient: "from-teal-900/70 via-emerald-900/40 to-purple-950",
  },
  {
    name: "Chiffon Sarees",
    desc: "Sheer, airy chiffon for a graceful and feminine silhouette.",
    gradient: "from-sky-900/70 via-blue-900/40 to-purple-950",
  },
  {
    name: "Matka Crepe",
    desc: "Textured crepe with a natural matte finish, ideal for casual elegance.",
    gradient: "from-orange-900/70 via-amber-900/40 to-purple-950",
  },
  {
    name: "Digital Sarees",
    desc: "Vibrant digital prints with bold, artistic patterns.",
    gradient: "from-violet-900/70 via-indigo-900/50 to-purple-950",
  },
  {
    name: "Tussore Sarees",
    desc: "Natural raw silk with earthy textures and understated elegance.",
    gradient: "from-yellow-800/60 via-stone-800/40 to-purple-950",
  },
  {
    name: "Instagram Trending",
    desc: "Viral styles from Instagram — be the first to wear the latest trends.",
    gradient: "from-pink-800/70 via-rose-900/50 to-purple-950",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24 bg-[#0D0612]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl md:text-5xl text-luxury-gold mb-3 md:mb-4"
          >
            Our Collections
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-luxury-ivory/70 max-w-2xl text-sm md:text-lg font-light px-4"
          >
            From everyday elegance to bridal grandeur — explore our full range of sarees.
          </motion.p>
        </div>

        {/* Horizontal scrollable on mobile, grid on desktop */}
        <div className="flex gap-3 md:gap-6 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-3 lg:grid-cols-9 scrollbar-hide snap-x snap-mandatory">
          {collections.map((col, idx) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              className="flex-shrink-0 w-[30vw] md:w-auto snap-start"
            >
              <Link
                href={`/collections?category=${encodeURIComponent(col.name)}`}
                className="group relative overflow-hidden rounded-t-full rounded-b-md block aspect-[2/3] cursor-pointer bg-luxury-purple-900"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-t ${col.gradient} transition-all duration-700 group-hover:scale-110`} />
                
                {/* Decorative gold pattern */}
                <div className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500">
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-16 h-16 md:w-12 md:h-12 lg:w-10 lg:h-10 border border-[#D4AF37] rotate-45" />
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-10 h-10 md:w-8 md:h-8 lg:w-6 lg:h-6 border border-[#D4AF37] rotate-45" />
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <div className="absolute inset-0 p-2 flex flex-col justify-end">
                  <h3 className="font-serif text-[10px] sm:text-xs md:text-[11px] lg:text-[10px] xl:text-xs text-luxury-gold leading-tight mb-0.5">{col.name}</h3>
                  <div className="flex items-center gap-0.5 text-luxury-ivory/80 text-[8px] font-medium uppercase tracking-wider group-hover:text-luxury-gold transition-colors">
                    <span className="hidden sm:inline">Explore</span>
                    <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-luxury-gold group-hover:w-full transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
