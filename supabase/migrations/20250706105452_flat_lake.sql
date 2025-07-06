/*
  # Create advertisements table

  1. New Table
    - advertisements: Store advertisement data
      - id (uuid, primary key)
      - ad_type (enum: sidebar_tool, in_grid_banner, homepage_banner, detail_page_banner)
      - tool_id (uuid, nullable foreign key to tools)
      - image_url (text, not null)
      - target_url (text, not null)
      - title (text, nullable)
      - description (text, nullable)
      - budget (numeric, nullable)
      - start_date (timestamp, not null)
      - end_date (timestamp, not null)
      - is_active (boolean, default true)
      - impressions (integer, default 0)
      - clicks (integer, default 0)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS
    - Public read access for active ads
    - Admin write access
*/

-- Create ad_type enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ad_type') THEN
    CREATE TYPE ad_type AS ENUM ('sidebar_tool', 'in_grid_banner', 'homepage_banner', 'detail_page_banner');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS advertisements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_type ad_type NOT NULL,
  tool_id uuid REFERENCES tools(id) ON DELETE SET NULL,
  image_url text NOT NULL,
  target_url text NOT NULL,
  title text,
  description text,
  budget numeric,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  impressions integer DEFAULT 0,
  clicks integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view active advertisements"
  ON advertisements
  FOR SELECT
  TO public
  USING (is_active = true AND start_date <= now() AND end_date >= now());

CREATE POLICY "Admins can manage advertisements"
  ON advertisements
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_advertisements_active ON advertisements (is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_advertisements_type ON advertisements (ad_type);
CREATE INDEX IF NOT EXISTS idx_advertisements_dates ON advertisements (start_date, end_date);