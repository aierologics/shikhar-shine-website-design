export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admissions: {
        Row: {
          aadhar_card_url: string | null
          aadhar_number: string | null
          address_proof_url: string | null
          admission_class: string
          birth_certificate_url: string | null
          blood_group: string | null
          caste: string | null
          created_at: string | null
          current_address: string
          current_city: string
          current_pincode: string
          current_state: string
          date_of_birth: string
          emergency_contact: string | null
          emergency_phone: string | null
          extracurricular: string | null
          father_email: string | null
          father_income: number | null
          father_name: string
          father_occupation: string | null
          father_phone: string
          father_qualification: string | null
          gender: string
          guardian_email: string | null
          guardian_name: string | null
          guardian_phone: string | null
          guardian_relation: string | null
          id: string
          marksheet_url: string | null
          medical_conditions: string | null
          mother_email: string | null
          mother_income: number | null
          mother_name: string
          mother_occupation: string | null
          mother_phone: string
          mother_qualification: string | null
          mother_tongue: string | null
          nationality: string
          passport_photo_url: string | null
          permanent_address: string
          permanent_city: string
          permanent_pincode: string
          permanent_state: string
          previous_class: string | null
          previous_percentage: number | null
          previous_school: string | null
          religion: string | null
          special_requirements: string | null
          student_id: string
          student_name: string
          transfer_certificate_url: string | null
          transport_required: boolean | null
          updated_at: string | null
          status: string |null
        }
        Insert: {
          aadhar_card_url?: string | null
          aadhar_number?: string | null
          address_proof_url?: string | null
          admission_class: string
          birth_certificate_url?: string | null
          blood_group?: string | null
          caste?: string | null
          status: string |null
          created_at?: string | null
          current_address: string
          current_city: string
          current_pincode: string
          current_state: string
          date_of_birth: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          extracurricular?: string | null
          father_email?: string | null
          father_income?: number | null
          father_name: string
          father_occupation?: string | null
          father_phone: string
          father_qualification?: string | null
          gender: string
          guardian_email?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          guardian_relation?: string | null
          id?: string
          marksheet_url?: string | null
          medical_conditions?: string | null
          mother_email?: string | null
          mother_income?: number | null
          mother_name: string
          mother_occupation?: string | null
          mother_phone: string
          mother_qualification?: string | null
          mother_tongue?: string | null
          nationality: string
          passport_photo_url?: string | null
          permanent_address: string
          permanent_city: string
          permanent_pincode: string
          permanent_state: string
          previous_class?: string | null
          previous_percentage?: number | null
          previous_school?: string | null
          religion?: string | null
          special_requirements?: string | null
          student_id: string
          student_name: string
          transfer_certificate_url?: string | null
          transport_required?: boolean | null
          updated_at?: string | null
        }
        Update: {
          aadhar_card_url?: string | null
          aadhar_number?: string | null
          address_proof_url?: string | null
          admission_class?: string
          birth_certificate_url?: string | null
          blood_group?: string | null
          caste?: string | null
          status: string |null
          created_at?: string | null
          current_address?: string
          current_city?: string
          current_pincode?: string
          current_state?: string
          date_of_birth?: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          extracurricular?: string | null
          father_email?: string | null
          father_income?: number | null
          father_name?: string
          father_occupation?: string | null
          father_phone?: string
          father_qualification?: string | null
          gender?: string
          guardian_email?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          guardian_relation?: string | null
          id?: string
          marksheet_url?: string | null
          medical_conditions?: string | null
          mother_email?: string | null
          mother_income?: number | null
          mother_name?: string
          mother_occupation?: string | null
          mother_phone?: string
          mother_qualification?: string | null
          mother_tongue?: string | null
          nationality?: string
          passport_photo_url?: string | null
          permanent_address?: string
          permanent_city?: string
          permanent_pincode?: string
          permanent_state?: string
          previous_class?: string | null
          previous_percentage?: number | null
          previous_school?: string | null
          religion?: string | null
          special_requirements?: string | null
          student_id?: string
          student_name?: string
          transfer_certificate_url?: string | null
          transport_required?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      bus_routes: {
        Row: {
          bus_number: string
          capacity: number
          conductor_name: string | null
          conductor_phone: string | null
          created_at: string | null
          current_occupancy: number | null
          driver_name: string
          driver_phone: string
          id: string
          monthly_fee: number
          route_name: string
          route_number: string
          status: string | null
        }
        Insert: {
          bus_number: string
          capacity: number
          conductor_name?: string | null
          conductor_phone?: string | null
          created_at?: string | null
          current_occupancy?: number | null
          driver_name: string
          driver_phone: string
          id?: string
          monthly_fee: number
          route_name: string
          route_number: string
          status?: string | null
        }
        Update: {
          bus_number?: string
          capacity?: number
          conductor_name?: string | null
          conductor_phone?: string | null
          created_at?: string | null
          current_occupancy?: number | null
          driver_name?: string
          driver_phone?: string
          id?: string
          monthly_fee?: number
          route_name?: string
          route_number?: string
          status?: string | null
        }
        Relationships: []
      }
      bus_stops: {
        Row: {
          address: string | null
          drop_time: string
          id: string
          pickup_time: string
          route_id: string | null
          stop_name: string
          stop_order: number
        }
        Insert: {
          address?: string | null
          drop_time: string
          id?: string
          pickup_time: string
          route_id?: string | null
          stop_name: string
          stop_order: number
        }
        Update: {
          address?: string | null
          drop_time?: string
          id?: string
          pickup_time?: string
          route_id?: string | null
          stop_name?: string
          stop_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "bus_stops_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "bus_routes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          academic_year: string
          capacity: number | null
          class_name: string
          class_teacher_id: string | null
          created_at: string | null
          id: string
          room_number: string | null
          section: string
        }
        Insert: {
          academic_year: string
          capacity?: number | null
          class_name: string
          class_teacher_id?: string | null
          created_at?: string | null
          id?: string
          room_number?: string | null
          section: string
        }
        Update: {
          academic_year?: string
          capacity?: number | null
          class_name?: string
          class_teacher_id?: string | null
          created_at?: string | null
          id?: string
          room_number?: string | null
          section?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_class_teacher_id_fkey"
            columns: ["class_teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_subjects: {
        Row: {
          class_id: string | null
          end_time: string | null
          exam_date: string | null
          exam_id: string | null
          id: string
          passing_marks: number | null
          start_time: string | null
          subject_name: string
          teacher_id: string | null
          total_marks: number | null
        }
        Insert: {
          class_id?: string | null
          end_time?: string | null
          exam_date?: string | null
          exam_id?: string | null
          id?: string
          passing_marks?: number | null
          start_time?: string | null
          subject_name: string
          teacher_id?: string | null
          total_marks?: number | null
        }
        Update: {
          class_id?: string | null
          end_time?: string | null
          exam_date?: string | null
          exam_id?: string | null
          id?: string
          passing_marks?: number | null
          start_time?: string | null
          subject_name?: string
          teacher_id?: string | null
          total_marks?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "exam_subjects_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_subjects_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exam_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_subjects_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_types: {
        Row: {
          academic_year: string
          created_at: string | null
          end_date: string | null
          exam_name: string
          exam_type: string | null
          id: string
          passing_marks: number | null
          start_date: string | null
          total_marks: number | null
        }
        Insert: {
          academic_year: string
          created_at?: string | null
          end_date?: string | null
          exam_name: string
          exam_type?: string | null
          id?: string
          passing_marks?: number | null
          start_date?: string | null
          total_marks?: number | null
        }
        Update: {
          academic_year?: string
          created_at?: string | null
          end_date?: string | null
          exam_name?: string
          exam_type?: string | null
          id?: string
          passing_marks?: number | null
          start_date?: string | null
          total_marks?: number | null
        }
        Relationships: []
      }
      fee_deposits: {
        Row: {
          academic_year: string
          amount: number
          collected_by: string | null
          created_at: string | null
          fee_type: string
          id: string
          month_year: string | null
          notes: string | null
          payment_date: string
          payment_method: string | null
          receipt_number: string | null
          status: string | null
          student_id: string | null
          transaction_id: string | null
        }
        Insert: {
          academic_year: string
          amount: number
          collected_by?: string | null
          created_at?: string | null
          fee_type: string
          id?: string
          month_year?: string | null
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          receipt_number?: string | null
          status?: string | null
          student_id?: string | null
          transaction_id?: string | null
        }
        Update: {
          academic_year?: string
          amount?: number
          collected_by?: string | null
          created_at?: string | null
          fee_type?: string
          id?: string
          month_year?: string | null
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          receipt_number?: string | null
          status?: string | null
          student_id?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fee_deposits_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_structure: {
        Row: {
          admission_fee: number
          class_name: string
          composite_fees: number
          created_at: string | null
          exam_fees: string
          id: string
          monthly_fee: number
          old_fee: string | null
          security_fees: string
          total_fees: number
          updated_at: string | null
        }
        Insert: {
          admission_fee: number
          class_name: string
          composite_fees: number
          created_at?: string | null
          exam_fees: string
          id?: string
          monthly_fee: number
          old_fee?: string | null
          security_fees: string
          total_fees: number
          updated_at?: string | null
        }
        Update: {
          admission_fee?: number
          class_name?: string
          composite_fees?: number
          created_at?: string | null
          exam_fees?: string
          id?: string
          monthly_fee?: number
          old_fee?: string | null
          security_fees?: string
          total_fees?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          alt_text: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string
          title: string
          updated_at: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
          title: string
          updated_at?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hostel_allocations: {
        Row: {
          allocation_date: string
          created_at: string | null
          id: string
          monthly_fee: number
          room_id: string | null
          status: string | null
          student_id: string | null
          vacate_date: string | null
        }
        Insert: {
          allocation_date: string
          created_at?: string | null
          id?: string
          monthly_fee: number
          room_id?: string | null
          status?: string | null
          student_id?: string | null
          vacate_date?: string | null
        }
        Update: {
          allocation_date?: string
          created_at?: string | null
          id?: string
          monthly_fee?: number
          room_id?: string | null
          status?: string | null
          student_id?: string | null
          vacate_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hostel_allocations_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "hostel_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hostel_allocations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      hostel_rooms: {
        Row: {
          capacity: number
          current_occupancy: number | null
          hostel_id: string | null
          id: string
          monthly_fee: number | null
          room_number: string
          room_type: string | null
          status: string | null
        }
        Insert: {
          capacity: number
          current_occupancy?: number | null
          hostel_id?: string | null
          id?: string
          monthly_fee?: number | null
          room_number: string
          room_type?: string | null
          status?: string | null
        }
        Update: {
          capacity?: number
          current_occupancy?: number | null
          hostel_id?: string | null
          id?: string
          monthly_fee?: number | null
          room_number?: string
          room_type?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hostel_rooms_hostel_id_fkey"
            columns: ["hostel_id"]
            isOneToOne: false
            referencedRelation: "hostels"
            referencedColumns: ["id"]
          },
        ]
      }
      hostels: {
        Row: {
          address: string | null
          created_at: string | null
          current_occupancy: number | null
          facilities: string[] | null
          hostel_name: string
          hostel_type: string | null
          id: string
          total_capacity: number
          warden_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          current_occupancy?: number | null
          facilities?: string[] | null
          hostel_name: string
          hostel_type?: string | null
          id?: string
          total_capacity: number
          warden_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          current_occupancy?: number | null
          facilities?: string[] | null
          hostel_name?: string
          hostel_type?: string | null
          id?: string
          total_capacity?: number
          warden_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hostels_warden_id_fkey"
            columns: ["warden_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_categories: {
        Row: {
          category_name: string
          created_at: string | null
          description: string | null
          id: string
        }
        Insert: {
          category_name: string
          created_at?: string | null
          description?: string | null
          id?: string
        }
        Update: {
          category_name?: string
          created_at?: string | null
          description?: string | null
          id?: string
        }
        Relationships: []
      }
      inventory_items: {
        Row: {
          category_id: string | null
          created_at: string | null
          current_stock: number | null
          description: string | null
          id: string
          item_code: string | null
          item_name: string
          minimum_stock: number | null
          supplier_contact: string | null
          supplier_name: string | null
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          current_stock?: number | null
          description?: string | null
          id?: string
          item_code?: string | null
          item_name: string
          minimum_stock?: number | null
          supplier_contact?: string | null
          supplier_name?: string | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          current_stock?: number | null
          description?: string | null
          id?: string
          item_code?: string | null
          item_name?: string
          minimum_stock?: number | null
          supplier_contact?: string | null
          supplier_name?: string | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "inventory_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_transactions: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          issued_to: string | null
          item_id: string | null
          notes: string | null
          quantity: number
          reference_number: string | null
          total_amount: number | null
          transaction_type: string | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          issued_to?: string | null
          item_id?: string | null
          notes?: string | null
          quantity: number
          reference_number?: string | null
          total_amount?: number | null
          transaction_type?: string | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          issued_to?: string | null
          item_id?: string | null
          notes?: string | null
          quantity?: number
          reference_number?: string | null
          total_amount?: number | null
          transaction_type?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_transactions_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
        ]
      }
      mpd_documents: {
        Row: {
          created_at: string | null
          description: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_url: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_url?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          file_url?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notices: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          date: string
          id: string
          notice_number: number | null
          notice_type: Database["public"]["Enums"]["notice_type"] | null
          priority: Database["public"]["Enums"]["notice_priority"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          date: string
          id?: string
          notice_number?: number | null
          notice_type?: Database["public"]["Enums"]["notice_type"] | null
          priority?: Database["public"]["Enums"]["notice_priority"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          date?: string
          id?: string
          notice_number?: number | null
          notice_type?: Database["public"]["Enums"]["notice_type"] | null
          priority?: Database["public"]["Enums"]["notice_priority"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      programs: {
        Row: {
          age_group: string | null
          created_at: string | null
          description: string
          features: string[] | null
          icon: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          age_group?: string | null
          created_at?: string | null
          description: string
          features?: string[] | null
          icon?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          age_group?: string | null
          created_at?: string | null
          description?: string
          features?: string[] | null
          icon?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      school_info: {
        Row: {
          category: string | null
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          category?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          category?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      student_marks: {
        Row: {
          created_at: string | null
          entered_by: string | null
          exam_subject_id: string | null
          grade: string | null
          id: string
          is_absent: boolean | null
          marks_obtained: number | null
          remarks: string | null
          student_id: string | null
          updated_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          entered_by?: string | null
          exam_subject_id?: string | null
          grade?: string | null
          id?: string
          is_absent?: boolean | null
          marks_obtained?: number | null
          remarks?: string | null
          student_id?: string | null
          updated_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          entered_by?: string | null
          exam_subject_id?: string | null
          grade?: string | null
          id?: string
          is_absent?: boolean | null
          marks_obtained?: number | null
          remarks?: string | null
          student_id?: string | null
          updated_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_marks_entered_by_fkey"
            columns: ["entered_by"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_marks_exam_subject_id_fkey"
            columns: ["exam_subject_id"]
            isOneToOne: false
            referencedRelation: "exam_subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_marks_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_marks_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          address: string | null
          class_id: string | null
          created_at: string | null
          date_of_birth: string | null
          first_name: string
          id: string
          last_name: string
          parent_email: string | null
          parent_phone: string | null
          roll_number: string | null
          status: string | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          class_id?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name: string
          id?: string
          last_name: string
          parent_email?: string | null
          parent_phone?: string | null
          roll_number?: string | null
          status?: string | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          class_id?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string
          id?: string
          last_name?: string
          parent_email?: string | null
          parent_phone?: string | null
          roll_number?: string | null
          status?: string | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_leaves: {
        Row: {
          applied_at: string | null
          approved_at: string | null
          approved_by: string | null
          end_date: string
          id: string
          leave_type: string
          reason: string | null
          start_date: string
          status: string | null
          teacher_id: string | null
        }
        Insert: {
          applied_at?: string | null
          approved_at?: string | null
          approved_by?: string | null
          end_date: string
          id?: string
          leave_type: string
          reason?: string | null
          start_date: string
          status?: string | null
          teacher_id?: string | null
        }
        Update: {
          applied_at?: string | null
          approved_at?: string | null
          approved_by?: string | null
          end_date?: string
          id?: string
          leave_type?: string
          reason?: string | null
          start_date?: string
          status?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_leaves_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          experience_years: number | null
          first_name: string
          id: string
          joining_date: string
          last_name: string
          phone: string
          photo_url: string | null
          qualification: string | null
          salary: number | null
          status: string | null
          subjects: string[] | null
          teacher_id: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_years?: number | null
          first_name: string
          id?: string
          joining_date: string
          last_name: string
          phone: string
          photo_url?: string | null
          qualification?: string | null
          salary?: number | null
          status?: string | null
          subjects?: string[] | null
          teacher_id: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_years?: number | null
          first_name?: string
          id?: string
          joining_date?: string
          last_name?: string
          phone?: string
          photo_url?: string | null
          qualification?: string | null
          salary?: number | null
          status?: string | null
          subjects?: string[] | null
          teacher_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      timetable: {
        Row: {
          academic_year: string
          class_id: string | null
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          period_number: number
          start_time: string
          subject: string
          teacher_id: string | null
        }
        Insert: {
          academic_year: string
          class_id?: string | null
          created_at?: string | null
          day_of_week: number
          end_time: string
          id?: string
          period_number: number
          start_time: string
          subject: string
          teacher_id?: string | null
        }
        Update: {
          academic_year?: string
          class_id?: string | null
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          period_number?: number
          start_time?: string
          subject?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "timetable_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetable_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      transport_allocations: {
        Row: {
          allocation_date: string
          created_at: string | null
          id: string
          monthly_fee: number
          route_id: string | null
          status: string | null
          stop_id: string | null
          student_id: string | null
        }
        Insert: {
          allocation_date: string
          created_at?: string | null
          id?: string
          monthly_fee: number
          route_id?: string | null
          status?: string | null
          stop_id?: string | null
          student_id?: string | null
        }
        Update: {
          allocation_date?: string
          created_at?: string | null
          id?: string
          monthly_fee?: number
          route_id?: string | null
          status?: string | null
          stop_id?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transport_allocations_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "bus_routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transport_allocations_stop_id_fkey"
            columns: ["stop_id"]
            isOneToOne: false
            referencedRelation: "bus_stops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transport_allocations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      visitor_logs: {
        Row: {
          department: string | null
          entry_time: string | null
          exit_time: string | null
          id: string
          id_proof_number: string | null
          id_proof_type: string | null
          logged_by: string | null
          notes: string | null
          person_to_meet: string | null
          photo_url: string | null
          purpose: string
          status: string | null
          visitor_email: string | null
          visitor_name: string
          visitor_phone: string | null
        }
        Insert: {
          department?: string | null
          entry_time?: string | null
          exit_time?: string | null
          id?: string
          id_proof_number?: string | null
          id_proof_type?: string | null
          logged_by?: string | null
          notes?: string | null
          person_to_meet?: string | null
          photo_url?: string | null
          purpose: string
          status?: string | null
          visitor_email?: string | null
          visitor_name: string
          visitor_phone?: string | null
        }
        Update: {
          department?: string | null
          entry_time?: string | null
          exit_time?: string | null
          id?: string
          id_proof_number?: string | null
          id_proof_type?: string | null
          logged_by?: string | null
          notes?: string | null
          person_to_meet?: string | null
          photo_url?: string | null
          purpose?: string
          status?: string | null
          visitor_email?: string | null
          visitor_name?: string
          visitor_phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      document_type:
        | "affiliation"
        | "recognition"
        | "safety"
        | "academic"
        | "result"
      notice_priority: "high" | "medium" | "low"
      notice_type:
        | "holiday"
        | "admission"
        | "meeting"
        | "event"
        | "sports"
        | "exam"
        | "general"
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_type: [
        "affiliation",
        "recognition",
        "safety",
        "academic",
        "result",
      ],
      notice_priority: ["high", "medium", "low"],
      notice_type: [
        "holiday",
        "admission",
        "meeting",
        "event",
        "sports",
        "exam",
        "general",
      ],
      user_role: ["admin", "user"],
    },
  },
} as const
