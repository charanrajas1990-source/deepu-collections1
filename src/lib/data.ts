export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  fabric: string;
  color: string;
  occasion: string;
  collection: string;
  type: string;
  images: string[];
  thumbnail: string;
  stock: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  rating: number;
  reviews: number;
  sku: string;
}

export const products: Product[] = [
  {
    id: "p_001",
    slug: "royal-banarasi-silk",
    name: "Royal Banarasi Silk",
    category: "Sarees",
    description: "A masterpiece of handwoven artistry, this deep crimson Banarasi silk saree is adorned with intricate zari work. Perfect for bridal wear and grand celebrations, it features a heavy pallu and a matching unstitched blouse piece.",
    price: 24500,
    originalPrice: 28000,
    fabric: "Pure Katan Silk",
    color: "Deep Crimson Red",
    occasion: "Wedding",
    collection: "Heritage",
    type: "Banarasi",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1596455581295-d1fb789ab23a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1615886737525-45a8947614e5?auto=format&fit=crop&q=80&w=1200",
    ],
    thumbnail: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=600",
    stock: 5,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.9,
    reviews: 124,
    sku: "AURA-BNR-001"
  },
  {
    id: "p_002",
    slug: "lavender-organza-dream",
    name: "Lavender Organza Dream",
    category: "Sarees",
    description: "Ethereal and lightweight, this lavender organza saree features delicate hand-embroidered floral motifs. Perfect for daytime events and summer festivities.",
    price: 18900,
    fabric: "Organza",
    color: "Lavender",
    occasion: "Party",
    collection: "Modern Classics",
    type: "Organza",
    images: [
      "https://images.unsplash.com/photo-1584282862083-d021c1762145?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1583391733958-d15f11100257?auto=format&fit=crop&q=80&w=1200",
    ],
    thumbnail: "https://images.unsplash.com/photo-1584282862083-d021c1762145?auto=format&fit=crop&q=80&w=600",
    stock: 2,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.7,
    reviews: 45,
    sku: "AURA-ORG-002"
  },
  {
    id: "p_003",
    slug: "midnight-blue-kanjeevaram",
    name: "Midnight Blue Kanjeevaram",
    category: "Sarees",
    description: "A stunning midnight blue Kanjeevaram silk saree with a contrasting temple border in pure gold zari. A timeless addition to your luxury wardrobe.",
    price: 32000,
    originalPrice: 35000,
    fabric: "Kanjeevaram Silk",
    color: "Midnight Blue",
    occasion: "Wedding",
    collection: "Heritage",
    type: "Kanjeevaram",
    images: [
      "https://images.unsplash.com/photo-1589810635656-3c07802b1b36?auto=format&fit=crop&q=80&w=1200",
    ],
    thumbnail: "https://images.unsplash.com/photo-1589810635656-3c07802b1b36?auto=format&fit=crop&q=80&w=600",
    stock: 0,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    rating: 5.0,
    reviews: 89,
    sku: "AURA-KNJ-003"
  },
  {
    id: "p_004",
    slug: "emerald-georgette-sequin",
    name: "Emerald Georgette Sequin",
    category: "Sarees",
    description: "Make a statement with this flowing emerald green georgette saree, adorned with subtle cascading sequins for a glamorous evening look.",
    price: 15500,
    fabric: "Georgette",
    color: "Emerald Green",
    occasion: "Party",
    collection: "Cocktail",
    type: "Georgette",
    images: [
      "https://images.unsplash.com/photo-1610115598687-0b1a0302b1a9?auto=format&fit=crop&q=80&w=1200",
    ],
    thumbnail: "https://images.unsplash.com/photo-1610115598687-0b1a0302b1a9?auto=format&fit=crop&q=80&w=600",
    stock: 12,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.5,
    reviews: 32,
    sku: "AURA-GEO-004"
  },
  {
    id: "p_005",
    slug: "champagne-tissue-silk",
    name: "Champagne Tissue Silk",
    category: "Sarees",
    description: "A delicate champagne-hued tissue silk saree that drapes like a dream, featuring a scalloped border and intricate pearl detailing.",
    price: 21000,
    fabric: "Tissue Silk",
    color: "Champagne Gold",
    occasion: "Festive",
    collection: "Modern Classics",
    type: "Tissue",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200",
    ],
    thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
    stock: 3,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    reviews: 18,
    sku: "AURA-TIS-005"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.isNewArrival);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.type.toLowerCase().includes(q) || 
    p.color.toLowerCase().includes(q) || 
    p.fabric.toLowerCase().includes(q)
  );
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}
