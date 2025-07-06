/*
  # Create user_favorites table

  1. New Table
    - user_favorites: Store user's favorite tools
      - id (uuid, primary key)
      - user_id (uuid, foreign key to user_profiles)
      - tool_id (uuid, foreign key to tools)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Users can only manage their own favorites
    - Unique constraint on user_id + tool_id
*/

CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tool_id)
);

-- Enable RLS
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage own favorites"
  ON user_favorites
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites (user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_tool_id ON user_favorites (tool_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_created_at ON user_favorites (created_at DESC);