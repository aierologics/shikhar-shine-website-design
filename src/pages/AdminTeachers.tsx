
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2, Calendar, Users } from 'lucide-react';

interface Teacher {
  id: string;
  teacher_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth?: string;
  address?: string;
  qualification?: string;
  experience_years: number;
  subjects?: string[];
  joining_date: string;
  salary?: number;
  status: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

interface Leave {
  id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason?: string;
  status: string;
  teachers: { first_name: string; last_name: string };
}

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveSearchTerm, setLeaveSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [activeTab, setActiveTab] = useState('teachers');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    teacher_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    qualification: '',
    experience_years: 0,
    subjects: [] as string[],
    joining_date: '',
    salary: 0,
    status: 'active',
    emergency_contact_name: '',
    emergency_contact_phone: ''
  });

  const [leaveFormData, setLeaveFormData] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
    status: 'pending',
    teacher_id: ''
  });

  const subjectsList = [
    'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies',
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Physical Education',
    'Art', 'Music', 'Geography', 'History', 'Economics'
  ];

  useEffect(() => {
    fetchTeachers();
    fetchLeaves();
  }, []);

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch teachers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateTeacherId = async () => {
    const { data, error } = await supabase
      .from('teachers')
      .select('teacher_id')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error generating teacher ID:', error);
      return 'TCH-0001'; // fallback
    }

    if (data && data.length > 0) {
      const lastId = data[0].teacher_id; // e.g., "TCH-0021"
      const num = parseInt(lastId?.split('-')[1] || '0', 10) + 1;
      return `TCH-${String(num).padStart(4, '0')}`;
    } else {
      return 'TCH-0001';
    }
  };


  const fetchLeaves = async () => {
    try {
      const { data, error } = await supabase
        .from('teacher_leaves')
        .select(`
          *,
          teachers (
            first_name,
            last_name
          )
        `)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setLeaves(data || []);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('teacher_leaves')
        .insert([leaveFormData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Leave added successfully",
      });
      setIsLeaveDialogOpen(false);
      setLeaveFormData({
        leave_type: '',
        start_date: '',
        end_date: '',
        reason: '',
        status: 'pending',
        teacher_id: ''
      });
      fetchLeaves();
    } catch (error) {
      console.error('Error adding leave:', error);
      toast({
        title: "Error",
        description: "Failed to add leave",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        // update mode
        const { error } = await supabase
          .from('teachers')
          .update(formData)
          .eq('id', editingTeacher.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Teacher updated successfully",
        });
      } else {
        // create mode - generate ID
        const newTeacherId = await generateTeacherId();

        const { error } = await supabase
          .from('teachers')
          .insert([{ ...formData, teacher_id: newTeacherId }]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Teacher added successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingTeacher(null);
      resetForm();
      fetchTeachers();
    } catch (error) {
      console.error('Error saving teacher:', error);
      toast({
        title: "Error",
        description: "Failed to save teacher",
        variant: "destructive",
      });
    }
  };


  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      teacher_id: teacher.teacher_id,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      email: teacher.email,
      phone: teacher.phone,
      date_of_birth: teacher.date_of_birth || '',
      address: teacher.address || '',
      qualification: teacher.qualification || '',
      experience_years: teacher.experience_years,
      subjects: teacher.subjects || [],
      joining_date: teacher.joining_date,
      salary: teacher.salary || 0,
      status: teacher.status,
      emergency_contact_name: teacher.emergency_contact_name || '',
      emergency_contact_phone: teacher.emergency_contact_phone || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
      const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Teacher deleted successfully",
      });
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast({
        title: "Error",
        description: "Failed to delete teacher",
        variant: "destructive",
      });
    }
  };

  const handleLeaveAction = async (leaveId: string, action: 'approved' | 'rejected') => {
    try {
      const { data: leaveData, error: updateLeaveError } = await supabase
        .from('teacher_leaves')
        .update({
          status: action,
          approved_at: new Date().toISOString()
        })
        .eq('id', leaveId)
        .select()
        .single();

      if (updateLeaveError) throw updateLeaveError;

      if (action === 'approved' && leaveData) {
        // Update teacher status to 'on_leave'
        const { error: updateTeacherError } = await supabase
          .from('teachers')
          .update({ status: 'on_leave' })
          .eq('id', leaveData.teacher_id);

        if (updateTeacherError) {
          console.error('Error updating teacher status:', updateTeacherError);
          toast({
            title: "Error",
            description: "Failed to update teacher status",
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Success",
        description: `Leave ${action} successfully`,
      });
      fetchLeaves();
      fetchTeachers();
    } catch (error) {
      console.error('Error updating leave:', error);
      toast({
        title: "Error",
        description: "Failed to update leave",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      teacher_id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      date_of_birth: '',
      address: '',
      qualification: '',
      experience_years: 0,
      subjects: [],
      joining_date: '',
      salary: 0,
      status: 'active',
      emergency_contact_name: '',
      emergency_contact_phone: ''
    });
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.teacher_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      on_leave: 'bg-yellow-100 text-yellow-800'
    };
    return statusColors[status as keyof typeof statusColors] || statusColors.active;
  };

  const getLeaveStatusBadge = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || statusColors.pending;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'teachers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('teachers')}
          >
            <Users className="h-4 w-4 mr-2" />
            Teachers
          </Button>
          <Button
            variant={activeTab === 'leaves' ? 'default' : 'outline'}
            onClick={() => setActiveTab('leaves')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Leave Management
          </Button>
        </div>
      </div>

      {activeTab === 'teachers' && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); setEditingTeacher(null); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teacher_id">Teacher ID</Label>
                      <Input
                        id="teacher_id"
                        value={formData.teacher_id}
                        readOnly
                        className="bg-gray-100 cursor-not-allowed"
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
                          <SelectItem value="on_leave">On Leave</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="joining_date">Joining Date</Label>
                      <Input
                        id="joining_date"
                        type="date"
                        value={formData.joining_date}
                        onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="qualification">Qualification</Label>
                      <Input
                        id="qualification"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience_years">Experience (Years)</Label>
                      <Input
                        id="experience_years"
                        type="number"
                        value={formData.experience_years}
                        onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salary">Salary</Label>
                      <Input
                        id="salary"
                        type="number"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label>Subjects</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                        {subjectsList.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={subject}
                              checked={formData.subjects.includes(subject)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({ ...formData, subjects: [...formData.subjects, subject] });
                                } else {
                                  setFormData({ ...formData, subjects: formData.subjects.filter(s => s !== subject) });
                                }
                              }}
                              className="rounded"
                            />
                            <label htmlFor={subject} className="text-sm">{subject}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                      <Input
                        id="emergency_contact_name"
                        value={formData.emergency_contact_name}
                        onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                      <Input
                        id="emergency_contact_phone"
                        value={formData.emergency_contact_phone}
                        onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingTeacher ? 'Update' : 'Add'} Teacher
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Teachers List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teacher ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Subjects</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell className="font-medium">{teacher.teacher_id}</TableCell>
                        <TableCell>{teacher.first_name} {teacher.last_name}</TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>{teacher.phone}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {teacher.subjects?.slice(0, 2).map((subject) => (
                              <Badge key={subject} variant="secondary" className="text-xs">
                                {subject}
                              </Badge>
                            ))}
                            {teacher.subjects && teacher.subjects.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{teacher.subjects.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{teacher.experience_years} years</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(teacher.status)}>
                            {teacher.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(teacher)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(teacher.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'leaves' && (
        <>
          <div className="flex justify-between items-center">
            <CardTitle>Leave Management</CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search leaves..."
                value={leaveSearchTerm}
                onChange={(e) => setLeaveSearchTerm(e.target.value)}
                className="w-64"
              />
              <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    Add Leave
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Leave</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleLeaveSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="leave_type">Leave Type</Label>
                        <Select
                          value={leaveFormData.leave_type}
                          onValueChange={(value) => setLeaveFormData({ ...leaveFormData, leave_type: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sick">Sick Leave</SelectItem>
                            <SelectItem value="casual">Casual Leave</SelectItem>
                            <SelectItem value="maternity">Maternity Leave</SelectItem>
                            <SelectItem value="paternity">Paternity Leave</SelectItem>
                            <SelectItem value="earned">Earned Leave</SelectItem>
                            <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={leaveFormData.status} onValueChange={(value) => setLeaveFormData({ ...leaveFormData, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input
                          id="start_date"
                          type="date"
                          value={leaveFormData.start_date}
                          onChange={(e) => setLeaveFormData({ ...leaveFormData, start_date: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="end_date">End Date</Label>
                        <Input
                          id="end_date"
                          type="date"
                          value={leaveFormData.end_date}
                          onChange={(e) => setLeaveFormData({ ...leaveFormData, end_date: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reason">Reason</Label>
                      <Input
                        id="reason"
                        value={leaveFormData.reason}
                        onChange={(e) => setLeaveFormData({ ...leaveFormData, reason: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="teacher_id">Teacher</Label>
                      <Select value={leaveFormData.teacher_id} onValueChange={(value) => setLeaveFormData({ ...leaveFormData, teacher_id: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              {teacher.first_name} {teacher.last_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsLeaveDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        Add Leave
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaves
                    .filter((leave) => {
                      const search = leaveSearchTerm.toLowerCase();
                      const teacherName = `${leave.teachers?.first_name ?? ''} ${leave.teachers?.last_name ?? ''}`.toLowerCase();
                      return (
                        teacherName.includes(search) ||
                        leave.leave_type.toLowerCase().includes(search) ||
                        leave.reason?.toLowerCase().includes(search) ||
                        leave.status.toLowerCase().includes(search)
                      );
                    })
                    .map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell>
                          {leave.teachers?.first_name} {leave.teachers?.last_name}
                        </TableCell>
                        <TableCell className="capitalize">{leave.leave_type}</TableCell>
                        <TableCell>{new Date(leave.start_date).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(leave.end_date).toLocaleDateString()}</TableCell>
                        <TableCell>{leave.reason || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge className={getLeaveStatusBadge(leave.status)}>
                            {leave.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {leave.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleLeaveAction(leave.id, 'approved')}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleLeaveAction(leave.id, 'rejected')}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardHeader>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminTeachers;
