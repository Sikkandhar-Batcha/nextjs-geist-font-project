import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: 'Chicken Thokku Biriyani',
      description: 'Aromatic basmati rice cooked with tender chicken pieces and traditional spices',
      price: '₹250',
      category: 'Biriyani',
    },
    {
      name: 'Chilli Biriyani',
      description: 'Spicy and flavorful biriyani with a perfect blend of chilies and spices',
      price: '₹220',
      category: 'Biriyani',
    },
    {
      name: 'Empty Biriyani',
      description: 'Fragrant vegetarian biriyani with aromatic spices and basmati rice',
      price: '₹180',
      category: 'Biriyani',
    },
    {
      name: 'Chicken 65',
      description: 'Crispy and spicy deep-fried chicken appetizer with South Indian flavors',
      price: '₹200',
      category: 'Appetizer',
    },
    {
      name: 'Idiyappam Thokku',
      description: 'Traditional string hoppers served with spicy and tangy thokku curry',
      price: '₹150',
      category: 'Traditional',
    },
    {
      name: 'Mojito Juices (5 Flavours)',
      description: 'Refreshing mojito drinks available in 5 different flavors',
      price: '₹80',
      category: 'Beverages',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #FFC107 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to Spicy Trolly
          </Typography>
          <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
            Authentic South Indian Flavors & Traditional Biriyani
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/order')}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            Order Now for Events
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="xl" sx={{ py: 8, width: '100%' }} id="about">
        <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          About Spicy Trolly
        </Typography>
        <Paper elevation={2} sx={{ p: 4, mb: 6 }}>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Spicy Trolly brings you the authentic taste of South Indian cuisine with our specially crafted
            biriyani varieties and traditional dishes. We specialize in catering for weddings, receptions,
            and special events, ensuring your guests experience the finest flavors and quality.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Our expert chefs use traditional cooking methods and the finest ingredients to create memorable
            dining experiences. From our signature Chicken Thokku Biriyani to refreshing Mojito drinks,
            every dish is prepared with love and attention to detail.
          </Typography>
        </Paper>
      </Container>

      {/* Menu Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8, width: '100%' }} id="menu">
        <Container maxWidth="xl">
          <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Our Menu
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 4,
            }}
          >
            {menuItems.map((item, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flex: 1 }}>
                      {item.name}
                    </Typography>
                    <Chip
                      label={item.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                    {item.price}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="xl" sx={{ py: 8, width: '100%' }} id="contact">
        <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Contact Us
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 4,
          }}
        >
          <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Phone:</strong> +91 XXXXX XXXXX
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> info@spicytrolly.com
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Address:</strong> [Your Address Here]
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Business Hours:</strong><br />
              Monday - Sunday: 10:00 AM - 10:00 PM
            </Typography>
          </Paper>
          <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Event Catering
            </Typography>
            <Typography variant="body1" paragraph>
              We specialize in catering for:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Wedding Ceremonies
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Reception Parties
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Corporate Events
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Birthday Celebrations
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Family Gatherings
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/order')}
              sx={{ mt: 2 }}
            >
              Book Your Event
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
