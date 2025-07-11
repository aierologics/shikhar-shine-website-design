
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2, Building, Bed } from 'lucide-react';

interface Hostel {
  id: string;
  hostel_name: string;
  hostel_type?: string;
  total_capacity: number;
  current_occupancy?: number;
  warden_id?: string;
  address?: string;
  facilities?: string[];
  teachers?: { first_name: string; last_name: string };
}

interface HostelRoom {
  id: string;
  hostel_id: string;
  room_number: string;
  room_type?: string;
  capacity: number;
  current_occupancy?: number;
  monthly_fee?: number;
  status?: string;
  hostels?: { hostel_name: string };
}

interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
}

const AdminHostels = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [rooms, setRooms] = useState<HostelRoom[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHostelDialogOpen, setIsHostelDialogOpen] = useState(false);
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);
  const [editingHostel, setEditingHostel] = useState<Hostel | null>(null);
  const [editingRoom, setEditingRoom] = useState<HostelRoom | null>(null);
  const [activeTab, setActiveTab] = useState('hostels');
  const { toast } = useToast();

  const [hostelFormData, setHostelFormData] = useState({
    hostel_name: '',
    hostel_type: 'boys',
    total_capacity: 0,
    warden_id: '',
    address: '',
    facilities: [] as string[]
  });

  const [roomFormData, setRoomFormData] = useState({
    hostel_id: '',
    room_number: '',
    room_type: 'double',
    capacity: 2,
    monthly_fee: 0,
    status: 'available'
  });

  const facilityOptions = [
    'WiFi', 'Library', 'Mess', 'Recreation Room', 'Study Hall', 
    'Medical Room', 'Laundry', 'Security', 'Parking', 'Generator'
  ];

  useEffect(() => {
    fetchHostels();
    fetchRooms();
    fetchTeachers();
  }, []);

  const fetchHostels = async () => {
    try {
      const { data, error } = await supabase
        .from('hostels')
        .select(`
          *,
          teachers (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHostels(data || []);
    } catch (error) {
      console.error('Error fetching hostels:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hostels",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('hostel_rooms')
        .select(`
          *,
          hostels (
            hostel_name
          )
        `)
        .order('room_number', { ascending: true });

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching hostel rooms:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('id, first_name, last_name')
        .eq('status', 'active');

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleHostelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHostel) {
        const { error } = await supabase
          .from('hostels')
          .update(hostelFormData)
          .eq('id', editingHostel.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Hostel updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('hostels')
          .insert([hostelFormData]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Hostel added successfully",
        });
      }
      
      setIsHostelDialogOpen(false);
      setEditingHostel(null);
      resetHostelForm();
      fetchHostels();
    } catch (error) {
      console.error('Error saving hostel:', error);
      toast({
        title: "Error",
        description: "Failed to save hostel",
        variant: "destructive",
      });
    }
  };

  const handleRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        const { error } = await supabase
          .from('hostel_rooms')
          .update(roomFormData)
          .eq('id', editingRoom.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Room updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('hostel_rooms')
          .insert([roomFormData]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Room added successfully",
        });
      }
      
      setIsRoomDialogOpen(false);
      setEditingRoom(null);
      resetRoomForm();
      fetchRooms();
    } catch (error) {
      console.error('Error saving room:', error);
      toast({
        title: "Error",
        description: "Failed to save room",
        variant: "destructive",
      });
    }
  };

  const handleDeleteHostel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hostel?')) return;
    
    try {
      const { error } = await supabase
        .from('hostels')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Hostel deleted successfully",
      });
      fetchHostels();
    } catch (error) {
      console.error('Error deleting hostel:', error);
      toast({
        title: "Error",
        description: "Failed to delete hostel",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    
    try {
      const { error } = await supabase
        .from('hostel_rooms')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Room deleted successfully",
      });
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
      toast({
        title: "Error",
        description: "Failed to delete room",
        variant: "destructive",
      });
    }
  };

  const resetHostelForm = () => {
    setHostelFormData({
      hostel_name: '',
      hostel_type: 'boys',
      total_capacity: 0,
      warden_id: '',
      address: '',
      facilities: []
    });
  };

  const resetRoomForm = () => {
    setRoomFormData({
      hostel_id: '',
      room_number: '',
      room_type: 'double',
      capacity: 2,
      monthly_fee: 0,
      status: 'available'
    });
  };

  const handleEditHostel = (hostel: Hostel) => {
    setEditingHostel(hostel);
    setHostelFormData({
      hostel_name: hostel.hostel_name,
      hostel_type: hostel.hostel_type || 'boys',
      total_capacity: hostel.total_capacity,
      warden_id: hostel.warden_id || '',
      address: hostel.address || '',
      facilities: hostel.facilities || []
    });
    setIsHostelDialogOpen(true);
  };

  const handleEditRoom = (room: HostelRoom) => {
    setEditingRoom(room);
    setRoomFormData({
      hostel_id: room.hostel_id,
      room_number: room.room_number,
      room_type: room.room_type || 'double',
      capacity: room.capacity,
      monthly_fee: room.monthly_fee || 0,
      status: room.status || 'available'
    });
    setIsRoomDialogOpen(true);
  };

  const filteredHostels = hostels.filter(hostel =>
    hostel.hostel_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRooms = rooms.filter(room =>
    room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (room.hostels?.hostel_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Hostel Management</h1>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'hostels' ? 'default' : 'outline'}
            onClick={() => setActiveTab('hostels')}
          >
            <Building className="h-4 w-4 mr-2" />
            Hostels
          </Button>
          <Button
            variant={activeTab === 'rooms' ? 'default' : 'outline'}
            onClick={() => setActiveTab('rooms')}
          >
            <Bed className="h-4 w-4 mr-2" />
            Rooms
          </Button>
        </div>
      </div>

      {activeTab === 'hostels' && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search hostels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Dialog open={isHostelDialogOpen} onOpenChange={setIsHostelDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetHostelForm(); setEditingHostel(null); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Hostel
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingHostel ? 'Edit Hostel' : 'Add New Hostel'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleHostelSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hostel_name">Hostel Name</Label>
                      <Input
                        id="hostel_name"
                        value={hostelFormData.hostel_name}
                        onChange={(e) => setHostelFormData({ ...hostelFormData, hostel_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hostel_type">Hostel Type</Label>
                      <Select value={hostelFormData.hostel_type} onValueChange={(value) => setHostelFormData({ ...hostelFormData, hostel_type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="boys">Boys</SelectItem>
                          <SelectItem value="girls">Girls</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="total_capacity">Total Capacity</Label>
                      <Input
                        id="total_capacity"
                        type="number"
                        value={hostelFormData.total_capacity}
                        onChange={(e) => setHostelFormData({ ...hostelFormData, total_capacity: parseInt(e.target.value) || 0 })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="warden_id">Warden</Label>
                      <Select value={hostelFormData.warden_id} onValueChange={(value) => setHostelFormData({ ...hostelFormData, warden_id: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select warden" />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              {teacher.first_name} {teacher.last_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={hostelFormData.address}
                      onChange={(e) => setHostelFormData({ ...hostelFormData, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Facilities</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {facilityOptions.map((facility) => (
                        <div key={facility} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={facility}
                            checked={hostelFormData.facilities.includes(facility)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setHostelFormData({ ...hostelFormData, facilities: [...hostelFormData.facilities, facility] });
                              } else {
                                setHostelFormData({ ...hostelFormData, facilities: hostelFormData.facilities.filter(f => f !== facility) });
                              }
                            }}
                          />
                          <label htmlFor={facility} className="text-sm">{facility}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsHostelDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingHostel ? 'Update' : 'Add'} Hostel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hostels List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Occupancy</TableHead>
                      <TableHead>Warden</TableHead>
                      <TableHead>Facilities</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHostels.map((hostel) => (
                      <TableRow key={hostel.id}>
                        <TableCell className="font-medium">{hostel.hostel_name}</TableCell>
                        <TableCell className="capitalize">{hostel.hostel_type}</TableCell>
                        <TableCell>{hostel.total_capacity}</TableCell>
                        <TableCell>{hostel.current_occupancy || 0}</TableCell>
                        <TableCell>
                          {hostel.teachers ? `${hostel.teachers.first_name} ${hostel.teachers.last_name}` : 'Not assigned'}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {hostel.facilities?.slice(0, 3).map((facility) => (
                              <Badge key={facility} variant="secondary" className="text-xs">
                                {facility}
                              </Badge>
                            )) || 'None'}
                            {hostel.facilities && hostel.facilities.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{hostel.facilities.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditHostel(hostel)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteHostel(hostel.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'rooms' && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Dialog open={isRoomDialogOpen} onOpenChange={setIsRoomDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetRoomForm(); setEditingRoom(null); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRoomSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="hostel_id">Hostel</Label>
                    <Select value={roomFormData.hostel_id} onValueChange={(value) => setRoomFormData({ ...roomFormData, hostel_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hostel" />
                      </SelectTrigger>
                      <SelectContent>
                        {hostels.map((hostel) => (
                          <SelectItem key={hostel.id} value={hostel.id}>
                            {hostel.hostel_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="room_number">Room Number</Label>
                      <Input
                        id="room_number"
                        value={roomFormData.room_number}
                        onChange={(e) => setRoomFormData({ ...roomFormData, room_number: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="room_type">Room Type</Label>
                      <Select value={roomFormData.room_type} onValueChange={(value) => setRoomFormData({ ...roomFormData, room_type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="double">Double</SelectItem>
                          <SelectItem value="triple">Triple</SelectItem>
                          <SelectItem value="quad">Quad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={roomFormData.capacity}
                        onChange={(e) => setRoomFormData({ ...roomFormData, capacity: parseInt(e.target.value) || 0 })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly_fee">Monthly Fee</Label>
                      <Input
                        id="monthly_fee"
                        type="number"
                        value={roomFormData.monthly_fee}
                        onChange={(e) => setRoomFormData({ ...roomFormData, monthly_fee: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={roomFormData.status} onValueChange={(value) => setRoomFormData({ ...roomFormData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsRoomDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingRoom ? 'Update' : 'Add'} Room
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rooms List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hostel</TableHead>
                    <TableHead>Room Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell>{room.hostels?.hostel_name}</TableCell>
                      <TableCell className="font-medium">{room.room_number}</TableCell>
                      <TableCell className="capitalize">{room.room_type}</TableCell>
                      <TableCell>{room.capacity}</TableCell>
                      <TableCell>{room.current_occupancy || 0}</TableCell>
                      <TableCell>₹{room.monthly_fee || 0}</TableCell>
                      <TableCell>
                        <Badge variant={room.status === 'available' ? 'default' : room.status === 'occupied' ? 'secondary' : 'destructive'}>
                          {room.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditRoom(room)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRoom(room.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminHostels;
