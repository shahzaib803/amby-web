'use client';
import React from 'react';
import { Typography, Paper, Grid, Box } from '@mui/material';
import DashboardLayout from '../../../components/DashboardLayout';

export default function RevenuePage() {
  return (
    <DashboardLayout>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Revenue Analytics
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
             <Typography variant="h6" gutterBottom>
               Revenue Growth
             </Typography>
             <Box sx={{ 
               height: '90%', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               backgroundColor: (theme) => theme.palette.mode === 'light' ? '#f5f5f5' : '#333' 
             }}>
                <Typography color="text.secondary">Main Chart (e.g. Recharts or Chart.js)</Typography>
             </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
           <Paper sx={{ p: 3, height: 400 }}>
             <Typography variant="h6" gutterBottom>
               Revenue Breakdown
             </Typography>
             <Box sx={{ 
               height: '90%', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               backgroundColor: (theme) => theme.palette.mode === 'light' ? '#f5f5f5' : '#333' 
             }}>
                <Typography color="text.secondary">Pie Chart</Typography>
             </Box>
           </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
