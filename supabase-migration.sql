-- ============================================
-- Deepu's Collection — Supabase Schema
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  type TEXT,
  collection TEXT,
  occasion TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  gst_rate NUMERIC(4,2) DEFAULT 5.00,
  hsn_code TEXT DEFAULT '5007',
  fabric TEXT,
  color TEXT,
  zari_type TEXT,
  origin TEXT,
  weave_type TEXT,
  border_details TEXT,
  blouse_piece BOOLEAN DEFAULT FALSE,
  weight_grams INTEGER,
  saree_length_meters NUMERIC(4,2) DEFAULT 5.50,
  care_instructions TEXT,
  images TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  stock INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  rating NUMERIC(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_pincode TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(10,2) DEFAULT 0,
  shipping_charge NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_method TEXT DEFAULT 'COD',
  payment_status TEXT DEFAULT 'pending',
  order_status TEXT DEFAULT 'placed',
  awb_number TEXT,
  courier_name TEXT,
  notes TEXT,
  whatsapp_enquiry BOOLEAN DEFAULT FALSE,
  placed_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INSERT DEFAULT CATEGORIES
INSERT INTO categories (name, slug, display_order) VALUES
  ('Georgette Sarees', 'georgette-sarees', 1),
  ('Pattu Sarees', 'pattu-sarees', 2),
  ('Fancy Sarees', 'fancy-sarees', 3),
  ('Chinon Sarees', 'chinon-sarees', 4),
  ('Chiffon Sarees', 'chiffon-sarees', 5),
  ('Matka Crepe Sarees', 'matka-crepe-sarees', 6),
  ('Digital Sarees', 'digital-sarees', 7),
  ('Tussore Sarees', 'tussore-sarees', 8),
  ('Instagram Trending Sarees', 'instagram-trending-sarees', 9)
ON CONFLICT (slug) DO NOTHING;

-- ENABLE RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read for products and categories (storefront)
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (is_active = TRUE);

-- Allow authenticated (admin) full access
CREATE POLICY "Admin full access products" ON products FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin full access categories" ON categories FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin full access orders" ON orders FOR ALL TO authenticated USING (TRUE);

-- Create Storage Bucket for product images (run manually in Supabase Dashboard)
-- Dashboard > Storage > New Bucket > Name: "product-images" > Public: YES
