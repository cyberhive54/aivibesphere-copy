/*
  # Create deals table

  1. New Table
    - deals: Store deals and offers
      - id (uuid, primary key)
      - tool_id (uuid, nullable foreign key to tools)
      - title (text, not null)
      - description (text, not null)
      - discount_code (text, nullable)
      - deal_url (text, not null)
      - start_date (timestamp, not null)
      - end_date (timestamp, not null)
      - is_active (boolean, default true)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS
    - Public read access for active deals
    - Admin write access
*/

CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  discount_code text,
  deal_url text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view active deals"
  ON deals
  FOR SELECT
  TO public
  USING (is_active = true AND start_date <= now() AND end_date >= now());

CREATE POLICY "Admins can manage deals"
  ON deals
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_deals_active ON deals (is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_deals_dates ON deals (start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_deals_tool_id ON deals (tool_id);