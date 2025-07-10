
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  GraduationCap, 
  FileCheck, 
  DollarSign,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  applicationsThisMonth: number;
  totalUsers: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch admission statistics directly from admissions table
      const { data: admissions, error: admissionError } = await supabase
        .from('admissions')
        .select('*');

      if (admissionError) throw admissionError;

      // Fetch total users count
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (userError) throw userError;

      // Calculate stats manually since the view might not be available
      const totalApplications = admissions?.length || 0;
      const pendingApplications = admissions?.filter(a => !a.status || a.status === 'pending').length || 0;
      const approvedApplications = admissions?.filter(a => a.status === 'approved').length || 0;
      const rejectedApplications = admissions?.filter(a => a.status === 'rejected').length || 0;
      
      const thisMonth = new Date();
      thisMonth.setMonth(thisMonth.getMonth());
      const firstDayOfMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
      
      const applicationsThisMonth = admissions?.filter(a => 
        new Date(a.created_at || '') >= firstDayOfMonth
      ).length || 0;

      setStats({
        totalApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications,
        applicationsThisMonth,
        totalUsers: userCount || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: number;
    icon: any;
    color: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{loading ? '...' : value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the school management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={stats?.totalApplications || 0}
          icon={GraduationCap}
          color="text-blue-600"
        />
        <StatCard
          title="Pending Review"
          value={stats?.pendingApplications || 0}
          icon={FileCheck}
          color="text-yellow-600"
        />
        <StatCard
          title="Approved"
          value={stats?.approvedApplications || 0}
          icon={TrendingUp}
          color="text-green-600"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          color="text-purple-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Month's Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-school-blue">
              {loading ? '...' : stats?.applicationsThisMonth || 0}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              New applications received this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded-md text-sm">
              Review Pending Applications
            </button>
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded-md text-sm">
              Manage User Accounts
            </button>
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded-md text-sm">
              Update Fee Structure
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
