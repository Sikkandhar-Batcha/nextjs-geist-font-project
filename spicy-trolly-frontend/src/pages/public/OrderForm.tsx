import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { menuAPI, ordersAPI } from '../../services/api';
import type { MenuItem, OrderFormData } from '../../types';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    eventType: 'marriage',
    eventDate: '',
    guestCount: 0,
    items: [],
    specialRequests: '',
  });

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const items = await menuAPI.getAll();
      setMenuItems(items.filter(item => item.available));
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError('Failed to load menu items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof OrderFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitLoading(true);

    try {
      // Validate form
      if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
        throw new Error('Please fill in all required fields');
      }

      if (!formData.eventDate) {
        throw new Error('Please select an event date');
      }

      if (formData.guestCount <= 0) {
        throw new Error('Please enter a valid guest count');
      }

      // Prepare items array
      const items = Object.entries(selectedItems)
        .filter(([_, quantity]) => quantity > 0)
        .map(([itemId, quantity]) => ({
          menuItemId: itemId,
          quantity,
        }));

      if (items.length === 0) {
        throw new Error('Please select at least one menu item');
      }

      const orderData: OrderFormData = {
        ...formData,
        items,
      };

      await ordersAPI.create(orderData);
      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error: any) {
      setError(error.message || 'Failed to submit order. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Order Submitted Successfully! 🎉
            </Typography>
            <Typography variant="body1" paragraph>
              Thank you for your order! We have received your event booking request and will contact you shortly to confirm the details.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You will be redirected to the home page in a few seconds...
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Event Order Booking
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {/* Customer Information */}
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
              Customer Information
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
              <TextField
                label="Full Name"
                required
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                fullWidth
              />
              <TextField
                label="Email Address"
                type="email"
                required
                value={formData.customerEmail}
                onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                fullWidth
              />
              <TextField
                label="Phone Number"
                required
                value={formData.customerPhone}
                onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={formData.eventType}
                  onChange={(e) => handleInputChange('eventType', e.target.value)}
                  label="Event Type"
                >
                  <MuiMenuItem value="marriage">Marriage</MuiMenuItem>
                  <MuiMenuItem value="reception">Reception</MuiMenuItem>
                  <MuiMenuItem value="other">Other</MuiMenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
              <TextField
                label="Event Date"
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => handleInputChange('eventDate', e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Number of Guests"
                type="number"
                required
                value={formData.guestCount}
                onChange={(e) => handleInputChange('guestCount', parseInt(e.target.value) || 0)}
                fullWidth
                inputProps={{ min: 1 }}
              />
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Menu Selection */}
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
              Menu Selection
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ mb: 4 }}>
                {menuItems.map((item) => (
                  <Card key={item.id} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {item.description}
                          </Typography>
                          <Typography variant="h6" color="primary.main">
                            ₹{item.price}
                          </Typography>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                          <TextField
                            label="Quantity"
                            type="number"
                            size="small"
                            value={selectedItems[item.id] || 0}
                            onChange={(e) => handleItemQuantityChange(item.id, parseInt(e.target.value) || 0)}
                            inputProps={{ min: 0 }}
                            sx={{ width: 100 }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            {/* Special Requests */}
            <TextField
              label="Special Requests (Optional)"
              multiline
              rows={4}
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              fullWidth
              sx={{ mb: 4 }}
              placeholder="Any special dietary requirements, preferences, or additional requests..."
            />

            {/* Order Summary */}
            <Card variant="outlined" sx={{ mb: 4, backgroundColor: 'grey.50' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Typography variant="body1">
                  <strong>Estimated Total: ₹{calculateTotal()}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  * Final pricing will be confirmed based on guest count and specific requirements
                </Typography>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={submitLoading}
              sx={{ py: 1.5, fontSize: '1.1rem' }}
            >
              {submitLoading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 2 }} />
                  Submitting Order...
                </>
              ) : (
                'Submit Order Request'
              )}
            </Button>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              By submitting this form, you agree to be contacted by our team to finalize your order details.
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderForm;
