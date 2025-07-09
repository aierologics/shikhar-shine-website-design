import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { LogOut, Megaphone, DollarSign } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    {
      name: 'Fee Management',
      path: '/admin',
      icon: <DollarSign className="size-4" />,
    },
    {
      name: 'Notice Management',
      path: '/admin#notices',
      icon: <Megaphone className="size-4" />,
    },
  ];

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="bg-white border-r border-gray-200">
      <SidebarHeader className="px-4 py-3 border-b border-gray-200">
        <Link to="/admin" className="text-lg font-bold text-school-blue">
          Admin Panel
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <Link
                to={item.path}
                onClick={() => setActiveItem(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeItem === item.path
                    ? 'bg-school-blue text-white'
                    : 'text-gray-700 hover:bg-school-lightBlue hover:text-school-blue'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="px-4 py-3 border-t border-gray-200">
        <SidebarMenuButton onClick={handleSignOut} className="w-full flex items-center gap-2 justify-center text-red-600 hover:bg-red-100">
          <LogOut className="size-4" />
          Sign Out
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
