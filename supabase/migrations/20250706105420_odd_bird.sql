/*
  # Enhance tools table with new features

  1. New Columns Added
    - is_trending (boolean): Mark tools as trending
    - is_just_launched (boolean): Mark newly launched tools
    - social_media_links (jsonb): Store social media URLs
    - faq (jsonb): Store FAQ data
    - use_cases_details (jsonb): Store detailed use cases
    - analytics_data (jsonb): Store analytics information
    - alternatives_data (jsonb): Store alternative tools data

  2. Security
    - Maintain existing RLS policies
    - Add indexes for performance
*/

-- Add new columns to tools table
DO $$
BEGIN
  -- Add is_trending column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tools' AND column_name = 'is_trending'
  ) THEN
    ALTER TABLE tools ADD COLUMN is_trending boolean DEFAULT false;
  END IF;

  -- Add is_just_launched column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tools' AND column_name = 'is_just_launched'
  ) THEN
    ALTER TABLE tools ADD COLUMN is_just_launched boolean DEFAULT false;
  END IF;

  -- Add social_media_links column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tools' AND column_name = 'social_media_links'
  ) THEN
    ALTER TABLE tools ADD COLUMN social_media_links jsonb;
  END IF;

  -- Add faq column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tools' AND column_name = 'faq'
  ) THEN
    ALTER TABLE tools ADD COLUMN faq jsonb;
  END IF;

  -- Add use_cases_details column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tools' AND column_name = 'use_cases_details'
  ) THEN
    ALTER TABLE tools ADD COLUMN use_cases_details jsonb;
  END IF;

  -- Add analytics_data column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tools' AND column_name = 'analytics_data'
  ) THEN
    ALTER TABLE tools ADD COLUMN analytics_data jsonb;
  END IF;

  -- Add alternatives_data column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tools' AND column_name = 'alternatives_data'
  ) THEN
    ALTER TABLE tools ADD COLUMN alternatives_data jsonb;
  END IF;
END $$;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_tools_trending ON tools (is_trending) WHERE is_trending = true;
CREATE INDEX IF NOT EXISTS idx_tools_just_launched ON tools (is_just_launched) WHERE is_just_launched = true;
CREATE INDEX IF NOT EXISTS idx_tools_social_media ON tools USING gin (social_media_links);
CREATE INDEX IF NOT EXISTS idx_tools_analytics ON tools USING gin (analytics_data);