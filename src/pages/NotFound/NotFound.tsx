import React from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        sx={{
          textAlign: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography
          variant="h1"
          color="error"
          sx={{ fontWeight: 'bold', fontSize: '6rem', marginBottom: 2 }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: '600', color: '#555' }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ marginY: 2, color: '#777' }}>
          Sorry, the page you're looking for doesn't exist. Please check the URL or return to the homepage.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{
            marginTop: 2,
            padding: '8px 24px',
            textTransform: 'none',
            fontWeight: '600',
          }}
        >
          Go Back Home
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;
