import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Plus, Trash2, Edit3, Megaphone, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface FeeStructure {
  id?: string;
  class_name: string;
  monthly_fee: number;
  admission_fee: number;
  composite_fees: number;
  exam_fees: string;
  security_fees: string;
  total_fees: number;
  old_fee: string;
}
type NoticeType = 'holiday' | 'admission' | 'meeting' | 'event' | 'sports' | 'exam' | 'general';
type NoticePriority = 'high' | 'medium' | 'low';
interface Notice {
  id?: string;
  title: string;
  content: string;
  notice_type: NoticeType;
  priority: NoticePriority;
  date: string;
}

const AdminPanel = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('fees');
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editingNotice, setEditingNotice] = useState<number | null>(null);
  
  // Fee data state
  const [feeData, setFeeData] = useState<FeeStructure[]>([]);
  const [editedRow, setEditedRow] = useState<FeeStructure>({} as FeeStructure);
  
  // Notice data state
  const [notices, setNotices] = useState<Notice[]>([]);
  const [editedNotice, setEditedNoticeData] = useState<Notice>({} as Notice);

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

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    fetchFeeData();
    fetchNotices();
  }, [user, isAdmin, navigate]);

  const fetchFeeData = async () => {
    try {
      const { data, error } = await supabase
        .from('fee_structure')
        .select('*')
        .order('class_name');

      if (error) throw error;
      setFeeData(data || []);
    } catch (error) {
      console.error('Error fetching fee data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch fee data",
        variant: "destructive",
      });
    }
  };

  const fetchNotices = async () => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast({
        title: "Error",
        description: "Failed to fetch notices",
        variant: "destructive",
      });
    }
  };

  // Fee management functions
  const handleEdit = (index: number) => {
    setEditingRow(index);
    setEditedRow({ ...feeData[index] });
  };

  const handleSave = async (index: number) => {
    try {
      const fee = feeData[index];
      if (fee.id) {
        // Update existing
        const { error } = await supabase
          .from('fee_structure')
          .update(editedRow)
          .eq('id', fee.id);
        
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('fee_structure')
          .insert([editedRow]);
        
        if (error) throw error;
      }

      setEditingRow(null);
      fetchFeeData();
      toast({
        title: "Success",
        description: "Fee details updated successfully",
      });
    } catch (error) {
      console.error('Error saving fee data:', error);
      toast({
        title: "Error",
        description: "Failed to save fee data",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRow = async (index: number) => {
    try {
      const fee = feeData[index];
      if (fee.id) {
        const { error } = await supabase
          .from('fee_structure')
          .delete()
          .eq('id', fee.id);
        
        if (error) throw error;
        fetchFeeData();
        toast({
          title: "Success",
          description: "Fee structure deleted successfully",
        });
      }
    } catch (error) {
      console.error('Error deleting fee data:', error);
      toast({
        title: "Error",
        description: "Failed to delete fee data",
        variant: "destructive",
      });
    }
  };

  // Notice management functions
  const handleEditNotice = (index: number) => {
    setEditingNotice(index);
    setEditedNoticeData({ ...notices[index] });
  };

  const handleSaveNotice = async (index: number) => {
    try {
      const notice = notices[index];
      if (notice.id) {
        // Update existing
        const { error } = await supabase
          .from('notices')
          .update(editedNotice)
          .eq('id', notice.id);
        
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('notices')
          .insert([editedNotice]);
        
        if (error) throw error;
      }

      setEditingNotice(null);
      fetchNotices();
      toast({
        title: "Success",
        description: "Notice updated successfully",
      });
    } catch (error) {
      console.error('Error saving notice:', error);
      toast({
        title: "Error",
        description: "Failed to save notice",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNotice = async (index: number) => {
    try {
      const notice = notices[index];
      if (notice.id) {
        const { error } = await supabase
          .from('notices')
          .delete()
          .eq('id', notice.id);
        
        if (error) throw error;
        fetchNotices();
        toast({
          title: "Success",
          description: "Notice deleted successfully",
        });
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      toast({
        title: "Error",
        description: "Failed to delete notice",
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    const option = priorityOptions.find(p => p.value === priority);
    return option ? option.color : 'bg-gray-500';
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user || !isAdmin) {
    return null;
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
              onClick={handleSignOut}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-school-blue mb-4">Admin Panel</h1>
            <p className="text-xl text-gray-600">Manage School Data</p>
            <p className="text-sm text-gray-500">Welcome, {user.email}</p>
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

          {activeTab === 'fees' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-school-blue">Fee Structure Management</CardTitle>
                  <Button onClick={() => {
                    setFeeData([{
                      class_name: '',
                      monthly_fee: 0,
                      admission_fee: 0,
                      composite_fees: 0,
                      exam_fees: '',
                      security_fees: '',
                      total_fees: 0,
                      old_fee: ''
                    }, ...feeData]);
                    setEditingRow(0);
                    setEditedRow({
                      class_name: '',
                      monthly_fee: 0,
                      admission_fee: 0,
                      composite_fees: 0,
                      exam_fees: '',
                      security_fees: '',
                      total_fees: 0,
                      old_fee: ''
                    });
                  }} className="bg-green-600 hover:bg-green-700">
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
                        <tr key={row.id || index} className="hover:bg-gray-50">
                          {editingRow === index ? (
                            <>
                              <td className="border border-gray-300 p-2">
                                <Input
                                  value={editedRow.class_name}
                                  onChange={(e) => setEditedRow({ ...editedRow, class_name: e.target.value })}
                                  className="h-8"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <Input
                                  type="number"
                                  value={editedRow.monthly_fee}
                                  onChange={(e) => setEditedRow({ ...editedRow, monthly_fee: parseInt(e.target.value) })}
                                  className="h-8"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <Input
                                  type="number"
                                  value={editedRow.admission_fee}
                                  onChange={(e) => setEditedRow({ ...editedRow, admission_fee: parseInt(e.target.value) })}
                                  className="h-8"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <Input
                                  type="number"
                                  value={editedRow.composite_fees}
                                  onChange={(e) => setEditedRow({ ...editedRow, composite_fees: parseInt(e.target.value) })}
                                  className="h-8"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <Input
                                  value={editedRow.exam_fees}
                                  onChange={(e) => setEditedRow({ ...editedRow, exam_fees: e.target.value })}
                                  className="h-8"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <Input
                                  value={editedRow.security_fees}
                                  onChange={(e) => setEditedRow({ ...editedRow, security_fees: e.target.value })}
                                  className="h-8"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <Input
                                  type="number"
                                  value={editedRow.total_fees}
                                  onChange={(e) => setEditedRow({ ...editedRow, total_fees: parseInt(e.target.value) })}
                                  className="h-8"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <Input
                                  value={editedRow.old_fee}
                                  onChange={(e) => setEditedRow({ ...editedRow, old_fee: e.target.value })}
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
                                    onClick={() => {
                                      setEditingRow(null);
                                      setEditedRow({} as FeeStructure);
                                    }}
                                    className="h-8 w-8 p-0"
                                  >
                                    ✕
                                  </Button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="border border-gray-300 p-2 font-medium">{row.class_name}</td>
                              <td className="border border-gray-300 p-2">₹{row.monthly_fee}</td>
                              <td className="border border-gray-300 p-2">₹{row.admission_fee}</td>
                              <td className="border border-gray-300 p-2">₹{row.composite_fees}</td>
                              <td className="border border-gray-300 p-2">{row.exam_fees}</td>
                              <td className="border border-gray-300 p-2">{row.security_fees}</td>
                              <td className="border border-gray-300 p-2 font-semibold">₹{row.total_fees}</td>
                              <td className="border border-gray-300 p-2">{row.old_fee}</td>
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

          {activeTab === 'notices' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-school-blue">Notice Board Management</CardTitle>
                  <Button onClick={() => {
                    setNotices([{
                      title: '',
                      content: '',
                      notice_type: 'general',
                      priority: 'medium',
                      date: new Date().toISOString().split('T')[0]
                    }, ...notices]);
                    setEditingNotice(0);
                    setEditedNoticeData({
                      title: '',
                      content: '',
                      notice_type: 'general',
                      priority: 'medium',
                      date: new Date().toISOString().split('T')[0]
                    });
                  }} className="bg-green-600 hover:bg-green-700">
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
                    <Card key={notice.id || index} className="border-l-4" style={{ borderLeftColor: getPriorityColor(notice.priority).replace('bg-', '').replace('-500', '') === 'red' ? '#ef4444' : getPriorityColor(notice.priority).replace('bg-', '').replace('-500', '') === 'yellow' ? '#eab308' : '#22c55e' }}>
                      {editingNotice === index ? (
                        <CardContent className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                value={editedNotice.title}
                                onChange={(e) => setEditedNoticeData({ ...editedNotice, title: e.target.value })}
                                placeholder="Notice title"
                              />
                            </div>
                            <div>
                              <Label htmlFor="date">Date</Label>
                              <Input
                                id="date"
                                type="date"
                                value={editedNotice.date}
                                onChange={(e) => setEditedNoticeData({ ...editedNotice, date: e.target.value })}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="type">Type</Label>
                              <Select value={editedNotice.notice_type} onValueChange={(value) => setEditedNoticeData({ ...editedNotice, notice_type: value as NoticeType })}>
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
                              <Select value={editedNotice.priority} onValueChange={(value) => setEditedNoticeData({ ...editedNotice, priority: value as NoticePriority })}>
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
                              onChange={(e) => setEditedNoticeData({ ...editedNotice, content: e.target.value })}
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
                              onClick={() => {
                                setEditingNotice(null);
                                setEditedNoticeData({} as Notice);
                              }}
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
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityOptions.find(p => p.value === notice.priority)?.textColor} bg-opacity-20`} style={{ backgroundColor: getPriorityColor(notice.priority).replace('bg-', '').replace('-500', '') === 'red' ? '#fef2f2' : getPriorityColor(notice.priority).replace('bg-', '').replace('-500', '') === 'yellow' ? '#fefce8' : '#f0fdf4' }}>
                                  {priorityOptions.find(p => p.value === notice.priority)?.label}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-2">{notice.content}</p>
                              <div className="flex gap-4 text-sm text-gray-500">
                                <span>Type: {noticeTypes.find(t => t.value === notice.notice_type)?.label}</span>
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
