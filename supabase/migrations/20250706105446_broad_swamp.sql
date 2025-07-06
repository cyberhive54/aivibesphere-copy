/*
  # Create bug_reports table

  1. New Table
    - bug_reports: Store user bug reports
      - id (uuid, primary key)
      - user_id (uuid, nullable foreign key to user_profiles)
      - title (text, not null)
      - description (text, not null)
      - page_url (text, nullable)
      - screenshot_urls (text[], nullable)
      - status (enum: open, in_progress, resolved, closed)
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
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'bug_report_status') THEN
    CREATE TYPE bug_report_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS bug_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  page_url text,
  screenshot_urls text[],
  status bug_report_status DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view bug reports"
  ON bug_reports
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create bug reports"
  ON bug_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can manage bug reports"
  ON bug_reports
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bug_reports_status ON bug_reports (status);
CREATE INDEX IF NOT EXISTS idx_bug_reports_created_at ON bug_reports (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bug_reports_user_id ON bug_reports (user_id);