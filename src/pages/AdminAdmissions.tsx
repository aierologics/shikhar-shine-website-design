
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
import { Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Admission {
  id: string;
  student_name: string;
  student_id: string;
  admission_class: string;
  father_name: string;
  mother_name: string;
  father_phone: string;
  mother_phone: string;
  current_address: string;
  status?: string;
  created_at: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  father_email?: string;
  mother_email?: string;
}

const AdminAdmissions = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('admissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmissions(data || []);
    } catch (error) {
      console.error('Error fetching admissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAdmissionStatus = async (id: string, newStatus: string, notes?: string) => {
    try {
      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };

      if (notes) {
        updateData.admin_notes = notes;
      }

      const { error } = await supabase
        .from('admissions')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Admission ${newStatus} successfully`,
      });
      
      fetchAdmissions();
      setIsViewDialogOpen(false);
      setAdminNotes('');
    } catch (error) {
      console.error('Error updating admission status:', error);
      toast({
        title: "Error",
        description: "Failed to update admission status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status?: string) => {
    const currentStatus = status || 'pending';
    switch (currentStatus) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'pending':
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const filteredAdmissions = admissions.filter(admission => {
    const matchesSearch = admission.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admission.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admission.father_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || admission.status === statusFilter || 
                         (statusFilter === 'pending' && !admission.status);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admissions Management</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <CardTitle>Admission Applications</CardTitle>
            <div className="flex gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Father Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmissions.map((admission) => (
                  <TableRow key={admission.id}>
                    <TableCell className="font-medium">{admission.student_name}</TableCell>
                    <TableCell>{admission.student_id}</TableCell>
                    <TableCell>{admission.admission_class}</TableCell>
                    <TableCell>{admission.father_name}</TableCell>
                    <TableCell>{admission.father_phone}</TableCell>
                    <TableCell>{getStatusBadge(admission.status)}</TableCell>
                    <TableCell>
                      {new Date(admission.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAdmission(admission);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Admission Details - {selectedAdmission?.student_name}</DialogTitle>
          </DialogHeader>
          
          {selectedAdmission && (
            <div className="space-y-6">
              {/* Student Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Student Name</Label>
                  <p className="text-sm">{selectedAdmission.student_name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Student ID</Label>
                  <p className="text-sm">{selectedAdmission.student_id}</p>
                </div>
                <div>
                  <Label className="font-semibold">Date of Birth</Label>
                  <p className="text-sm">{new Date(selectedAdmission.date_of_birth).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="font-semibold">Gender</Label>
                  <p className="text-sm">{selectedAdmission.gender}</p>
                </div>
                <div>
                  <Label className="font-semibold">Admission Class</Label>
                  <p className="text-sm">{selectedAdmission.admission_class}</p>
                </div>
                <div>
                  <Label className="font-semibold">Nationality</Label>
                  <p className="text-sm">{selectedAdmission.nationality}</p>
                </div>
              </div>

              {/* Parent Information */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Parent Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Father Name</Label>
                    <p className="text-sm">{selectedAdmission.father_name}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Mother Name</Label>
                    <p className="text-sm">{selectedAdmission.mother_name}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Father Phone</Label>
                    <p className="text-sm">{selectedAdmission.father_phone}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Mother Phone</Label>
                    <p className="text-sm">{selectedAdmission.mother_phone}</p>
                  </div>
                  {selectedAdmission.father_email && (
                    <div>
                      <Label className="font-semibold">Father Email</Label>
                      <p className="text-sm">{selectedAdmission.father_email}</p>
                    </div>
                  )}
                  {selectedAdmission.mother_email && (
                    <div>
                      <Label className="font-semibold">Mother Email</Label>
                      <p className="text-sm">{selectedAdmission.mother_email}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Address</h3>
                <div>
                  <Label className="font-semibold">Current Address</Label>
                  <p className="text-sm">{selectedAdmission.current_address}</p>
                </div>
              </div>

              {/* Status and Notes */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Admin Actions</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold">Current Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedAdmission.status)}</div>
                  </div>
                  
                  <div>
                    <Label htmlFor="admin-notes">Admin Notes</Label>
                    <Textarea
                      id="admin-notes"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add notes about this admission..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => updateAdmissionStatus(selectedAdmission.id, 'approved', adminNotes)}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={selectedAdmission.status === 'approved'}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => updateAdmissionStatus(selectedAdmission.id, 'rejected', adminNotes)}
                      variant="destructive"
                      disabled={selectedAdmission.status === 'rejected'}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => updateAdmissionStatus(selectedAdmission.id, 'pending', adminNotes)}
                      variant="outline"
                      disabled={selectedAdmission.status === 'pending' || !selectedAdmission.status}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Mark Pending
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdmissions;
