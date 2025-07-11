import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, GraduationCap, UserCheck, DollarSign } from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalAdmissions: number;
  pendingAdmissions: number;
  approvedAdmissions: number;
  rejectedAdmissions: number;
  totalFees: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalAdmissions: 0,
    pendingAdmissions: 0,
    approvedAdmissions: 0,
    rejectedAdmissions: 0,
    totalFees: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Students count
        const { count: studentsCount, error: studentsError } = await supabase
          .from('students')
          .select('*', { count: 'exact', head: true });
        if (studentsError) throw studentsError;

        // Teachers count
        const { count: teachersCount, error: teachersError } = await supabase
          .from('teachers')
          .select('*', { count: 'exact', head: true });
        if (teachersError) throw teachersError;

        // Admissions
        const { data: admissionsData, error: admissionsDataError } = await supabase
          .from('admissions')
          .select('status');
        if (admissionsDataError) throw admissionsDataError;

        const { count: admissionsCount, error: admissionsCountError } = await supabase
          .from('admissions')
          .select('*', { count: 'exact', head: true });
        if (admissionsCountError) throw admissionsCountError;

        const pendingCount = admissionsData?.filter(a => a.status === 'pending' || !a.status).length ?? 0;
        const approvedCount = admissionsData?.filter(a => a.status === 'approved').length ?? 0;
        const rejectedCount = admissionsData?.filter(a => a.status === 'rejected').length ?? 0;

        // Fees
        const { data: feeData, error: feeError } = await supabase
          .from('fee_deposits')
          .select('amount');
        if (feeError) throw feeError;

        const totalFees = feeData?.reduce((sum, fee) => sum + Number(fee.amount ?? 0), 0) ?? 0;

        setStats({
          totalStudents: studentsCount || 0,
          totalTeachers: teachersCount || 0,
          totalAdmissions: admissionsCount || 0,
          pendingAdmissions: pendingCount,
          approvedAdmissions: approvedCount,
          rejectedAdmissions: rejectedCount,
          totalFees,
        });

        setError(null);
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to fetch dashboard data.');
        setStats({
          totalStudents: 0,
          totalTeachers: 0,
          totalAdmissions: 0,
          pendingAdmissions: 0,
          approvedAdmissions: 0,
          rejectedAdmissions: 0,
          totalFees: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeachers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admissions</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAdmissions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fee Collection</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalFees.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-yellow-600">Pending Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.pendingAdmissions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-green-600">Approved Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.approvedAdmissions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-red-600">Rejected Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.rejectedAdmissions}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
