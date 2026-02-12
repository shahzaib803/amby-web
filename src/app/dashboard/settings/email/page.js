'use client';
import React, { useState } from 'react';
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

export default function EmailPage() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleReset = () => {
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
    // Simulate API call
    setSnackbarMessage('Email changed successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
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
            admin email: ray@ambywell.com
         </Typography>

        <Box sx={{ maxWidth: 400 }}>
             <Box sx={{ mb: 3 }}>
                <TextField 
                    fullWidth 
                    label="Email" 
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
                    label="Confirm new email address" 
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
                    onClick={handleReset}
                    sx={{ 
                        bgcolor: '#FF6D00', 
                        color: 'white', 
                        fontWeight: 'bold',
                        px: 3,
                        '&:hover': { bgcolor: '#E65100' }
                    }}
                >
                    CHANGE EMAIL
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
