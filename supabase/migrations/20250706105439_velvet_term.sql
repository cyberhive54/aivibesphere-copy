/*
  # Create feature_requests table

  1. New Table
    - feature_requests: Store user feature requests
      - id (uuid, primary key)
      - user_id (uuid, nullable foreign key to user_profiles)
      - title (text, not null)
      - description (text, not null)
      - status (enum: pending, under_review, planned, completed, rejected)
      - upvotes (integer, default 0)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS
    - Public read access
    - Authenticated users can create
    - Admins can update/delete
*/

-- Create status enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'feature_request_status') THEN
    CREATE TYPE feature_request_status AS ENUM ('pending', 'under_review', 'planned', 'completed', 'rejected');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS feature_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  status feature_request_status DEFAULT 'pending',
  upvotes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view feature requests"
  ON feature_requests
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create feature requests"
  ON feature_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can manage feature requests"
  ON feature_requests
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_feature_requests_status ON feature_requests (status);
CREATE INDEX IF NOT EXISTS idx_feature_requests_upvotes ON feature_requests (upvotes DESC);
CREATE INDEX IF NOT EXISTS idx_feature_requests_created_at ON feature_requests (created_at DESC);