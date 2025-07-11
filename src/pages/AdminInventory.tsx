
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
import { Plus, Search, Edit, Trash2, Package, Tag, TrendingUp } from 'lucide-react';

interface InventoryCategory {
  id: string;
  category_name: string;
  description?: string;
}

interface InventoryItem {
  id: string;
  category_id?: string;
  item_name: string;
  item_code?: string;
  description?: string;
  unit_price?: number;
  current_stock?: number;
  minimum_stock?: number;
  supplier_name?: string;
  supplier_contact?: string;
  inventory_categories?: { category_name: string };
}

interface InventoryTransaction {
  id: string;
  item_id?: string;
  transaction_type?: string;
  quantity: number;
  unit_price?: number;
  total_amount?: number;
  reference_number?: string;
  issued_to?: string;
  notes?: string;
  created_at?: string;
  inventory_items?: { item_name: string };
}

const AdminInventory = () => {
  const [categories, setCategories] = useState<InventoryCategory[]>([]);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<InventoryCategory | null>(null);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [activeTab, setActiveTab] = useState('items');
  const { toast } = useToast();

  const [categoryFormData, setCategoryFormData] = useState({
    category_name: '',
    description: ''
  });

  const [itemFormData, setItemFormData] = useState({
    category_id: '',
    item_name: '',
    item_code: '',
    description: '',
    unit_price: 0,
    current_stock: 0,
    minimum_stock: 0,
    supplier_name: '',
    supplier_contact: ''
  });

  const [transactionFormData, setTransactionFormData] = useState({
    item_id: '',
    transaction_type: 'purchase',
    quantity: 0,
    unit_price: 0,
    reference_number: '',
    issued_to: '',
    notes: ''
  });

  useEffect(() => {
    fetchCategories();
    fetchItems();
    fetchTransactions();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory_categories')
        .select('*')
        .order('category_name', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch inventory categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .select(`
          *,
          inventory_categories (
            category_name
          )
        `)
        .order('item_name', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory_transactions')
        .select(`
          *,
          inventory_items (
            item_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('inventory_categories')
          .update(categoryFormData)
          .eq('id', editingCategory.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('inventory_categories')
          .insert([categoryFormData]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Category added successfully",
        });
      }
      
      setIsCategoryDialogOpen(false);
      setEditingCategory(null);
      resetCategoryForm();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      });
    }
  };

  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('inventory_items')
          .update(itemFormData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Item updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('inventory_items')
          .insert([itemFormData]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Item added successfully",
        });
      }
      
      setIsItemDialogOpen(false);
      setEditingItem(null);
      resetItemForm();
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
      toast({
        title: "Error",
        description: "Failed to save item",
        variant: "destructive",
      });
    }
  };

  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const transactionData = {
        ...transactionFormData,
        total_amount: transactionFormData.quantity * transactionFormData.unit_price
      };

      const { error } = await supabase
        .from('inventory_transactions')
        .insert([transactionData]);
      
      if (error) throw error;

      // Update item stock based on transaction type
      const stockChange = transactionFormData.transaction_type === 'purchase' 
        ? transactionFormData.quantity 
        : transactionFormData.transaction_type === 'issue' 
        ? -transactionFormData.quantity 
        : 0;

      if (stockChange !== 0) {
        const currentItem = items.find(item => item.id === transactionFormData.item_id);
        if (currentItem) {
          const newStock = (currentItem.current_stock || 0) + stockChange;
          await supabase
            .from('inventory_items')
            .update({ current_stock: newStock })
            .eq('id', transactionFormData.item_id);
        }
      }

      toast({
        title: "Success",
        description: "Transaction recorded successfully",
      });
      
      setIsTransactionDialogOpen(false);
      resetTransactionForm();
      fetchTransactions();
      fetchItems();
    } catch (error) {
      console.error('Error saving transaction:', error);
      toast({
        title: "Error",
        description: "Failed to record transaction",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const { error } = await supabase
        .from('inventory_categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const { error } = await supabase
        .from('inventory_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      category_name: '',
      description: ''
    });
  };

  const resetItemForm = () => {
    setItemFormData({
      category_id: '',
      item_name: '',
      item_code: '',
      description: '',
      unit_price: 0,
      current_stock: 0,
      minimum_stock: 0,
      supplier_name: '',
      supplier_contact: ''
    });
  };

  const resetTransactionForm = () => {
    setTransactionFormData({
      item_id: '',
      transaction_type: 'purchase',
      quantity: 0,
      unit_price: 0,
      reference_number: '',
      issued_to: '',
      notes: ''
    });
  };

  const handleEditCategory = (category: InventoryCategory) => {
    setEditingCategory(category);
    setCategoryFormData({
      category_name: category.category_name,
      description: category.description || ''
    });
    setIsCategoryDialogOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setItemFormData({
      category_id: item.category_id || '',
      item_name: item.item_name,
      item_code: item.item_code || '',
      description: item.description || '',
      unit_price: item.unit_price || 0,
      current_stock: item.current_stock || 0,
      minimum_stock: item.minimum_stock || 0,
      supplier_name: item.supplier_name || '',
      supplier_contact: item.supplier_contact || ''
    });
    setIsItemDialogOpen(true);
  };

  const filteredItems = items.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.item_code || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (current: number, minimum: number) => {
    if (current <= minimum) return 'low';
    if (current <= minimum * 1.5) return 'medium';
    return 'high';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'items' ? 'default' : 'outline'}
            onClick={() => setActiveTab('items')}
          >
            <Package className="h-4 w-4 mr-2" />
            Items
          </Button>
          <Button
            variant={activeTab === 'categories' ? 'default' : 'outline'}
            onClick={() => setActiveTab('categories')}
          >
            <Tag className="h-4 w-4 mr-2" />
            Categories
          </Button>
          <Button
            variant={activeTab === 'transactions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('transactions')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Transactions
          </Button>
        </div>
      </div>

      {activeTab === 'items' && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex space-x-2">
              <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => { resetTransactionForm(); }}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleTransactionSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="item_id">Item</Label>
                      <Select value={transactionFormData.item_id} onValueChange={(value) => setTransactionFormData({ ...transactionFormData, item_id: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          {items.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.item_name} ({item.item_code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="transaction_type">Type</Label>
                        <Select value={transactionFormData.transaction_type} onValueChange={(value) => setTransactionFormData({ ...transactionFormData, transaction_type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="purchase">Purchase</SelectItem>
                            <SelectItem value="issue">Issue</SelectItem>
                            <SelectItem value="return">Return</SelectItem>
                            <SelectItem value="damage">Damage</SelectItem>
                            <SelectItem value="adjustment">Adjustment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={transactionFormData.quantity}
                          onChange={(e) => setTransactionFormData({ ...transactionFormData, quantity: parseInt(e.target.value) || 0 })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="unit_price">Unit Price</Label>
                        <Input
                          id="unit_price"
                          type="number"
                          value={transactionFormData.unit_price}
                          onChange={(e) => setTransactionFormData({ ...transactionFormData, unit_price: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="reference_number">Reference Number</Label>
                        <Input
                          id="reference_number"
                          value={transactionFormData.reference_number}
                          onChange={(e) => setTransactionFormData({ ...transactionFormData, reference_number: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="issued_to">Issued To</Label>
                      <Input
                        id="issued_to"
                        value={transactionFormData.issued_to}
                        onChange={(e) => setTransactionFormData({ ...transactionFormData, issued_to: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={transactionFormData.notes}
                        onChange={(e) => setTransactionFormData({ ...transactionFormData, notes: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsTransactionDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Transaction</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetItemForm(); setEditingItem(null); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleItemSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="item_name">Item Name</Label>
                        <Input
                          id="item_name"
                          value={itemFormData.item_name}
                          onChange={(e) => setItemFormData({ ...itemFormData, item_name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="item_code">Item Code</Label>
                        <Input
                          id="item_code"
                          value={itemFormData.item_code}
                          onChange={(e) => setItemFormData({ ...itemFormData, item_code: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category_id">Category</Label>
                      <Select value={itemFormData.category_id} onValueChange={(value) => setItemFormData({ ...itemFormData, category_id: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.category_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={itemFormData.description}
                        onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="unit_price">Unit Price</Label>
                        <Input
                          id="unit_price"
                          type="number"
                          value={itemFormData.unit_price}
                          onChange={(e) => setItemFormData({ ...itemFormData, unit_price: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="current_stock">Current Stock</Label>
                        <Input
                          id="current_stock"
                          type="number"
                          value={itemFormData.current_stock}
                          onChange={(e) => setItemFormData({ ...itemFormData, current_stock: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="minimum_stock">Minimum Stock</Label>
                        <Input
                          id="minimum_stock"
                          type="number"
                          value={itemFormData.minimum_stock}
                          onChange={(e) => setItemFormData({ ...itemFormData, minimum_stock: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="supplier_name">Supplier Name</Label>
                        <Input
                          id="supplier_name"
                          value={itemFormData.supplier_name}
                          onChange={(e) => setItemFormData({ ...itemFormData, supplier_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="supplier_contact">Supplier Contact</Label>
                        <Input
                          id="supplier_contact"
                          value={itemFormData.supplier_contact}
                          onChange={(e) => setItemFormData({ ...itemFormData, supplier_contact: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsItemDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingItem ? 'Update' : 'Add'} Item
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => {
                      const stockStatus = getStockStatus(item.current_stock || 0, item.minimum_stock || 0);
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.item_name}</div>
                              <div className="text-sm text-gray-500">{item.item_code}</div>
                            </div>
                          </TableCell>
                          <TableCell>{item.inventory_categories?.category_name}</TableCell>
                          <TableCell>
                            <div>
                              <div>{item.current_stock || 0}</div>
                              <div className="text-sm text-gray-500">Min: {item.minimum_stock || 0}</div>
                            </div>
                          </TableCell>
                          <TableCell>₹{item.unit_price || 0}</TableCell>
                          <TableCell>
                            <div>
                              <div>{item.supplier_name || 'N/A'}</div>
                              <div className="text-sm text-gray-500">{item.supplier_contact}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={stockStatus === 'low' ? 'destructive' : stockStatus === 'medium' ? 'secondary' : 'default'}>
                              {stockStatus === 'low' ? 'Low Stock' : stockStatus === 'medium' ? 'Medium' : 'Good'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditItem(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'categories' && (
        <>
          <div className="flex justify-end">
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetCategoryForm(); setEditingCategory(null); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="category_name">Category Name</Label>
                    <Input
                      id="category_name"
                      value={categoryFormData.category_name}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, category_name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={categoryFormData.description}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingCategory ? 'Update' : 'Add'} Category
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.category_name}</TableCell>
                      <TableCell>{category.description || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCategory(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id)}
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

      {activeTab === 'transactions' && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Issued To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>{transaction.inventory_items?.item_name}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.transaction_type === 'purchase' ? 'default' : 'secondary'}>
                        {transaction.transaction_type}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>₹{transaction.total_amount || 0}</TableCell>
                    <TableCell>{transaction.reference_number || 'N/A'}</TableCell>
                    <TableCell>{transaction.issued_to || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminInventory;
