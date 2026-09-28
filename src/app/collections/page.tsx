"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Filter, 
  ChevronDown, 
  X, 
  ArrowUpDown, 
  SlidersHorizontal, 
  Images, 
  RotateCcw,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const PRICE_RANGES = [
  { label: "All Prices", value: "" },
  { label: "Under ₹2,000", value: "under-2000" },
  { label: "₹2,000 – ₹5,000", value: "2000-5000" },
  { label: "₹5,000 – ₹10,000", value: "5000-10000" },
  { label: "Above ₹10,000", value: "above-10000" },
];

const SORT_OPTIONS = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

function ProductCard({ product, idx }: { product: Product; idx: number }) {
  const allImages = (product.images && product.images.length > 0)
    ? product.images
    : product.thumbnail 
    ? [product.thumbnail] 
    : [];

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
      className="group"
      onMouseLeave={() => setActiveImgIndex(0)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden mb-4 md:mb-5 bg-[#140B1A] rounded-sm border border-luxury-gold/15 group-hover:border-luxury-gold/40 transition-colors shadow-md">
          {/* Main Product Image */}
          {allImages.length > 0 ? (
            <Image
              src={allImages[activeImgIndex] || allImages[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-luxury-purple-800 to-[#0D0612]">
              <span className="text-4xl">🪡</span>
            </div>
          )}

          {/* Multi-Image Segmented Indicator Bar */}
          {allImages.length > 1 && (
            <>
              {/* Segmented Progress Bar at Top */}
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

              {/* Photo Count Badge */}
              <div className="absolute bottom-2.5 right-2.5 z-10 bg-[#0D0612]/75 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-luxury-ivory/90 flex items-center gap-1 border border-luxury-gold/25 font-medium shadow">
                <Images className="w-3 h-3 text-luxury-gold" />
                <span>{activeImgIndex + 1}/{allImages.length}</span>
              </div>
            </>
          )}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
            {allImages.length <= 1 && product.is_new_arrival && (
              <span className="bg-luxury-gold text-luxury-purple-900 text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-sm shadow">
                New
              </span>
            )}
            {allImages.length > 1 && product.is_new_arrival && (
              <span className="mt-3.5 bg-luxury-gold text-luxury-purple-900 text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider rounded-sm shadow">
                New
              </span>
            )}
            {product.is_best_seller && (
              <span className={`${allImages.length > 1 && !product.is_new_arrival ? 'mt-3.5' : ''} bg-amber-600/90 text-white text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider rounded-sm shadow`}>
                Bestseller
              </span>
            )}
          </div>

          {product.stock === 0 && (
            <span className="absolute top-2.5 right-2.5 bg-red-950/90 border border-red-700/60 text-red-200 text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wider rounded-sm z-10 shadow">
              Sold Out
            </span>
          )}

          {/* Hover View Details Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <span className="w-full py-2 bg-luxury-gold hover:bg-white text-luxury-purple-900 font-medium tracking-wider uppercase text-xs flex items-center justify-center space-x-1 transition-all rounded-sm shadow-md">
              <span>View Details</span>
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="text-center px-1">
          <p className="text-luxury-ivory/50 text-[11px] tracking-widest uppercase mb-1 font-light">
            {product.category || product.type || "Saree"}
          </p>
          <h3 className="font-serif text-sm md:text-base text-luxury-ivory mb-1.5 group-hover:text-luxury-gold transition-colors line-clamp-1 font-medium">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <p className="text-luxury-gold font-light text-base md:text-lg">
              {formatPrice(product.price)}
            </p>
            {product.original_price && product.original_price > product.price && (
              <p className="text-luxury-ivory/40 line-through text-xs md:text-sm font-light">
                {formatPrice(product.original_price)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CollectionsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const filterParam = searchParams.get("filter") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, filterParam, selectedPriceRange, sortBy]);

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
      .eq("is_active", true);

    if (selectedCategory) {
      query = query.eq("category", selectedCategory);
    }
    if (filterParam === "new-arrivals") {
      query = query.eq("is_new_arrival", true);
    }

    // Price Filtering
    if (selectedPriceRange === "under-2000") {
      query = query.lt("price", 2000);
    } else if (selectedPriceRange === "2000-5000") {
      query = query.gte("price", 2000).lte("price", 5000);
    } else if (selectedPriceRange === "5000-10000") {
      query = query.gte("price", 5000).lte("price", 10000);
    } else if (selectedPriceRange === "above-10000") {
      query = query.gt("price", 10000);
    }

    // Sorting
    if (sortBy === "price-asc") {
      query = query.order("price", { ascending: true });
    } else if (sortBy === "price-desc") {
      query = query.order("price", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
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

  const activeFiltersCount = (selectedCategory ? 1 : 0) + (selectedPriceRange ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange("");
    setSortBy("newest");
  };

  const pageTitle = selectedCategory
    ? selectedCategory
    : filterParam === "new-arrivals"
    ? "New Arrivals"
    : "All Collections";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0612] pt-28 md:pt-36 pb-24">
        <div className="container mx-auto px-4 md:px-12">
          
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <span className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-semibold mb-2 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted Sarees</span>
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-luxury-ivory mb-3">{pageTitle}</h1>
            <p className="text-luxury-ivory/70 font-light max-w-2xl mx-auto text-sm md:text-base">
              {selectedCategory
                ? `Explore our exquisite handwoven ${selectedCategory.toLowerCase()} collection.`
                : "Explore our complete curated range of handwoven sarees, each telling a unique story of Indian craftsmanship."}
            </p>
          </div>

          {/* Quick Price Pills Toolbar (Desktop & Mobile) */}
          <div className="mb-8 border-y border-luxury-gold/20 py-3.5 flex flex-wrap items-center justify-between gap-4">
            {/* Left: Price range pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide max-w-full">
              <span className="text-xs uppercase tracking-wider text-luxury-gold font-medium shrink-0 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" /> Price:
              </span>
              {PRICE_RANGES.map((range) => {
                const isActive = selectedPriceRange === range.value;
                return (
                  <button
                    key={range.value}
                    onClick={() => setSelectedPriceRange(range.value)}
                    className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-luxury-gold text-luxury-purple-900 font-semibold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                        : "bg-luxury-purple-900/80 text-luxury-ivory/80 border border-luxury-gold/25 hover:border-luxury-gold/60 hover:text-luxury-gold"
                    }`}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>

            {/* Right: Sort dropdown & Mobile filter button */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-luxury-gold text-luxury-purple-900 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-luxury-gold hidden sm:block" />
                <span className="text-xs uppercase tracking-wider text-luxury-ivory/60 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-luxury-purple-900 border border-luxury-gold/30 text-luxury-ivory text-xs px-3 py-1.5 rounded-md focus:outline-none focus:border-luxury-gold cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-luxury-purple-900 text-luxury-ivory">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8 text-xs">
              <span className="text-luxury-ivory/50">Active Filters:</span>
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-luxury-gold/15 border border-luxury-gold/40 text-luxury-gold rounded-full">
                  <span>Category: {selectedCategory}</span>
                  <button onClick={() => setSelectedCategory("")} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedPriceRange && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-luxury-gold/15 border border-luxury-gold/40 text-luxury-gold rounded-full">
                  <span>Price: {PRICE_RANGES.find(r => r.value === selectedPriceRange)?.label}</span>
                  <button onClick={() => setSelectedPriceRange("")} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-luxury-ivory/60 hover:text-luxury-gold underline flex items-center gap-1 ml-2 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all</span>
              </button>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Sidebar / Filters (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
              {/* Category Filter */}
              <div className="bg-luxury-purple-900/60 border border-luxury-gold/15 rounded-lg p-5">
                <h3 className="text-luxury-gold tracking-widest uppercase text-xs font-semibold mb-4 flex items-center justify-between pb-3 border-b border-luxury-gold/15">
                  <span>Categories</span>
                  <ChevronDown className="w-3.5 h-3.5 text-luxury-gold" />
                </h3>
                <ul className="space-y-2.5 text-luxury-ivory/80 text-sm font-light">
                  <li>
                    <button
                      onClick={() => setSelectedCategory("")}
                      className={`w-full text-left py-1 px-2 rounded transition-colors flex items-center justify-between ${
                        !selectedCategory 
                          ? "bg-luxury-gold/15 text-luxury-gold font-medium border-l-2 border-luxury-gold" 
                          : "hover:text-luxury-gold hover:bg-white/5"
                      }`}
                    >
                      <span>All Sarees</span>
                    </button>
                  </li>
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.name;
                    return (
                      <li key={cat.id}>
                        <button
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`w-full text-left py-1 px-2 rounded transition-colors flex items-center justify-between ${
                            isSelected 
                              ? "bg-luxury-gold/15 text-luxury-gold font-medium border-l-2 border-luxury-gold" 
                              : "hover:text-luxury-gold hover:bg-white/5"
                          }`}
                        >
                          <span>{cat.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Price Filter Sidebar Card */}
              <div className="bg-luxury-purple-900/60 border border-luxury-gold/15 rounded-lg p-5">
                <h3 className="text-luxury-gold tracking-widest uppercase text-xs font-semibold mb-4 flex items-center justify-between pb-3 border-b border-luxury-gold/15">
                  <span>Price Range</span>
                  <ChevronDown className="w-3.5 h-3.5 text-luxury-gold" />
                </h3>
                <ul className="space-y-2 text-sm font-light">
                  {PRICE_RANGES.map((range) => {
                    const isSelected = selectedPriceRange === range.value;
                    return (
                      <li key={range.value}>
                        <label 
                          onClick={() => setSelectedPriceRange(range.value)}
                          className="flex items-center space-x-2.5 cursor-pointer py-1 px-2 rounded hover:bg-white/5 transition-colors text-luxury-ivory/80 hover:text-luxury-gold"
                        >
                          <input
                            type="radio"
                            name="price-filter"
                            checked={isSelected}
                            onChange={() => setSelectedPriceRange(range.value)}
                            className="accent-[#D4AF37] cursor-pointer"
                          />
                          <span className={isSelected ? "text-luxury-gold font-medium" : ""}>
                            {range.label}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Mobile Filter Slide-out Drawer */}
            <AnimatePresence>
              {isMobileFilterOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
                  />
                  <motion.div 
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-luxury-purple-900 border-l border-luxury-gold/20 p-6 z-50 overflow-y-auto lg:hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-4 border-b border-luxury-gold/20 mb-6">
                        <div className="flex items-center gap-2 text-luxury-gold font-serif text-lg">
                          <Filter className="w-4 h-4" />
                          <span>Filters</span>
                        </div>
                        <button 
                          onClick={() => setIsMobileFilterOpen(false)}
                          className="text-luxury-ivory/60 hover:text-luxury-ivory p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Categories in Drawer */}
                      <div className="mb-6">
                        <h4 className="text-xs uppercase tracking-widest text-luxury-gold mb-3 font-semibold">
                          Category
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setSelectedCategory("")}
                            className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                              !selectedCategory 
                                ? "border-luxury-gold bg-luxury-gold text-luxury-purple-900 font-bold" 
                                : "border-luxury-gold/30 text-luxury-ivory/70 hover:border-luxury-gold"
                            }`}
                          >
                            All
                          </button>
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.name)}
                              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                                selectedCategory === cat.name 
                                  ? "border-luxury-gold bg-luxury-gold text-luxury-purple-900 font-bold" 
                                  : "border-luxury-gold/30 text-luxury-ivory/70 hover:border-luxury-gold"
                              }`}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Range in Drawer */}
                      <div className="mb-6">
                        <h4 className="text-xs uppercase tracking-widest text-luxury-gold mb-3 font-semibold">
                          Price Range
                        </h4>
                        <div className="flex flex-col gap-2">
                          {PRICE_RANGES.map((range) => (
                            <button
                              key={range.value}
                              onClick={() => setSelectedPriceRange(range.value)}
                              className={`text-left px-3 py-2 text-xs rounded border transition-colors ${
                                selectedPriceRange === range.value 
                                  ? "border-luxury-gold bg-luxury-gold/20 text-luxury-gold font-semibold" 
                                  : "border-luxury-gold/20 text-luxury-ivory/80"
                              }`}
                            >
                              {range.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-luxury-gold/20 flex gap-3">
                      <button
                        onClick={() => {
                          clearAllFilters();
                          setIsMobileFilterOpen(false);
                        }}
                        className="flex-1 py-2.5 text-xs border border-luxury-gold/40 text-luxury-ivory/80 rounded uppercase tracking-wider"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="flex-1 py-2.5 text-xs bg-luxury-gold text-luxury-purple-900 font-bold rounded uppercase tracking-wider"
                      >
                        Apply
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Product Grid Area */}
            <div className="flex-1">
              {/* Results count & layout status */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs text-luxury-ivory/60 font-light">
                  {loading 
                    ? "Searching inventory..." 
                    : `Showing ${products.length} exquisite ${products.length === 1 ? 'saree' : 'sarees'}`}
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[2/3] bg-luxury-purple-800/60 rounded mb-4" />
                      <div className="h-3 bg-luxury-purple-800/60 rounded w-1/3 mx-auto mb-2" />
                      <div className="h-4 bg-luxury-purple-800/60 rounded w-2/3 mx-auto mb-2" />
                      <div className="h-3 bg-luxury-purple-800/60 rounded w-1/4 mx-auto" />
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 px-4 bg-luxury-purple-900/30 border border-luxury-gold/15 rounded-xl">
                  <div className="text-5xl mb-4">🪡</div>
                  <h3 className="font-serif text-2xl text-luxury-ivory mb-2">No sarees match your filter</h3>
                  <p className="text-luxury-ivory/60 font-light text-sm max-w-md mx-auto mb-6">
                    We couldn&apos;t find any sarees matching your selected criteria. Try resetting your price or category filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 border border-luxury-gold text-luxury-gold font-semibold uppercase tracking-wider text-xs transition-all hover:bg-luxury-gold hover:text-luxury-purple-900 rounded"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12">
                  {products.map((product, idx) => (
                    <ProductCard key={product.id} product={product} idx={idx} />
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


