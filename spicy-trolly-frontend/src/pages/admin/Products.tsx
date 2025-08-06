import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { menuAPI } from '../../services/api';
import type { MenuItem, ProductFormData } from '../../types';

const Products: React.FC = () => {
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    available: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await menuAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (product?: MenuItem) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        available: product.available,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        available: true,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
    setError(null);
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      
      if (!formData.name || !formData.description || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.price <= 0) {
        throw new Error('Price must be greater than 0');
      }

      if (editingProduct) {
        await menuAPI.update(editingProduct.id, formData);
      } else {
        await menuAPI.create(formData);
      }

      await fetchProducts();
      handleCloseDialog();
    } catch (error: any) {
      setError(error.message || 'Failed to save product');
    }
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await menuAPI.delete(productId);
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product');
      }
    }
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
          Menu Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Product
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flex: 1 }}>
                  {product.name}
                </Typography>
                <Box>
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
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" paragraph>
                {product.description}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  ₹{product.price}
                </Typography>
                <Chip
                  label={product.category}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>

              <Chip
                label={product.available ? 'Available' : 'Unavailable'}
                size="small"
                color={product.available ? 'success' : 'error'}
                variant="filled"
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {products.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No products found. Add your first product to get started.
          </Typography>
        </Box>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
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

          <TextField
            label="Description"
            required
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Price (₹)"
            required
            fullWidth
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
            sx={{ mb: 2 }}
            inputProps={{ min: 0, step: 0.01 }}
          />

          <TextField
            label="Category"
            required
            fullWidth
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            sx={{ mb: 2 }}
            placeholder="e.g., Biriyani, Appetizer, Traditional, Beverages"
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.available}
                onChange={(e) => handleInputChange('available', e.target.checked)}
              />
            }
            label="Available for orders"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProduct ? 'Update' : 'Add'} Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
