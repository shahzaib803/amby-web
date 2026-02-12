'use client';
import { Box, Button, Typography, Container } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        gap: 2
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is the landing page of your new dashboard application.
        </Typography>
        <Button variant="contained" component={Link} href="/dashboard/users">
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
}
