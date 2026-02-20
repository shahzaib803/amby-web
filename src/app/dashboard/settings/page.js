'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import DashboardLayout from '../../../components/DashboardLayout';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import { supabase } from '../../../lib/supabase'; // Make sure your supabase client is imported

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  // Fetch current logged-in user's email
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
        setSnackbarMessage('Error fetching user info');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else if (user) {
        setUserEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // Send password reset email
  const handleResetPassword = async () => {
    if (!userEmail) return;
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(userEmail, {
      redirectTo: `${window.location.origin}/login`
    });

    if (error) {
      console.error('Error sending reset email:', error.message);
      setSnackbarMessage('Failed to send reset email');
      setSnackbarSeverity('error');
    } else {
      setSnackbarMessage('Password reset email sent!');
      setSnackbarSeverity('success');
    }

    setOpenSnackbar(true);
    setLoading(false);
  };

  const handleChangeEmail = () => {
    // navigate to your email change page
    window.location.href = '/dashboard/settings/email';
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Settings
        </Typography>

        <Box sx={{ maxWidth: 800 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: '2px solid #FF6D00', width: 'fit-content', pr: 2, pb: 0.5 }}>
            <HttpsIcon sx={{ color: '#FF6D00', mr: 1, fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ color: '#FF6D00', fontWeight: 'bold', letterSpacing: 1 }}>
              PASSWORD
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Admin email: {userEmail || 'Loading...'}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<HttpsIcon />}
              onClick={handleResetPassword}
              sx={{
                bgcolor: '#FF6D00',
                color: 'white',
                fontWeight: 'bold',
                px: 3,
                '&:hover': { bgcolor: '#E65100' }
              }}
              disabled={loading}
            >
              {loading ? 'SENDING...' : 'RESET PASSWORD'}
            </Button>

            <Button
              variant="contained"
              startIcon={<EmailIcon />}
              onClick={handleChangeEmail}
              sx={{
                bgcolor: '#FF6D00',
                color: 'white',
                fontWeight: 'bold',
                px: 3,
                '&:hover': { bgcolor: '#E65100' }
              }}
            >
              CHANGE ADMIN EMAIL
            </Button>
          </Box>

          <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            Sends a password reset email or navigate to change admin email
          </Typography>
        </Box>

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
              fontWeight: 'bold',
              '& .MuiAlert-icon': {
                color: snackbarSeverity === 'success' ? '#2E7D32' : '#C62828'
              }
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </DashboardLayout>
  );
}