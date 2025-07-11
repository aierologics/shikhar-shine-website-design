
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
import { Plus, Search, Edit, Trash2, BookOpen, Users, GraduationCap } from 'lucide-react';

interface ExamType {
  id: string;
  exam_name: string;
  exam_type?: string;
  academic_year: string;
  start_date?: string;
  end_date?: string;
  total_marks?: number;
  passing_marks?: number;
}

interface ExamSubject {
  id: string;
  exam_id?: string;
  class_id?: string;
  subject_name: string;
  exam_date?: string;
  start_time?: string;
  end_time?: string;
  total_marks?: number;
  passing_marks?: number;
  teacher_id?: string;
  exam_types?: { exam_name: string };
  classes?: { class_name: string; section: string };
  teachers?: { first_name: string; last_name: string };
}

interface StudentMark {
  id: string;
  exam_subject_id?: string;
  student_id?: string;
  marks_obtained?: number;
  grade?: string;
  remarks?: string;
  is_absent?: boolean;
  exam_subjects?: { subject_name: string };
  students?: { first_name: string; last_name: string; student_id: string };
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

interface Student {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
}

const AdminExams = () => {
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [examSubjects, setExamSubjects] = useState<ExamSubject[]>([]);
  const [studentMarks, setStudentMarks] = useState<StudentMark[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);
  const [isMarksDialogOpen, setIsMarksDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamType | null>(null);
  const [editingSubject, setEditingSubject] = useState<ExamSubject | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<ExamSubject | null>(null);
  const [activeTab, setActiveTab] = useState('exams');
  const { toast } = useToast();

  const [examFormData, setExamFormData] = useState({
    exam_name: '',
    exam_type: 'formative',
    academic_year: '2024-2025',
    start_date: '',
    end_date: '',
    total_marks: 100,
    passing_marks: 35
  });

  const [subjectFormData, setSubjectFormData] = useState({
    exam_id: '',
    class_id: '',
    subject_name: '',
    exam_date: '',
    start_time: '',
    end_time: '',
    total_marks: 100,
    passing_marks: 35,
    teacher_id: ''
  });

  const [marksFormData, setMarksFormData] = useState({
    student_id: '',
    marks_obtained: 0,
    grade: '',
    remarks: '',
    is_absent: false
  });

  useEffect(() => {
    fetchExamTypes();
    fetchExamSubjects();
    fetchStudentMarks();
    fetchClasses();
    fetchTeachers();
    fetchStudents();
  }, []);

  const fetchExamTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('exam_types')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExamTypes(data || []);
    } catch (error) {
      console.error('Error fetching exam types:', error);
      toast({
        title: "Error",
        description: "Failed to fetch exam types",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchExamSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from('exam_subjects')
        .select(`
          *,
          exam_types (
            exam_name
          ),
          classes (
            class_name,
            section
          ),
          teachers (
            first_name,
            last_name
          )
        `)
        .order('exam_date', { ascending: true });

      if (error) throw error;
      setExamSubjects(data || []);
    } catch (error) {
      console.error('Error fetching exam subjects:', error);
    }
  };

  const fetchStudentMarks = async () => {
    try {
      const { data, error } = await supabase
        .from('student_marks')
        .select(`
          *,
          exam_subjects (
            subject_name
          ),
          students (
            first_name,
            last_name,
            student_id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudentMarks(data || []);
    } catch (error) {
      console.error('Error fetching student marks:', error);
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

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('id, student_id, first_name, last_name')
        .eq('status', 'active');

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleExamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExam) {
        const { error } = await supabase
          .from('exam_types')
          .update(examFormData)
          .eq('id', editingExam.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Exam updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('exam_types')
          .insert([examFormData]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Exam created successfully",
        });
      }
      
      setIsExamDialogOpen(false);
      setEditingExam(null);
      resetExamForm();
      fetchExamTypes();
    } catch (error) {
      console.error('Error saving exam:', error);
      toast({
        title: "Error",
        description: "Failed to save exam",
        variant: "destructive",
      });
    }
  };

  const handleSubjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSubject) {
        const { error } = await supabase
          .from('exam_subjects')
          .update(subjectFormData)
          .eq('id', editingSubject.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Subject updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('exam_subjects')
          .insert([subjectFormData]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Subject added successfully",
        });
      }
      
      setIsSubjectDialogOpen(false);
      setEditingSubject(null);
      resetSubjectForm();
      fetchExamSubjects();
    } catch (error) {
      console.error('Error saving subject:', error);
      toast({
        title: "Error",
        description: "Failed to save subject",
        variant: "destructive",
      });
    }
  };

  const handleMarksSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const marksData = {
        exam_subject_id: selectedSubject?.id,
        ...marksFormData
      };

      const { error } = await supabase
        .from('student_marks')
        .insert([marksData]);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Marks entered successfully",
      });
      
      setIsMarksDialogOpen(false);
      resetMarksForm();
      fetchStudentMarks();
    } catch (error) {
      console.error('Error saving marks:', error);
      toast({
        title: "Error",
        description: "Failed to save marks",
        variant: "destructive",
      });
    }
  };

  const handleDeleteExam = async (id: string) => {
    if (!confirm('Are you sure you want to delete this exam?')) return;
    
    try {
      const { error } = await supabase
        .from('exam_types')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Exam deleted successfully",
      });
      fetchExamTypes();
    } catch (error) {
      console.error('Error deleting exam:', error);
      toast({
        title: "Error",
        description: "Failed to delete exam",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSubject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subject?')) return;
    
    try {
      const { error } = await supabase
        .from('exam_subjects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Subject deleted successfully",
      });
      fetchExamSubjects();
    } catch (error) {
      console.error('Error deleting subject:', error);
      toast({
        title: "Error",
        description: "Failed to delete subject",
        variant: "destructive",
      });
    }
  };

  const resetExamForm = () => {
    setExamFormData({
      exam_name: '',
      exam_type: 'formative',
      academic_year: '2024-2025',
      start_date: '',
      end_date: '',
      total_marks: 100,
      passing_marks: 35
    });
  };

  const resetSubjectForm = () => {
    setSubjectFormData({
      exam_id: '',
      class_id: '',
      subject_name: '',
      exam_date: '',
      start_time: '',
      end_time: '',
      total_marks: 100,
      passing_marks: 35,
      teacher_id: ''
    });
  };

  const resetMarksForm = () => {
    setMarksFormData({
      student_id: '',
      marks_obtained: 0,
      grade: '',
      remarks: '',
      is_absent: false
    });
  };

  const handleEditExam = (exam: ExamType) => {
    setEditingExam(exam);
    setExamFormData({
      exam_name: exam.exam_name,
      exam_type: exam.exam_type || 'formative',
      academic_year: exam.academic_year,
      start_date: exam.start_date || '',
      end_date: exam.end_date || '',
      total_marks: exam.total_marks || 100,
      passing_marks: exam.passing_marks || 35
    });
    setIsExamDialogOpen(true);
  };

  const handleEditSubject = (subject: ExamSubject) => {
    setEditingSubject(subject);
    setSubjectFormData({
      exam_id: subject.exam_id || '',
      class_id: subject.class_id || '',
      subject_name: subject.subject_name,
      exam_date: subject.exam_date || '',
      start_time: subject.start_time || '',
      end_time: subject.end_time || '',
      total_marks: subject.total_marks || 100,
      passing_marks: subject.passing_marks || 35,
      teacher_id: subject.teacher_id || ''
    });
    setIsSubjectDialogOpen(true);
  };

  const filteredExams = examTypes.filter(exam =>
    exam.exam_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubjects = examSubjects.filter(subject =>
    subject.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subject.exam_types?.exam_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Exam Management</h1>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'exams' ? 'default' : 'outline'}
            onClick={() => setActiveTab('exams')}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Exams
          </Button>
          <Button
            variant={activeTab === 'subjects' ? 'default' : 'outline'}
            onClick={() => setActiveTab('subjects')}
          >
            <Users className="h-4 w-4 mr-2" />
            Subjects
          </Button>
          <Button
            variant={activeTab === 'results' ? 'default' : 'outline'}
            onClick={() => setActiveTab('results')}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Results
          </Button>
        </div>
      </div>

      {activeTab === 'exams' && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetExamForm(); setEditingExam(null); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Exam
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingExam ? 'Edit Exam' : 'Create New Exam'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleExamSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="exam_name">Exam Name</Label>
                    <Input
                      id="exam_name"
                      value={examFormData.exam_name}
                      onChange={(e) => setExamFormData({ ...examFormData, exam_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="exam_type">Exam Type</Label>
                      <Select value={examFormData.exam_type} onValueChange={(value) => setExamFormData({ ...examFormData, exam_type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formative">Formative</SelectItem>
                          <SelectItem value="summative">Summative</SelectItem>
                          <SelectItem value="term">Term</SelectItem>
                          <SelectItem value="final">Final</SelectItem>
                          <SelectItem value="unit_test">Unit Test</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="academic_year">Academic Year</Label>
                      <Input
                        id="academic_year"
                        value={examFormData.academic_year}
                        onChange={(e) => setExamFormData({ ...examFormData, academic_year: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start_date">Start Date</Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={examFormData.start_date}
                        onChange={(e) => setExamFormData({ ...examFormData, start_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_date">End Date</Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={examFormData.end_date}
                        onChange={(e) => setExamFormData({ ...examFormData, end_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="total_marks">Total Marks</Label>
                      <Input
                        id="total_marks"
                        type="number"
                        value={examFormData.total_marks}
                        onChange={(e) => setExamFormData({ ...examFormData, total_marks: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="passing_marks">Passing Marks</Label>
                      <Input
                        id="passing_marks"
                        type="number"
                        value={examFormData.passing_marks}
                        onChange={(e) => setExamFormData({ ...examFormData, passing_marks: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsExamDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingExam ? 'Update' : 'Create'} Exam
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exams</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Academic Year</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.exam_name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {exam.exam_type}
                          </Badge>
                        </TableCell>
                        <TableCell>{exam.academic_year}</TableCell>
                        <TableCell>
                          {exam.start_date && exam.end_date 
                            ? `${new Date(exam.start_date).toLocaleDateString()} - ${new Date(exam.end_date).toLocaleDateString()}`
                            : 'Not set'
                          }
                        </TableCell>
                        <TableCell>{exam.total_marks} (Pass: {exam.passing_marks})</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditExam(exam)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteExam(exam.id)}
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

      {activeTab === 'subjects' && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Dialog open={isSubjectDialogOpen} onOpenChange={setIsSubjectDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetSubjectForm(); setEditingSubject(null); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingSubject ? 'Edit Subject' : 'Add Exam Subject'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubjectSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="exam_id">Exam</Label>
                      <Select value={subjectFormData.exam_id} onValueChange={(value) => setSubjectFormData({ ...subjectFormData, exam_id: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exam" />
                        </SelectTrigger>
                        <SelectContent>
                          {examTypes.map((exam) => (
                            <SelectItem key={exam.id} value={exam.id}>
                              {exam.exam_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="class_id">Class</Label>
                      <Select value={subjectFormData.class_id} onValueChange={(value) => setSubjectFormData({ ...subjectFormData, class_id: value })}>
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
                  </div>

                  <div>
                    <Label htmlFor="subject_name">Subject Name</Label>
                    <Input
                      id="subject_name"
                      value={subjectFormData.subject_name}
                      onChange={(e) => setSubjectFormData({ ...subjectFormData, subject_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="exam_date">Exam Date</Label>
                      <Input
                        id="exam_date"
                        type="date"
                        value={subjectFormData.exam_date}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, exam_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="start_time">Start Time</Label>
                      <Input
                        id="start_time"
                        type="time"
                        value={subjectFormData.start_time}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, start_time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_time">End Time</Label>
                      <Input
                        id="end_time"
                        type="time"
                        value={subjectFormData.end_time}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, end_time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="total_marks">Total Marks</Label>
                      <Input
                        id="total_marks"
                        type="number"
                        value={subjectFormData.total_marks}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, total_marks: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="passing_marks">Passing Marks</Label>
                      <Input
                        id="passing_marks"
                        type="number"
                        value={subjectFormData.passing_marks}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, passing_marks: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="teacher_id">Teacher</Label>
                      <Select value={subjectFormData.teacher_id} onValueChange={(value) => setSubjectFormData({ ...subjectFormData, teacher_id: value })}>
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
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsSubjectDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSubject ? 'Update' : 'Add'} Subject
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exam Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell>{subject.exam_types?.exam_name}</TableCell>
                      <TableCell className="font-medium">{subject.subject_name}</TableCell>
                      <TableCell>
                        {subject.classes ? `${subject.classes.class_name} - ${subject.classes.section}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{subject.exam_date ? new Date(subject.exam_date).toLocaleDateString() : 'N/A'}</div>
                          <div className="text-sm text-gray-500">
                            {subject.start_time && subject.end_time ? `${subject.start_time} - ${subject.end_time}` : 'Time not set'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {subject.teachers ? `${subject.teachers.first_name} ${subject.teachers.last_name}` : 'Not assigned'}
                      </TableCell>
                      <TableCell>{subject.total_marks} (Pass: {subject.passing_marks})</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedSubject(subject);
                              setIsMarksDialogOpen(true);
                            }}
                          >
                            Enter Marks
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSubject(subject)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSubject(subject.id)}
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
        </>
      )}

      {activeTab === 'results' && (
        <Card>
          <CardHeader>
            <CardTitle>Student Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentMarks.map((mark) => (
                  <TableRow key={mark.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {mark.students ? `${mark.students.first_name} ${mark.students.last_name}` : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">{mark.students?.student_id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{mark.exam_subjects?.subject_name}</TableCell>
                    <TableCell>{mark.is_absent ? 'Absent' : mark.marks_obtained}</TableCell>
                    <TableCell>{mark.grade}</TableCell>
                    <TableCell>
                      <Badge variant={mark.is_absent ? 'destructive' : 'default'}>
                        {mark.is_absent ? 'Absent' : 'Present'}
                      </Badge>
                    </TableCell>
                    <TableCell>{mark.remarks || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Marks Entry Dialog */}
      <Dialog open={isMarksDialogOpen} onOpenChange={setIsMarksDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Marks - {selectedSubject?.subject_name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleMarksSubmit} className="space-y-4">
            <div>
              <Label htmlFor="student_id">Student</Label>
              <Select value={marksFormData.student_id} onValueChange={(value) => setMarksFormData({ ...marksFormData, student_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
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

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_absent"
                checked={marksFormData.is_absent}
                onChange={(e) => setMarksFormData({ ...marksFormData, is_absent: e.target.checked })}
              />
              <Label htmlFor="is_absent">Student was absent</Label>
            </div>

            {!marksFormData.is_absent && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="marks_obtained">Marks Obtained</Label>
                  <Input
                    id="marks_obtained"
                    type="number"
                    value={marksFormData.marks_obtained}
                    onChange={(e) => setMarksFormData({ ...marksFormData, marks_obtained: parseFloat(e.target.value) || 0 })}
                    max={selectedSubject?.total_marks || 100}
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    value={marksFormData.grade}
                    onChange={(e) => setMarksFormData({ ...marksFormData, grade: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                id="remarks"
                value={marksFormData.remarks}
                onChange={(e) => setMarksFormData({ ...marksFormData, remarks: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsMarksDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Marks</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminExams;
