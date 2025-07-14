import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface TCRecord {
  id: string;
  tc_number: string;
  student_id: string;
  student_name: string;
  class: string;
  issue_date: string;
  status: string;
}

interface TCFormData {
  tc_number: string;
  student_id: string;
  student_name: string;
  admission_no: string;
  sr_no: string;
  roll_number: number | null;
  class: string;
  session: string;
  father_name: string;
  mother_name: string;
  nationality: string;
  caste: string;
  scst: boolean;
  first_admission_date: string;
  dob: string;
  dob_words: string;
  last_class_studied: string;
  board_exam: string;
  failed_before: boolean;
  subjects: string;
  promotion_status: string;
  total_working_days: number | null;
  total_present_days: number | null;
  ncc_scout_guide: boolean;
  games_activities: string;
  general_conduct: string;
  application_date: string;
  issue_date: string;
  reason_for_leaving: string;
  other_remarks: string;
  class_teacher_sign: string;
  principal_sign: string;
  school_seal: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Student {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  admission_no?: string;
  dob?: string;
  class?: string;
  [key: string]: any;
}

interface ClassItem {
  id: string;
  class_name: string;
}

const initialFormData: TCFormData = {
  tc_number: '',
  student_id: '',
  student_name: '',
  admission_no: '',
  sr_no: '',
  roll_number: null,
  class: '',
  session: '',
  father_name: '',
  mother_name: '',
  nationality: '',
  caste: '',
  scst: false,
  first_admission_date: '',
  dob: '',
  dob_words: '',
  last_class_studied: '',
  board_exam: '',
  failed_before: false,
  subjects: '',
  promotion_status: '',
  total_working_days: null,
  total_present_days: null,
  ncc_scout_guide: false,
  games_activities: '',
  general_conduct: '',
  application_date: '',
  issue_date: '',
  reason_for_leaving: '',
  other_remarks: '',
  class_teacher_sign: '',
  principal_sign: '',
  school_seal: '',
  status: 'Pending',
  created_at: '',
  updated_at: '',
};

const AdminTC = () => {
  const [formData, setFormData] = useState<TCFormData>(initialFormData);
  const [editingRecord, setEditingRecord] = useState<TCRecord | null>(null);
  const [tcRecords, setTcRecords] = useState<TCRecord[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchTCRecords();
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const { data, error } = await supabase.from('classes').select('id, class_name').order('class_name');
    if (!error && data) {
      setClasses(data);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to fetch class list',
        variant: 'destructive',
      });
    }
  };

  const fetchTCRecords = async () => {
    const { data, error } = await supabase.from('transfer_certificates').select('*');
    if (!error && data) setTcRecords(data);
  };

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('students')
      .select(`
        id,
        student_id,
        first_name,
        last_name,
        date_of_birth,
        classes (
          id,
          class_name
        )
      `)
      .order('first_name', { ascending: true });

    if (!error && data) {
      const mapped = data.map((s: any) => ({
        ...s,
        class_name: s.class?.class_name || '',
        class_id: s.class?.id || '',
      }));
      setStudents(mapped);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to fetch students',
        variant: 'destructive',
      });
    }
  };

  const handleStudentSelect = (studentId: string) => {
    const selectedStudent = students.find((s) => s.id === studentId);
    if (selectedStudent) {
      setFormData({
        ...formData,
        student_id: selectedStudent.student_id || '',
        student_name: `${selectedStudent.first_name} ${selectedStudent.last_name}`,
        admission_no: selectedStudent.admission_no || '',
        dob: selectedStudent.dob || '',
        class: selectedStudent.class_name || '',
      });
    }
  };

  const handleChange = (field: keyof TCFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convert empty date strings to null to avoid DB errors
    const payload = {
      ...formData,
      first_admission_date: formData.first_admission_date || null,
      dob: formData.dob || null,
      issue_date: formData.issue_date || null,
      application_date: formData.application_date || null,
      created_at: formData.created_at || null,
      updated_at: formData.updated_at || null,
    };

    const { error } = editingRecord
      ? await supabase.from('transfer_certificates').update(payload).eq('id', editingRecord.id)
      : await supabase.from('transfer_certificates').insert([payload]);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: editingRecord ? 'Record updated' : 'Record added' });
      resetForm();
      setIsDialogOpen(false);
      fetchTCRecords();
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transfer Certificates</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}><Plus className="mr-2 h-4 w-4" />Add TC</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editingRecord ? 'Edit TC' : 'Add TC'}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Select Student</Label>
                <Select
                  onValueChange={handleStudentSelect}
                  value={students.find(s => s.student_id === formData.student_id)?.id || ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.first_name} {student.last_name} ({student.student_id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>TC Number</Label>
                  <Input value={formData.tc_number} onChange={(e) => handleChange('tc_number', e.target.value)} required />
                </div>
                <div>
                  <Label>Student ID</Label>
                  <Input value={formData.student_id} disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Student Name</Label>
                  <Input value={formData.student_name} disabled />
                </div>
                <div>
                  <Label>Class</Label>
                  <Input value={formData.class} onChange={(e) => handleChange('class', e.target.value)} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Issue Date</Label>
                  <Input type="date" value={formData.issue_date} onChange={(e) => handleChange('issue_date', e.target.value)} required />
                </div>
                <div>
                  <Label>Status</Label>
                  <Input value={formData.status} onChange={(e) => handleChange('status', e.target.value)} required />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">{editingRecord ? 'Update' : 'Add'} TC</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle>TC Records</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TC Number</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tcRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.tc_number}</TableCell>
                  <TableCell>{record.student_id}</TableCell>
                  <TableCell>{record.student_name}</TableCell>
                  <TableCell>{record.class}</TableCell>
                  <TableCell>{record.issue_date}</TableCell>
                  <TableCell>{record.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTC;
