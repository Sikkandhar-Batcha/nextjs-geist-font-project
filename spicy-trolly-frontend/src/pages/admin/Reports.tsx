import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { reportsAPI } from '../../services/api';

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  // Mock data for charts - replace with actual API data
  const [salesData, setSalesData] = useState([
    { name: 'Mon', sales: 4000, orders: 24 },
    { name: 'Tue', sales: 3000, orders: 18 },
    { name: 'Wed', sales: 2000, orders: 12 },
    { name: 'Thu', sales: 2780, orders: 16 },
    { name: 'Fri', sales: 1890, orders: 11 },
    { name: 'Sat', sales: 2390, orders: 14 },
    { name: 'Sun', sales: 3490, orders: 20 },
  ]);

  const [categoryData, setCategoryData] = useState([
    { name: 'Biriyani', value: 45, sales: 45000, color: '#FF6B35' },
    { name: 'Appetizers', value: 25, sales: 25000, color: '#FFC107' },
    { name: 'Traditional', value: 20, sales: 20000, color: '#4CAF50' },
    { name: 'Beverages', value: 10, sales: 10000, color: '#2196F3' },
  ]);

  const [topItems, setTopItems] = useState([
    { name: 'Chicken Thokku Biriyani', quantity: 156, revenue: 39000 },
    { name: 'Chilli Biriyani', quantity: 134, revenue: 29480 },
    { name: 'Chicken 65', quantity: 98, revenue: 19600 },
    { name: 'Empty Biriyani', quantity: 87, revenue: 15660 },
    { name: 'Idiyappam Thokku', quantity: 76, revenue: 11400 },
  ]);

  const [profitLossData, setProfitLossData] = useState({
    totalRevenue: 125000,
    totalCosts: 75000,
    grossProfit: 50000,
    netProfit: 45000,
    profitMargin: 36,
  });

  useEffect(() => {
    fetchReportsData();
  }, [period]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would fetch data based on the selected period
      // const salesChart = await reportsAPI.getSalesChart(period);
      // const topSellingItems = await reportsAPI.getTopSellingItems(period);
      // etc.
      
    } catch (error) {
      console.error('Error fetching reports data:', error);
      setError('Failed to load reports data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
  }> = ({ title, value, subtitle, color }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Sales Reports & Analytics
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Period</InputLabel>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value as 'daily' | 'weekly' | 'monthly')}
            label="Period"
          >
            <MuiMenuItem value="daily">Daily</MuiMenuItem>
            <MuiMenuItem value="weekly">Weekly</MuiMenuItem>
            <MuiMenuItem value="monthly">Monthly</MuiMenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Key Metrics */}
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
          title="Total Revenue"
          value={`₹${profitLossData.totalRevenue.toLocaleString()}`}
          subtitle="This period"
          color="#4CAF50"
        />
        <StatCard
          title="Total Costs"
          value={`₹${profitLossData.totalCosts.toLocaleString()}`}
          subtitle="Raw materials & expenses"
          color="#FF9800"
        />
        <StatCard
          title="Net Profit"
          value={`₹${profitLossData.netProfit.toLocaleString()}`}
          subtitle={`${profitLossData.profitMargin}% margin`}
          color="#2196F3"
        />
        <StatCard
          title="Total Orders"
          value={salesData.reduce((sum, day) => sum + day.orders, 0)}
          subtitle="This period"
          color="#FF6B35"
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
          mb: 4,
        }}
      >
        {/* Sales Trend */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
            Sales Trend ({period})
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'sales' ? `₹${value}` : value,
                name === 'sales' ? 'Sales' : 'Orders'
              ]} />
              <Line type="monotone" dataKey="sales" stroke="#FF6B35" strokeWidth={3} />
              <Line type="monotone" dataKey="orders" stroke="#2196F3" strokeWidth={3} />
            </LineChart>
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
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Revenue by Category Bar Chart */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          Revenue by Category
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
            <Bar dataKey="sales" fill="#FF6B35" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Top Selling Items */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          Top Selling Items
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Item Name</strong></TableCell>
                <TableCell><strong>Quantity Sold</strong></TableCell>
                <TableCell><strong>Revenue</strong></TableCell>
                <TableCell><strong>Avg. Price</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.revenue.toLocaleString()}</TableCell>
                  <TableCell>₹{Math.round(item.revenue / item.quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Profit & Loss Summary */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          Profit & Loss Summary
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Total Revenue:</strong> ₹{profitLossData.totalRevenue.toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Total Costs:</strong> ₹{profitLossData.totalCosts.toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Gross Profit:</strong> ₹{profitLossData.grossProfit.toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Net Profit:</strong> ₹{profitLossData.netProfit.toLocaleString()}
            </Typography>
            <Typography variant="body1">
              <strong>Profit Margin:</strong> {profitLossData.profitMargin}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Cost Breakdown:</strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Raw Materials: ₹45,000 (60%)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Labor: ₹20,000 (27%)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Utilities: ₹7,000 (9%)
            </Typography>
            <Typography variant="body2">
              • Other Expenses: ₹3,000 (4%)
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Reports;
