
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2, Download, Receipt } from 'lucide-react';

interface FeeDeposit {
  id: string;
  student_id: string;
  fee_type: string;
  amount: number;
  payment_method?: string;
  transaction_id?: string;
  receipt_number?: string;
  payment_date: string;
  academic_year: string;
  month_year?: string;
  status: string;
  notes?: string;
  students?: {
    student_id: string;
    first_name: string;
    last_name: string;
    classes?: { class_name: string; section: string };
  };
}

interface Student {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  classes?: { class_name: string; section: string };
}

const AdminFeeDeposits = () => {
  const [feeDeposits, setFeeDeposits] = useState<FeeDeposit[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDeposit, setEditingDeposit] = useState<FeeDeposit | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFeeType, setFilterFeeType] = useState('all');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    student_id: '',
    fee_type: 'tuition',
    amount: 0,
    payment_method: 'cash',
    transaction_id: '',
    receipt_number: '',
    payment_date: new Date().toISOString().split('T')[0],
    academic_year: '2024-2025',
    month_year: '',
    status: 'completed',
    notes: ''
  });

  const feeTypes = [
    { value: 'tuition', label: 'Tuition Fee' },
    { value: 'admission', label: 'Admission Fee' },
    { value: 'exam', label: 'Exam Fee' },
    { value: 'transport', label: 'Transport Fee' },
    { value: 'hostel', label: 'Hostel Fee' },
    { value: 'miscellaneous', label: 'Miscellaneous' }
  ];

  const paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'online', label: 'Online' },
    { value: 'cheque', label: 'Cheque' },
    { value: 'card', label: 'Card' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  useEffect(() => {
    fetchFeeDeposits();
    fetchStudents();
  }, []);

  const fetchFeeDeposits = async () => {
    try {
      const { data, error } = await supabase
        .from('fee_deposits')
        .select(`
          *,
          students (
            student_id,
            first_name,
            last_name,
            classes (
              class_name,
              section
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeeDeposits(data || []);
    } catch (error) {
      console.error('Error fetching fee deposits:', error);
      toast({
        title: "Error",
        description: "Failed to fetch fee deposits",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          id,
          student_id,
          first_name,
          last_name,
          classes (
            class_name,
            section
          )
        `)
        .eq('status', 'active')
        .order('first_name', { ascending: true });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const generateReceiptNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RCP${year}${month}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        receipt_number: formData.receipt_number || generateReceiptNumber()
      };

      if (editingDeposit) {
        const { error } = await supabase
          .from('fee_deposits')
          .update(dataToSubmit)
          .eq('id', editingDeposit.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Fee deposit updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('fee_deposits')
          .insert([dataToSubmit]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Fee deposit added successfully",
        });
      }
      
      setIsDialogOpen(false);
      setEditingDeposit(null);
      resetForm();
      fetchFeeDeposits();
    } catch (error) {
      console.error('Error saving fee deposit:', error);
      toast({
        title: "Error",
        description: "Failed to save fee deposit",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (deposit: FeeDeposit) => {
    setEditingDeposit(deposit);
    setFormData({
      student_id: deposit.student_id,
      fee_type: deposit.fee_type,
      amount: deposit.amount,
      payment_method: deposit.payment_method || 'cash',
      transaction_id: deposit.transaction_id || '',
      receipt_number: deposit.receipt_number || '',
      payment_date: deposit.payment_date,
      academic_year: deposit.academic_year,
      month_year: deposit.month_year || '',
      status: deposit.status,
      notes: deposit.notes || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this fee deposit?')) return;
    
    try {
      const { error } = await supabase
        .from('fee_deposits')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Fee deposit deleted successfully",
      });
      fetchFeeDeposits();
    } catch (error) {
      console.error('Error deleting fee deposit:', error);
      toast({
        title: "Error",
        description: "Failed to delete fee deposit",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      student_id: '',
      fee_type: 'tuition',
      amount: 0,
      payment_method: 'cash',
      transaction_id: '',
      receipt_number: '',
      payment_date: new Date().toISOString().split('T')[0],
      academic_year: '2024-2025',
      month_year: '',
      status: 'completed',
      notes: ''
    });
  };

  const filteredDeposits = feeDeposits.filter(deposit => {
    const matchesSearch = deposit.students?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deposit.students?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deposit.students?.student_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deposit.receipt_number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || deposit.status === filterStatus;
    const matchesFeeType = filterFeeType === 'all' || deposit.fee_type === filterFeeType;
    
    return matchesSearch && matchesStatus && matchesFeeType;
  });

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-blue-100 text-blue-800'
    };
    return statusColors[status as keyof typeof statusColors] || statusColors.completed;
  };

  const totalAmount = filteredDeposits
    .filter(deposit => deposit.status === 'completed')
    .reduce((sum, deposit) => sum + deposit.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Fee Deposits Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingDeposit(null); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Fee Deposit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingDeposit ? 'Edit Fee Deposit' : 'Add New Fee Deposit'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="student_id">Student</Label>
                <Select 
                  value={formData.student_id} 
                  onValueChange={(value) => setFormData({ ...formData, student_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.first_name} {student.last_name} ({student.student_id}) - {student.classes?.class_name} {student.classes?.section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fee_type">Fee Type</Label>
                  <Select 
                    value={formData.fee_type} 
                    onValueChange={(value) => setFormData({ ...formData, fee_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {feeTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payment_method">Payment Method</Label>
                  <Select 
                    value={formData.payment_method} 
                    onValueChange={(value) => setFormData({ ...formData, payment_method: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payment_date">Payment Date</Label>
                  <Input
                    id="payment_date"
                    type="date"
                    value={formData.payment_date}
                    onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="month_year">Month/Year</Label>
                  <Input
                    id="month_year"
                    placeholder="2024-01"
                    value={formData.month_year}
                    onChange={(e) => setFormData({ ...formData, month_year: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transaction_id">Transaction ID</Label>
                  <Input
                    id="transaction_id"
                    value={formData.transaction_id}
                    onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="receipt_number">Receipt Number</Label>
                  <Input
                    id="receipt_number"
                    value={formData.receipt_number}
                    onChange={(e) => setFormData({ ...formData, receipt_number: e.target.value })}
                    placeholder="Auto-generated if empty"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="academic_year">Academic Year</Label>
                <Input
                  id="academic_year"
                  value={formData.academic_year}
                  onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDeposit ? 'Update' : 'Add'} Deposit
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₹{totalAmount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Collections</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{filteredDeposits.filter(d => d.status === 'completed').length}</div>
            <div className="text-sm text-gray-600">Completed Payments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{filteredDeposits.filter(d => d.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">Pending Payments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{filteredDeposits.filter(d => d.status === 'failed').length}</div>
            <div className="text-sm text-gray-600">Failed Payments</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Fee Deposits</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search deposits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterFeeType} onValueChange={setFilterFeeType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Fee Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {feeTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt No.</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Fee Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeposits.map((deposit) => (
                  <TableRow key={deposit.id}>
                    <TableCell className="font-medium">{deposit.receipt_number}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {deposit.students?.first_name} {deposit.students?.last_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {deposit.students?.student_id}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{deposit.fee_type.replace('_', ' ')}</TableCell>
                    <TableCell>₹{deposit.amount.toLocaleString()}</TableCell>
                    <TableCell className="capitalize">{deposit.payment_method}</TableCell>
                    <TableCell>{new Date(deposit.payment_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(deposit.status)}>
                        {deposit.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(deposit)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(deposit.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          title="Print Receipt"
                        >
                          <Receipt className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFeeDeposits;
