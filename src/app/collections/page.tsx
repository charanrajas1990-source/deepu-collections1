"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, ChevronDown, X } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  price: number;
  original_price?: number;
  thumbnail: string;
  images: string[];
  stock: number;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_featured: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

function CollectionsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const filterParam = searchParams.get("filter") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, filterParam]);

  async function fetchCategories() {
    const supabase = createClient();
    const { data } = await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("is_active", true)
      .order("display_order");
    if (data) setCategories(data);
  }

  async function fetchProducts() {
    setLoading(true);
    const supabase = createClient();
    let query = supabase
      .from("products")
      .select("id, name, slug, category, type, price, original_price, thumbnail, images, stock, is_new_arrival, is_best_seller, is_featured")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (selectedCategory) {
      query = query.eq("category", selectedCategory);
    }
    if (filterParam === "new-arrivals") {
      query = query.eq("is_new_arrival", true);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  const pageTitle = selectedCategory
    ? selectedCategory
    : filterParam === "new-arrivals"
    ? "New Arrivals"
    : "All Collections";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-luxury-purple-900 pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl text-luxury-ivory mb-4">{pageTitle}</h1>
            <p className="text-luxury-ivory/70 font-light max-w-2xl mx-auto">
              {selectedCategory
                ? `Explore our exquisite range of ${selectedCategory.toLowerCase()}.`
                : "Explore our complete range of exquisite handwoven sarees, each telling a unique story of Indian craftsmanship."}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar / Filters (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0 space-y-10">
              <div>
                <h3 className="text-luxury-gold tracking-widest uppercase text-sm mb-6 flex items-center justify-between">
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </h3>
                <ul className="space-y-4 text-luxury-ivory/80 font-light">
                  <li
                    onClick={() => setSelectedCategory("")}
                    className={`cursor-pointer transition-colors ${!selectedCategory ? "text-luxury-gold font-medium" : "hover:text-luxury-gold"}`}
                  >
                    All Sarees
                  </li>
                  {categories.map((cat) => (
                    <li
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`cursor-pointer transition-colors ${selectedCategory === cat.name ? "text-luxury-gold font-medium" : "hover:text-luxury-gold"}`}
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex justify-between items-center border-y border-luxury-gold/20 py-4 mb-0">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 text-luxury-ivory uppercase tracking-widest text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory("")}
                  className="flex items-center space-x-1 text-luxury-gold text-sm"
                >
                  <span>{selectedCategory}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Mobile Filter Panel */}
            {isFilterOpen && (
              <div className="lg:hidden bg-luxury-purple-800 p-6 rounded-lg -mt-6">
                <h3 className="text-luxury-gold tracking-widest uppercase text-sm mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setSelectedCategory(""); setIsFilterOpen(false); }}
                    className={`px-4 py-2 text-sm rounded-full border transition-colors ${!selectedCategory ? "border-luxury-gold bg-luxury-gold/20 text-luxury-gold" : "border-luxury-gold/30 text-luxury-ivory/70 hover:border-luxury-gold"}`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.name); setIsFilterOpen(false); }}
                      className={`px-4 py-2 text-sm rounded-full border transition-colors ${selectedCategory === cat.name ? "border-luxury-gold bg-luxury-gold/20 text-luxury-gold" : "border-luxury-gold/30 text-luxury-ivory/70 hover:border-luxury-gold"}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[2/3] bg-luxury-purple-800 rounded mb-4" />
                      <div className="h-3 bg-luxury-purple-800 rounded w-1/3 mx-auto mb-2" />
                      <div className="h-4 bg-luxury-purple-800 rounded w-2/3 mx-auto mb-2" />
                      <div className="h-3 bg-luxury-purple-800 rounded w-1/4 mx-auto" />
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-24">
                  <div className="text-6xl mb-6">🪡</div>
                  <h3 className="font-serif text-2xl text-luxury-ivory mb-3">No products found</h3>
                  <p className="text-luxury-ivory/60 font-light mb-8">
                    {selectedCategory
                      ? `We haven't added ${selectedCategory.toLowerCase()} yet. Check back soon!`
                      : "Products will appear here once added via the admin panel."}
                  </p>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="px-8 py-3 border border-luxury-gold text-luxury-gold font-semibold uppercase tracking-wider text-sm transition-all hover:bg-luxury-gold hover:text-luxury-purple-900"
                    >
                      View All Collections
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
                  {products.map((product, idx) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <Link href={`/product/${product.slug}`}>
                        <div className="relative aspect-[2/3] overflow-hidden mb-4 md:mb-6 bg-[#0D0612]">
                          {product.thumbnail ? (
                            <Image
                              src={product.thumbnail}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                              unoptimized
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-luxury-purple-800 to-[#0D0612]">
                              <span className="text-4xl">🪡</span>
                            </div>
                          )}
                          
                          {product.is_new_arrival && (
                            <span className="absolute top-3 left-3 bg-luxury-gold text-luxury-purple-900 text-[10px] md:text-xs px-2 py-0.5 md:px-3 md:py-1 font-semibold uppercase tracking-wider">
                              New
                            </span>
                          )}
                          {product.stock === 0 && (
                            <span className="absolute top-3 right-3 bg-red-900 text-luxury-ivory text-[10px] md:text-xs px-2 py-0.5 md:px-3 md:py-1 font-semibold uppercase tracking-wider">
                              Sold Out
                            </span>
                          )}

                          {/* WhatsApp Enquiry Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <span className="w-full py-2 md:py-2.5 bg-luxury-gold/90 hover:bg-luxury-gold text-luxury-purple-900 font-medium tracking-wider uppercase text-[10px] md:text-sm flex items-center justify-center space-x-2 transition-colors">
                              <span>View Details</span>
                            </span>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-luxury-ivory/60 text-[10px] md:text-xs tracking-widest uppercase mb-1 md:mb-2">{product.category || product.type}</p>
                          <h3 className="font-serif text-sm md:text-lg text-luxury-ivory mb-1 md:mb-2 group-hover:text-luxury-gold transition-colors line-clamp-1">{product.name}</h3>
                          <div className="flex items-center justify-center gap-2">
                            <p className="text-luxury-gold font-light text-sm md:text-base">{formatPrice(product.price)}</p>
                            {product.original_price && product.original_price > product.price && (
                              <p className="text-luxury-ivory/40 line-through text-xs md:text-sm font-light">{formatPrice(product.original_price)}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function Collections() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-luxury-purple-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full" />
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  );
}

