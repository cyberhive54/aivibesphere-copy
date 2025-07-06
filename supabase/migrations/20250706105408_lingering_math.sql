/*
  # Update tool_category enum with new categories

  1. New Categories Added
    - content_creation: For content creation tools
    - data_analysis: For data analysis and visualization tools
    - image_generation: For AI image generation tools
    - text_generation: For AI text generation tools
    - voice_audio: For voice and audio processing tools
    - video_creation: For video creation and editing tools
    - development: For development and coding tools
    - customer_service: For customer service automation
    - healthcare: For healthcare and medical AI tools
    - e_commerce: For e-commerce and retail tools
    - social_media: For social media management tools
    - fashion: For fashion and style AI tools
    - wordpress: For WordPress-specific tools
    - translation: For language translation tools
    - religion: For religious and spiritual tools
    - astrology: For astrology and divination tools
    - students: For student-focused educational tools
    - gift_ideas: For gift recommendation tools
    - travel: For travel planning and booking tools
    - ai_detection: For AI content detection tools
    - fun_tools: For entertainment and fun tools
    - game_creation: For game development tools
    - 3d_generator: For 3D modeling and generation
    - gaming_ai: For gaming AI assistants
    - interior_designer_ai: For interior design AI
    - others: For miscellaneous tools

  2. Security
    - Maintain existing RLS policies
    - Ensure backward compatibility
*/

-- First, add new enum values to tool_category
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'content_creation';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'data_analysis';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'image_generation';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'text_generation';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'voice_audio';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'video_creation';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'development';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'customer_service';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'healthcare';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'e_commerce';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'social_media';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'fashion';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'wordpress';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'translation';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'religion';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'astrology';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'students';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'gift_ideas';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'travel';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'ai_detection';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'fun_tools';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'game_creation';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS '3d_generator';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'gaming_ai';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'interior_designer_ai';
ALTER TYPE tool_category ADD VALUE IF NOT EXISTS 'others';