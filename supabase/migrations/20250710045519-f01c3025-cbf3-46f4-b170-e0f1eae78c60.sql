
-- Add status and admin actions to admissions table
ALTER TABLE public.admissions 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS reviewed_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS admin_notes text;

-- Create RLS policies for admissions
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit admissions (for the public form)
CREATE POLICY "Anyone can submit admissions" 
ON public.admissions 
FOR INSERT 
WITH CHECK (true);

-- Allow admins to view all admissions
CREATE POLICY "Admins can view all admissions" 
ON public.admissions 
FOR SELECT 
USING (is_admin());

-- Allow admins to update admissions (for approval/rejection)
CREATE POLICY "Admins can update admissions" 
ON public.admissions 
FOR UPDATE 
USING (is_admin());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admissions_status ON public.admissions(status);
CREATE INDEX IF NOT EXISTS idx_admissions_created_at ON public.admissions(created_at);

-- Create a view for admission statistics
CREATE OR REPLACE VIEW public.admission_stats AS
SELECT 
  COUNT(*) as total_applications,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_applications,
  COUNT(*) FILTER (WHERE status = 'approved') as approved_applications,
  COUNT(*) FILTER (WHERE status = 'rejected') as rejected_applications,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as applications_this_month
FROM public.admissions;

-- Allow admins to view admission stats
CREATE POLICY "Admins can view admission stats" 
ON public.admission_stats 
FOR SELECT 
USING (is_admin());

-- Create storage bucket for admission documents if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('admissions', 'admissions', false)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for admissions bucket
CREATE POLICY "Admins can view all admission documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'admissions' AND is_admin());

CREATE POLICY "Anyone can upload admission documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'admissions');
