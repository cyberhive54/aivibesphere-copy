/*
  # Create category_features table

  1. New Table
    - category_features: Store category-specific features
      - id (uuid, primary key)
      - category_slug (text, not null)
      - feature_name (text, not null)
      - feature_slug (text, unique, not null)
      - description (text, nullable)
      - input_type (enum: boolean, text, number, select)
      - options (text[], nullable)
      - is_filterable (boolean, default true)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS
    - Public read access
    - Admin write access
*/

-- Create input_type enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'feature_input_type') THEN
    CREATE TYPE feature_input_type AS ENUM ('boolean', 'text', 'number', 'select');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS category_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_slug text NOT NULL,
  feature_name text NOT NULL,
  feature_slug text UNIQUE NOT NULL,
  description text,
  input_type feature_input_type DEFAULT 'boolean',
  options text[],
  is_filterable boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE category_features ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view category features"
  ON category_features
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage category features"
  ON category_features
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_category_features_category ON category_features (category_slug);
CREATE INDEX IF NOT EXISTS idx_category_features_filterable ON category_features (is_filterable) WHERE is_filterable = true;