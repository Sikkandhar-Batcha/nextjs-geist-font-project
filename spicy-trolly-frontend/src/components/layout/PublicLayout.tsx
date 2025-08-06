import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const PublicLayout: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: 'primary.main', width: '100%' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ px: 0 }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold',
              }}
            >
              🌶️ Spicy Trolly
            </Typography>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ mr: 2 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => scrollToSection('about')}
              sx={{ mr: 2 }}
            >
              About
            </Button>
            <Button
              color="inherit"
              onClick={() => scrollToSection('menu')}
              sx={{ mr: 2 }}
            >
              Products
            </Button>
            <Button
              color="inherit"
              onClick={() => scrollToSection('contact')}
              sx={{ mr: 2 }}
            >
              Contacts
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/order"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              Make your Event orders
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: 'grey.100',
          py: 3,
          mt: 'auto',
          width: '100%',
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Spicy Trolly. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Contact: +91 XXXXX XXXXX | Email: info@spicytrolly.com
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default PublicLayout;
