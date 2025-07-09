
import { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, Edit3, Lock, Unlock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingRow, setEditingRow] = useState<number | null>(null);

  // Sample fee data - this would normally come from a database
  const [feeData, setFeeData] = useState([
    { class: 'Play', monthlyFee: 700, admissionFee: 1650, compositeFees: 700, examFees: '--------', securityFees: '--------', totalFees: 3050, oldFee: '-----' },
    { class: 'Nurs.', monthlyFee: 850, admissionFee: 1700, compositeFees: 1100, examFees: '300.00', securityFees: '1000.00', totalFees: 4650, oldFee: '1950' },
    { class: 'K.G.', monthlyFee: 900, admissionFee: 1800, compositeFees: 1100, examFees: '150.00/200.00', securityFees: '1000.00', totalFees: 4800, oldFee: '2000' },
    { class: 'I', monthlyFee: 1100, admissionFee: 2000, compositeFees: 1300, examFees: '200.00/250.00', securityFees: '1000.00', totalFees: 5400, oldFee: '2400' },
    { class: 'II', monthlyFee: 1200, admissionFee: 2200, compositeFees: 1300, examFees: '200.00/250.00', securityFees: '1000.00', totalFees: 5700, oldFee: '2500' },
  ]);

  const [editedRow, setEditedRow] = useState<any>({});

  const handleLogin = () => {
    // Simple password check - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Successfully logged in to admin panel",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (index: number) => {
    setEditingRow(index);
    setEditedRow({ ...feeData[index] });
  };

  const handleSave = (index: number) => {
    const updatedData = [...feeData];
    updatedData[index] = editedRow;
    setFeeData(updatedData);
    setEditingRow(null);
    toast({
      title: "Success",
      description: "Fee details updated successfully",
    });
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedRow({});
  };

  const handleAddRow = () => {
    const newRow = {
      class: '',
      monthlyFee: 0,
      admissionFee: 0,
      compositeFees: 0,
      examFees: '',
      securityFees: '',
      totalFees: 0,
      oldFee: ''
    };
    setFeeData([...feeData, newRow]);
    setEditingRow(feeData.length);
    setEditedRow(newRow);
  };

  const handleDeleteRow = (index: number) => {
    const updatedData = feeData.filter((_, i) => i !== index);
    setFeeData(updatedData);
    toast({
      title: "Success",
      description: "Row deleted successfully",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedRow({
      ...editedRow,
      [field]: value
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-school-blue hover:text-school-orange transition-colors mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>

            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    <Lock className="h-5 w-5" />
                    Admin Login
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                  </div>
                  <Button onClick={handleLogin} className="w-full bg-school-blue hover:bg-school-blue/90">
                    <Unlock className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    Demo password: admin123
                  </p>
                </CardContent>
              </Card>
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
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="inline-flex items-center text-school-blue hover:text-school-orange transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Logout
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-school-blue mb-4">Admin Panel</h1>
            <p className="text-xl text-gray-600">Manage Fee Details</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-school-blue">Fee Structure Management</CardTitle>
                <Button onClick={handleAddRow} className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Class
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-2 text-left">Class</th>
                      <th className="border border-gray-300 p-2 text-left">Monthly Fee</th>
                      <th className="border border-gray-300 p-2 text-left">Admission Fee</th>
                      <th className="border border-gray-300 p-2 text-left">Composite Fees</th>
                      <th className="border border-gray-300 p-2 text-left">Exam Fees</th>
                      <th className="border border-gray-300 p-2 text-left">Security Fees</th>
                      <th className="border border-gray-300 p-2 text-left">Total Fees</th>
                      <th className="border border-gray-300 p-2 text-left">Old Fee</th>
                      <th className="border border-gray-300 p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {editingRow === index ? (
                          <>
                            <td className="border border-gray-300 p-2">
                              <Input
                                value={editedRow.class}
                                onChange={(e) => handleInputChange('class', e.target.value)}
                                className="h-8"
                              />
                            </td>
                            <td className="border border-gray-300 p-2">
                              <Input
                                type="number"
                                value={editedRow.monthlyFee}
                                onChange={(e) => handleInputChange('monthlyFee', parseInt(e.target.value))}
                                className="h-8"
                              />
                            </td>
                            <td className="border border-gray-300 p-2">
                              <Input
                                type="number"
                                value={editedRow.admissionFee}
                                onChange={(e) => handleInputChange('admissionFee', parseInt(e.target.value))}
                                className="h-8"
                              />
                            </td>
                            <td className="border border-gray-300 p-2">
                              <Input
                                type="number"
                                value={editedRow.compositeFees}
                                onChange={(e) => handleInputChange('compositeFees', parseInt(e.target.value))}
                                className="h-8"
                              />
                            </td>
                            <td className="border border-gray-300 p-2">
                              <Input
                                value={editedRow.examFees}
                                onChange={(e) => handleInputChange('examFees', e.target.value)}
                                className="h-8"
                              />
                            </td>
                            <td className="border border-gray-300 p-2">
                              <Input
                                value={editedRow.securityFees}
                                onChange={(e) => handleInputChange('securityFees', e.target.value)}
                                className="h-8"
                              />
                            </td>
                            <td className="border border-gray-300 p-2">
                              <Input
                                type="number"
                                value={editedRow.totalFees}
                                onChange={(e) => handleInputChange('totalFees', parseInt(e.target.value))}
                                className="h-8"
                              />
                            </td>
                            <td className="border border-gray-300 p-2">
                              <Input
                                value={editedRow.oldFee}
                                onChange={(e) => handleInputChange('oldFee', e.target.value)}
                                className="h-8"
                              />
                            </td>
                            <td className="border border-gray-300 p-2">
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  onClick={() => handleSave(index)}
                                  className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0"
                                >
                                  <Save className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancel}
                                  className="h-8 w-8 p-0"
                                >
                                  ✕
                                </Button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="border border-gray-300 p-2 font-medium">{row.class}</td>
                            <td className="border border-gray-300 p-2">₹{row.monthlyFee}</td>
                            <td className="border border-gray-300 p-2">₹{row.admissionFee}</td>
                            <td className="border border-gray-300 p-2">₹{row.compositeFees}</td>
                            <td className="border border-gray-300 p-2">{row.examFees}</td>
                            <td className="border border-gray-300 p-2">{row.securityFees}</td>
                            <td className="border border-gray-300 p-2 font-semibold">₹{row.totalFees}</td>
                            <td className="border border-gray-300 p-2">{row.oldFee}</td>
                            <td className="border border-gray-300 p-2">
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  onClick={() => handleEdit(index)}
                                  className="bg-blue-600 hover:bg-blue-700 h-8 w-8 p-0"
                                >
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleDeleteRow(index)}
                                  className="bg-red-600 hover:bg-red-700 h-8 w-8 p-0"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Click the Edit button to modify any row</li>
                  <li>• Click Save to confirm changes or ✕ to cancel</li>
                  <li>• Use "Add New Class" to add more fee structures</li>
                  <li>• Changes are saved locally for demonstration purposes</li>
                  <li>• In production, this would connect to a real database</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
