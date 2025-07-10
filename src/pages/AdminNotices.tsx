
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Megaphone, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  notice_type?: string;
  priority?: string;
  notice_number?: number;
  created_at: string;
}

const AdminNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    notice_type: 'general',
    priority: 'medium',
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast({
        title: "Error",
        description: "Failed to fetch notices",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingNotice) {
        const { error } = await supabase
          .from('notices')
          .update({
            title: formData.title,
            content: formData.content,
            date: formData.date,
            notice_type: formData.notice_type,
            priority: formData.priority,
          })
          .eq('id', editingNotice.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Notice updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('notices')
          .insert({
            title: formData.title,
            content: formData.content,
            date: formData.date,
            notice_type: formData.notice_type,
            priority: formData.priority,
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Notice created successfully",
        });
      }

      resetForm();
      fetchNotices();
    } catch (error) {
      console.error('Error saving notice:', error);
      toast({
        title: "Error",
        description: "Failed to save notice",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (noticeId: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;

    try {
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', noticeId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Notice deleted successfully",
      });

      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
      toast({
        title: "Error",
        description: "Failed to delete notice",
        variant: "destructive",
      });
    }
  };

  const startEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      date: notice.date,
      notice_type: notice.notice_type || 'general',
      priority: notice.priority || 'medium',
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      notice_type: 'general',
      priority: 'medium',
    });
    setEditingNotice(null);
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />High</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Low</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800"><Info className="h-3 w-3 mr-1" />Medium</Badge>;
    }
  };

  const getTypeBadge = (type?: string) => {
    const typeColors = {
      holiday: 'bg-blue-100 text-blue-800',
      admission: 'bg-purple-100 text-purple-800',
      meeting: 'bg-orange-100 text-orange-800',
      event: 'bg-pink-100 text-pink-800',
      sports: 'bg-green-100 text-green-800',
      exam: 'bg-red-100 text-red-800',
      general: 'bg-gray-100 text-gray-800',
    };
    
    return (
      <Badge className={typeColors[type as keyof typeof typeColors] || typeColors.general}>
        {type?.charAt(0).toUpperCase() + type?.slice(1) || 'General'}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notice Management</h1>
              <p className="text-gray-600">Create and manage school notices</p>
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notice Management</h1>
            <p className="text-gray-600">Create and manage school notices</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingNotice ? 'Edit Notice' : 'Create New Notice'}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Notice Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter notice title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Notice Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter notice content"
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notice_type">Type</Label>
                  <Select value={formData.notice_type} onValueChange={(value) => setFormData(prev => ({ ...prev, notice_type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                      <SelectItem value="admission">Admission</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                {editingNotice ? 'Update Notice' : 'Create Notice'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{notice.title}</h3>
                    {notice.notice_number && (
                      <Badge variant="outline">#{notice.notice_number}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeBadge(notice.notice_type)}
                    {getPriorityBadge(notice.priority)}
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(notice.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(notice)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Notice</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-title">Notice Title</Label>
                          <Input
                            id="edit-title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="edit-content">Notice Content</Label>
                          <Textarea
                            id="edit-content"
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            rows={6}
                          />
                        </div>

                        <Button onClick={handleSave} className="w-full">
                          Update Notice
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(notice.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{notice.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminNotices;
