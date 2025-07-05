-- AIVibeSphere Complete Database Schema Migration
-- Module: Authentication, Tools Management, Ratings, Submissions
-- Version: 1.0 (V1 + V2 combined)

-- 1. Create custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'user');
CREATE TYPE public.tool_category AS ENUM (
    'productivity', 'design', 'writing', 'coding', 'marketing', 
    'sales', 'analytics', 'video', 'audio', 'image', 'chatbot', 
    'automation', 'business', 'education', 'finance', 'research'
);
CREATE TYPE public.submission_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.pricing_type AS ENUM ('free', 'freemium', 'paid', 'one_time');

-- 2. Core user profiles table (PostgREST compatible)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'user'::public.user_role,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tools table (main entity)
CREATE TABLE public.tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category public.tool_category NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    logo_url TEXT,
    referral_url TEXT NOT NULL,
    pricing_type public.pricing_type DEFAULT 'freemium'::public.pricing_type,
    price_info TEXT,
    view_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Ratings and reviews table
CREATE TABLE public.ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, tool_id)
);

-- 5. Tool submissions table
CREATE TABLE public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submitter_name TEXT NOT NULL,
    submitter_email TEXT NOT NULL,
    tool_name TEXT NOT NULL,
    tool_description TEXT NOT NULL,
    tool_category public.tool_category NOT NULL,
    tool_url TEXT NOT NULL,
    referral_url TEXT,
    logo_url TEXT,
    features TEXT[] DEFAULT '{}',
    pricing_info TEXT,
    status public.submission_status DEFAULT 'pending'::public.submission_status,
    admin_notes TEXT,
    reviewed_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tool comparisons table (for user comparison history)
CREATE TABLE public.tool_comparisons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    tool_ids UUID[] NOT NULL,
    comparison_data JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Essential indexes for performance
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_tools_category ON public.tools(category);
CREATE INDEX idx_tools_slug ON public.tools(slug);
CREATE INDEX idx_tools_featured ON public.tools(is_featured) WHERE is_featured = true;
CREATE INDEX idx_tools_active ON public.tools(is_active) WHERE is_active = true;
CREATE INDEX idx_tools_rating ON public.tools(average_rating DESC);
CREATE INDEX idx_tools_views ON public.tools(view_count DESC);
CREATE INDEX idx_tools_created ON public.tools(created_at DESC);
CREATE INDEX idx_ratings_tool_id ON public.ratings(tool_id);
CREATE INDEX idx_ratings_user_id ON public.ratings(user_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);
CREATE INDEX idx_submissions_category ON public.submissions(tool_category);

-- 8. Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_comparisons ENABLE ROW LEVEL SECURITY;

-- 9. Helper functions for RLS policies
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
)
$$;

CREATE OR REPLACE FUNCTION public.owns_rating(rating_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.ratings r
    WHERE r.id = rating_uuid AND r.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_rate_tool(tool_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT auth.uid() IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.ratings r
    WHERE r.tool_id = tool_uuid AND r.user_id = auth.uid()
)
$$;

-- 10. RLS Policies

-- User profiles: users can view all, only edit own, admins can edit all
CREATE POLICY "users_view_all_profiles" ON public.user_profiles
FOR SELECT USING (true);

CREATE POLICY "users_edit_own_profile" ON public.user_profiles
FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "admins_manage_profiles" ON public.user_profiles
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Tools: public read access, admin full access
CREATE POLICY "public_view_active_tools" ON public.tools
FOR SELECT USING (is_active = true);

CREATE POLICY "admins_manage_tools" ON public.tools
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Ratings: public read, authenticated users can create/edit own
CREATE POLICY "public_view_ratings" ON public.ratings
FOR SELECT USING (true);

CREATE POLICY "users_manage_own_ratings" ON public.ratings
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_edit_own_ratings" ON public.ratings
FOR UPDATE TO authenticated USING (public.owns_rating(id)) WITH CHECK (public.owns_rating(id));

CREATE POLICY "users_delete_own_ratings" ON public.ratings
FOR DELETE TO authenticated USING (public.owns_rating(id));

-- Submissions: public can create, admins can manage
CREATE POLICY "public_create_submissions" ON public.submissions
FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "admins_manage_submissions" ON public.submissions
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Tool comparisons: users manage own only
CREATE POLICY "users_manage_own_comparisons" ON public.tool_comparisons
FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 11. Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'user'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 12. Function to update tool rating averages
CREATE OR REPLACE FUNCTION public.update_tool_rating()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
    tool_uuid UUID;
    avg_rating DECIMAL(3,2);
    count_ratings INTEGER;
BEGIN
    -- Get tool_id from NEW or OLD record
    tool_uuid := COALESCE(NEW.tool_id, OLD.tool_id);
    
    -- Calculate new average and count
    SELECT 
        COALESCE(AVG(rating), 0)::DECIMAL(3,2),
        COUNT(*)::INTEGER
    INTO avg_rating, count_ratings
    FROM public.ratings 
    WHERE tool_id = tool_uuid;
    
    -- Update the tool
    UPDATE public.tools 
    SET 
        average_rating = avg_rating,
        rating_count = count_ratings,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = tool_uuid;
    
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Triggers for rating updates
CREATE TRIGGER on_rating_insert
    AFTER INSERT ON public.ratings
    FOR EACH ROW EXECUTE FUNCTION public.update_tool_rating();

CREATE TRIGGER on_rating_update
    AFTER UPDATE ON public.ratings
    FOR EACH ROW EXECUTE FUNCTION public.update_tool_rating();

CREATE TRIGGER on_rating_delete
    AFTER DELETE ON public.ratings
    FOR EACH ROW EXECUTE FUNCTION public.update_tool_rating();

-- 13. Function to increment tool view count
CREATE OR REPLACE FUNCTION public.increment_tool_views(tool_uuid UUID)
RETURNS VOID
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.tools 
    SET 
        view_count = view_count + 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = tool_uuid AND is_active = true;
END;
$$;

-- 14. Sample data for development
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    user_uuid UUID := gen_random_uuid();
    tool1_uuid UUID := gen_random_uuid();
    tool2_uuid UUID := gen_random_uuid();
    tool3_uuid UUID := gen_random_uuid();
    tool4_uuid UUID := gen_random_uuid();
    tool5_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete field structure
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@aivibesphere.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'user@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Demo User"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create sample tools
    INSERT INTO public.tools (id, name, slug, category, description, features, logo_url, referral_url, pricing_type, price_info, is_featured, view_count, average_rating, rating_count) VALUES
        (tool1_uuid, 'ChatGPT', 'chatgpt', 'chatbot', 'Advanced conversational AI that can help with writing, coding, analysis, and more. Built by OpenAI.', 
         '{"Conversational AI", "Code Generation", "Writing Assistance", "Data Analysis", "Multiple Languages"}', 
         'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=128&h=128&fit=crop&crop=center',
         'https://chat.openai.com', 'freemium', 'Free tier available, Plus at $20/month', true, 1250, 4.8, 45),
        
        (tool2_uuid, 'Midjourney', 'midjourney', 'image', 'AI-powered image generation tool that creates stunning artwork from text descriptions.',
         '{"Text-to-Image", "High Quality Art", "Style Variations", "Community Gallery", "Commercial Use"}',
         'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=128&h=128&fit=crop&crop=center',
         'https://midjourney.com', 'paid', 'Starting at $10/month', true, 890, 4.6, 32),
        
        (tool3_uuid, 'GitHub Copilot', 'github-copilot', 'coding', 'AI pair programmer that helps you write code faster with whole-line & function suggestions.',
         '{"Code Completion", "Multiple Languages", "IDE Integration", "Context Aware", "Learning from Comments"}',
         'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=128&h=128&fit=crop&crop=center',
         'https://github.com/features/copilot', 'paid', '$10/month for individuals', true, 2100, 4.7, 67),
        
        (tool4_uuid, 'Canva AI', 'canva-ai', 'design', 'Design platform with AI-powered features for creating presentations, social media graphics, and more.',
         '{"Design Templates", "AI Background Remover", "Text to Image", "Brand Kit", "Collaboration Tools"}',
         'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=128&h=128&fit=crop&crop=center',
         'https://canva.com', 'freemium', 'Free tier, Pro at $15/month', false, 756, 4.3, 28),
        
        (tool5_uuid, 'Grammarly', 'grammarly', 'writing', 'AI writing assistant that helps improve your writing with grammar, spelling, and style suggestions.',
         '{"Grammar Check", "Spelling Correction", "Style Suggestions", "Plagiarism Detection", "Tone Adjustment"}',
         'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=128&h=128&fit=crop&crop=center',
         'https://grammarly.com', 'freemium', 'Free tier, Premium at $12/month', false, 1450, 4.5, 89);

    -- Create sample ratings
    INSERT INTO public.ratings (user_id, tool_id, rating, comment) VALUES
        (user_uuid, tool1_uuid, 5, 'Absolutely incredible! ChatGPT has transformed how I work and learn.'),
        (user_uuid, tool2_uuid, 4, 'Amazing image quality, though can be expensive for heavy use.'),
        (user_uuid, tool3_uuid, 5, 'Game changer for developers. Saves hours of coding time.'),
        (user_uuid, tool4_uuid, 4, 'Great for quick designs, AI features are helpful but could be more advanced.'),
        (user_uuid, tool5_uuid, 4, 'Excellent for catching grammar mistakes. The tone suggestions are very useful.');

    -- Create sample submissions
    INSERT INTO public.submissions (submitter_name, submitter_email, tool_name, tool_description, tool_category, tool_url, referral_url, status) VALUES
        ('Jane Developer', 'jane@example.com', 'CodeAssist Pro', 'Advanced AI coding assistant with multi-language support', 'coding', 'https://codeassist.pro', 'https://codeassist.pro/?ref=aivibesphere', 'pending'),
        ('Design Studio', 'hello@designstudio.com', 'DesignAI Master', 'Professional design tool with AI-powered layout suggestions', 'design', 'https://designai.com', 'https://designai.com/?utm_source=aivibesphere', 'pending');

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error during data insertion: %', SQLERRM;
END $$;

-- 15. Cleanup function for development
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs first
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@aivibesphere.com' OR email LIKE '%@example.com';

    -- Delete in dependency order (children first, then auth.users last)
    DELETE FROM public.tool_comparisons WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.ratings WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.submissions WHERE reviewed_by = ANY(auth_user_ids_to_delete);
    DELETE FROM public.tools WHERE created_by = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);

    -- Delete auth.users last (after all references are removed)
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;