import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface StudentInfoProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ formData, onInputChange }) => {
  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-school-blue">
          <User className="mr-3 h-6 w-6" />
          Student Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="studentName">Full Name *</Label>
            <Input
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={onInputChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={onInputChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender *</Label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={onInputChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-school-blue"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="bloodGroup">Blood Group</Label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={onInputChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-school-blue"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div>
            <Label htmlFor="religion">Religion</Label>
            <Input
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={onInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="caste">Caste</Label>
            <Input
              id="caste"
              name="caste"
              value={formData.caste}
              onChange={onInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="nationality">Nationality *</Label>
            <Input
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={onInputChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="motherTongue">Mother Tongue</Label>
            <Input
              id="motherTongue"
              name="motherTongue"
              value={formData.motherTongue}
              onChange={onInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="aadharNumber">Aadhar Number</Label>
            <Input
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={onInputChange}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentInfo;
