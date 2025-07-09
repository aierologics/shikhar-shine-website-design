-- Add notice_number column to notices table
ALTER TABLE public.notices
ADD COLUMN notice_number INTEGER;

-- Optionally, you can add a unique constraint if notice_number should be unique per year or overall
-- ALTER TABLE public.notices
-- ADD CONSTRAINT unique_notice_number UNIQUE (notice_number);
