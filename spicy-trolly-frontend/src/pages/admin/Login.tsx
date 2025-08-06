import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import type { LoginCredentials } from '../../types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!credentials.email || !credentials.password) {
        throw new Error('Please fill in all fields');
      }

      const response = await authAPI.login(credentials);
      
      // Store auth data
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('adminData', JSON.stringify(response.admin));
      
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (error: any) {
      setError(error.response?.data?.message || error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FFC107 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              🌶️ Spicy Trolly
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please sign in to access the admin panel
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              type="email"
              required
              fullWidth
              value={credentials.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              sx={{ mb: 3 }}
              autoComplete="email"
            />

            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              value={credentials.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              sx={{ mb: 4 }}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ py: 1.5, fontSize: '1.1rem', mb: 2 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 2 }} />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="text"
                onClick={() => navigate('/')}
                sx={{ color: 'text.secondary' }}
              >
                ← Back to Website
              </Button>
            </Box>
          </form>

          <Box sx={{ mt: 4, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              <strong>Demo Credentials:</strong><br />
              Email: admin@spicytrolly.com<br />
              Password: admin123
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
