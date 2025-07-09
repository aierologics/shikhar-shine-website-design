import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface DocumentUploadProps {
  formData: any;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ formData, onFileChange }) => {
  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-school-blue">
          <Upload className="mr-3 h-6 w-6" />
          Document Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="birthCertificate">Birth Certificate *</Label>
            <Input
              id="birthCertificate"
              name="birthCertificate"
              type="file"
              onChange={onFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="transferCertificate">Transfer Certificate (if applicable)</Label>
            <Input
              id="transferCertificate"
              name="transferCertificate"
              type="file"
              onChange={onFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="marksheet">Previous Marksheet (if applicable)</Label>
            <Input
              id="marksheet"
              name="marksheet"
              type="file"
              onChange={onFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="passportPhoto">Passport Size Photo *</Label>
            <Input
              id="passportPhoto"
              name="passportPhoto"
              type="file"
              onChange={onFileChange}
              accept=".jpg,.jpeg,.png"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="aadharCard">Aadhar Card (Student & Parents)</Label>
            <Input
              id="aadharCard"
              name="aadharCard"
              type="file"
              onChange={onFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="addressProof">Address Proof</Label>
            <Input
              id="addressProof"
              name="addressProof"
              type="file"
              onChange={onFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
