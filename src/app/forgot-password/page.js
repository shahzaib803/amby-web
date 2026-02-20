'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Link as MuiLink,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AmbyLogo from '../../images/logo.svg';
import { supabase } from '../../lib/supabase';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setSnackbarMessage('Please enter your email address');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    // ✅ Call Supabase to send reset password email
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`
    });

    if (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
    } else {
      setSnackbarMessage('Reset link sent to your email');
      setSnackbarSeverity('success');

      // Optionally redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }

    setOpenSnackbar(true);
    setLoading(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mb: 8
        }}>
          {/* Logo Section */}
          <Box sx={{ mb: 4 }}>
             <Image 
               src={AmbyLogo} 
               alt="Amby Logo" 
               width={150} 
               height={50} 
               priority
               style={{ width: 'auto', height: 'auto' }}
             />
          </Box>

          <Typography component="h2" variant="h6" sx={{ mb: 1, width: '100%', maxWidth: 400 }}>
             Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, width: '100%', maxWidth: 400 }}>
             Enter your email address and we'll send you a link to reset your password.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
             <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 1, 
                mb: 2, 
                bgcolor: '#FF6D00', 
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#E65100'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SEND RESET LINK'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <MuiLink href="/login" underline="hover" sx={{ color: '#FF6D00' }}>
                Back to Login
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Snackbar */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          variant="filled"
          sx={{ 
            width: '100%',
            bgcolor: snackbarSeverity === 'success' ? '#E8F5E9' : '#FFEBEE', 
            color: snackbarSeverity === 'success' ? '#2E7D32' : '#C62828',
            '& .MuiAlert-icon': {
               color: snackbarSeverity === 'success' ? '#2E7D32' : '#C62828'
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}