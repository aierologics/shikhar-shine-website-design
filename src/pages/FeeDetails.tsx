import { ArrowLeft, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const FeeDetails = () => {
  // Fee data structure - can be easily updated by management
  const feeData = [
    { class: 'Play', monthlyFee: 700, admissionFee: 1650, compositeFees: 700, examFees: '--------', securityFees: '--------', totalFees: 3050, oldFee: '-----' },
    { class: 'Nurs.', monthlyFee: 850, admissionFee: 1700, compositeFees: 1100, examFees: '300.00', securityFees: '1000.00', totalFees: 4650, oldFee: '1950' },
    { class: 'K.G.', monthlyFee: 900, admissionFee: 1800, compositeFees: 1100, examFees: '150.00/200.00', securityFees: '1000.00', totalFees: 4800, oldFee: '2000' },
    { class: 'I', monthlyFee: 1100, admissionFee: 2000, compositeFees: 1300, examFees: '200.00/250.00', securityFees: '1000.00', totalFees: 5400, oldFee: '2400' },
    { class: 'II', monthlyFee: 1200, admissionFee: 2200, compositeFees: 1300, examFees: '200.00/250.00', securityFees: '1000.00', totalFees: 5700, oldFee: '2500' },
    { class: 'III', monthlyFee: 1300, admissionFee: 2400, compositeFees: 1400, examFees: '200.00/300.00', securityFees: '1000.00', totalFees: 6100, oldFee: '2700' },
    { class: 'IV', monthlyFee: 1400, admissionFee: 2600, compositeFees: 1400, examFees: '200.00/300.00', securityFees: '1000.00', totalFees: 6400, oldFee: '2800' },
    { class: 'V', monthlyFee: 1500, admissionFee: 2800, compositeFees: 1400, examFees: '200.00/300.00', securityFees: '1000.00', totalFees: 6700, oldFee: '2900' },
    { class: 'VI', monthlyFee: 1550, admissionFee: 3300, compositeFees: 1500, examFees: '240/350/350', securityFees: '1000.00', totalFees: 7350, oldFee: '3050' },
    { class: 'VII', monthlyFee: 1650, admissionFee: 3300, compositeFees: 1500, examFees: '240/350/350', securityFees: '1000.00', totalFees: 7450, oldFee: '3150' },
    { class: 'VIII', monthlyFee: 1700, admissionFee: 3300, compositeFees: 1500, examFees: '240/350/350', securityFees: '1000.00', totalFees: 7500, oldFee: '3200' },
    { class: 'IX', monthlyFee: 1900, admissionFee: 4600, compositeFees: 1800, examFees: '280/400/400', securityFees: '1500.00', totalFees: 9800, oldFee: '3700' },
    { class: 'X', monthlyFee: 2020, admissionFee: 6800, compositeFees: 2000, examFees: '280/400/400', securityFees: '1500.00', totalFees: 12320, oldFee: '4020' },
    { class: 'XI Com.', monthlyFee: 2500, admissionFee: 7000, compositeFees: 2600, examFees: '350/450/450', securityFees: '1500.00', totalFees: 13600, oldFee: '5100' },
    { class: 'XI Sc.', monthlyFee: 2750, admissionFee: 7000, compositeFees: 2600, examFees: '350/450/450', securityFees: '1500.00', totalFees: 13850, oldFee: '3250' },
    { class: 'XII Com.', monthlyFee: 2850, admissionFee: 11000, compositeFees: 3000, examFees: '350/450/450', securityFees: '1500.00', totalFees: 18350, oldFee: '5850' },
    { class: 'XII Sc.', monthlyFee: 3150, admissionFee: 11000, compositeFees: 3000, examFees: '350/450/450', securityFees: '1500.00', totalFees: 18650, oldFee: '6150' }
  ];

  const currentSession = "2024-25";

  const handleDownloadPDF = () => {
    // Create a simple PDF download functionality
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Fee Structure ${currentSession} - Shikhar Shishu Sadan</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .header { text-align: center; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Shikhar Shishu Sadan Sr. Sec. School</h1>
              <h2>Fee Structure ${currentSession}</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Monthly Fee</th>
                  <th>Admission Fee</th>
                  <th>Composite Fees</th>
                  <th>Exam Fees</th>
                  <th>Security Fees</th>
                  <th>Total Fees</th>
                </tr>
              </thead>
              <tbody>
                ${feeData.map(fee => `
                  <tr>
                    <td>${fee.class}</td>
                    <td>₹${fee.monthlyFee}</td>
                    <td>₹${fee.admissionFee}</td>
                    <td>₹${fee.compositeFees}</td>
                    <td>${fee.examFees}</td>
                    <td>${fee.securityFees}</td>
                    <td>₹${fee.totalFees}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handlePrintChart = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-school-blue hover:text-school-orange transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-school-blue mb-4">Fee Details</h1>
            <p className="text-xl text-gray-600">Shikhar Shishu Sadan Sr. Sec. School, Dhampur(Bijnore)</p>
            <p className="text-lg text-school-orange font-semibold">Fee Chart - {currentSession}</p>
          </div>

          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <Button 
              variant="outline" 
              className="border-school-orange text-school-orange hover:bg-school-orange hover:text-white"
              onClick={handleDownloadPDF}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button 
              variant="outline" 
              className="border-school-blue text-school-blue hover:bg-school-blue hover:text-white"
              onClick={handlePrintChart}
            >
              <FileText className="mr-2 h-4 w-4" />
              Print Fee Chart
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-school-blue">Fee Structure {currentSession}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-school-blue">Class</TableHead>
                      <TableHead className="font-bold text-school-blue">Monthly Fee</TableHead>
                      <TableHead className="font-bold text-school-blue">Admission Fee</TableHead>
                      <TableHead className="font-bold text-school-blue">Composite Fees</TableHead>
                      <TableHead className="font-bold text-school-blue">Exam Fees (Test/Half yearly/Annual)</TableHead>
                      <TableHead className="font-bold text-school-blue">Security Fees (Refundable)</TableHead>
                      <TableHead className="font-bold text-school-blue">Total Fees</TableHead>
                      <TableHead className="font-bold text-school-blue">Old Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeData.map((fee, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-school-orange">{fee.class}</TableCell>
                        <TableCell>₹{fee.monthlyFee}</TableCell>
                        <TableCell>₹{fee.admissionFee}</TableCell>
                        <TableCell>₹{fee.compositeFees}</TableCell>
                        <TableCell>{fee.examFees}</TableCell>
                        <TableCell>{fee.securityFees}</TableCell>
                        <TableCell className="font-semibold text-school-blue">₹{fee.totalFees}</TableCell>
                        <TableCell>{fee.oldFee}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-school-blue">Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All fees are payable in advance by 10th of each month</li>
                <li>Late fee of ₹100 per month will be charged after the due date</li>
                <li>Security deposit is refundable at the time of leaving the school</li>
                <li>Transport fees are separate and vary according to distance</li>
                <li>Exam fees are applicable for unit tests, half-yearly, and annual examinations</li>
                <li>Fee structure is subject to revision as per management decision</li>
                <li>No fee will be refunded once paid, except security deposit</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FeeDetails;
