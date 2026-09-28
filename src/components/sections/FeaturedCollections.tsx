"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    name: "Georgette Sarees",
    desc: "Lightweight, flowing fabric with a beautiful drape for any occasion.",
    img: "/categories/georgette.jpg",
  },
  {
    name: "Pattu Sarees",
    desc: "Rich silk weaves with gold zari, perfect for weddings and festivities.",
    img: "/categories/pattu.jpg",
  },
  {
    name: "Fancy Sarees",
    desc: "Contemporary designs with embellishments for a glamorous look.",
    img: "/categories/fancy.jpg",
  },
  {
    name: "Chinon Sarees",
    desc: "Soft, elegant chinon fabric with a luxurious matte finish.",
    img: "/categories/chinon.jpg",
  },
  {
    name: "Chiffon Sarees",
    desc: "Sheer, airy chiffon for a graceful and feminine silhouette.",
    img: "/categories/chiffon.jpg",
  },
  {
    name: "Matka Crepe",
    desc: "Textured crepe with a natural matte finish, ideal for casual elegance.",
    img: "/categories/matka-crepe.jpg",
  },
  {
    name: "Digital Sarees",
    desc: "Vibrant digital prints with bold, artistic patterns.",
    img: "/categories/digital.jpg",
  },
  {
    name: "Tussore Sarees",
    desc: "Natural raw silk with earthy textures and understated elegance.",
    img: "/categories/tussore.jpg",
  },
  {
    name: "Instagram Trending",
    desc: "Viral styles from Instagram — be the first to wear the latest trends.",
    img: "/categories/instagram-trending.jpg",
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
                className="group relative overflow-hidden rounded-t-full rounded-b-md block aspect-[2/3] cursor-pointer bg-luxury-purple-900 border border-luxury-gold/20 hover:border-luxury-gold/60 transition-colors shadow-lg"
              >
                {/* Saree Category Image */}
                <Image
                  src={col.img}
                  alt={`${col.name} — Deepu's Collection`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 30vw, 11vw"
                />

                {/* Dark Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0612]/95 via-[#0D0612]/40 to-transparent group-hover:via-[#0D0612]/20 transition-colors duration-500" />
                
                <div className="absolute inset-0 p-2 md:p-3 flex flex-col justify-end">
                  <h3 className="font-serif text-[11px] sm:text-xs md:text-xs lg:text-[11px] xl:text-xs text-luxury-gold leading-tight mb-1 drop-shadow-md">
                    {col.name}
                  </h3>
                  <div className="flex items-center gap-1 text-luxury-ivory text-[9px] font-medium uppercase tracking-wider group-hover:text-luxury-gold transition-colors">
                    <span className="hidden sm:inline">Explore</span>
                    <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform text-luxury-gold" />
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

