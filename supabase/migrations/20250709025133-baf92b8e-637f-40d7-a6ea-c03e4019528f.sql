
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.user_role AS ENUM ('admin', 'user');
CREATE TYPE public.notice_type AS ENUM ('holiday', 'admission', 'meeting', 'event', 'sports', 'exam', 'general');
CREATE TYPE public.notice_priority AS ENUM ('high', 'medium', 'low');
CREATE TYPE public.document_type AS ENUM ('affiliation', 'recognition', 'safety', 'academic', 'result');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fee_structure table
CREATE TABLE public.fee_structure (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_name TEXT NOT NULL,
  monthly_fee INTEGER NOT NULL,
  admission_fee INTEGER NOT NULL,
  composite_fees INTEGER NOT NULL,
  exam_fees TEXT NOT NULL,
  security_fees TEXT NOT NULL,
  total_fees INTEGER NOT NULL,
  old_fee TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notices table
CREATE TABLE public.notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  notice_type notice_type DEFAULT 'general',
  priority notice_priority DEFAULT 'medium',
  date DATE NOT NULL,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create programs table
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  age_group TEXT,
  features TEXT[], -- Array of features
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mpd_documents table for Mandatory Public Disclosure
CREATE TABLE public.mpd_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_type document_type NOT NULL,
  title TEXT NOT NULL,
  file_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create school_info table for basic school information
CREATE TABLE public.school_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  category TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial fee structure data
INSERT INTO public.fee_structure (class_name, monthly_fee, admission_fee, composite_fees, exam_fees, security_fees, total_fees, old_fee) VALUES
('Play', 700, 1650, 700, '--------', '--------', 3050, '-----'),
('Nurs.', 850, 1700, 1100, '300.00', '1000.00', 4650, '1950'),
('K.G.', 900, 1800, 1100, '150.00/200.00', '1000.00', 4800, '2000'),
('I', 1100, 2000, 1300, '200.00/250.00', '1000.00', 5400, '2400'),
('II', 1200, 2200, 1300, '200.00/250.00', '1000.00', 5700, '2500'),
('III', 1300, 2400, 1400, '200.00/300.00', '1000.00', 6100, '2700'),
('IV', 1400, 2600, 1400, '200.00/300.00', '1000.00', 6400, '2800'),
('V', 1500, 2800, 1400, '200.00/300.00', '1000.00', 6700, '2900'),
('VI', 1550, 3300, 1500, '240/350/350', '1000.00', 7350, '3050'),
('VII', 1650, 3300, 1500, '240/350/350', '1000.00', 7450, '3150'),
('VIII', 1700, 3300, 1500, '240/350/350', '1000.00', 7500, '3200'),
('IX', 1900, 4600, 1800, '280/400/400', '1500.00', 9800, '3700'),
('X', 2020, 6800, 2000, '280/400/400', '1500.00', 12320, '4020'),
('XI Com.', 2500, 7000, 2600, '350/450/450', '1500.00', 13600, '5100'),
('XI Sc.', 2750, 7000, 2600, '350/450/450', '1500.00', 13850, '3250'),
('XII Com.', 2850, 11000, 3000, '350/450/450', '1500.00', 18350, '5850'),
('XII Sc.', 3150, 11000, 3000, '350/450/450', '1500.00', 18650, '6150');

-- Insert initial notices
INSERT INTO public.notices (title, content, notice_type, priority, date) VALUES
('Independence Day Holiday', 'School will remain closed on 15th August for Independence Day celebration.', 'holiday', 'high', '2024-08-15'),
('New Admission Forms Available', 'Admission forms for academic year 2025-26 are now available online and at the school office.', 'admission', 'high', '2024-07-25'),
('Parent-Teacher Meeting', 'Monthly PTM scheduled for all classes on 20th August 2024 from 9:00 AM to 12:00 PM.', 'meeting', 'medium', '2024-08-20');

-- Insert initial gallery images
INSERT INTO public.gallery (title, description, image_url, alt_text) VALUES
('Science Laboratory Session', 'Students exploring chemistry experiments', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&h=400&fit=crop', 'Students in Science Laboratory'),
('Annual Sports Day', 'Celebrating achievements in athletics', 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&h=400&fit=crop', 'Annual Sports Day'),
('Art and Craft Exhibition', 'Showcasing student creativity', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=400&fit=crop', 'Art and Craft Exhibition'),
('Music Concert', 'Students performing musical talents', 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&h=400&fit=crop', 'Music Concert'),
('Library Reading Session', 'Promoting reading culture', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=400&fit=crop', 'Library Reading Session'),
('Graduation Ceremony', 'Celebrating academic achievements', 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&h=400&fit=crop', 'Graduation Ceremony');

-- Insert initial programs
INSERT INTO public.programs (title, description, icon, age_group, features) VALUES
('Pre-Primary Education', 'Foundation learning with play-based approach for young minds', '🎨', '3-5 years', ARRAY['Interactive Learning', 'Creative Arts', 'Basic Literacy', 'Motor Skills Development']),
('Primary Education', 'Comprehensive curriculum focusing on core subjects and personality development', '📚', '6-10 years', ARRAY['NCERT Curriculum', 'Computer Education', 'Sports Activities', 'Moral Values']),
('Secondary Education', 'Advanced learning with specialization options and career guidance', '🎓', '11-16 years', ARRAY['Science & Commerce Streams', 'Practical Labs', 'Career Counseling', 'Board Exam Preparation']),
('Extra-Curricular Activities', 'Holistic development through sports, arts, and cultural programs', '🏆', 'All Ages', ARRAY['Sports Competitions', 'Cultural Events', 'Music & Dance', 'Art & Craft']);

-- Insert school information
INSERT INTO public.school_info (key, value, category) VALUES
('school_name', 'SHIKHAR SHISHU SADAN', 'basic'),
('affiliation_number', '2130272', 'basic'),
('school_code', '81080', 'basic'),
('address', 'SHIKHAR SHISHU SADAN, KSHATRIYA NAGAR,DHAMPUR, BIJNOR, UTTAR PRADESH - 246761', 'basic'),
('principal_name', 'MR. V.K. RANA (M.SC., B.ED, M.PHILL)', 'staff'),
('email', 'shikharschool1964@rediffmail.com', 'contact'),
('phone', '+91 9837774888', 'contact'),
('total_teachers', '60', 'staff'),
('campus_area', '40468.564', 'infrastructure'),
('classrooms', '48 (7.625x6.1)', 'infrastructure');

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_structure ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mpd_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_info ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (public.is_admin());

-- RLS Policies for public read access (fee_structure, notices, gallery, programs, school_info)
CREATE POLICY "Anyone can view fee structure" ON public.fee_structure FOR SELECT USING (true);
CREATE POLICY "Admins can manage fee structure" ON public.fee_structure FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can view notices" ON public.notices FOR SELECT USING (true);
CREATE POLICY "Admins can manage notices" ON public.notices FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON public.gallery FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can view programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Admins can manage programs" ON public.programs FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can view school info" ON public.school_info FOR SELECT USING (true);
CREATE POLICY "Admins can manage school info" ON public.school_info FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can view MPD documents" ON public.mpd_documents FOR SELECT USING (true);
CREATE POLICY "Admins can manage MPD documents" ON public.mpd_documents FOR ALL USING (public.is_admin());

-- Create trigger function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'user'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create an admin user (you'll need to sign up with this email first)
-- This will be updated after the user signs up
INSERT INTO public.profiles (id, email, full_name, role) 
VALUES ('00000000-0000-0000-0000-000000000000', 'admin@shikharschool.com', 'Admin User', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
