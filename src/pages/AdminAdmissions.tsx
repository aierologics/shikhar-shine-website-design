
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Download, 
  Check, 
  X, 
  Eye,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Admission {
  id: string;
  student_id: string;
  student_name: string;
  gender: string;
  date_of_birth: string;
  admission_class: string;
  father_name: string;
  mother_name: string;
  father_phone: string;
  mother_phone: string;
  father_email?: string;
  mother_email?: string;
  current_address: string;
  status?: string;
  created_at: string;
  passport_photo_url?: string;
  birth_certificate_url?: string;
  aadhar_card_url?: string;
  marksheet_url?: string;
  transfer_certificate_url?: string;
  address_proof_url?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  admin_notes?: string;
}

const AdminAdmissions = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
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

  const handleStatusUpdate = async (admissionId: string, newStatus: 'approved' | 'rejected') => {
    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('admissions')
        .update({
          status: newStatus,
          reviewed_at: new Date().toISOString(),
          admin_notes: adminNotes || null,
        })
        .eq('id', admissionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Application ${newStatus} successfully`,
      });

      fetchAdmissions();
      setSelectedAdmission(null);
      setAdminNotes('');
    } catch (error) {
      console.error('Error updating admission status:', error);
      toast({
        title: "Error",
        description: "Failed to update admission status",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const DocumentViewDialog = ({ admission }: { admission: Admission }) => (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Documents - {admission.student_name}</DialogTitle>
      </DialogHeader>
      
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Passport Photo', url: admission.passport_photo_url },
          { label: 'Birth Certificate', url: admission.birth_certificate_url },
          { label: 'Aadhar Card', url: admission.aadhar_card_url },
          { label: 'Previous Marksheet', url: admission.marksheet_url },
          { label: 'Transfer Certificate', url: admission.transfer_certificate_url },
          { label: 'Address Proof', url: admission.address_proof_url },
        ].map((doc) => (
          <div key={doc.label} className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">{doc.label}</h4>
            {doc.url ? (
              <div className="space-y-2">
                <img 
                  src={doc.url} 
                  alt={doc.label}
                  className="w-full h-32 object-cover rounded"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(doc.url, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ) : (
              <p className="text-gray-500">Not uploaded</p>
            )}
          </div>
        ))}
      </div>
    </DialogContent>
  );

  const AdminActionDialog = ({ admission }: { admission: Admission }) => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Review Application - {admission.student_name}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="adminNotes">Admin Notes (Optional)</Label>
          <Textarea
            id="adminNotes"
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Add any notes about this application..."
            className="mt-1"
          />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => handleStatusUpdate(admission.id, 'approved')}
            disabled={actionLoading}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4 mr-2" />
            {actionLoading ? 'Processing...' : 'Approve'}
          </Button>
          <Button
            onClick={() => handleStatusUpdate(admission.id, 'rejected')}
            disabled={actionLoading}
            variant="destructive"
            className="flex-1"
          >
            <X className="h-4 w-4 mr-2" />
            {actionLoading ? 'Processing...' : 'Reject'}
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admission Management</h1>
            <p className="text-gray-600">Review and manage student applications</p>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-32 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admission Management</h1>
          <p className="text-gray-600">Review and manage student applications</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Total Applications: {admissions.length}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {admissions.map((admission) => (
          <Card key={admission.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-school-blue rounded-full flex items-center justify-center text-white font-bold">
                      {admission.student_name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{admission.student_name}</h3>
                      <p className="text-gray-600">ID: {admission.student_id}</p>
                    </div>
                    {getStatusBadge(admission.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Class: {admission.admission_class}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      DOB: {new Date(admission.date_of_birth).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {admission.father_phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {admission.father_email || 'No email'}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {admission.current_address.substring(0, 50)}...
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Applied: {new Date(admission.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Documents
                      </Button>
                    </DialogTrigger>
                    <DocumentViewDialog admission={admission} />
                  </Dialog>
                  
                  {admission.status !== 'approved' && admission.status !== 'rejected' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => setSelectedAdmission(admission)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      {selectedAdmission && (
                        <AdminActionDialog admission={selectedAdmission} />
                      )}
                    </Dialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAdmissions;
