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
      "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    thumbnail: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 5,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.9,
    reviews: 124,
    sku: "DC-BNR-001"
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
      "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    thumbnail: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 2,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.7,
    reviews: 45,
    sku: "DC-ORG-002"
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
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    thumbnail: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 0,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    rating: 5.0,
    reviews: 89,
    sku: "DC-KNJ-003"
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
      "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    thumbnail: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 12,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.5,
    reviews: 32,
    sku: "DC-GEO-004"
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
      "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    thumbnail: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 3,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    reviews: 18,
    sku: "DC-TIS-005"
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
