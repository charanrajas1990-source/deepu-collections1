"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Ruler, Truck, ChevronRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase";
import { formatPrice, Product } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { notFound } from "next/navigation";

const WHATSAPP_NUMBER = "919182319328";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    async function fetchProduct() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", params.slug)
        .eq("is_active", true)
        .single();

      if (error || !data) {
        setProduct(null);
      } else {
        setProduct(data as Product);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#0D0612] pt-32 pb-24 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    notFound();
  }

  const isWished = isInWishlist(product.id);
  const productImages = product.images && product.images.length > 0
    ? product.images
    : product.thumbnail
    ? [product.thumbnail]
    : [];

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (${formatPrice(product.price)}). Please share availability and more details.`
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0612] pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs text-luxury-ivory/50 uppercase tracking-widest mb-10">
            <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/collections" className="hover:text-luxury-gold transition-colors">Collections</Link>
            {product.category && (
              <>
                <ChevronRight className="w-3 h-3" />
                <Link href={`/collections?category=${encodeURIComponent(product.category)}`} className="hover:text-luxury-gold transition-colors">
                  {product.category}
                </Link>
              </>
            )}
            <ChevronRight className="w-3 h-3" />
            <span className="text-luxury-gold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Image Gallery */}
            <div className="space-y-6">
              {productImages.length > 0 ? (
                <>
                  {/* Desktop view: Main image */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden md:block relative aspect-[3/4] w-full overflow-hidden bg-luxury-purple-900 group cursor-zoom-in"
                  >
                    <Image
                      src={productImages[activeImage]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      unoptimized
                    />
                  </motion.div>

                  {/* Mobile view: Swipeable gallery */}
                  <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4 pb-4 -mx-6 px-6">
                    {productImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-[3/4] w-[85vw] flex-shrink-0 snap-center overflow-hidden bg-luxury-purple-900">
                        <Image
                          src={img}
                          alt={`${product.name} view ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={idx === 0}
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Desktop view: Thumbnails */}
                  {productImages.length > 1 && (
                    <div className="hidden md:grid grid-cols-3 gap-4">
                      {productImages.map((img, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          className={`relative aspect-[3/4] cursor-pointer overflow-hidden ${
                            activeImage === idx ? 'border-2 border-luxury-gold' : 'border border-transparent opacity-60 hover:opacity-100'
                          } transition-all`}
                        >
                          <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" unoptimized />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[3/4] bg-gradient-to-br from-luxury-purple-800 to-[#0D0612] flex items-center justify-center rounded-lg">
                  <span className="text-6xl">ðŸª¡</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col relative"
            >
              <h1 className="font-serif text-3xl md:text-5xl text-luxury-ivory mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-8">
                <p className="text-2xl text-luxury-gold font-light">{formatPrice(product.price)}</p>
                {product.original_price && product.original_price > product.price && (
                  <p className="text-lg text-luxury-ivory/40 line-through font-light">{formatPrice(product.original_price)}</p>
                )}
              </div>
              
              {product.stock <= 2 && product.stock > 0 && (
                <div className="absolute top-0 right-0 bg-luxury-gold/10 text-luxury-gold px-3 py-1 text-xs tracking-widest uppercase border border-luxury-gold/30">
                  Only {product.stock} left
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute top-0 right-0 bg-red-900/30 text-red-400 px-3 py-1 text-xs tracking-widest uppercase border border-red-900/50">
                  Sold Out
                </div>
              )}

              <div className="w-full h-[1px] bg-luxury-gold/20 mb-8" />
              
              {product.description && (
                <p className="text-luxury-ivory/80 font-light leading-relaxed mb-8 text-lg">
                  {product.description}
                </p>
              )}

              <div className="space-y-4 mb-10">
                {product.fabric && (
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-luxury-ivory/50 uppercase tracking-widest">Fabric</span>
                    <span className="col-span-2 text-luxury-ivory/90">{product.fabric}</span>
                  </div>
                )}
                {product.color && (
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-luxury-ivory/50 uppercase tracking-widest">Color</span>
                    <span className="col-span-2 text-luxury-ivory/90">{product.color}</span>
                  </div>
                )}
                {product.occasion && (
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-luxury-ivory/50 uppercase tracking-widest">Occasion</span>
                    <span className="col-span-2 text-luxury-ivory/90">{product.occasion}</span>
                  </div>
                )}
                {product.zari_type && (
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-luxury-ivory/50 uppercase tracking-widest">Zari</span>
                    <span className="col-span-2 text-luxury-ivory/90">{product.zari_type}</span>
                  </div>
                )}
                {product.blouse_piece && (
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-luxury-ivory/50 uppercase tracking-widest">Blouse</span>
                    <span className="col-span-2 text-luxury-ivory/90">{product.blouse_piece}</span>
                  </div>
                )}
                {product.weight_grams && (
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-luxury-ivory/50 uppercase tracking-widest">Weight</span>
                    <span className="col-span-2 text-luxury-ivory/90">{product.weight_grams}g</span>
                  </div>
                )}
                {product.care_instructions && (
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-luxury-ivory/50 uppercase tracking-widest">Care</span>
                    <span className="col-span-2 text-luxury-ivory/90">{product.care_instructions}</span>
                  </div>
                )}
                {product.sku && (
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-luxury-ivory/50 uppercase tracking-widest">SKU</span>
                    <span className="col-span-2 text-luxury-ivory/90">{product.sku}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center border border-luxury-gold/40 text-luxury-ivory h-14 shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 h-full hover:bg-luxury-gold/10 transition-colors"
                  >-</button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                    className="px-4 h-full hover:bg-luxury-gold/10 transition-colors"
                  >+</button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 min-w-[200px] h-14 font-semibold uppercase tracking-wider text-sm transition-all flex items-center justify-center space-x-2 ${
                    product.stock === 0 
                      ? 'bg-luxury-ivory/10 text-luxury-ivory/40 cursor-not-allowed' 
                      : 'bg-luxury-gold text-luxury-purple-900 hover:bg-white hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>
                
                <button 
                  onClick={() => toggleItem(product)}
                  className={`w-14 h-14 border flex items-center justify-center transition-colors shrink-0 ${
                    isWished 
                      ? 'border-luxury-gold bg-luxury-gold text-luxury-purple-900' 
                      : 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-purple-900'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWished ? 'fill-luxury-purple-900' : ''}`} />
                </button>
              </div>

              {/* WhatsApp Enquiry */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5C] text-white font-medium tracking-wider uppercase text-sm flex items-center justify-center space-x-2 transition-colors rounded-sm mb-8"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Enquire on WhatsApp</span>
              </a>

              {/* Extras */}
              <div className="w-full h-[1px] bg-luxury-gold/20 mb-8" />
              <div className="grid grid-cols-2 gap-4 text-sm text-luxury-ivory/70">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-luxury-gold" />
                  <span>Free shipping within India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Ruler className="w-5 h-5 text-luxury-gold" />
                  <span>Complimentary edge-finishing</span>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

