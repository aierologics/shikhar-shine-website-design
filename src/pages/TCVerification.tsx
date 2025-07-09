
import { ArrowLeft, Search, Download, FileCheck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TCVerification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  // Mock verification data - in real implementation, this would come from a database
  const mockTCData = {
    'TC001': {
      studentName: 'Rahul Sharma',
      fatherName: 'Suresh Sharma',
      rollNumber: '12345',
      class: 'XII Science',
      session: '2023-24',
      tcNumber: 'TC001',
      issueDate: '2024-03-15',
      status: 'Verified',
      dateOfBirth: '2006-05-20',
      caste: 'General',
      conduct: 'Good',
      workingDays: 220,
      attendedDays: 205
    },
    'TC002': {
      studentName: 'Priya Gupta',
      fatherName: 'Rajesh Gupta',
      rollNumber: '12346',
      class: 'X',
      session: '2023-24',
      tcNumber: 'TC002',
      issueDate: '2024-03-10',
      status: 'Verified',
      dateOfBirth: '2008-08-15',
      caste: 'OBC',
      conduct: 'Excellent',
      workingDays: 220,
      attendedDays: 218
    }
  };

  const handleVerification = () => {
    if (searchTerm.trim()) {
      const result = mockTCData[searchTerm.toUpperCase()];
      setVerificationResult(result || 'not_found');
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">       
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-school-blue mb-4">TC Verification</h1>
            <p className="text-xl text-gray-600">Verify Transfer Certificate authenticity</p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-school-blue">Verify Transfer Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tcNumber">Enter TC Number</Label>
                    <Input 
                      id="tcNumber"
                      placeholder="e.g., TC001"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={handleVerification}
                    className="w-full bg-school-blue hover:bg-school-blue/90"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Verify TC
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {verificationResult === 'not_found' && (
            <Alert className="max-w-2xl mx-auto mb-8 border-red-500">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-600">
                TC Number not found. Please check the number and try again.
              </AlertDescription>
            </Alert>
          )}

          {verificationResult && verificationResult !== 'not_found' && (
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-center text-green-700 flex items-center justify-center">
                    <FileCheck className="mr-2 h-5 w-5" />
                    TC Verified Successfully
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Student Name</p>
                        <p className="font-semibold text-school-blue">{verificationResult.studentName}</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Father's Name</p>
                        <p className="font-semibold">{verificationResult.fatherName}</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Roll Number</p>
                        <p className="font-semibold">{verificationResult.rollNumber}</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Class</p>
                        <p className="font-semibold">{verificationResult.class}</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Session</p>
                        <p className="font-semibold">{verificationResult.session}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">TC Number</p>
                        <p className="font-semibold text-school-orange">{verificationResult.tcNumber}</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Issue Date</p>
                        <p className="font-semibold">{verificationResult.issueDate}</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Date of Birth</p>
                        <p className="font-semibold">{verificationResult.dateOfBirth}</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Caste</p>
                        <p className="font-semibold">{verificationResult.caste}</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Conduct</p>
                        <p className="font-semibold text-green-600">{verificationResult.conduct}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Working Days</p>
                      <p className="font-bold text-school-blue text-xl">{verificationResult.workingDays}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Attended Days</p>
                      <p className="font-bold text-green-600 text-xl">{verificationResult.attendedDays}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="border-school-blue text-school-blue hover:bg-school-blue hover:text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download Verification Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-school-blue">About TC Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>
                  The Transfer Certificate (TC) verification system allows you to verify the authenticity 
                  of transfer certificates issued by Shikhar Shishu Sadan Sr. Sec. School.
                </p>
                <h3 className="font-semibold text-school-blue">How to use:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Enter the TC number provided on the transfer certificate</li>
                  <li>Click "Verify TC" to check authenticity</li>
                  <li>View detailed student information if TC is verified</li>
                  <li>Download verification certificate if needed</li>
                </ul>
                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> If you face any issues with verification, please contact the school office 
                    at +91-XXXXXXXXXX or email at info@shikharschool.in
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TCVerification;
