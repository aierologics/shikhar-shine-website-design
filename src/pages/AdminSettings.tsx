
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Save, School } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface SchoolInfo {
  id: string;
  key: string;
  value: string;
  category?: string;
}

const AdminSettings = () => {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    school_name: '',
    school_address: '',
    school_phone: '',
    school_email: '',
    principal_name: '',
    establishment_year: '',
    affiliation_number: '',
    school_code: '',
  });

  useEffect(() => {
    fetchSchoolInfo();
  }, []);

  const fetchSchoolInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('school_info')
        .select('*');

      if (error) throw error;

      const info = data || [];
      setSchoolInfo(info);

      // Populate form data
      const formValues = { ...formData };
      info.forEach((item) => {
        if (item.key in formValues) {
          formValues[item.key as keyof typeof formValues] = item.value;
        }
      });
      setFormData(formValues);
    } catch (error) {
      console.error('Error fetching school info:', error);
      toast({
        title: "Error",
        description: "Failed to fetch school information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const updates = Object.entries(formData).map(([key, value]) => ({
        key,
        value,
        category: 'basic_info',
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('school_info')
          .upsert({
            key: update.key,
            value: update.value,
            category: update.category,
          }, {
            onConflict: 'key'
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "School information updated successfully",
      });

      fetchSchoolInfo();
    } catch (error) {
      console.error('Error updating school info:', error);
      toast({
        title: "Error",
        description: "Failed to update school information",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Settings className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Configure school information and preferences</p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure school information and preferences</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5" />
              School Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school_name">School Name</Label>
                <Input
                  id="school_name"
                  value={formData.school_name}
                  onChange={(e) => handleInputChange('school_name', e.target.value)}
                  placeholder="Enter school name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="establishment_year">Establishment Year</Label>
                <Input
                  id="establishment_year"
                  value={formData.establishment_year}
                  onChange={(e) => handleInputChange('establishment_year', e.target.value)}
                  placeholder="e.g., 1964"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="school_phone">Phone Number</Label>
                <Input
                  id="school_phone"
                  value={formData.school_phone}
                  onChange={(e) => handleInputChange('school_phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="school_email">Email Address</Label>
                <Input
                  id="school_email"
                  type="email"
                  value={formData.school_email}
                  onChange={(e) => handleInputChange('school_email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="principal_name">Principal Name</Label>
                <Input
                  id="principal_name"
                  value={formData.principal_name}
                  onChange={(e) => handleInputChange('principal_name', e.target.value)}
                  placeholder="Enter principal name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="affiliation_number">Affiliation Number</Label>
                <Input
                  id="affiliation_number"
                  value={formData.affiliation_number}
                  onChange={(e) => handleInputChange('affiliation_number', e.target.value)}
                  placeholder="Enter affiliation number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school_address">School Address</Label>
              <Textarea
                id="school_address"
                value={formData.school_address}
                onChange={(e) => handleInputChange('school_address', e.target.value)}
                placeholder="Enter complete school address"
                rows={3}
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full md:w-auto"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
