
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Edit, 
  Mail,
  Calendar,
  Shield
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      setUpdateLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editingUser.full_name,
          role: editingUser.role,
        })
        .eq('id', editingUser.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User updated successfully",
      });

      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">User</Badge>;
    }
  };

  const UserEditDialog = ({ user }: { user: UserProfile }) => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit User - {user.email}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={editingUser?.full_name || ''}
            onChange={(e) => setEditingUser(prev => 
              prev ? { ...prev, full_name: e.target.value } : null
            )}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            value={editingUser?.role || 'user'}
            onValueChange={(value: 'admin' | 'user') => 
              setEditingUser(prev => 
                prev ? { ...prev, role: value } : null
              )
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleUpdateUser}
            disabled={updateLoading}
            className="flex-1"
          >
            {updateLoading ? 'Updating...' : 'Update User'}
          </Button>
          <Button
            onClick={() => setEditingUser(null)}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Total Users: {users.length}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 bg-school-blue rounded-full flex items-center justify-center text-white font-bold">
                        {user.full_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user.full_name || 'No Name'}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                      {getRoleBadge(user.role)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Joined: {new Date(user.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Role: {user.role}
                      </div>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        onClick={() => setEditingUser(user)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit User
                      </Button>
                    </DialogTrigger>
                    {editingUser && (
                      <UserEditDialog user={editingUser} />
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

export default AdminUsers;
