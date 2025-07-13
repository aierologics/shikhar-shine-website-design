import { supabase } from './client';

export async function syncApprovedAdmissionsToStudents() {
  try {
    // Fetch approved admissions
    const { data: approvedAdmissions, error: admissionsError } = await supabase
      .from('admissions')
      .select('*')
      .eq('status', 'approved');

    if (admissionsError) {
      throw admissionsError;
    }

    if (!approvedAdmissions || approvedAdmissions.length === 0) {
      return { message: 'No approved admissions found to sync.' };
    }

    // Fetch existing students' student_ids
    const { data: existingStudents, error: studentsError } = await supabase
      .from('students')
      .select('student_id');

    if (studentsError) {
      throw studentsError;
    }

    const existingStudentIds = new Set(existingStudents?.map(s => s.student_id));

    // Prepare new students to insert
    const newStudents = approvedAdmissions
      .filter(adm => !existingStudentIds.has(adm.student_id))
      .map(adm => ({
        student_id: adm.student_id,
        first_name: adm.student_name.split(' ')[0] || adm.student_name,
        last_name: adm.student_name.split(' ').slice(1).join(' ') || '',
        date_of_birth: adm.date_of_birth,
        address: adm.current_address,
        parent_phone: adm.father_phone,
        parent_email: adm.father_email,
        status: 'active',
        // class_id and roll_number can be set later manually
      }));

    if (newStudents.length === 0) {
      return { message: 'All approved admissions are already synced.' };
    }

    // Insert new students
    const { error: insertError } = await supabase
      .from('students')
      .insert(newStudents);

    if (insertError) {
      throw insertError;
    }

    return { message: `${newStudents.length} approved admissions synced to students.` };
  } catch (error) {
    return { error };
  }
}
