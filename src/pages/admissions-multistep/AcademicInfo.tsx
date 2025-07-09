import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

interface AcademicInfoProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AcademicInfo: React.FC<AcademicInfoProps> = ({ formData, onInputChange }) => {
  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-school-blue">
          <FileText className="mr-3 h-6 w-6" />
          Academic Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="previousSchool">Previous School</Label>
            <Input
              id="previousSchool"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={onInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="previousClass">Previous Class</Label>
            <Input
              id="previousClass"
              name="previousClass"
              value={formData.previousClass}
              onChange={onInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="previousPercentage">Previous Percentage (%)</Label>
            <Input
              id="previousPercentage"
              name="previousPercentage"
              type="number"
              value={formData.previousPercentage}
              onChange={onInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="admissionClass">Admission Class *</Label>
            <select
              id="admissionClass"
              name="admissionClass"
              value={formData.admissionClass}
              onChange={onInputChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-school-blue"
            >
              <option value="">Select Class</option>
              <option value="nursery">Nursery</option>
              <option value="lkg">LKG</option>
              <option value="ukg">UKG</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
            </select>
          </div>
          <div>
            <Label htmlFor="transportRequired">Transport Required</Label>
            <select
              id="transportRequired"
              name="transportRequired"
              value={formData.transportRequired}
              onChange={onInputChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-school-blue"
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicInfo;
