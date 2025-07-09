import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface AdditionalInfoProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ formData, onInputChange }) => {
  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-school-blue">
          <FileText className="mr-3 h-6 w-6" />
          Additional Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
            <Textarea
              id="medicalConditions"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={onInputChange}
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="specialRequirements">Special Requirements</Label>
            <Textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={onInputChange}
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="extracurricular">Extracurricular Interests</Label>
            <Textarea
              id="extracurricular"
              name="extracurricular"
              value={formData.extracurricular}
              onChange={onInputChange}
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={onInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
            <Input
              id="emergencyPhone"
              name="emergencyPhone"
              type="tel"
              value={formData.emergencyPhone}
              onChange={onInputChange}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfo;
