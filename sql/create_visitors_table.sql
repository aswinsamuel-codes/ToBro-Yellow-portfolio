-- Create visitors table for tracking website visitors
-- Run this SQL in your Supabase dashboard (SQL Editor)

CREATE TABLE IF NOT EXISTS public.visitors (
    id BIGSERIAL PRIMARY KEY,
    ip_address VARCHAR(45), -- Supports both IPv4 and IPv6
    user_agent TEXT,
    page_path VARCHAR(255),
    action VARCHAR(50),
    referrer TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_visitors_ip_address ON public.visitors(ip_address);
CREATE INDEX idx_visitors_visited_at ON public.visitors(visited_at DESC);
CREATE INDEX idx_visitors_page_path ON public.visitors(page_path);

-- Set RLS (Row Level Security) policy to allow inserts from anonymous users
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert visitor records
CREATE POLICY "Allow anonymous inserts" ON public.visitors
    FOR INSERT
    WITH CHECK (true);

-- Policy to allow authenticated users to select all data
CREATE POLICY "Allow authenticated select" ON public.visitors
    FOR SELECT
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Optional: Create a view to get visitor statistics
CREATE OR REPLACE VIEW public.visitor_stats AS
SELECT
    DATE(visited_at) as visit_date,
    page_path,
    COUNT(*) as total_visits,
    COUNT(DISTINCT ip_address) as unique_visitors,
    COUNT(DISTINCT user_agent) as unique_browsers
FROM public.visitors
GROUP BY DATE(visited_at), page_path
ORDER BY visit_date DESC, total_visits DESC;
