'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Box, CircularProgress } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const StatCard = ({ title, value, icon, color }) => (
  <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Box>
      <Typography color="text.secondary" variant="subtitle2" textTransform="uppercase">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
    </Box>
    <Box sx={{ 
      backgroundColor: color, 
      borderRadius: '50%', 
      p: 1.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      {icon}
    </Box>
  </Paper>
);

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Total Users" 
            value="1,245" 
            icon={<PeopleIcon />} 
            color="#FF6D00" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Total Order" 
            value="86" 
            icon={<ShoppingCartIcon />} 
            color="#2E7D32" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Total Revenue" 
            value="$12,450" 
            icon={<AttachMoneyIcon />} 
            color="#1976D2" 
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
           <Paper sx={{ p: 3 }}>
             <Typography variant="h6" gutterBottom>
               Revenue Updates
             </Typography>
             <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
                <Typography color="text.secondary">Chart Placeholder</Typography>
             </Box>
           </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
