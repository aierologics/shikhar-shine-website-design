
import { ArrowLeft, Search, Download, FileCheck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TCVerification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const printRef = useRef(null);

  // Mock verification data - extended with all details from screenshot
  const mockTCData = {
    'TC001': {
      admissionNo: '255/2016-17',
      srNo: '139',
      rollNumber:2098,
      class:"XII Science",
      session:"2024-25",
      studentName: 'Rahul Sharma',
      fatherName: 'Suresh Sharma',
      motherName: 'Sunita Sharma',
      nationality: 'Indian',
      caste: 'General',
      scst: 'No',
      firstAdmissionDate: '2011-04-15',
      dob: '2006-05-20',
      dobWords: 'Fifteen April Two Thousand Six',
      lastClassStudied: 'XII Science',
      boardExam: 'CBSE Annual Examination',
      failedBefore: 'No',
      subjects: 'English, Hindi, Math, Physics, Chemistry',
      promotionStatus: 'Promoted to Grade XII',
      totalWorkingDays: 220,
      totalPresentDays: 205,
      nccScoutGuide: 'No',
      gamesActivities: 'Football, Basketball',
      generalConduct: 'Good',
      applicationDate: '2024-03-01',
      issueDate: '2024-03-15',
      reasonForLeaving: 'Relocation of family',
      otherRemarks: 'N/A',
      classTeacherSign: 'Class Teacher Signature',
      principalSign: 'Principal Signature',
      schoolSeal: 'School Seal',
      tcNumber: 'TC001',
      status: 'Verified'
    },
    'TC002': {
      admissionNo: '256/2017-18',
      srNo: '140',
      rollNumber:2099,
      class:"X",
      session:"2024-25",
      studentName: 'Priya Gupta',
      fatherName: 'Rajesh Gupta',
      motherName: 'Anita Gupta',
      nationality: 'Indian',
      caste: 'OBC',
      scst: 'No',
      firstAdmissionDate: '2012-06-10',
      dob: '2008-08-15',
      dobWords: 'Fifteen August Two Thousand Eight',
      lastClassStudied: 'X',
      boardExam: 'CBSE Annual Examination',
      failedBefore: 'No',
      subjects: 'English, Hindi, Math, Social Science',
      promotionStatus: 'Promoted to Grade XI',
      totalWorkingDays: 220,
      totalPresentDays: 218,
      nccScoutGuide: 'Yes',
      gamesActivities: 'Volleyball, Chess',
      generalConduct: 'Excellent',
      applicationDate: '2024-02-25',
      issueDate: '2024-03-10',
      reasonForLeaving: 'Transfer to another school',
      otherRemarks: 'N/A',
      classTeacherSign: 'Class Teacher Signature',
      principalSign: 'Principal Signature',
      schoolSeal: 'School Seal',
      tcNumber: 'TC002',
      status: 'Verified'
    }
  };

  const handleVerification = () => {
    if (searchTerm.trim()) {
      const result = mockTCData[searchTerm.toUpperCase()];
      setVerificationResult(result || 'not_found');
    }
  };

  const handleDownload = async () => {
    if (!verificationResult) return;
    const input = printRef.current;
    if (!input) return;

    const pdf = new jsPDF('p', 'pt', 'a4');
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${verificationResult.studentName}_TC.pdf`);
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
            <>
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
                          <p className="font-semibold">{verificationResult.dob}</p>
                        </div>
                        <div className="border-b pb-2">
                          <p className="text-sm text-gray-600">Caste</p>
                          <p className="font-semibold">{verificationResult.caste}</p>
                        </div>
                        <div className="border-b pb-2">
                          <p className="text-sm text-gray-600">Conduct</p>
                          <p className="font-semibold text-green-600">{verificationResult.generalConduct}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Working Days</p>
                        <p className="font-bold text-school-blue text-xl">{verificationResult.totalWorkingDays}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Attended Days</p>
                        <p className="font-bold text-green-600 text-xl">{verificationResult.totalPresentDays}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Button 
                        variant="outline" 
                        className="border-school-blue text-school-blue hover:bg-school-blue hover:text-white"
                        onClick={handleDownload}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Verification Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hidden full TC content for PDF generation */}
              <div ref={printRef} style={{ position: 'absolute', left: '-9999px', top: 0, width: '210mm', padding: '20mm', backgroundColor: 'white', color: 'black', fontSize: '10pt', lineHeight: '1.1' }}>
                <div style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src="/lovable-uploads/26ea3a81-b7f3-40c6-9fdf-a5fbc0868d77.png" 
                      alt="School Logo" 
                      style={{ height: '60px', marginRight: '10px', marginTop:"5px" }} 
                    />
                    <div>
                      <h2 style={{ fontWeight: 'bold', fontSize: '18pt', color: '#0033a0', margin: 0 }}>
                        Shikhar Shishu Sadan Senior Secondary School <br></br>
                      </h2>
                      <p>(Kshatriya Nagar, Dhampur, 246761, Uttar Pradesh - India)</p>
                      <div style={{ fontSize: '12pt', color: '#555' }}>
                        Affiliated to C.B.S.E New Delhi
                      </div>
                    </div>
                  </div>
                  <h3 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14pt', marginBottom: '10px' }}>
                    TRANSFER CERTIFICATE
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div><strong>Admission No.:</strong> {verificationResult.admissionNo}</div>
                    <div><strong>S. R. No.:</strong> {verificationResult.srNo}</div>
                  </div>
                  <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr><td style={{  padding: '5px' }}>1. Name of the Pupil</td><td style={{  padding: '5px' }}>{verificationResult.studentName}</td></tr>
                      <tr><td style={{  padding: '5px' }}>2. Father's / Guardian's name</td><td style={{  padding: '5px' }}>{verificationResult.fatherName}</td></tr>
                      <tr><td style={{  padding: '5px' }}>3. Mother's Name</td><td style={{  padding: '5px' }}>{verificationResult.motherName}</td></tr>
                      <tr><td style={{  padding: '5px' }}>4. Nationality</td><td style={{  padding: '5px' }}>{verificationResult.nationality}</td></tr>
                      <tr><td style={{  padding: '5px' }}>5. Caste</td><td style={{  padding: '5px' }}>{verificationResult.caste}</td></tr>
                      <tr><td style={{  padding: '5px' }}>6. Whether the Candidate belongs to SC / ST</td><td style={{  padding: '5px' }}>{verificationResult.scst}</td></tr>
                      <tr><td style={{  padding: '5px' }}>7. Date of First admission in school with class</td><td style={{  padding: '5px' }}>{verificationResult.firstAdmissionDate}</td></tr>
                      <tr><td style={{  padding: '5px' }}>8. Date of Birth (In Christian Era) according to admission Registration in Figure & words</td><td style={{  padding: '5px' }}>{verificationResult.dob} ({verificationResult.dobWords})</td></tr>
                      <tr><td style={{  padding: '5px' }}>9. Class in which the pupil last studied in words & Figure</td><td style={{  padding: '5px' }}>{verificationResult.lastClassStudied}</td></tr>
                      <tr><td style={{  padding: '5px' }}>10. School / Board Annual Examination last taken with result</td><td style={{  padding: '5px' }}>{verificationResult.boardExam}</td></tr>
                      <tr><td style={{  padding: '5px' }}>11. Whether failed : if so once / twice in the same class</td><td style={{  padding: '5px' }}>{verificationResult.failedBefore}</td></tr>
                      <tr><td style={{  padding: '5px' }}>12. Subjects studied / Compulsory</td><td style={{  padding: '5px' }}>{verificationResult.subjects}</td></tr>
                      <tr><td style={{  padding: '5px' }}>13. Whether qualified for promotion to higher class is so, to which class</td><td style={{  padding: '5px' }}>{verificationResult.promotionStatus}</td></tr>
                      <tr><td style={{  padding: '5px' }}>14. Total No. of working days</td><td style={{  padding: '5px' }}>{verificationResult.totalWorkingDays}</td></tr>
                      <tr><td style={{  padding: '5px' }}>15. Total No. of working days present</td><td style={{  padding: '5px' }}>{verificationResult.totalPresentDays}</td></tr>
                      <tr><td style={{  padding: '5px' }}>16. Whether NCC Cadet/Boys Scout/Girl Guide (Details may be given)</td><td style={{  padding: '5px' }}>{verificationResult.nccScoutGuide}</td></tr>
                      <tr><td style={{  padding: '5px' }}>17. Games played or extra curricular activities which the pupil usually took part</td><td style={{  padding: '5px' }}>{verificationResult.gamesActivities}</td></tr>
                      <tr><td style={{  padding: '5px' }}>18. General Conduct</td><td style={{  padding: '5px' }}>{verificationResult.generalConduct}</td></tr>
                      <tr><td style={{  padding: '5px' }}>19. Date of application for certificate</td><td style={{  padding: '5px' }}>{verificationResult.applicationDate}</td></tr>
                      <tr><td style={{  padding: '5px' }}>20. Date of Issue of Certificate</td><td style={{  padding: '5px' }}>{verificationResult.issueDate}</td></tr>
                      <tr><td style={{  padding: '5px' }}>21. Reason for leaving the school</td><td style={{  padding: '5px' }}>{verificationResult.reasonForLeaving}</td></tr>
                      <tr><td style={{  padding: '5px' }}>22. Any Other Remarks</td><td style={{  padding: '5px' }}>{verificationResult.otherRemarks}</td></tr>
                    </tbody>
                  </table>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p>{verificationResult.classTeacherSign}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p>{verificationResult.principalSign}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p>{verificationResult.schoolSeal}</p>
                    </div>
                  </div>
                </div>
                <p className='italic'>This Transfer Certificate will be considered invalid without principal's stamp and CT signature.</p>
              </div>
            </>
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
