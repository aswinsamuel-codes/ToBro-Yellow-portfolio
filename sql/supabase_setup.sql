-- ============================================================================
-- ToBro Database Setup - Complete Schema (Idempotent)
-- Run this in Supabase SQL Editor to set up all tables and configurations
-- ============================================================================

-- ============================================================================
-- 0. EXTENSIONS AND TYPES
-- ============================================================================

-- Required for gen_random_uuid() and digest()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Query status enum for data consistency
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'query_status') THEN
    CREATE TYPE public.query_status AS ENUM ('pending', 'booked', 'completed', 'rejected');
  END IF;
END $$;

-- ============================================================================
-- 1. CREATE TABLES (Safe to run multiple times)
-- ============================================================================

-- Queries Table
CREATE TABLE IF NOT EXISTS public.queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT,
  email TEXT,
  service TEXT,
  budget TEXT,
  message TEXT,
  status public.query_status DEFAULT 'pending',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  role TEXT,
  industry TEXT,
  feedback TEXT NOT NULL,
  impact TEXT,
  rating INTEGER DEFAULT 5,
  theme_color TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Upcoming Projects Table
CREATE TABLE IF NOT EXISTS public.upcoming_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  gradient TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles Table (maps auth users to roles)
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'staff',
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Visitors Table (for tracking IP addresses and analytics)
CREATE TABLE IF NOT EXISTS public.visitors (
  id BIGSERIAL PRIMARY KEY,
  ip_address VARCHAR(45),
  ip_truncated VARCHAR(45),
  ip_hash TEXT,
  user_agent TEXT,
  page_path VARCHAR(255),
  action VARCHAR(50),
  referrer TEXT,
  device TEXT,
  country TEXT,
  city TEXT,
  session_id UUID DEFAULT gen_random_uuid(),
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 1.1 ADD MISSING COLUMNS (Idempotent)
-- ============================================================================

ALTER TABLE public.queries ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.upcoming_projects ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.announcements ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'staff';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;

ALTER TABLE public.visitors ADD COLUMN IF NOT EXISTS ip_truncated VARCHAR(45);
ALTER TABLE public.visitors ADD COLUMN IF NOT EXISTS ip_hash TEXT;
ALTER TABLE public.visitors ADD COLUMN IF NOT EXISTS device TEXT;
ALTER TABLE public.visitors ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.visitors ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.visitors ADD COLUMN IF NOT EXISTS session_id UUID DEFAULT gen_random_uuid();

-- ============================================================================
-- 2. DATA QUALITY CONSTRAINTS (Safe to run multiple times)
-- ============================================================================

-- Rating between 1 and 5
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'testimonials_rating_range') THEN
    ALTER TABLE public.testimonials
    ADD CONSTRAINT testimonials_rating_range CHECK (rating BETWEEN 1 AND 5) NOT VALID;
  END IF;
END $$;

-- Email format check (optional but helpful)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'queries_email_format') THEN
    ALTER TABLE public.queries
    ADD CONSTRAINT queries_email_format CHECK (email IS NULL OR email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$') NOT VALID;
  END IF;
END $$;

-- ============================================================================
-- 3. CREATE INDEXES (Safe to run multiple times)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_queries_status ON public.queries(status);
CREATE INDEX IF NOT EXISTS idx_queries_email ON public.queries(email);
CREATE INDEX IF NOT EXISTS idx_queries_created_at ON public.queries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON public.testimonials(rating);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_upcoming_projects_category ON public.upcoming_projects(category);
CREATE INDEX IF NOT EXISTS idx_upcoming_projects_created_at ON public.upcoming_projects(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

CREATE INDEX IF NOT EXISTS idx_visitors_ip_address ON public.visitors(ip_address);
CREATE INDEX IF NOT EXISTS idx_visitors_ip_hash ON public.visitors(ip_hash);
CREATE INDEX IF NOT EXISTS idx_visitors_visited_at ON public.visitors(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitors_page_path ON public.visitors(page_path);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_queries_message_tsv ON public.queries USING GIN (to_tsvector('english', coalesce(message, '')));
CREATE INDEX IF NOT EXISTS idx_testimonials_feedback_tsv ON public.testimonials USING GIN (to_tsvector('english', coalesce(feedback, '')));

-- ============================================================================
-- 4. AUTO UPDATED_AT TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_queries ON public.queries;
CREATE TRIGGER set_updated_at_queries
BEFORE UPDATE ON public.queries
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_testimonials ON public.testimonials;
CREATE TRIGGER set_updated_at_testimonials
BEFORE UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_upcoming_projects ON public.upcoming_projects;
CREATE TRIGGER set_updated_at_upcoming_projects
BEFORE UPDATE ON public.upcoming_projects
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_announcements ON public.announcements;
CREATE TRIGGER set_updated_at_announcements
BEFORE UPDATE ON public.announcements
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_profiles ON public.profiles;
CREATE TRIGGER set_updated_at_profiles
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 5. VISITOR PRIVACY: HASH/TRUNCATE IP ADDRESS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.set_visitor_ip_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ip_address IS NULL OR NEW.ip_address = '' THEN
    NEW.ip_hash := NULL;
    NEW.ip_truncated := NULL;
    RETURN NEW;
  END IF;

  NEW.ip_hash := encode(digest(NEW.ip_address, 'sha256'), 'hex');

  IF NEW.ip_address LIKE '%.%' THEN
    NEW.ip_truncated := regexp_replace(NEW.ip_address, '\\.\d+$', '.0');
  ELSIF NEW.ip_address LIKE '%:%' THEN
    NEW.ip_truncated := regexp_replace(NEW.ip_address, ':[0-9A-Fa-f]+$', '::');
  ELSE
    NEW.ip_truncated := NEW.ip_address;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_visitor_ip_fields ON public.visitors;
CREATE TRIGGER set_visitor_ip_fields
BEFORE INSERT OR UPDATE ON public.visitors
FOR EACH ROW EXECUTE FUNCTION public.set_visitor_ip_fields();

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) AND POLICIES
-- ============================================================================

-- Enable RLS for all tables
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upcoming_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.user_id = auth.uid()
      AND p.role = 'admin'
  );
$$ LANGUAGE sql STABLE;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "queries_insert" ON public.queries;
DROP POLICY IF EXISTS "queries_select" ON public.queries;
DROP POLICY IF EXISTS "queries_update" ON public.queries;
DROP POLICY IF EXISTS "queries_delete" ON public.queries;

DROP POLICY IF EXISTS "testimonials_insert" ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_select" ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_update" ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_delete" ON public.testimonials;

DROP POLICY IF EXISTS "upcoming_projects_select" ON public.upcoming_projects;
DROP POLICY IF EXISTS "upcoming_projects_insert" ON public.upcoming_projects;
DROP POLICY IF EXISTS "upcoming_projects_update" ON public.upcoming_projects;
DROP POLICY IF EXISTS "upcoming_projects_delete" ON public.upcoming_projects;

DROP POLICY IF EXISTS "announcements_select" ON public.announcements;
DROP POLICY IF EXISTS "announcements_insert" ON public.announcements;
DROP POLICY IF EXISTS "announcements_update" ON public.announcements;
DROP POLICY IF EXISTS "announcements_delete" ON public.announcements;

DROP POLICY IF EXISTS "visitors_insert" ON public.visitors;
DROP POLICY IF EXISTS "visitors_select" ON public.visitors;

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;

-- Policies for queries (public insert, open select/update/delete for admin UI)
CREATE POLICY "queries_insert" ON public.queries
  FOR INSERT WITH CHECK (true);
CREATE POLICY "queries_select" ON public.queries
  FOR SELECT USING (true);
CREATE POLICY "queries_update" ON public.queries
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "queries_delete" ON public.queries
  FOR DELETE USING (public.is_admin());

-- Policies for testimonials (open for admin UI)
CREATE POLICY "testimonials_insert" ON public.testimonials
  FOR INSERT WITH CHECK (true);
CREATE POLICY "testimonials_select" ON public.testimonials
  FOR SELECT USING (true);
CREATE POLICY "testimonials_update" ON public.testimonials
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "testimonials_delete" ON public.testimonials
  FOR DELETE USING (public.is_admin());

-- Policies for upcoming projects (open for admin UI)
CREATE POLICY "upcoming_projects_select" ON public.upcoming_projects
  FOR SELECT USING (true);
CREATE POLICY "upcoming_projects_insert" ON public.upcoming_projects
  FOR INSERT WITH CHECK (true);
CREATE POLICY "upcoming_projects_update" ON public.upcoming_projects
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "upcoming_projects_delete" ON public.upcoming_projects
  FOR DELETE USING (public.is_admin());

-- Policies for announcements (public select, open admin UI)
CREATE POLICY "announcements_select" ON public.announcements
  FOR SELECT USING (true);
CREATE POLICY "announcements_insert" ON public.announcements
  FOR INSERT WITH CHECK (true);
CREATE POLICY "announcements_update" ON public.announcements
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "announcements_delete" ON public.announcements
  FOR DELETE USING (public.is_admin());

-- Policies for visitors (public insert and select for admin UI)
CREATE POLICY "visitors_insert" ON public.visitors
  FOR INSERT WITH CHECK (true);
CREATE POLICY "visitors_select" ON public.visitors
  FOR SELECT USING (public.is_admin());

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "profiles_select_admin" ON public.profiles
  FOR SELECT USING (public.is_admin());
CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- 7. ENABLE REALTIME (for live updates in admin dashboard)
-- ============================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS public.queries;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS public.testimonials;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS public.upcoming_projects;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS public.announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS public.visitors;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS public.profiles;

-- ============================================================================
-- 8. CREATE VIEWS FOR ANALYTICS (Safe to run multiple times)
-- ============================================================================

DROP VIEW IF EXISTS public.visitor_stats;
DROP VIEW IF EXISTS public.queries_stats;

CREATE VIEW public.visitor_stats AS
SELECT
  DATE(visited_at) as visit_date,
  page_path,
  COUNT(*) as total_visits,
  COUNT(DISTINCT ip_hash) as unique_visitors,
  COUNT(DISTINCT user_agent) as unique_browsers
FROM public.visitors
GROUP BY DATE(visited_at), page_path
ORDER BY visit_date DESC, total_visits DESC;

CREATE VIEW public.queries_stats AS
SELECT
  status,
  COUNT(*) as total_queries,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_queries,
  COUNT(CASE WHEN status = 'booked' THEN 1 END) as booked_queries,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_queries
FROM public.queries
GROUP BY status;

-- ============================================================================
-- 9. DATABASE SETUP COMPLETE
-- ============================================================================
-- All tables and configurations have been successfully created!
-- You can now:
-- ✓ Submit queries from the contact form
-- ✓ Add testimonials from the admin dashboard
-- ✓ Create announcements for the banner
-- ✓ Track visitor IPs and analytics
-- ✓ View real-time updates in the admin dashboard
-- ✓ Restrict updates/deletes to admins only
-- ============================================================================

