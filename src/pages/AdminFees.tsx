
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Edit, 
  Trash2, 
  Plus,
  Calculator
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface FeeStructure {
  id: string;
  class_name: string;
  admission_fee: number;
  monthly_fee: number;
  composite_fees: number;
  security_fees: string;
  exam_fees: string;
  total_fees: number;
  old_fee?: string;
  created_at: string;
}

const AdminFees = () => {
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFee, setEditingFee] = useState<FeeStructure | null>(null);
  const { toast } = useToast();

  const [classes, setClasses] = useState<{ id: string; class_name: string; section: string }[]>([]);

  const [formData, setFormData] = useState({
    class_name: '',
    admission_fee: 0,
    monthly_fee: 0,
    composite_fees: 0,
    security_fees: '0',
    exam_fees: '0',
    old_fee: '',
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('id, class_name, section')
        .order('class_name', { ascending: true });

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch classes",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchFeeStructures();
  }, []);

  const fetchFeeStructures = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('fee_structure')
        .select('*')
        .order('class_name');

      if (error) throw error;
      setFeeStructures(data || []);
    } catch (error) {
      console.error('Error fetching fee structures:', error);
      toast({
        title: "Error",
        description: "Failed to fetch fee structures",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalFees = () => {
    const total = formData.admission_fee + 
                 formData.monthly_fee + 
                 formData.composite_fees + 
                 parseInt(formData.security_fees || '0') + 
                 parseInt(formData.exam_fees || '0');
    return total;
  };

  const handleSave = async () => {
    if (!formData.class_name) {
      toast({
        title: "Error",
        description: "Class name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const totalFees = calculateTotalFees();

      if (editingFee) {
        const { error } = await supabase
          .from('fee_structure')
          .update({
            class_name: formData.class_name,
            admission_fee: formData.admission_fee,
            monthly_fee: formData.monthly_fee,
            composite_fees: formData.composite_fees,
            security_fees: formData.security_fees,
            exam_fees: formData.exam_fees,
            total_fees: totalFees,
            old_fee: formData.old_fee,
          })
          .eq('id', editingFee.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Fee structure updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('fee_structure')
          .insert({
            class_name: formData.class_name,
            admission_fee: formData.admission_fee,
            monthly_fee: formData.monthly_fee,
            composite_fees: formData.composite_fees,
            security_fees: formData.security_fees,
            exam_fees: formData.exam_fees,
            total_fees: totalFees,
            old_fee: formData.old_fee,
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Fee structure created successfully",
        });
      }

      resetForm();
      fetchFeeStructures();
    } catch (error) {
      console.error('Error saving fee structure:', error);
      toast({
        title: "Error",
        description: "Failed to save fee structure",
        variant: "destructive",
      });
    }
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [feeIdToDelete, setFeeIdToDelete] = useState<string | null>(null);

  const openDeleteDialog = (feeId: string) => {
    setFeeIdToDelete(feeId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setFeeIdToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!feeIdToDelete) return;

    try {
      const { error } = await supabase
        .from('fee_structure')
        .delete()
        .eq('id', feeIdToDelete);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Fee structure deleted successfully",
      });

      fetchFeeStructures();
    } catch (error) {
      console.error('Error deleting fee structure:', error);
      toast({
        title: "Error",
        description: "Failed to delete fee structure",
        variant: "destructive",
      });
    } finally {
      closeDeleteDialog();
    }
  };

  const startEdit = (fee: FeeStructure) => {
    setEditingFee(fee);
    setFormData({
      class_name: fee.class_name,
      admission_fee: fee.admission_fee,
      monthly_fee: fee.monthly_fee,
      composite_fees: fee.composite_fees,
      security_fees: fee.security_fees,
      exam_fees: fee.exam_fees,
      old_fee: fee.old_fee || '',
    });
  };

  const resetForm = () => {
    setFormData({
      class_name: '',
      admission_fee: 0,
      monthly_fee: 0,
      composite_fees: 0,
      security_fees: '0',
      exam_fees: '0',
      old_fee: '',
    });
    setEditingFee(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
              <p className="text-gray-600">Manage school fee structures</p>
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
            <p className="text-gray-600">Manage school fee structures</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Fee Structure
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingFee ? 'Edit Fee Structure' : 'Add Fee Structure'}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
              <Label htmlFor="class_name">Class Name</Label>
              <Select
                value={formData.class_name}
                onValueChange={(value) => setFormData(prev => ({ ...prev, class_name: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.class_name}>
                      {cls.class_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admission_fee">Admission Fee</Label>
                  <Input
                    id="admission_fee"
                    type="number"
                    value={formData.admission_fee}
                    onChange={(e) => setFormData(prev => ({ ...prev, admission_fee: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly_fee">Monthly Fee</Label>
                  <Input
                    id="monthly_fee"
                    type="number"
                    value={formData.monthly_fee}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthly_fee: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="composite_fees">Composite Fees</Label>
                  <Input
                    id="composite_fees"
                    type="number"
                    value={formData.composite_fees}
                    onChange={(e) => setFormData(prev => ({ ...prev, composite_fees: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="security_fees">Security Fees</Label>
                  <Input
                    id="security_fees"
                    value={formData.security_fees}
                    onChange={(e) => setFormData(prev => ({ ...prev, security_fees: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exam_fees">Exam Fees</Label>
                  <Input
                    id="exam_fees"
                    value={formData.exam_fees}
                    onChange={(e) => setFormData(prev => ({ ...prev, exam_fees: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="old_fee">Old Fee (Optional)</Label>
                  <Input
                    id="old_fee"
                    value={formData.old_fee}
                    onChange={(e) => setFormData(prev => ({ ...prev, old_fee: e.target.value }))}
                    placeholder="Previous fee amount"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <Calculator className="h-5 w-5" />
                <span className="font-semibold">Total Fees: ₹{calculateTotalFees()}</span>
              </div>

              <Button onClick={handleSave} className="w-full">
                {editingFee ? 'Update Fee Structure' : 'Create Fee Structure'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {feeStructures.map((fee) => (
          <Card key={fee.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{fee.class_name}</CardTitle>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(fee)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Fee Structure</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-class_name">Class Name</Label>
                          <Input
                            id="edit-class_name"
                            value={formData.class_name}
                            onChange={(e) => setFormData(prev => ({ ...prev, class_name: e.target.value }))}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-admission_fee">Admission Fee</Label>
                            <Input
                              id="edit-admission_fee"
                              type="number"
                              value={formData.admission_fee}
                              onChange={(e) => setFormData(prev => ({ ...prev, admission_fee: parseInt(e.target.value) || 0 }))}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-monthly_fee">Monthly Fee</Label>
                            <Input
                              id="edit-monthly_fee"
                              type="number"
                              value={formData.monthly_fee}
                              onChange={(e) => setFormData(prev => ({ ...prev, monthly_fee: parseInt(e.target.value) || 0 }))}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                          <Calculator className="h-5 w-5" />
                          <span className="font-semibold">Total Fees: ₹{calculateTotalFees()}</span>
                        </div>

                        <Button onClick={handleSave} className="w-full">
                          Update Fee Structure
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog(fee.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Admission Fee</p>
                  <p className="font-semibold">₹{fee.admission_fee}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Fee</p>
                  <p className="font-semibold">₹{fee.monthly_fee}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Composite Fees</p>
                  <p className="font-semibold">₹{fee.composite_fees}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Fees</p>
                  <p className="font-semibold text-lg text-school-blue">₹{fee.total_fees}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to delete this fee structure?
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={closeDeleteDialog}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFees;
