
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { syncApprovedAdmissionsToStudents } from '@/integrations/supabase/sync';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Student {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  class_id?: string;
  roll_number?: string;
  date_of_birth?: string;
  parent_phone?: string;
  parent_email?: string;
  address?: string;
  status: string;
  classes?: { class_name: string; section: string };
}

interface Class {
  id: string;
  class_name: string;
  section: string;
}

const AdminStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState('students');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    class_id: '',
    roll_number: '',
    date_of_birth: '',
    parent_phone: '',
    parent_email: '',
    address: '',
    status: 'active'
  });

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          classes (
            class_name,
            section
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  const fetchPendingSyncCount = async () => {
    try {
      const { data, error } = await supabase
        .from('admissions')
        .select('id', { count: 'exact' })
        .eq('status', 'approved')
        .filter('is_synced', 'eq', false);

      if (error) throw error;
      setPendingSyncCount(data ? data.length : 0);
    } catch (error) {
      console.error('Error fetching pending sync count:', error);
    }
  };

  useEffect(() => {
    fetchPendingSyncCount();
  }, []);

  const handleSync = async () => {
    setLoading(true);
    const result = await syncApprovedAdmissionsToStudents();

    if (!result.error) {
      try {
        // Step 1: Get students without roll number
        const { data: studentsWithoutRoll, error: fetchError } = await supabase
          .from('students')
          .select('id')
          .is('roll_number', null);

        if (fetchError) throw fetchError;

        // Step 2: Get current year prefix (last 2 digits)
        const yearPrefix = new Date().getFullYear().toString().slice(-2); // e.g., '25'

        // Step 3: Find max existing sequence number for the year
        const { data: existingStudents, error: existingError } = await supabase
          .from('students')
          .select('roll_number')
          .like('roll_number', `STD-${yearPrefix}%`);

        if (existingError) throw existingError;

        let maxSeq = 0;
        existingStudents?.forEach((s) => {
          const match = s.roll_number?.match(/^STD-\d{2}(\d{6})$/);
          if (match) {
            const seq = parseInt(match[1], 10);
            if (seq > maxSeq) maxSeq = seq;
          }
        });

        // Step 4: Assign new roll numbers
        for (const student of studentsWithoutRoll || []) {
          maxSeq += 1;
          const paddedSeq = String(maxSeq).padStart(6, '0');
          const generatedRollNumber = `STD-${yearPrefix}${paddedSeq}`;

          const { error: updateError } = await supabase
            .from('students')
            .update({ roll_number: generatedRollNumber })
            .eq('id', student.id);

          if (updateError) {
            console.error(`Failed to update roll number for student ${student.id}:`, updateError);
          }
        }

        // Step 5: Mark synced admissions as is_synced = true
        const { error: markSyncedError } = await supabase
          .from('admissions')
          .update({ is_synced: true })
          .eq('status', 'approved')
          .filter('is_synced', 'eq', false);

        if (markSyncedError) {
          console.error('Error marking admissions as synced:', markSyncedError);
        }
      } catch (error) {
        console.error('Error generating roll numbers:', error);
      }
      await fetchPendingSyncCount();
    }

    setLoading(false);

    if (result.error) {
      toast({
        title: "Error",
        description: `Sync failed: ${result.error.message || result.error}`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: result.message,
      });
      fetchStudents();
    }
  };

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('id, class_name, section')
        .order('class_name', { ascending: true });

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        const { error } = await supabase
          .from('students')
          .update(formData)
          .eq('id', editingStudent.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Student updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('students')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Student added successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingStudent(null);
      resetForm();
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      toast({
        title: "Error",
        description: "Failed to save student",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      student_id: student.student_id,
      first_name: student.first_name,
      last_name: student.last_name,
      class_id: student.class_id || '',
      roll_number: student.roll_number || '',
      date_of_birth: student.date_of_birth || '',
      parent_phone: student.parent_phone || '',
      parent_email: student.parent_email || '',
      address: student.address || '',
      status: student.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      student_id: '',
      first_name: '',
      last_name: '',
      class_id: '',
      roll_number: '',
      date_of_birth: '',
      parent_phone: '',
      parent_email: '',
      address: '',
      status: 'active'
    });
  };

  const filteredStudents = students.filter(student =>
    student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      graduated: 'bg-blue-100 text-blue-800',
      transferred: 'bg-yellow-100 text-yellow-800'
    };
    return statusColors[status as keyof typeof statusColors] || statusColors.active;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
        <div className="flex space-x-2">
          <Button
            onClick={handleSync}
            disabled={loading}
            className="h-9 px-4"
          >
            Sync Approved Admissions
            {loading ? null : (
              <span className="ml-2 inline-flex items-center justify-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                {pendingSyncCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {activeTab === 'students' && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); setEditingStudent(null); }} className="h-9 px-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="student_id">Student ID</Label>
                      <Input
                        id="student_id"
                        value={formData.student_id}
                        onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                        disabled={!!editingStudent} // Disable if editing
                      />
                    </div>
                    <div>
                      <Label htmlFor="roll_number">Roll Number</Label>
                      <Input
                        id="roll_number"
                        value={formData.roll_number}
                        onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
                        disabled={!!editingStudent} // Disable if editing
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="class_id">Class</Label>
                      <Select value={formData.class_id} onValueChange={(value) => setFormData({ ...formData, class_id: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id}>
                              {cls.class_name} - {cls.section}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parent_phone">Parent Phone</Label>
                      <Input
                        id="parent_phone"
                        value={formData.parent_phone}
                        onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="parent_email">Parent Email</Label>
                      <Input
                        id="parent_email"
                        type="email"
                        value={formData.parent_email}
                        onChange={(e) => setFormData({ ...formData, parent_email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="graduated">Graduated</SelectItem>
                        <SelectItem value="transferred">Transferred</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingStudent ? 'Update' : 'Add'} Student
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Students List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Parent Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow
                          key={student.id}
                          className="hover:bg-gray-50 focus-within:bg-gray-100"
                        >
                          <TableCell className="font-medium px-4 py-2">{student.student_id}</TableCell>
                          <TableCell className="px-4 py-2">{student.first_name} {student.last_name}</TableCell>
                          <TableCell className="px-4 py-2">
                            {student.classes ? `${student.classes.class_name} - ${student.classes.section}` : 'N/A'}
                          </TableCell>
                          <TableCell className="px-4 py-2">{student.roll_number || 'N/A'}</TableCell>
                          <TableCell className="px-4 py-2">{student.parent_phone || 'N/A'}</TableCell>
                          <TableCell className="px-4 py-2">
                            <Badge className={getStatusBadge(student.status)}>
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1).toLowerCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-4 py-2">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(student)}
                                aria-label={`Edit student ${student.first_name} ${student.last_name}`}
                                className="h-8 w-8 p-1 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(student.id)}
                                aria-label={`Delete student ${student.first_name} ${student.last_name}`}
                                className="h-8 w-8 p-1 hover:bg-red-100 focus:ring-2 focus:ring-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminStudents;
