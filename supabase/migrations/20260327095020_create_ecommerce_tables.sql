/*
  # E-Commerce Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `parent_id` (uuid, nullable, self-reference)
      - `created_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `price` (numeric)
      - `sale_price` (numeric, nullable)
      - `category_id` (uuid, foreign key)
      - `image_url` (text)
      - `is_featured` (boolean)
      - `created_at` (timestamptz)
    
    - `product_variants`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `color` (text)
      - `size` (text)
      - `stock` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add public read policies for products and categories
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  parent_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price numeric NOT NULL,
  sale_price numeric,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  color text NOT NULL,
  size text NOT NULL,
  stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view product variants"
  ON product_variants FOR SELECT
  TO anon, authenticated
  USING (true);