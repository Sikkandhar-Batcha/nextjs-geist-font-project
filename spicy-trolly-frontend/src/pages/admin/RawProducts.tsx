import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { rawProductsAPI } from '../../services/api';
import type { RawProduct, RawProductFormData } from '../../types';

const RawProducts: React.FC = () => {
  const [rawProducts, setRawProducts] = useState<RawProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<RawProduct | null>(null);
  const [formData, setFormData] = useState<RawProductFormData>({
    name: '',
    category: '',
    unit: '',
    costPerUnit: 0,
    currentStock: 0,
    minimumStock: 0,
    supplier: '',
  });

  useEffect(() => {
    fetchRawProducts();
  }, []);

  const fetchRawProducts = async () => {
    try {
      setLoading(true);
      const data = await rawProductsAPI.getAll();
      setRawProducts(data);
    } catch (error) {
      console.error('Error fetching raw products:', error);
      setError('Failed to load raw products');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (product?: RawProduct) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        unit: product.unit,
        costPerUnit: product.costPerUnit,
        currentStock: product.currentStock,
        minimumStock: product.minimumStock,
        supplier: product.supplier || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        unit: '',
        costPerUnit: 0,
        currentStock: 0,
        minimumStock: 0,
        supplier: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
    setError(null);
  };

  const handleInputChange = (field: keyof RawProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      
      if (!formData.name || !formData.category || !formData.unit) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.costPerUnit <= 0) {
        throw new Error('Cost per unit must be greater than 0');
      }

      if (editingProduct) {
        await rawProductsAPI.update(editingProduct.id, formData);
      } else {
        await rawProductsAPI.create(formData);
      }

      await fetchRawProducts();
      handleCloseDialog();
    } catch (error: any) {
      setError(error.message || 'Failed to save raw product');
    }
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this raw product?')) {
      try {
        await rawProductsAPI.delete(productId);
        await fetchRawProducts();
      } catch (error) {
        console.error('Error deleting raw product:', error);
        setError('Failed to delete raw product');
      }
    }
  };

  const isLowStock = (product: RawProduct) => {
    return product.currentStock <= product.minimumStock;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Raw Products & Inventory
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Raw Product
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Low Stock Alert */}
      {rawProducts.some(p => isLowStock(p)) && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Low Stock Alert!
          </Typography>
          The following items are running low:
          {rawProducts
            .filter(p => isLowStock(p))
            .map(p => ` ${p.name}`)
            .join(', ')}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Product Name</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Current Stock</strong></TableCell>
              <TableCell><strong>Min Stock</strong></TableCell>
              <TableCell><strong>Cost/Unit</strong></TableCell>
              <TableCell><strong>Supplier</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rawProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Chip label={product.category} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  {product.currentStock} {product.unit}
                </TableCell>
                <TableCell>
                  {product.minimumStock} {product.unit}
                </TableCell>
                <TableCell>₹{product.costPerUnit}</TableCell>
                <TableCell>{product.supplier || 'N/A'}</TableCell>
                <TableCell>
                  <Chip
                    label={isLowStock(product) ? 'Low Stock' : 'In Stock'}
                    color={isLowStock(product) ? 'error' : 'success'}
                    size="small"
                    icon={isLowStock(product) ? <WarningIcon /> : undefined}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(product)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(product.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {rawProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No raw products found. Add your first raw product to get started.
          </Typography>
        </Box>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Edit Raw Product' : 'Add New Raw Product'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Product Name"
            required
            fullWidth
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            sx={{ mb: 2, mt: 1 }}
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
            <TextField
              label="Category"
              required
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              placeholder="e.g., Spices, Vegetables, Meat"
            />
            <TextField
              label="Unit"
              required
              value={formData.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
              placeholder="e.g., kg, liters, pieces"
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
            <TextField
              label="Cost per Unit (₹)"
              required
              type="number"
              value={formData.costPerUnit}
              onChange={(e) => handleInputChange('costPerUnit', parseFloat(e.target.value) || 0)}
              inputProps={{ min: 0, step: 0.01 }}
            />
            <TextField
              label="Current Stock"
              required
              type="number"
              value={formData.currentStock}
              onChange={(e) => handleInputChange('currentStock', parseFloat(e.target.value) || 0)}
              inputProps={{ min: 0 }}
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
            <TextField
              label="Minimum Stock"
              required
              type="number"
              value={formData.minimumStock}
              onChange={(e) => handleInputChange('minimumStock', parseFloat(e.target.value) || 0)}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Supplier (Optional)"
              value={formData.supplier}
              onChange={(e) => handleInputChange('supplier', e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProduct ? 'Update' : 'Add'} Raw Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RawProducts;
