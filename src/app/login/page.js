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
  Alert
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AmbyLogo from '../../images/logo.svg';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'test@gmail.com' && password === 'Password@1') {
      setSnackbarMessage('Log in successful');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      localStorage.setItem('isAuthenticated', 'true');
      
      setTimeout(() => {
        router.push('/dashboard/users');
      }, 1000);
    } else {
      setSnackbarMessage('Incorrect password or email. Try again');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
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

          <Typography component="h2" variant="h6" sx={{ mb: 3, width: '100%', maxWidth: 400 }}>
             Admin Log In
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', maxWidth: 400 }}>
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
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
              LOGIN
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <MuiLink href="/forgot-password" underline="hover" sx={{ color: '#FF6D00' }}>
                Forgot password
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </Container>


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
