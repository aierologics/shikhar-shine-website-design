import { useState, useEffect } from 'react';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';

interface FeeStructure {
  id: string;
  class_name: string;
  monthly_fee: number;
  admission_fee: number;
  composite_fees: number;
  exam_fees: string;
  security_fees: string;
  total_fees: number;
  old_fee: string;
}

const FeeDetails = () => {
  const [feeData, setFeeData] = useState<FeeStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const currentSession = "2024-25";

  useEffect(() => {
    fetchFeeData();
  }, []);

  const fetchFeeData = async () => {
    try {
      const { data, error } = await supabase
        .from('fee_structure')
        .select('*')
        .order('class_name');

      if (error) {
        console.error('Error fetching fee data:', error);
      } else {
        setFeeData(data || []);
      }
    } catch (error) {
      console.error('Error fetching fee data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
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
                    <td>${fee.class_name}</td>
                    <td>₹${fee.monthly_fee}</td>
                    <td>₹${fee.admission_fee}</td>
                    <td>₹${fee.composite_fees}</td>
                    <td>${fee.exam_fees}</td>
                    <td>${fee.security_fees}</td>
                    <td>₹${fee.total_fees}</td>
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

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-xl">Loading fee details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
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
                    {feeData.map((fee) => (
                      <TableRow key={fee.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-school-orange">{fee.class_name}</TableCell>
                        <TableCell>₹{fee.monthly_fee}</TableCell>
                        <TableCell>₹{fee.admission_fee}</TableCell>
                        <TableCell>₹{fee.composite_fees}</TableCell>
                        <TableCell>{fee.exam_fees}</TableCell>
                        <TableCell>{fee.security_fees}</TableCell>
                        <TableCell className="font-semibold text-school-blue">₹{fee.total_fees}</TableCell>
                        <TableCell>{fee.old_fee}</TableCell>
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
