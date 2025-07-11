
-- Add status and admin review fields to admissions table
ALTER TABLE public.admissions 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS reviewed_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS admin_notes text;

-- Update RLS policies for admissions
CREATE POLICY IF NOT EXISTS "Admins can update admissions status" 
ON public.admissions 
FOR UPDATE 
USING (is_admin());

CREATE POLICY IF NOT EXISTS "Admins can view all admissions" 
ON public.admissions 
FOR SELECT 
USING (is_admin());

CREATE POLICY IF NOT EXISTS "Anyone can submit admissions" 
ON public.admissions 
FOR INSERT 
WITH CHECK (true);
