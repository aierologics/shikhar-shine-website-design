
import { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, Edit3, Lock, Unlock, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('fees');
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editingNotice, setEditingNotice] = useState<number | null>(null);

  // Sample fee data - this would normally come from a database
  const [feeData, setFeeData] = useState([
    { class: 'Play', monthlyFee: 700, admissionFee: 1650, compositeFees: 700, examFees: '--------', securityFees: '--------', totalFees: 3050, oldFee: '-----' },
    { class: 'Nurs.', monthlyFee: 850, admissionFee: 1700, compositeFees: 1100, examFees: '300.00', securityFees: '1000.00', totalFees: 4650, oldFee: '1950' },
    { class: 'K.G.', monthlyFee: 900, admissionFee: 1800, compositeFees: 1100, examFees: '150.00/200.00', securityFees: '1000.00', totalFees: 4800, oldFee: '2000' },
    { class: 'I', monthlyFee: 1100, admissionFee: 2000, compositeFees: 1300, examFees: '200.00/250.00', securityFees: '1000.00', totalFees: 5400, oldFee: '2400' },
    { class: 'II', monthlyFee: 1200, admissionFee: 2200, compositeFees: 1300, examFees: '200.00/250.00', securityFees: '1000.00', totalFees: 5700, oldFee: '2500' },
  ]);

  // Sample notices data
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Independence Day Holiday",
      content: "School will remain closed on 15th August for Independence Day celebration.",
      date: "2024-08-10",
      type: "holiday",
      priority: "high"
    },
    {
      id: 2,
      title: "New Admission Forms Available",
      content: "Admission forms for academic year 2025-26 are now available online and at the school office.",
      date: "2024-07-25",
      type: "admission",
      priority: "high"
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      content: "Monthly PTM scheduled for all classes on 20th August 2024 from 9:00 AM to 12:00 PM.",
      date: "2024-08-05",
      type: "meeting",
      priority: "medium"
    },
  ]);

  const [editedRow, setEditedRow] = useState<any>({});
  const [editedNotice, setEditedNoticeData] = useState<any>({});

  const noticeTypes = [
    { value: 'holiday', label: 'Holiday' },
    { value: 'admission', label: 'Admission' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'event', label: 'Event' },
    { value: 'sports', label: 'Sports' },
    { value: 'exam', label: 'Exam' },
    { value: 'general', label: 'General' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High Priority', color: 'bg-red-500', textColor: 'text-red-500' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
    { value: 'low', label: 'Low Priority', color: 'bg-green-500', textColor: 'text-green-500' }
  ];

  const getPriorityColor = (priority: string) => {
    const option = priorityOptions.find(p => p.value === priority);
    return option ? option.color : 'bg-gray-500';
  };

  const getPriorityTextColor = (priority: string) => {
    const option = priorityOptions.find(p => p.value === priority);
    return option ? option.textColor : 'text-gray-500';
  };

  const handleLogin = () => {
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

  // Fee management functions
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

  // Notice management functions
  const handleEditNotice = (index: number) => {
    setEditingNotice(index);
    setEditedNoticeData({ ...notices[index] });
  };

  const handleSaveNotice = (index: number) => {
    const updatedNotices = [...notices];
    updatedNotices[index] = editedNotice;
    setNotices(updatedNotices);
    setEditingNotice(null);
    toast({
      title: "Success",
      description: "Notice updated successfully",
    });
  };

  const handleCancelNotice = () => {
    setEditingNotice(null);
    setEditedNoticeData({});
  };

  const handleAddNotice = () => {
    const newNotice = {
      id: Math.max(...notices.map(n => n.id)) + 1,
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      type: 'general',
      priority: 'medium'
    };
    setNotices([newNotice, ...notices]);
    setEditingNotice(0);
    setEditedNoticeData(newNotice);
  };

  const handleDeleteNotice = (index: number) => {
    const updatedNotices = notices.filter((_, i) => i !== index);
    setNotices(updatedNotices);
    toast({
      title: "Success",
      description: "Notice deleted successfully",
    });
  };

  const handleNoticeInputChange = (field: string, value: any) => {
    setEditedNoticeData({
      ...editedNotice,
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
            <p className="text-xl text-gray-600">Manage School Data</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <Button
                onClick={() => setActiveTab('fees')}
                variant={activeTab === 'fees' ? 'default' : 'ghost'}
                className="mr-2"
              >
                Fee Management
              </Button>
              <Button
                onClick={() => setActiveTab('notices')}
                variant={activeTab === 'notices' ? 'default' : 'ghost'}
              >
                <Megaphone className="mr-2 h-4 w-4" />
                Notice Management
              </Button>
            </div>
          </div>

          {/* Fee Management Tab */}
          {activeTab === 'fees' && (
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
              </CardContent>
            </Card>
          )}

          {/* Notice Management Tab */}
          {activeTab === 'notices' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-school-blue">Notice Board Management</CardTitle>
                  <Button onClick={handleAddNotice} className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Notice
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Priority Reference Guide */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Priority Color Reference:</h4>
                  <div className="flex gap-4">
                    {priorityOptions.map((priority) => (
                      <div key={priority.value} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${priority.color}`}></div>
                        <span className={`font-medium ${priority.textColor}`}>{priority.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {notices.map((notice, index) => (
                    <Card key={notice.id} className="border-l-4" style={{ borderLeftColor: getPriorityColor(notice.priority).replace('bg-', '').replace('-500', '') === 'red' ? '#ef4444' : getPriorityColor(notice.priority).replace('bg-', '').replace('-500', '') === 'yellow' ? '#eab308' : '#22c55e' }}>
                      {editingNotice === index ? (
                        <CardContent className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                value={editedNotice.title}
                                onChange={(e) => handleNoticeInputChange('title', e.target.value)}
                                placeholder="Notice title"
                              />
                            </div>
                            <div>
                              <Label htmlFor="date">Date</Label>
                              <Input
                                id="date"
                                type="date"
                                value={editedNotice.date}
                                onChange={(e) => handleNoticeInputChange('date', e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="type">Type</Label>
                              <Select value={editedNotice.type} onValueChange={(value) => handleNoticeInputChange('type', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {noticeTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="priority">Priority</Label>
                              <Select value={editedNotice.priority} onValueChange={(value) => handleNoticeInputChange('priority', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  {priorityOptions.map((priority) => (
                                    <SelectItem key={priority.value} value={priority.value}>
                                      <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded ${priority.color}`}></div>
                                        {priority.label}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                              id="content"
                              value={editedNotice.content}
                              onChange={(e) => handleNoticeInputChange('content', e.target.value)}
                              placeholder="Notice content"
                              rows={3}
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleSaveNotice(index)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save className="mr-2 h-4 w-4" />
                              Save Notice
                            </Button>
                            <Button
                              onClick={handleCancelNotice}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      ) : (
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">{notice.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityTextColor(notice.priority)} bg-opacity-20`} style={{ backgroundColor: getPriorityColor(notice.priority).replace('bg-', '').replace('-500', '') === 'red' ? '#fef2f2' : getPriorityColor(notice.priority).replace('bg-', '').replace('-500', '') === 'yellow' ? '#fefce8' : '#f0fdf4' }}>
                                  {priorityOptions.find(p => p.value === notice.priority)?.label}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-2">{notice.content}</p>
                              <div className="flex gap-4 text-sm text-gray-500">
                                <span>Type: {noticeTypes.find(t => t.value === notice.type)?.label}</span>
                                <span>Date: {new Date(notice.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                onClick={() => handleEditNotice(index)}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleDeleteNotice(index)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'fees' && (
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
          )}

          {activeTab === 'notices' && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Notice Management Instructions:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use priority colors to indicate urgency (Red = High, Yellow = Medium, Green = Low)</li>
                <li>• Select appropriate notice type for better organization</li>
                <li>• All notices will appear on the homepage notice board</li>
                <li>• Click Edit to modify existing notices or Delete to remove them</li>
                <li>• Changes are applied instantly to the website</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
