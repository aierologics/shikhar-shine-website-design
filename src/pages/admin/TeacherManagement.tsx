import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('teachers').select('*').order('first_name');
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch teachers',
        variant: 'destructive',
      });
    } else {
      setTeachers(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4">
      <Card>
        <CardHeader>
          <CardTitle>Teacher Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/admin/add-teacher')} className="mb-4">
            Add New Teacher
          </Button>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-auto max-h-[600px]">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Teacher ID</th>
                    <th className="border border-gray-300 p-2">First Name</th>
                    <th className="border border-gray-300 p-2">Last Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Phone</th>
                    <th className="border border-gray-300 p-2">DOB</th>
                    <th className="border border-gray-300 p-2">Address</th>
                    <th className="border border-gray-300 p-2">Qualification</th>
                    <th className="border border-gray-300 p-2">Experience (Years)</th>
                    <th className="border border-gray-300 p-2">Subjects</th>
                    <th className="border border-gray-300 p-2">Joining Date</th>
                    <th className="border border-gray-300 p-2">Salary</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Emergency Contact Name</th>
                    <th className="border border-gray-300 p-2">Emergency Contact Phone</th>
                    <th className="border border-gray-300 p-2">Photo</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="border border-gray-300 p-2">{teacher.teacher_id}</td>
                      <td className="border border-gray-300 p-2">{teacher.first_name}</td>
                      <td className="border border-gray-300 p-2">{teacher.last_name}</td>
                      <td className="border border-gray-300 p-2">{teacher.email}</td>
                      <td className="border border-gray-300 p-2">{teacher.phone}</td>
                      <td className="border border-gray-300 p-2">{teacher.date_of_birth || '-'}</td>
                      <td className="border border-gray-300 p-2">{teacher.address || '-'}</td>
                      <td className="border border-gray-300 p-2">{teacher.qualification || '-'}</td>
                      <td className="border border-gray-300 p-2">{teacher.experience_years ?? '-'}</td>
                      <td className="border border-gray-300 p-2">{(teacher.subjects || []).join(', ')}</td>
                      <td className="border border-gray-300 p-2">{teacher.joining_date}</td>
                      <td className="border border-gray-300 p-2">{teacher.salary ?? '-'}</td>
                      <td className="border border-gray-300 p-2">{teacher.status || '-'}</td>
                      <td className="border border-gray-300 p-2">{teacher.emergency_contact_name || '-'}</td>
                      <td className="border border-gray-300 p-2">{teacher.emergency_contact_phone || '-'}</td>
                      <td className="border border-gray-300 p-2">
                        {teacher.photo_url ? (
                          <img src={teacher.photo_url} alt="Teacher Photo" className="h-12 w-12 object-cover rounded" />
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherManagement;
