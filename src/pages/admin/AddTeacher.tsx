import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AddTeacher = () => {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    setLoading(true);

    const { error } = await supabase.from('teachers').insert({
      ...values,
      subjects: values.subjects.split(',').map((s: string) => s.trim()),
    });

    setLoading(false);

    if (error) {
      toast({
        title: 'Failed to add teacher',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Teacher added successfully' });
      reset();
      navigate('/admin/teacher-management');
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Teacher</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <fieldset className="border border-gray-300 p-4 rounded-md">
          <legend className="text-lg font-semibold mb-4">Personal Information</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700 mb-1">
                Teacher ID
              </label>
              <Input id="teacher_id" {...register('teacher_id')} placeholder="Teacher ID" required />
            </div>
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <Input id="first_name" {...register('first_name')} placeholder="First Name" required />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <Input id="last_name" {...register('last_name')} placeholder="Last Name" required />
            </div>
            <div>
              <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <Input id="date_of_birth" {...register('date_of_birth')} type="date" placeholder="DOB" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="photo_url" className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL
              </label>
              <Input id="photo_url" {...register('photo_url')} placeholder="Photo URL" />
            </div>
          </div>
        </fieldset>

        {/* Contact Information Section */}
        <fieldset className="border border-gray-300 p-4 rounded-md">
          <legend className="text-lg font-semibold mb-4">Contact Information</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input id="email" {...register('email')} type="email" placeholder="Email" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Input id="phone" {...register('phone')} placeholder="Phone" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <Input id="address" {...register('address')} placeholder="Address" />
            </div>
            <div>
              <label htmlFor="emergency_contact_name" className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact Name
              </label>
              <Input id="emergency_contact_name" {...register('emergency_contact_name')} placeholder="Emergency Contact Name" />
            </div>
            <div>
              <label htmlFor="emergency_contact_phone" className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact Phone
              </label>
              <Input id="emergency_contact_phone" {...register('emergency_contact_phone')} placeholder="Emergency Contact Phone" />
            </div>
          </div>
        </fieldset>

        {/* Job Details Section */}
        <fieldset className="border border-gray-300 p-4 rounded-md">
          <legend className="text-lg font-semibold mb-4">Job Details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">
                Qualification
              </label>
              <Input id="qualification" {...register('qualification')} placeholder="Qualification" />
            </div>
            <div>
              <label htmlFor="experience_years" className="block text-sm font-medium text-gray-700 mb-1">
                Experience (Years)
              </label>
              <Input id="experience_years" {...register('experience_years')} type="number" placeholder="Experience (Years)" />
            </div>
            <div>
              <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">
                Subjects (comma separated)
              </label>
              <Input id="subjects" {...register('subjects')} placeholder="Subjects (comma separated)" />
            </div>
            <div>
              <label htmlFor="joining_date" className="block text-sm font-medium text-gray-700 mb-1">
                Joining Date
              </label>
              <Input id="joining_date" {...register('joining_date')} type="date" placeholder="Joining Date" required />
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <Input id="salary" {...register('salary')} type="number" placeholder="Salary" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Input id="status" {...register('status')} placeholder="Status" />
            </div>
          </div>
        </fieldset>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Saving...' : 'Add Teacher'}
        </Button>
      </form>
    </div>
  );
};

export default AddTeacher;
