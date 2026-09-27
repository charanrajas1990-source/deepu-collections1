"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const WHATSAPP_NUMBER = "919182319328";

const collections = [
  {
    name: "Georgette Sarees",
    desc: "Lightweight, flowing fabric with a beautiful drape for any occasion.",
    img: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Pattu Sarees",
    desc: "Rich silk weaves with gold zari, perfect for weddings and festivities.",
    img: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Fancy Sarees",
    desc: "Contemporary designs with embellishments for a glamorous look.",
    img: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Chinon Sarees",
    desc: "Soft, elegant chinon fabric with a luxurious matte finish.",
    img: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Chiffon Sarees",
    desc: "Sheer, airy chiffon for a graceful and feminine silhouette.",
    img: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Matka Crepe",
    desc: "Textured crepe with a natural matte finish, ideal for casual elegance.",
    img: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Digital Sarees",
    desc: "Vibrant digital prints with bold, artistic patterns.",
    img: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Tussore Sarees",
    desc: "Natural raw silk with earthy textures and understated elegance.",
    img: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Instagram Trending",
    desc: "Viral styles from Instagram — be the first to wear the latest trends.",
    img: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800",
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
          {collections.map((col, idx) => {
            const enquiryMsg = encodeURIComponent(`Hi, I'm interested in ${col.name}. Please share available designs and pricing.`);
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${enquiryMsg}`;
            return (
              <motion.a
                key={col.name}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                className="group relative overflow-hidden rounded-t-full rounded-b-md flex-shrink-0 w-[30vw] md:w-auto aspect-[2/3] cursor-pointer bg-luxury-purple-900 snap-start"
              >
                <Image
                  src={col.img}
                  alt={`${col.name} — Deepu's Collection`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 30vw, 11vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                <div className="absolute inset-0 p-2 flex flex-col justify-end">
                  <h3 className="font-serif text-[10px] sm:text-xs md:text-[11px] lg:text-[10px] xl:text-xs text-luxury-gold leading-tight mb-0.5">{col.name}</h3>
                  <div className="flex items-center gap-0.5 text-luxury-ivory/80 text-[8px] font-medium uppercase tracking-wider group-hover:text-luxury-gold transition-colors">
                    <span className="hidden sm:inline">Enquire</span>
                    <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-luxury-gold group-hover:w-full transition-all duration-500" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
