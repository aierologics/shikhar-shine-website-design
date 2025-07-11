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
          updated_at: string | null,
          status: string | null,
        }
        Insert: {
          aadhar_card_url?: string | null
          aadhar_number?: string | null
          address_proof_url?: string | null
          admission_class: string
          birth_certificate_url?: string | null
          blood_group?: string | null
          caste?: string | null
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
      },
      teachers: {
        Row: {
          id: string
          teacher_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth: string | null
          address: string | null
          qualification: string | null
          experience_years: number | null
          subjects: string[] | null
          joining_date: string
          salary: number | null
          status: string | null
          photo_url: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          teacher_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth?: string | null
          address?: string | null
          qualification?: string | null
          experience_years?: number | null
          subjects?: string[] | null
          joining_date: string
          salary?: number | null
          status?: string | null
          photo_url?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          teacher_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          date_of_birth?: string | null
          address?: string | null
          qualification?: string | null
          experience_years?: number | null
          subjects?: string[] | null
          joining_date?: string
          salary?: number | null
          status?: string | null
          photo_url?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          created_at?: string | null
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
