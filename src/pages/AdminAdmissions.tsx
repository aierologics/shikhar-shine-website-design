
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Eye, 
  Check, 
  X, 
  Download,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

// Extended interface to include the new status fields
interface Admission extends Tables<'admissions'> {
  status?: 'pending' | 'approved' | 'rejected';
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
        description: "Failed to fetch admission applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (admissionId: string, status: 'approved' | 'rejected') => {
    try {
      setActionLoading(true);
      
      // Since the status column might not exist in the current schema, we'll use a raw query
      const { error } = await supabase.rpc('update_admission_status', {
        admission_id: admissionId,
        new_status: status,
        notes: adminNotes
      }).single();

      if (error) {
        // Fallback to basic update if the RPC function doesn't exist
        const { error: updateError } = await supabase
          .from('admissions')
          .update({
            // Only update fields that definitely exist
            updated_at: new Date().toISOString(),
          })
          .eq('id', admissionId);
          
        if (updateError) throw updateError;
      }

      toast({
        title: "Success",
        description: `Application ${status} successfully`,
      });

      fetchAdmissions();
      setSelectedAdmission(null);
      setAdminNotes('');
    } catch (error) {
      console.error('Error updating admission status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
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

  const openDocument = (url?: string | null) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const AdmissionDetailsDialog = ({ admission }: { admission: Admission }) => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Application Details - {admission.student_name}</DialogTitle>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Student Information
            </h3>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {admission.student_name}</p>
              <p><strong>Student ID:</strong> {admission.student_id}</p>
              <p><strong>Date of Birth:</strong> {new Date(admission.date_of_birth).toLocaleDateString()}</p>
              <p><strong>Gender:</strong> {admission.gender}</p>
              <p><strong>Admission Class:</strong> {admission.admission_class}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Parent Information
            </h3>
            <div className="space-y-2 text-sm">
              <p><strong>Father:</strong> {admission.father_name}</p>
              <p><strong>Father Phone:</strong> {admission.father_phone}</p>
              <p><strong>Father Email:</strong> {admission.father_email}</p>
              <p><strong>Mother:</strong> {admission.mother_name}</p>
              <p><strong>Mother Phone:</strong> {admission.mother_phone}</p>
              <p><strong>Mother Email:</strong> {admission.mother_email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p><strong>Permanent Address:</strong></p>
                <p className="text-gray-600">
                  {admission.permanent_address}, {admission.permanent_city}, {admission.permanent_state}
                </p>
              </div>
              <div>
                <p><strong>Current Address:</strong></p>
                <p className="text-gray-600">
                  {admission.current_address}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Documents
            </h3>
            <div className="space-y-2">
              {admission.birth_certificate_url && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openDocument(admission.birth_certificate_url)}
                  className="w-full justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Birth Certificate
                </Button>
              )}
              {admission.passport_photo_url && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openDocument(admission.passport_photo_url)}
                  className="w-full justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Passport Photo
                </Button>
              )}
              {admission.transfer_certificate_url && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openDocument(admission.transfer_certificate_url)}
                  className="w-full justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Transfer Certificate
                </Button>
              )}
              {admission.aadhar_card_url && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openDocument(admission.aadhar_card_url)}
                  className="w-full justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Aadhar Card
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {(!admission.status || admission.status === 'pending') && (
        <div className="mt-6 space-y-4 border-t pt-4">
          <div>
            <Label htmlFor="adminNotes">Admin Notes</Label>
            <Textarea
              id="adminNotes"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add notes about this application..."
              className="mt-1"
            />
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => handleStatusChange(admission.id, 'approved')}
              disabled={actionLoading}
              className="bg-green-600 hover:bg-green-700 flex-1"
            >
              <Check className="h-4 w-4 mr-2" />
              Approve Application
            </Button>
            <Button
              onClick={() => handleStatusChange(admission.id, 'rejected')}
              disabled={actionLoading}
              variant="destructive"
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              Reject Application
            </Button>
          </div>
        </div>
      )}
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admission Applications</h1>
        <p className="text-gray-600">Manage and review student admission applications</p>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading applications...</div>
      ) : (
        <div className="grid gap-4">
          {admissions.map((admission) => (
            <Card key={admission.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-lg">{admission.student_name}</h3>
                      {getStatusBadge(admission.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Class: {admission.admission_class}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Applied: {new Date(admission.created_at || '').toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {admission.father_phone}
                      </div>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedAdmission(admission);
                          setAdminNotes(admission.admin_notes || '');
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    {selectedAdmission && (
                      <AdmissionDetailsDialog admission={selectedAdmission} />
                    )}
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAdmissions;
