"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

const products = [
  {
    name: "Royal Banarasi Silk",
    type: "Banarasi",
    price: "₹24,500",
    img: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Midnight Kanjeevaram",
    type: "Kanjeevaram",
    price: "₹32,000",
    img: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Lavender Organza",
    type: "Organza",
    price: "₹18,900",
    img: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Heritage Chanderi",
    type: "Chanderi",
    price: "₹14,500",
    img: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function SignatureSarees() {
  return (
    <section className="py-16 md:py-24 bg-luxury-purple-900">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 md:mb-12 border-b border-luxury-gold/20 pb-6 gap-3">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-serif text-2xl md:text-5xl text-luxury-ivory mb-2"
            >
              Our Signature Sarees
            </motion.h2>
            <p className="text-luxury-gold tracking-widest uppercase text-xs md:text-sm">Timeless Elegance</p>
          </div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="self-start sm:self-auto text-luxury-ivory uppercase tracking-wider text-sm font-medium hover:text-luxury-gold transition-colors"
          >
            View All
          </motion.button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
          {products.map((product, idx) => (
            <motion.div 
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[2/3] overflow-hidden mb-6 bg-[#0D0612]">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-luxury-ivory hover:text-luxury-gold hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                  <Heart className="w-5 h-5" />
                </button>

                {/* WhatsApp Enquiry Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <a
                    href={`https://wa.me/919182319328?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name} (${product.price}). Please share availability and more details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#25D366] hover:bg-[#20BA5C] text-white font-medium tracking-wider uppercase text-xs flex items-center justify-center space-x-2 transition-colors rounded-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="text-center">
                <p className="text-luxury-ivory/60 text-xs tracking-widest uppercase mb-2">{product.type}</p>
                <h3 className="font-serif text-lg text-luxury-ivory mb-2 group-hover:text-luxury-gold transition-colors">{product.name}</h3>
                <p className="text-luxury-gold font-light">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
