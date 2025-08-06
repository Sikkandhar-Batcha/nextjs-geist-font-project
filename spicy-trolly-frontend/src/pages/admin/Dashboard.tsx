import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Restaurant as RestaurantIcon,
  ShoppingCart as OrdersIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
  });

  // Mock data for charts
  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const categoryData = [
    { name: 'Biriyani', value: 400, color: '#FF6B35' },
    { name: 'Appetizers', value: 300, color: '#FFC107' },
    { name: 'Traditional', value: 200, color: '#4CAF50' },
    { name: 'Beverages', value: 100, color: '#2196F3' },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API calls
      setDashboardData({
        totalOrders: 156,
        totalRevenue: 45000,
        totalProducts: 6,
        pendingOrders: 12,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color, fontSize: 40 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
      >
        <StatCard
          title="Total Orders"
          value={dashboardData.totalOrders}
          icon={<OrdersIcon />}
          color="#FF6B35"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${dashboardData.totalRevenue.toLocaleString()}`}
          icon={<TrendingUpIcon />}
          color="#4CAF50"
        />
        <StatCard
          title="Menu Items"
          value={dashboardData.totalProducts}
          icon={<RestaurantIcon />}
          color="#2196F3"
        />
        <StatCard
          title="Pending Orders"
          value={dashboardData.pendingOrders}
          icon={<PeopleIcon />}
          color="#FF9800"
        />
      </Box>

      {/* Charts */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: 'repeat(2, 1fr)',
          },
          gap: 3,
        }}
      >
        {/* Sales Chart */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
            Weekly Sales
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Sales']} />
              <Bar dataKey="sales" fill="#FF6B35" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Category Distribution */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
            Sales by Category
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Recent Activity */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          Recent Activity
        </Typography>
        <Box sx={{ space: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • New order received for wedding event (50 guests)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Chicken Thokku Biriyani stock updated
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Reception order completed successfully
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • New raw material purchase recorded
          </Typography>
          <Typography variant="body2">
            • Monthly sales report generated
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
