import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PreviewProps {
  formData: any;
}
const Preview: React.FC<PreviewProps> = ({ formData }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!printRef.current) return;

    const printContent = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=900,height=650');

    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>Print Preview</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          td {
            padding: 8px;
            border: 1px solid #ddd;
          }
          h1 {
            text-align: center;
            color: #1e40af;
          }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };



  return (
    <Card className="mb-8 shadow-lg p-6 overflow-x-auto">
      <CardHeader ref={printRef}>
        <CardTitle className="text-3xl text-center text-school-blue mb-4">Application Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="min-w-full">
          <tbody>
            <tr>
              <td className=" px-4 py-2 font-semibold">Full Name</td>
              <td className=" px-4 py-2">{formData.studentName}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Date of Birth</td>
              <td className=" px-4 py-2">{formData.dateOfBirth}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Gender</td>
              <td className=" px-4 py-2">{formData.gender}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Blood Group</td>
              <td className=" px-4 py-2">{formData.bloodGroup}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Religion</td>
              <td className=" px-4 py-2">{formData.religion}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Caste</td>
              <td className=" px-4 py-2">{formData.caste}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Nationality</td>
              <td className=" px-4 py-2">{formData.nationality}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Mother Tongue</td>
              <td className=" px-4 py-2">{formData.motherTongue}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Aadhar Number</td>
              <td className=" px-4 py-2">{formData.aadharNumber}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Father's Name</td>
              <td className=" px-4 py-2">{formData.fatherName}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Father's Occupation</td>
              <td className=" px-4 py-2">{formData.fatherOccupation}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Father's Qualification</td>
              <td className=" px-4 py-2">{formData.fatherQualification}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Father's Phone</td>
              <td className=" px-4 py-2">{formData.fatherPhone}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Father's Email</td>
              <td className=" px-4 py-2">{formData.fatherEmail}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Father's Monthly Income</td>
              <td className=" px-4 py-2">{formData.fatherIncome}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Mother's Name</td>
              <td className=" px-4 py-2">{formData.motherName}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Mother's Occupation</td>
              <td className=" px-4 py-2">{formData.motherOccupation}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Mother's Qualification</td>
              <td className=" px-4 py-2">{formData.motherQualification}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Mother's Phone</td>
              <td className=" px-4 py-2">{formData.motherPhone}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Mother's Email</td>
              <td className=" px-4 py-2">{formData.motherEmail}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Mother's Monthly Income</td>
              <td className=" px-4 py-2">{formData.motherIncome}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Permanent Address</td>
              <td className=" px-4 py-2">{formData.permanentAddress}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Permanent City</td>
              <td className=" px-4 py-2">{formData.permanentCity}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Permanent State</td>
              <td className=" px-4 py-2">{formData.permanentState}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Permanent Pincode</td>
              <td className=" px-4 py-2">{formData.permanentPincode}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Current Address</td>
              <td className=" px-4 py-2">{formData.currentAddress}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Current City</td>
              <td className=" px-4 py-2">{formData.currentCity}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Current State</td>
              <td className=" px-4 py-2">{formData.currentState}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Current Pincode</td>
              <td className=" px-4 py-2">{formData.currentPincode}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Previous School</td>
              <td className=" px-4 py-2">{formData.previousSchool}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Previous Class</td>
              <td className=" px-4 py-2">{formData.previousClass}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Previous Percentage</td>
              <td className=" px-4 py-2">{formData.previousPercentage}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Admission Class</td>
              <td className=" px-4 py-2">{formData.admissionClass}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Transport Required</td>
              <td className=" px-4 py-2">{formData.transportRequired}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Medical Conditions</td>
              <td className=" px-4 py-2">{formData.medicalConditions}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Special Requirements</td>
              <td className=" px-4 py-2">{formData.specialRequirements}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Extracurricular Interests</td>
              <td className=" px-4 py-2">{formData.extracurricular}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Emergency Contact</td>
              <td className=" px-4 py-2">{formData.emergencyContact}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Emergency Phone</td>
              <td className=" px-4 py-2">{formData.emergencyPhone}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Birth Certificate</td>
              <td className=" px-4 py-2">{formData.birthCertificate ? formData.birthCertificate.name : 'Not uploaded'}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Transfer Certificate</td>
              <td className=" px-4 py-2">{formData.transferCertificate ? formData.transferCertificate.name : 'Not uploaded'}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Previous Marksheet</td>
              <td className=" px-4 py-2">{formData.marksheet ? formData.marksheet.name : 'Not uploaded'}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Passport Photo</td>
              <td className=" px-4 py-2">{formData.passportPhoto ? formData.passportPhoto.name : 'Not uploaded'}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Aadhar Card</td>
              <td className=" px-4 py-2">{formData.aadharCard ? formData.aadharCard.name : 'Not uploaded'}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2 font-semibold">Address Proof</td>
              <td className=" px-4 py-2">{formData.addressProof ? formData.addressProof.name : 'Not uploaded'}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={handlePrint}
          className="mt-8 bg-school-orange hover:bg-school-orange/90 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Print Preview
        </button>
      </CardContent>
    </Card>
  );
};

export default Preview;