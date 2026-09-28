"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";

interface FeaturedProduct {
  id: string;
  name: string;
  slug: string;
  type: string;
  category: string;
  price: number;
  thumbnail: string;
  images?: string[];
}

const WHATSAPP_NUMBER = "919182319328";

function SignatureCard({ product, idx }: { product: FeaturedProduct; idx: number }) {
  const allImages = (product.images && product.images.length > 0)
    ? product.images
    : product.thumbnail 
    ? [product.thumbnail] 
    : [];

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group cursor-pointer"
      onMouseLeave={() => setActiveImgIndex(0)}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[2/3] overflow-hidden mb-4 md:mb-6 bg-[#0D0612] rounded-sm border border-luxury-gold/15 group-hover:border-luxury-gold/40 transition-colors shadow-md">
          {allImages.length > 0 ? (
            <Image
              src={allImages[activeImgIndex] || allImages[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-luxury-purple-800 to-[#0D0612]">
              <span className="text-4xl">🪡</span>
            </div>
          )}

          {/* Multi-Image Segmented Bar */}
          {allImages.length > 1 && (
            <>
              <div className="absolute top-2.5 left-2.5 right-2.5 flex gap-1 z-20">
                {allImages.map((_, i) => (
                  <div
                    key={i}
                    onMouseEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveImgIndex(i);
                    }}
                    className={`h-1 flex-1 rounded-full cursor-pointer transition-all duration-200 ${
                      activeImgIndex === i 
                        ? 'bg-luxury-gold shadow-[0_0_8px_rgba(212,175,55,0.9)]' 
                        : 'bg-black/40 backdrop-blur-sm hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className="absolute bottom-14 right-2.5 z-10 bg-[#0D0612]/75 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-luxury-ivory/90 flex items-center gap-1 border border-luxury-gold/25 font-medium shadow">
                <Images className="w-3 h-3 text-luxury-gold" />
                <span>{activeImgIndex + 1}/{allImages.length}</span>
              </div>
            </>
          )}
          
          {/* WhatsApp Enquiry Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name} (${formatPrice(product.price)}). Please share availability and more details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-2 md:py-2.5 bg-[#25D366] hover:bg-[#20BA5C] text-white font-medium tracking-wider uppercase text-[10px] md:text-xs flex items-center justify-center space-x-2 transition-colors rounded-sm"
            >
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-luxury-ivory/60 text-[10px] md:text-xs tracking-widest uppercase mb-1 md:mb-2">{product.category || product.type}</p>
          <h3 className="font-serif text-sm md:text-lg text-luxury-ivory mb-1 md:mb-2 group-hover:text-luxury-gold transition-colors line-clamp-1">{product.name}</h3>
          <p className="text-luxury-gold font-light text-sm md:text-base">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SignatureSarees() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      const supabase = createClient();
      const { data } = await supabase
        .from("products")
        .select("id, name, slug, type, category, price, thumbnail, images")
        .eq("is_active", true)
        .or("is_featured.eq.true,is_best_seller.eq.true")
        .limit(4);
      if (data) setProducts(data);
    }
    fetchFeatured();
  }, []);

  if (products.length === 0) return null;

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
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/collections"
              className="self-start sm:self-auto text-luxury-ivory uppercase tracking-wider text-sm font-medium hover:text-luxury-gold transition-colors"
            >
              View All
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
          {products.map((product, idx) => (
            <SignatureCard key={product.id} product={product} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}



