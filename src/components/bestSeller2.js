import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';

const BestSeller2 = () => {
  const cards = [
    {
      id: 1,
      image: 'https://via.placeholder.com/300x200', // Replace with your product image URL
      title: 'Product 1',
      description: 'This is a short description of Product 1. It is a high-quality item.',
      buttonText: 'Shop Now',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/300x200', // Replace with your product image URL
      title: 'Product 2',
      description: 'This is a short description of Product 2. It is a premium item.',
      buttonText: 'Shop Now',
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid key={card.id} item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on larger
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#fff',
              }}
            >
              {/* Description Section */}
              <Box sx={{ flex: 1, padding: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {card.description}
                </Typography>
                <Button variant="contained" color="primary">
                  {card.buttonText}
                </Button>
              </Box>

              {/* Image Section */}
              <Box
                component="img"
                src={card.image}
                alt={card.title}
                sx={{
                  width: { xs: '100%', md: '300px' }, // Full width on small screens, fixed width on larger
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSeller2;
