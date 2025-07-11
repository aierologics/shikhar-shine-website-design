
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';

interface TimetableEntry {
  id: string;
  class_id?: string;
  teacher_id?: string;
  subject: string;
  day_of_week: number;
  period_number: number;
  start_time: string;
  end_time: string;
  academic_year: string;
  classes?: { class_name: string; section: string };
  teachers?: { first_name: string; last_name: string };
}

interface Class {
  id: string;
  class_name: string;
  section: string;
}

interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
}

const AdminTimetable = () => {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  const [selectedClass, setSelectedClass] = useState('');
  const { toast } = useToast();

  const PLACEHOLDER_VALUE = "__placeholder__";

  const [formData, setFormData] = useState({
    class_id: PLACEHOLDER_VALUE,
    teacher_id: PLACEHOLDER_VALUE,
    subject: PLACEHOLDER_VALUE,
    day_of_week: 1,
    period_number: 1,
    start_time: '',
    end_time: '',
    academic_year: '2024-2025'
  });

  const weekDays = [
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  const subjects = [
    'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies',
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Physical Education',
    'Art', 'Music', 'Geography', 'History', 'Economics'
  ];

  useEffect(() => {
    fetchTimetable();
    fetchClasses();
    fetchTeachers();
  }, []);

  const fetchTimetable = async () => {
    try {
      const { data, error } = await supabase
        .from('timetable')
        .select(`
          *,
          classes (
            class_name,
            section
          ),
          teachers (
            first_name,
            last_name
          )
        `)
        .order('day_of_week', { ascending: true })
        .order('period_number', { ascending: true });

      if (error) throw error;
      setTimetable(data || []);
    } catch (error) {
      console.error('Error fetching timetable:', error);
      toast({
        title: "Error",
        description: "Failed to fetch timetable",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
      if (data && data.length > 0 && !selectedClass) {
        setSelectedClass(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('id, first_name, last_name')
        .eq('status', 'active');

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEntry) {
        const { error } = await supabase
          .from('timetable')
          .update(formData)
          .eq('id', editingEntry.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Timetable entry updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('timetable')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Timetable entry added successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingEntry(null);
      resetForm();
      fetchTimetable();
    } catch (error) {
      console.error('Error saving timetable entry:', error);
      toast({
        title: "Error",
        description: "Failed to save timetable entry",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this timetable entry?')) return;

    try {
      const { error } = await supabase
        .from('timetable')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Timetable entry deleted successfully",
      });
      fetchTimetable();
    } catch (error) {
      console.error('Error deleting timetable entry:', error);
      toast({
        title: "Error",
        description: "Failed to delete timetable entry",
        variant: "destructive",
      });
    }
  };


  const resetForm = () => {
    setFormData({
      class_id: PLACEHOLDER_VALUE,
      teacher_id: PLACEHOLDER_VALUE,
      subject: PLACEHOLDER_VALUE,
      day_of_week: 1,
      period_number: 1,
      start_time: '',
      end_time: '',
      academic_year: '2024-2025'
    });
  };

  const handleEdit = (entry: TimetableEntry) => {
    setEditingEntry(entry);
    setFormData({
      class_id: entry.class_id || PLACEHOLDER_VALUE,
      teacher_id: entry.teacher_id || PLACEHOLDER_VALUE,
      subject: entry.subject || PLACEHOLDER_VALUE,
      day_of_week: entry.day_of_week,
      period_number: entry.period_number,
      start_time: entry.start_time,
      end_time: entry.end_time,
      academic_year: entry.academic_year
    });
    setIsDialogOpen(true);
  };

  const filteredTimetable = selectedClass
    ? timetable.filter(entry => entry.class_id === selectedClass)
    : timetable;

  const getDayName = (dayNumber: number) => {
    const day = weekDays.find(d => d.value === dayNumber);
    return day ? day.label : 'Unknown';
  };

  // Create timetable grid view
  const createTimetableGrid = () => {
    const periods = Array.from(new Set(filteredTimetable.map(entry => entry.period_number))).sort((a, b) => a - b);
    const maxPeriods = Math.max(...periods, 8); // Default to 8 periods if none exist
    const allPeriods = Array.from({ length: maxPeriods }, (_, i) => i + 1);

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2 text-left">Period</th>
              {weekDays.map(day => (
                <th key={day.value} className="border border-gray-300 p-2 text-center min-w-32">
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPeriods.map(period => (
              <tr key={period}>
                <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                  Period {period}
                </td>
                {weekDays.map(day => {
                  const entry = filteredTimetable.find(
                    e => e.day_of_week === day.value && e.period_number === period
                  );
                  return (
                    <td key={`${day.value}-${period}`} className="border border-gray-300 p-2 text-center">
                      {entry ? (
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{entry.subject}</div>
                          <div className="text-xs text-gray-600">
                            {entry.teachers ? `${entry.teachers.first_name} ${entry.teachers.last_name}` : 'No teacher'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {entry.start_time} - {entry.end_time}
                          </div>
                          <div className="flex justify-center space-x-1 mt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(entry)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(entry.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm">Free</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Timetable Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingEntry(null); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Period
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingEntry ? 'Edit Period' : 'Add Timetable Period'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="class_id">Class</Label>
                <Select
                  value={formData.class_id || ""}
                  onValueChange={(value) => setFormData({ ...formData, class_id: value })}
                >
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
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })} defaultValue={PLACEHOLDER_VALUE}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PLACEHOLDER_VALUE}>Select subject</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="teacher_id">Teacher</Label>
                <Select value={formData.teacher_id} onValueChange={(value) => setFormData({ ...formData, teacher_id: value })} defaultValue={PLACEHOLDER_VALUE}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PLACEHOLDER_VALUE}>Select teacher</SelectItem>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.first_name} {teacher.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="day_of_week">Day</Label>
                  <Select value={formData.day_of_week.toString()} onValueChange={(value) => setFormData({ ...formData, day_of_week: parseInt(value) })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {weekDays.map((day) => (
                        <SelectItem key={day.value} value={day.value.toString()}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="period_number">Period Number</Label>
                  <Select value={formData.period_number.toString()} onValueChange={(value) => setFormData({ ...formData, period_number: parseInt(value) })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 8 }, (_, i) => i + 1).map((period) => (
                        <SelectItem key={period} value={period.toString()}>
                          Period {period}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_time">Start Time</Label>
                  <Input
                    id="start_time"
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_time">End Time</Label>
                  <Input
                    id="end_time"
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="academic_year">Academic Year</Label>
                <Input
                  id="academic_year"
                  value={formData.academic_year}
                  onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEntry ? 'Update' : 'Add'} Period
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Class Timetable
            </CardTitle>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select class to view timetable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.class_name} - {cls.section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : selectedClass ? (
            createTimetableGrid()
          ) : (
            <div className="text-center py-8 text-gray-500">
              Please select a class to view the timetable
            </div>
          )}
        </CardContent>
      </Card>

      {!selectedClass && (
        <Card>
          <CardHeader>
            <CardTitle>All Timetable Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetable.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      {entry.classes ? `${entry.classes.class_name} - ${entry.classes.section}` : 'N/A'}
                    </TableCell>
                    <TableCell className="font-medium">{entry.subject}</TableCell>
                    <TableCell>
                      {entry.teachers ? `${entry.teachers.first_name} ${entry.teachers.last_name}` : 'Not assigned'}
                    </TableCell>
                    <TableCell>{getDayName(entry.day_of_week)}</TableCell>
                    <TableCell>Period {entry.period_number}</TableCell>
                    <TableCell>{entry.start_time} - {entry.end_time}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(entry)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(entry.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminTimetable;