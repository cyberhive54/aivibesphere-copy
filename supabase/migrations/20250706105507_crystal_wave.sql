/*
  # Create RPC functions for enhanced functionality

  1. Functions Added
    - increment_tool_views: Safely increment tool view count
    - is_admin: Check if current user is admin
    - get_trending_tools: Get trending tools based on recent activity

  2. Security
    - Proper permission checks
    - Safe increment operations
*/

-- Function to safely increment tool views
CREATE OR REPLACE FUNCTION increment_tool_views(tool_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE tools 
  SET view_count = COALESCE(view_count, 0) + 1,
      updated_at = now()
  WHERE id = tool_uuid AND is_active = true;
END;
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Function to get trending tools
CREATE OR REPLACE FUNCTION get_trending_tools(limit_count integer DEFAULT 10)
RETURNS TABLE (
  id uuid,
  name text,
  slug text,
  category tool_category,
  description text,
  logo_url text,
  average_rating numeric,
  view_count integer,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.name,
    t.slug,
    t.category,
    t.description,
    t.logo_url,
    t.average_rating,
    t.view_count,
    t.created_at
  FROM tools t
  WHERE t.is_active = true
    AND t.created_at >= now() - interval '30 days'
  ORDER BY 
    (t.view_count * 0.4 + COALESCE(t.rating_count, 0) * 0.6) DESC,
    t.created_at DESC
  LIMIT limit_count;
END;
$$;

-- Function to check if user owns a rating
CREATE OR REPLACE FUNCTION owns_rating(rating_uuid uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM ratings 
    WHERE id = rating_uuid AND user_id = auth.uid()
  );
END;
$$;

-- Function to get user ID
CREATE OR REPLACE FUNCTION uid()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT auth.uid();
$$;