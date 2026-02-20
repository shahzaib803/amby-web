'use client';
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography,
  Snackbar, 
  Alert 
} from '@mui/material';
import Image from 'next/image';
import DashboardLayout from '../../../../components/DashboardLayout';
import AmbyLogo from '../../../../images/logo.svg';
import { supabase } from '../../../../lib/supabase';

export default function EmailPage() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch current user email
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
        setSnackbarMessage('Error fetching user info');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else if (user) {
        setCurrentEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // Handle email change
  const handleChangeEmail = async () => {
    if (!email || !confirmEmail) {
      setSnackbarMessage('Please fill in all fields');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (email !== confirmEmail) {
      setSnackbarMessage('Emails do not match');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.updateUser({ email });

    if (error) {
      console.error('Error updating email:', error.message);
      setSnackbarMessage(`Failed to update email: ${error.message}`);
      setSnackbarSeverity('error');
    } else {
      setSnackbarMessage('Email updated successfully! Please verify your new email.');
      setSnackbarSeverity('success');
      setCurrentEmail(email); // update displayed email
      setEmail('');
      setConfirmEmail('');
    }

    setOpenSnackbar(true);
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ position: 'relative', width: 120, height: 40 }}>
            <Image 
              src={AmbyLogo} 
              alt="Amby" 
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Box>

        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Current admin email: {currentEmail || 'Loading...'}
        </Typography>

        <Box sx={{ maxWidth: 400 }}>
          <Box sx={{ mb: 3 }}>
            <TextField 
              fullWidth 
              label="New Email" 
              placeholder="Enter new email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <TextField 
              fullWidth 
              label="Confirm New Email" 
              placeholder="Re-type new email address"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              onClick={handleChangeEmail}
              disabled={loading}
              sx={{ 
                bgcolor: '#FF6D00', 
                color: 'white', 
                fontWeight: 'bold',
                px: 3,
                '&:hover': { bgcolor: '#E65100' }
              }}
            >
              {loading ? 'UPDATING...' : 'CHANGE EMAIL'}
            </Button>
          </Box>
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