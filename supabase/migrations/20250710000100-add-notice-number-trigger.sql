-- Create a sequence for notice_number per year
CREATE SEQUENCE IF NOT EXISTS public.notice_number_seq;

-- Create or replace function to set notice_number on insert
CREATE OR REPLACE FUNCTION public.set_notice_number()
RETURNS TRIGGER AS $$
DECLARE
  current_year INTEGER;
  max_notice_number INTEGER;
BEGIN
  current_year := EXTRACT(YEAR FROM NEW.date);

  -- Find max notice_number for the current year
  SELECT MAX(notice_number) INTO max_notice_number
  FROM public.notices
  WHERE EXTRACT(YEAR FROM date) = current_year;

  IF max_notice_number IS NULL THEN
    NEW.notice_number := 1;
  ELSE
    NEW.notice_number := max_notice_number + 1;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before insert
DROP TRIGGER IF EXISTS set_notice_number_trigger ON public.notices;

CREATE TRIGGER set_notice_number_trigger
BEFORE INSERT ON public.notices
FOR EACH ROW
EXECUTE FUNCTION public.set_notice_number();
