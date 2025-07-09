import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface ParentInfoProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ParentInfo: React.FC<ParentInfoProps> = ({ formData, onInputChange }) => {
  return (
    <>
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-school-blue">
            <User className="mr-3 h-6 w-6" />
            Father's Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="fatherName">Father's Name *</Label>
              <Input
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={onInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fatherOccupation">Occupation</Label>
              <Input
                id="fatherOccupation"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={onInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fatherQualification">Qualification</Label>
              <Input
                id="fatherQualification"
                name="fatherQualification"
                value={formData.fatherQualification}
                onChange={onInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fatherPhone">Phone Number *</Label>
              <Input
                id="fatherPhone"
                name="fatherPhone"
                type="tel"
                value={formData.fatherPhone}
                onChange={onInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fatherEmail">Email</Label>
              <Input
                id="fatherEmail"
                name="fatherEmail"
                type="email"
                value={formData.fatherEmail}
                onChange={onInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fatherIncome">Monthly Income</Label>
              <Input
                id="fatherIncome"
                name="fatherIncome"
                type="number"
                value={formData.fatherIncome}
                onChange={onInputChange}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-school-blue">
            <User className="mr-3 h-6 w-6" />
            Mother's Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="motherName">Mother's Name *</Label>
              <Input
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={onInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="motherOccupation">Occupation</Label>
              <Input
                id="motherOccupation"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={onInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="motherQualification">Qualification</Label>
              <Input
                id="motherQualification"
                name="motherQualification"
                value={formData.motherQualification}
                onChange={onInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="motherPhone">Phone Number *</Label>
              <Input
                id="motherPhone"
                name="motherPhone"
                type="tel"
                value={formData.motherPhone}
                onChange={onInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="motherEmail">Email</Label>
              <Input
                id="motherEmail"
                name="motherEmail"
                type="email"
                value={formData.motherEmail}
                onChange={onInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="motherIncome">Monthly Income</Label>
              <Input
                id="motherIncome"
                name="motherIncome"
                type="number"
                value={formData.motherIncome}
                onChange={onInputChange}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ParentInfo;
