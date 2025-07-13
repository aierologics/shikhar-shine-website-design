import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  DollarSign,
  Megaphone,
  Settings,
  LogOut,
  Images,
  Building,
  Bus,
  Package,
  ClipboardList,
  BookOpen,
  Calendar,
  UserCheck,
  Calculator,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { count: studentsCount, error: studentsError } = await supabase
          .from('students')
          .select('*', { count: 'exact', head: true });

        if (studentsError) throw studentsError;

        console.log('Students count:', studentsCount);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };

    fetchAdminData();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    localStorage.clear();
  };

  const categorizedMenus = [
    {
      category: 'General',
      items: [
        {
          name: 'Dashboard',
          path: '/admin',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      category: 'Academics',
      items: [
        { name: 'Admissions', path: '/admin/admissions', icon: GraduationCap },
        { name: 'Students', path: '/admin/students', icon: Users },
        { name: 'Teachers', path: '/admin/teachers', icon: UserCheck },
        { name: 'Classes & Sections', path: '/admin/classes', icon: BookOpen },
        { name: 'Timetable', path: '/admin/timetable', icon: Calendar },
        { name: 'Exams & Results', path: '/admin/exams', icon: BookOpen },
      ],
    },
    {
      category: 'Finance',
      items: [
        { name: 'Fee Structure', path: '/admin/fees', icon: DollarSign },
        { name: 'Fee Deposits', path: '/admin/fee-deposits', icon: Calculator },
      ],
    },
    {
      category: 'Infrastructure',
      items: [
        { name: 'Hostel Management', path: '/admin/hostels', icon: Building },
        { name: 'Transport & Routes', path: '/admin/transport', icon: Bus },
        { name: 'Inventory', path: '/admin/inventory', icon: Package },
      ],
    },
    {
      category: 'Other',
      items: [
        { name: 'Visitor Logs', path: '/admin/visitors', icon: ClipboardList },
        { name: 'Notices', path: '/admin/notices', icon: Megaphone },
        { name: 'Gallery', path: '/admin/gallery', icon: Images },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
      ],
    },
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="w-64">
          <SidebarHeader className="px-4 py-6 border-b">
            <Link to="/admin" className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/26ea3a81-b7f3-40c6-9fdf-a5fbc0868d77.png"
                alt="School Logo"
                className="h-8 w-8"
              />
              <div>
                <h2 className="text-lg font-bold text-school-blue">Admin Panel</h2>
                <p className="text-xs text-gray-500">Shikhar Shishu Sadan</p>
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent className="px-3 py-4">
            <SidebarMenu>
              {categorizedMenus.map((section) => (
                <div key={section.category} className="mb-2">
                  <button
                    onClick={() => toggleCategory(section.category)}
                    className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase hover:bg-gray-100 rounded"
                  >
                    <span>{section.category}</span>
                    {expandedCategories[section.category] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {expandedCategories[section.category] &&
                    section.items.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              location.pathname === item.path
                                ? 'bg-school-blue text-white'
                                : 'text-gray-700 hover:bg-school-lightBlue hover:text-school-blue'
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </div>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="px-4 py-4 border-t">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <div className="w-8 h-8 bg-school-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 truncate">
                <p className="truncate">{user?.email || 'Admin'}</p>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold text-gray-800">
              School Management System
            </h1>
          </header>

          <div className="flex-1 p-6 bg-gray-50">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
