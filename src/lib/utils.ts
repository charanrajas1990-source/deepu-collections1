export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  original_price?: number;
  fabric: string;
  color: string;
  occasion: string;
  collection: string;
  type: string;
  images: string[];
  thumbnail: string;
  stock: number;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_active: boolean;
  rating: number;
  reviews: number;
  sku: string;
  zari_type?: string;
  origin?: string;
  weave_type?: string;
  border_details?: string;
  blouse_piece?: string;
  weight_grams?: number;
  saree_length_meters?: number;
  care_instructions?: string;
  gst_rate?: number;
  hsn_code?: string;
  created_at?: string;
  updated_at?: string;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
