-- First, let's add sample students if none exist
INSERT INTO public.students (student_id, first_name, last_name, date_of_birth) 
VALUES 
  ('STU001', 'Rahul', 'Sharma', '2006-05-20'),
  ('STU002', 'Priya', 'Gupta', '2008-08-15'),
  ('STU003', 'Amit', 'Kumar', '2009-12-10')
ON CONFLICT (student_id) DO NOTHING;

-- Get the UUIDs for the students we just created
WITH student_mapping AS (
  SELECT id, student_id, first_name, last_name FROM students 
  WHERE student_id IN ('STU001', 'STU002', 'STU003')
)
-- Insert transfer certificate data using actual student UUIDs
INSERT INTO public.transfer_certificates (
  tc_number, admission_no, sr_no, roll_number, class, session,
  student_name, father_name, mother_name, nationality, caste,
  first_admission_date, dob, dob_words, last_class_studied,
  board_exam, failed_before, subjects, promotion_status,
  total_working_days, total_present_days, ncc_scout_guide,
  games_activities, general_conduct, application_date,
  issue_date, reason_for_leaving, other_remarks,
  class_teacher_sign, principal_sign, school_seal, status,
  student_id
) 
SELECT 
  'TC001', '255/2016-17', '139', 2098, 'XII Science', '2024-25',
  'Rahul Sharma', 'Suresh Sharma', 'Sunita Sharma', 'Indian', 'General',
  '2011-04-15', '2006-05-20', 'Twenty May Two Thousand Six', 'XII Science',
  'CBSE Annual Examination', false, 'English, Hindi, Math, Physics, Chemistry', 'Promoted to Grade XII',
  220, 205, false,
  'Football, Basketball', 'Good', '2024-03-01',
  '2024-03-15', 'Relocation of family', 'N/A',
  'Class Teacher Signature', 'Principal Signature', 'School Seal', 'Verified',
  sm.id
FROM student_mapping sm WHERE sm.student_id = 'STU001'

UNION ALL

SELECT 
  'TC002', '256/2017-18', '140', 2099, 'X', '2024-25',
  'Priya Gupta', 'Rajesh Gupta', 'Anita Gupta', 'Indian', 'OBC',
  '2012-06-10', '2008-08-15', 'Fifteen August Two Thousand Eight', 'X',
  'CBSE Annual Examination', false, 'English, Hindi, Math, Social Science', 'Promoted to Grade XI',
  220, 218, true,
  'Volleyball, Chess', 'Excellent', '2024-02-25',
  '2024-03-10', 'Transfer to another school', 'N/A',
  'Class Teacher Signature', 'Principal Signature', 'School Seal', 'Verified',
  sm.id
FROM student_mapping sm WHERE sm.student_id = 'STU002'

UNION ALL

SELECT 
  'TC003', '257/2018-19', '141', 2100, 'VIII', '2024-25',
  'Amit Kumar', 'Rakesh Kumar', 'Pooja Kumar', 'Indian', 'General',
  '2013-07-20', '2009-12-10', 'Ten December Two Thousand Nine', 'VIII',
  'CBSE Annual Examination', false, 'English, Hindi, Math, Science, Social Science', 'Promoted to Grade IX',
  210, 195, false,
  'Cricket, Table Tennis', 'Good', '2024-04-01',
  '2024-04-15', 'Family relocation', 'N/A',
  'Class Teacher Signature', 'Principal Signature', 'School Seal', 'Verified',
  sm.id
FROM student_mapping sm WHERE sm.student_id = 'STU003';

-- Enable RLS on transfer_certificates table
ALTER TABLE public.transfer_certificates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view transfer certificates (for verification)
CREATE POLICY "Anyone can view transfer certificates for verification" 
ON public.transfer_certificates 
FOR SELECT 
USING (true);

-- Create policy for admins to manage transfer certificates
CREATE POLICY "Admins can manage transfer certificates" 
FOR ALL 
ON public.transfer_certificates 
USING (is_admin());