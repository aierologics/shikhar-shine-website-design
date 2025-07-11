
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
import { Plus, Search, Edit, LogOut, Users, Clock } from 'lucide-react';

interface VisitorLog {
  id: string;
  visitor_name: string;
  visitor_phone?: string;
  visitor_email?: string;
  purpose: string;
  person_to_meet?: string;
  department?: string;
  entry_time?: string;
  exit_time?: string;
  id_proof_type?: string;
  id_proof_number?: string;
  photo_url?: string;
  status?: string;
  notes?: string;
}

const AdminVisitors = () => {
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState<VisitorLog | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    visitor_name: '',
    visitor_phone: '',
    visitor_email: '',
    purpose: '',
    person_to_meet: '',
    department: '',
    id_proof_type: 'aadhar',
    id_proof_number: '',
    notes: ''
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const { data, error } = await supabase
        .from('visitor_logs')
        .select('*')
        .order('entry_time', { ascending: false });

      if (error) throw error;
      setVisitors(data || []);
    } catch (error) {
      console.error('Error fetching visitors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch visitor logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVisitor) {
        const { error } = await supabase
          .from('visitor_logs')
          .update(formData)
          .eq('id', editingVisitor.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Visitor log updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('visitor_logs')
          .insert([{ ...formData, status: 'in' }]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Visitor checked in successfully",
        });
      }
      
      setIsDialogOpen(false);
      setEditingVisitor(null);
      resetForm();
      fetchVisitors();
    } catch (error) {
      console.error('Error saving visitor log:', error);
      toast({
        title: "Error",
        description: "Failed to save visitor log",
        variant: "destructive",
      });
    }
  };

  const handleCheckOut = async (id: string) => {
    try {
      const { error } = await supabase
        .from('visitor_logs')
        .update({ 
          status: 'out',
          exit_time: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Visitor checked out successfully",
      });
      fetchVisitors();
    } catch (error) {
      console.error('Error checking out visitor:', error);
      toast({
        title: "Error",
        description: "Failed to check out visitor",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      visitor_name: '',
      visitor_phone: '',
      visitor_email: '',
      purpose: '',
      person_to_meet: '',
      department: '',
      id_proof_type: 'aadhar',
      id_proof_number: '',
      notes: ''
    });
  };

  const handleEdit = (visitor: VisitorLog) => {
    setEditingVisitor(visitor);
    setFormData({
      visitor_name: visitor.visitor_name,
      visitor_phone: visitor.visitor_phone || '',
      visitor_email: visitor.visitor_email || '',
      purpose: visitor.purpose,
      person_to_meet: visitor.person_to_meet || '',
      department: visitor.department || '',
      id_proof_type: visitor.id_proof_type || 'aadhar',
      id_proof_number: visitor.id_proof_number || '',
      notes: visitor.notes || ''
    });
    setIsDialogOpen(true);
  };

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.visitor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (visitor.person_to_meet || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || visitor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const todayVisitors = visitors.filter(visitor => {
    const today = new Date().toDateString();
    const visitorDate = visitor.entry_time ? new Date(visitor.entry_time).toDateString() : '';
    return visitorDate === today;
  });

  const currentlyInside = visitors.filter(visitor => visitor.status === 'in').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Visitor Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingVisitor(null); }}>
              <Plus className="h-4 w-4 mr-2" />
              Check In Visitor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingVisitor ? 'Edit Visitor Log' : 'Check In New Visitor'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="visitor_name">Visitor Name</Label>
                  <Input
                    id="visitor_name"
                    value={formData.visitor_name}
                    onChange={(e) => setFormData({ ...formData, visitor_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="visitor_phone">Phone Number</Label>
                  <Input
                    id="visitor_phone"
                    value={formData.visitor_phone}
                    onChange={(e) => setFormData({ ...formData, visitor_phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="visitor_email">Email</Label>
                <Input
                  id="visitor_email"
                  type="email"
                  value={formData.visitor_email}
                  onChange={(e) => setFormData({ ...formData, visitor_email: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="purpose">Purpose of Visit</Label>
                <Input
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="person_to_meet">Person to Meet</Label>
                  <Input
                    id="person_to_meet"
                    value={formData.person_to_meet}
                    onChange={(e) => setFormData({ ...formData, person_to_meet: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id_proof_type">ID Proof Type</Label>
                  <Select value={formData.id_proof_type} onValueChange={(value) => setFormData({ ...formData, id_proof_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhar">Aadhar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="driving_license">Driving License</SelectItem>
                      <SelectItem value="voter_id">Voter ID</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="id_proof_number">ID Proof Number</Label>
                  <Input
                    id="id_proof_number"
                    value={formData.id_proof_number}
                    onChange={(e) => setFormData({ ...formData, id_proof_number: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingVisitor ? 'Update' : 'Check In'} Visitor
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{todayVisitors.length}</p>
                <p className="text-gray-600">Today's Visitors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{currentlyInside}</p>
                <p className="text-gray-600">Currently Inside</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <LogOut className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{visitors.filter(v => v.status === 'out').length}</p>
                <p className="text-gray-600">Total Checked Out</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search visitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in">Currently In</SelectItem>
              <SelectItem value="out">Checked Out</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visitor Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visitor</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Person to Meet</TableHead>
                  <TableHead>Entry Time</TableHead>
                  <TableHead>Exit Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVisitors.map((visitor) => (
                  <TableRow key={visitor.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{visitor.visitor_name}</div>
                        <div className="text-sm text-gray-500">{visitor.visitor_phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{visitor.purpose}</TableCell>
                    <TableCell>
                      <div>
                        <div>{visitor.person_to_meet || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{visitor.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {visitor.entry_time ? new Date(visitor.entry_time).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {visitor.exit_time ? new Date(visitor.exit_time).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={visitor.status === 'in' ? 'default' : 'secondary'}>
                        {visitor.status === 'in' ? 'Inside' : 'Checked Out'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(visitor)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {visitor.status === 'in' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCheckOut(visitor.id)}
                          >
                            <LogOut className="h-4 w-4" />
                          </Button>
                        )}
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

export default AdminVisitors;
