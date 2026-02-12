'use client';
import React, { useState } from 'react';
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
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleResetPassword = () => {
        router.push('/dashboard/settings/password');
    };

    const handleChangeEmail = () => {
        router.push('/dashboard/settings/email');
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
                        admin email: ray@ambywell.com
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
                        >
                            RESET PASSWORD
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
                        SENDS USER EMAIL TO RESET PASSWORD OR CHANGE ADMIN EMAIL
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
