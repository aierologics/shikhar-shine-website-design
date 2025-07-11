
-- Teachers Management Tables
CREATE TABLE public.teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id varchar(20) UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone varchar(15) NOT NULL,
  date_of_birth date,
  address text,
  qualification text,
  experience_years integer DEFAULT 0,
  subjects text[], -- Array of subjects they can teach
  joining_date date NOT NULL,
  salary decimal(10,2),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  photo_url text,
  emergency_contact_name text,
  emergency_contact_phone varchar(15),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.teacher_leaves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES public.teachers(id) ON DELETE CASCADE,
  leave_type text NOT NULL CHECK (leave_type IN ('sick', 'casual', 'maternity', 'emergency', 'vacation')),
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by uuid REFERENCES auth.users(id),
  applied_at timestamp with time zone DEFAULT now(),
  approved_at timestamp with time zone
);

-- Class & Section Management
CREATE TABLE public.classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name varchar(10) NOT NULL,
  section varchar(5) NOT NULL,
  class_teacher_id uuid REFERENCES public.teachers(id),
  capacity integer DEFAULT 30,
  room_number varchar(10),
  academic_year varchar(9) NOT NULL, -- e.g., "2024-2025"
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(class_name, section, academic_year)
);

-- Timetable Management
CREATE TABLE public.timetable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES public.classes(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES public.teachers(id) ON DELETE CASCADE,
  subject varchar(50) NOT NULL,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Monday, 7=Sunday
  period_number integer NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  academic_year varchar(9) NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(class_id, day_of_week, period_number, academic_year)
);

-- Student Fee Deposits
CREATE TABLE public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id varchar(20) UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  class_id uuid REFERENCES public.classes(id),
  roll_number varchar(10),
  date_of_birth date,
  parent_phone varchar(15),
  parent_email text,
  address text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated', 'transferred')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.fee_deposits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE,
  fee_type text NOT NULL CHECK (fee_type IN ('tuition', 'admission', 'exam', 'transport', 'hostel', 'miscellaneous')),
  amount decimal(10,2) NOT NULL,
  payment_method text CHECK (payment_method IN ('cash', 'online', 'cheque', 'card')),
  transaction_id varchar(100),
  receipt_number varchar(50) UNIQUE,
  payment_date date NOT NULL,
  academic_year varchar(9) NOT NULL,
  month_year varchar(7), -- e.g., "2024-01" for January 2024
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  notes text,
  collected_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now()
);

-- Hostel Management
CREATE TABLE public.hostels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_name varchar(100) NOT NULL,
  hostel_type text CHECK (hostel_type IN ('boys', 'girls', 'mixed')),
  total_capacity integer NOT NULL,
  current_occupancy integer DEFAULT 0,
  warden_id uuid REFERENCES public.teachers(id),
  address text,
  facilities text[],
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.hostel_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id uuid REFERENCES public.hostels(id) ON DELETE CASCADE,
  room_number varchar(10) NOT NULL,
  room_type text CHECK (room_type IN ('single', 'double', 'triple', 'quad')),
  capacity integer NOT NULL,
  current_occupancy integer DEFAULT 0,
  monthly_fee decimal(8,2),
  status text DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance')),
  UNIQUE(hostel_id, room_number)
);

CREATE TABLE public.hostel_allocations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE,
  room_id uuid REFERENCES public.hostel_rooms(id) ON DELETE CASCADE,
  allocation_date date NOT NULL,
  vacate_date date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'vacated')),
  monthly_fee decimal(8,2) NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Transport Management
CREATE TABLE public.bus_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_name varchar(100) NOT NULL,
  route_number varchar(20) UNIQUE NOT NULL,
  driver_name varchar(100) NOT NULL,
  driver_phone varchar(15) NOT NULL,
  conductor_name varchar(100),
  conductor_phone varchar(15),
  bus_number varchar(20) NOT NULL,
  capacity integer NOT NULL,
  current_occupancy integer DEFAULT 0,
  monthly_fee decimal(8,2) NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.bus_stops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid REFERENCES public.bus_routes(id) ON DELETE CASCADE,
  stop_name varchar(100) NOT NULL,
  pickup_time time NOT NULL,
  drop_time time NOT NULL,
  stop_order integer NOT NULL,
  address text
);

CREATE TABLE public.transport_allocations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE,
  route_id uuid REFERENCES public.bus_routes(id) ON DELETE CASCADE,
  stop_id uuid REFERENCES public.bus_stops(id) ON DELETE CASCADE,
  allocation_date date NOT NULL,
  monthly_fee decimal(8,2) NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamp with time zone DEFAULT now()
);

-- Inventory Management
CREATE TABLE public.inventory_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_name varchar(100) NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.inventory_categories(id) ON DELETE CASCADE,
  item_name varchar(100) NOT NULL,
  item_code varchar(50) UNIQUE,
  description text,
  unit_price decimal(10,2),
  current_stock integer DEFAULT 0,
  minimum_stock integer DEFAULT 0,
  supplier_name varchar(100),
  supplier_contact varchar(15),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.inventory_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES public.inventory_items(id) ON DELETE CASCADE,
  transaction_type text CHECK (transaction_type IN ('purchase', 'issue', 'return', 'damage', 'adjustment')),
  quantity integer NOT NULL,
  unit_price decimal(10,2),
  total_amount decimal(10,2),
  reference_number varchar(50),
  issued_to varchar(100), -- Could be student name, teacher name, etc.
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now()
);

-- Visitor Management
CREATE TABLE public.visitor_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_name varchar(100) NOT NULL,
  visitor_phone varchar(15),
  visitor_email text,
  purpose text NOT NULL,
  person_to_meet varchar(100),
  department varchar(50),
  entry_time timestamp with time zone DEFAULT now(),
  exit_time timestamp with time zone,
  id_proof_type varchar(20),
  id_proof_number varchar(50),
  photo_url text,
  status text DEFAULT 'in' CHECK (status IN ('in', 'out')),
  notes text,
  logged_by uuid REFERENCES auth.users(id)
);

-- Exams & Results
CREATE TABLE public.exam_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_name varchar(100) NOT NULL,
  exam_type text CHECK (exam_type IN ('formative', 'summative', 'term', 'final', 'unit_test')),
  academic_year varchar(9) NOT NULL,
  start_date date,
  end_date date,
  total_marks integer DEFAULT 100,
  passing_marks integer DEFAULT 35,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.exam_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid REFERENCES public.exam_types(id) ON DELETE CASCADE,
  class_id uuid REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_name varchar(100) NOT NULL,
  exam_date date,
  start_time time,
  end_time time,
  total_marks integer DEFAULT 100,
  passing_marks integer DEFAULT 35,
  teacher_id uuid REFERENCES public.teachers(id)
);

CREATE TABLE public.student_marks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_subject_id uuid REFERENCES public.exam_subjects(id) ON DELETE CASCADE,
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE,
  marks_obtained decimal(5,2),
  grade varchar(5),
  remarks text,
  is_absent boolean DEFAULT false,
  entered_by uuid REFERENCES public.teachers(id),
  verified_by uuid REFERENCES public.teachers(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(exam_subject_id, student_id)
);

-- Enable RLS on all tables
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hostel_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hostel_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bus_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bus_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_marks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin access
CREATE POLICY "Admins can manage teachers" ON public.teachers FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage teacher leaves" ON public.teacher_leaves FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage classes" ON public.classes FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage timetable" ON public.timetable FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage students" ON public.students FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage fee deposits" ON public.fee_deposits FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage hostels" ON public.hostels FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage hostel rooms" ON public.hostel_rooms FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage hostel allocations" ON public.hostel_allocations FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage bus routes" ON public.bus_routes FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage bus stops" ON public.bus_stops FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage transport allocations" ON public.transport_allocations FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage inventory categories" ON public.inventory_categories FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage inventory items" ON public.inventory_items FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage inventory transactions" ON public.inventory_transactions FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage visitor logs" ON public.visitor_logs FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage exam types" ON public.exam_types FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage exam subjects" ON public.exam_subjects FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage student marks" ON public.student_marks FOR ALL USING (is_admin());

-- Create indexes for better performance
CREATE INDEX idx_teachers_status ON public.teachers(status);
CREATE INDEX idx_students_class ON public.students(class_id);
CREATE INDEX idx_fee_deposits_student ON public.fee_deposits(student_id);
CREATE INDEX idx_fee_deposits_date ON public.fee_deposits(payment_date);
CREATE INDEX idx_timetable_class ON public.timetable(class_id);
CREATE INDEX idx_marks_student ON public.student_marks(student_id);
CREATE INDEX idx_marks_exam ON public.student_marks(exam_subject_id);

-- Insert sample inventory categories
INSERT INTO public.inventory_categories (category_name, description) VALUES
('Books', 'Textbooks and reference materials'),
('Uniforms', 'School uniforms and accessories'),
('Stationery', 'Pens, pencils, notebooks and other stationery items'),
('Sports Equipment', 'Sports and physical education equipment'),
('Laboratory Equipment', 'Science lab equipment and chemicals'),
('IT Equipment', 'Computers, tablets and IT accessories');
