
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2, Bus, MapPin } from 'lucide-react';

interface BusRoute {
  id: string;
  route_name: string;
  route_number: string;
  driver_name: string;
  driver_phone: string;
  conductor_name?: string;
  conductor_phone?: string;
  bus_number: string;
  capacity: number;
  current_occupancy?: number;
  monthly_fee: number;
  status?: string;
}

interface BusStop {
  id: string;
  route_id: string;
  stop_name: string;
  pickup_time: string;
  drop_time: string;
  stop_order: number;
  address?: string;
  bus_routes?: { route_name: string };
}

const AdminTransport = () => {
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [stops, setStops] = useState<BusStop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRouteDialogOpen, setIsRouteDialogOpen] = useState(false);
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<BusRoute | null>(null);
  const [editingStop, setEditingStop] = useState<BusStop | null>(null);
  const [activeTab, setActiveTab] = useState('routes');
  const { toast } = useToast();

  const [routeFormData, setRouteFormData] = useState({
    route_name: '',
    route_number: '',
    driver_name: '',
    driver_phone: '',
    conductor_name: '',
    conductor_phone: '',
    bus_number: '',
    capacity: 0,
    monthly_fee: 0,
    status: 'active'
  });

  const [stopFormData, setStopFormData] = useState({
    route_id: '',
    stop_name: '',
    pickup_time: '',
    drop_time: '',
    stop_order: 1,
    address: ''
  });

  useEffect(() => {
    fetchRoutes();
    fetchStops();
  }, []);

  const fetchRoutes = async () => {
    try {
      const { data, error } = await supabase
        .from('bus_routes')
        .select('*')
        .order('route_number', { ascending: true });

      if (error) throw error;
      setRoutes(data || []);
    } catch (error) {
      console.error('Error fetching bus routes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch bus routes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStops = async () => {
    try {
      const { data, error } = await supabase
        .from('bus_stops')
        .select(`
          *,
          bus_routes (
            route_name
          )
        `)
        .order('stop_order', { ascending: true });

      if (error) throw error;
      setStops(data || []);
    } catch (error) {
      console.error('Error fetching bus stops:', error);
    }
  };

  const handleRouteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRoute) {
        const { error } = await supabase
          .from('bus_routes')
          .update(routeFormData)
          .eq('id', editingRoute.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Route updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('bus_routes')
          .insert([routeFormData]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Route added successfully",
        });
      }
      
      setIsRouteDialogOpen(false);
      setEditingRoute(null);
      resetRouteForm();
      fetchRoutes();
    } catch (error) {
      console.error('Error saving route:', error);
      toast({
        title: "Error",
        description: "Failed to save route",
        variant: "destructive",
      });
    }
  };

  const handleStopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStop) {
        const { error } = await supabase
          .from('bus_stops')
          .update(stopFormData)
          .eq('id', editingStop.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Stop updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('bus_stops')
          .insert([stopFormData]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Stop added successfully",
        });
      }
      
      setIsStopDialogOpen(false);
      setEditingStop(null);
      resetStopForm();
      fetchStops();
    } catch (error) {
      console.error('Error saving stop:', error);
      toast({
        title: "Error",
        description: "Failed to save stop",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRoute = async (id: string) => {
    if (!confirm('Are you sure you want to delete this route?')) return;
    
    try {
      const { error } = await supabase
        .from('bus_routes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Route deleted successfully",
      });
      fetchRoutes();
    } catch (error) {
      console.error('Error deleting route:', error);
      toast({
        title: "Error",
        description: "Failed to delete route",
        variant: "destructive",
      });
    }
  };

  const handleDeleteStop = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stop?')) return;
    
    try {
      const { error } = await supabase
        .from('bus_stops')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Stop deleted successfully",
      });
      fetchStops();
    } catch (error) {
      console.error('Error deleting stop:', error);
      toast({
        title: "Error",
        description: "Failed to delete stop",
        variant: "destructive",
      });
    }
  };

  const resetRouteForm = () => {
    setRouteFormData({
      route_name: '',
      route_number: '',
      driver_name: '',
      driver_phone: '',
      conductor_name: '',
      conductor_phone: '',
      bus_number: '',
      capacity: 0,
      monthly_fee: 0,
      status: 'active'
    });
  };

  const resetStopForm = () => {
    setStopFormData({
      route_id: '',
      stop_name: '',
      pickup_time: '',
      drop_time: '',
      stop_order: 1,
      address: ''
    });
  };

  const handleEditRoute = (route: BusRoute) => {
    setEditingRoute(route);
    setRouteFormData({
      route_name: route.route_name,
      route_number: route.route_number,
      driver_name: route.driver_name,
      driver_phone: route.driver_phone,
      conductor_name: route.conductor_name || '',
      conductor_phone: route.conductor_phone || '',
      bus_number: route.bus_number,
      capacity: route.capacity,
      monthly_fee: route.monthly_fee,
      status: route.status || 'active'
    });
    setIsRouteDialogOpen(true);
  };

  const handleEditStop = (stop: BusStop) => {
    setEditingStop(stop);
    setStopFormData({
      route_id: stop.route_id,
      stop_name: stop.stop_name,
      pickup_time: stop.pickup_time,
      drop_time: stop.drop_time,
      stop_order: stop.stop_order,
      address: stop.address || ''
    });
    setIsStopDialogOpen(true);
  };

  const filteredRoutes = routes.filter(route =>
    route.route_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.route_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStops = stops.filter(stop =>
    stop.stop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (stop.bus_routes?.route_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Transport Management</h1>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'routes' ? 'default' : 'outline'}
            onClick={() => setActiveTab('routes')}
          >
            <Bus className="h-4 w-4 mr-2" />
            Routes
          </Button>
          <Button
            variant={activeTab === 'stops' ? 'default' : 'outline'}
            onClick={() => setActiveTab('stops')}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Stops
          </Button>
        </div>
      </div>

      {activeTab === 'routes' && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Dialog open={isRouteDialogOpen} onOpenChange={setIsRouteDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetRouteForm(); setEditingRoute(null); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Route
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingRoute ? 'Edit Route' : 'Add New Route'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRouteSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="route_name">Route Name</Label>
                      <Input
                        id="route_name"
                        value={routeFormData.route_name}
                        onChange={(e) => setRouteFormData({ ...routeFormData, route_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="route_number">Route Number</Label>
                      <Input
                        id="route_number"
                        value={routeFormData.route_number}
                        onChange={(e) => setRouteFormData({ ...routeFormData, route_number: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="driver_name">Driver Name</Label>
                      <Input
                        id="driver_name"
                        value={routeFormData.driver_name}
                        onChange={(e) => setRouteFormData({ ...routeFormData, driver_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="driver_phone">Driver Phone</Label>
                      <Input
                        id="driver_phone"
                        value={routeFormData.driver_phone}
                        onChange={(e) => setRouteFormData({ ...routeFormData, driver_phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="conductor_name">Conductor Name</Label>
                      <Input
                        id="conductor_name"
                        value={routeFormData.conductor_name}
                        onChange={(e) => setRouteFormData({ ...routeFormData, conductor_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="conductor_phone">Conductor Phone</Label>
                      <Input
                        id="conductor_phone"
                        value={routeFormData.conductor_phone}
                        onChange={(e) => setRouteFormData({ ...routeFormData, conductor_phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bus_number">Bus Number</Label>
                      <Input
                        id="bus_number"
                        value={routeFormData.bus_number}
                        onChange={(e) => setRouteFormData({ ...routeFormData, bus_number: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={routeFormData.capacity}
                        onChange={(e) => setRouteFormData({ ...routeFormData, capacity: parseInt(e.target.value) || 0 })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly_fee">Monthly Fee</Label>
                      <Input
                        id="monthly_fee"
                        type="number"
                        value={routeFormData.monthly_fee}
                        onChange={(e) => setRouteFormData({ ...routeFormData, monthly_fee: parseFloat(e.target.value) || 0 })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={routeFormData.status} onValueChange={(value) => setRouteFormData({ ...routeFormData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsRouteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingRoute ? 'Update' : 'Add'} Route
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bus Routes</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Bus</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoutes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{route.route_name}</div>
                            <div className="text-sm text-gray-500">#{route.route_number}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{route.driver_name}</div>
                            <div className="text-sm text-gray-500">{route.driver_phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{route.bus_number}</TableCell>
                        <TableCell>{route.current_occupancy || 0}/{route.capacity}</TableCell>
                        <TableCell>₹{route.monthly_fee}</TableCell>
                        <TableCell>
                          <Badge variant={route.status === 'active' ? 'default' : route.status === 'inactive' ? 'secondary' : 'destructive'}>
                            {route.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditRoute(route)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteRoute(route.id)}
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

      {activeTab === 'stops' && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search stops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Dialog open={isStopDialogOpen} onOpenChange={setIsStopDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetStopForm(); setEditingStop(null); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stop
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingStop ? 'Edit Stop' : 'Add New Stop'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleStopSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="route_id">Route</Label>
                    <Select value={stopFormData.route_id} onValueChange={(value) => setStopFormData({ ...stopFormData, route_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select route" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map((route) => (
                          <SelectItem key={route.id} value={route.id}>
                            {route.route_name} (#{route.route_number})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stop_name">Stop Name</Label>
                      <Input
                        id="stop_name"
                        value={stopFormData.stop_name}
                        onChange={(e) => setStopFormData({ ...stopFormData, stop_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stop_order">Stop Order</Label>
                      <Input
                        id="stop_order"
                        type="number"
                        value={stopFormData.stop_order}
                        onChange={(e) => setStopFormData({ ...stopFormData, stop_order: parseInt(e.target.value) || 1 })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickup_time">Pickup Time</Label>
                      <Input
                        id="pickup_time"
                        type="time"
                        value={stopFormData.pickup_time}
                        onChange={(e) => setStopFormData({ ...stopFormData, pickup_time: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="drop_time">Drop Time</Label>
                      <Input
                        id="drop_time"
                        type="time"
                        value={stopFormData.drop_time}
                        onChange={(e) => setStopFormData({ ...stopFormData, drop_time: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={stopFormData.address}
                      onChange={(e) => setStopFormData({ ...stopFormData, address: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsStopDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingStop ? 'Update' : 'Add'} Stop
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bus Stops</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Stop Name</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Pickup Time</TableHead>
                    <TableHead>Drop Time</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStops.map((stop) => (
                    <TableRow key={stop.id}>
                      <TableCell>{stop.bus_routes?.route_name}</TableCell>
                      <TableCell className="font-medium">{stop.stop_name}</TableCell>
                      <TableCell>{stop.stop_order}</TableCell>
                      <TableCell>{stop.pickup_time}</TableCell>
                      <TableCell>{stop.drop_time}</TableCell>
                      <TableCell>{stop.address || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditStop(stop)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteStop(stop.id)}
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

export default AdminTransport;
