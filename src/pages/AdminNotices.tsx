
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseSession } from '@/hooks/useSupabaseSession';

type NoticeType = 'holiday' | 'admission' | 'meeting' | 'event' | 'sports' | 'exam' | 'general';
type NoticePriority = 'high' | 'medium' | 'low';


interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  notice_type: NoticeType;
  priority: NoticePriority;
  notice_number: number;
  created_at: string;
}

const AdminNotices = () => {

  const { user, userLoading } = useSupabaseSession();
  useEffect(() => {
    if (!userLoading && !user) {
      // maybe redirect to login or show a message
      console.warn('No active session found');
    }
  }, [user, userLoading]);

  const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    notice_type: 'general' as NoticeType,
    priority: 'medium' as NoticePriority,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user?.id) {
        throw new Error("User not authenticated.");
      }

      const createdBy = userData.user.id;

      if (editingNotice) {
        const { data, error } = await supabase
          .from('notices')
          .update({
            title: formData.title,
            content: formData.content,
            date: formData.date,
            notice_type: formData.notice_type,
            priority: formData.priority,
          })
          .eq('id', editingNotice.id)
          .select();

        if (error) throw error;

        toast({ title: "Success", description: "Notice updated successfully" });
      } else {
        const { data, error } = await supabase
          .from('notices')
          .insert({
            title: formData.title,
            content: formData.content,
            date: formData.date,
            notice_type: formData.notice_type,
            priority: formData.priority,
            created_by: createdBy, // ✅ UUID from session
            notice_number: Math.floor(1000 + Math.random() * 9000),
          })
          .select();

        if (error) throw error;

        toast({ title: "Success", description: "Notice created successfully" });
      }

      resetForm();
      setEditingNotice(null);
      setIsDialogOpen(false);
      fetchNotices();
    } catch (error: any) {
      console.error('Error saving notice:', error);

      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Notice deleted successfully" });
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

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      date: '',
      notice_type: 'general',
      priority: 'medium',
    });
  };

  const openEditDialog = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      date: notice.date,
      notice_type: notice.notice_type,
      priority: notice.priority,
    });
    setIsDialogOpen(true);
  };

  const getPriorityColor = (priority: NoticePriority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: NoticeType) => {
    switch (type) {
      case 'holiday': return 'bg-blue-100 text-blue-800';
      case 'admission': return 'bg-purple-100 text-purple-800';
      case 'exam': return 'bg-orange-100 text-orange-800';
      case 'event': return 'bg-pink-100 text-pink-800';
      case 'sports': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Notice Management</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Notice Management</h1>
          <p className="text-gray-600">Create and manage school notices</p>
        </div>
        <Dialog open={!!noticeToDelete} onOpenChange={() => setNoticeToDelete(null)}>
          <DialogContent className="max-w-md text-center">
            <DialogHeader>
              <DialogTitle className="text-red-600">Delete Notice?</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete{' '}
              <strong>{noticeToDelete?.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="destructive"
                onClick={() => {
                  if (noticeToDelete) {
                    handleDelete(noticeToDelete.id);
                    setNoticeToDelete(null);
                  }
                }}
              >
                Yes, Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setNoticeToDelete(null)}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingNotice(null); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingNotice ? 'Edit Notice' : 'Create New Notice'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="notice_type">Type</Label>
                  <Select value={formData.notice_type} onValueChange={(value: NoticeType) => setFormData(prev => ({ ...prev, notice_type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                      <SelectItem value="admission">Admission</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value: NoticePriority) => setFormData(prev => ({ ...prev, priority: value }))}>
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

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={saving}>
                  {saving ? 'Saving...' : editingNotice ? 'Update Notice' : 'Create Notice'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={saving}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(notice.priority)}>
                      {notice.priority}
                    </Badge>
                    <Badge className={getTypeColor(notice.notice_type)}>
                      {notice.notice_type}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(notice)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNoticeToDelete(notice)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(notice.date).toLocaleDateString()}
                </div>
                <span>Notice #{notice.notice_number}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{notice.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminNotices;
