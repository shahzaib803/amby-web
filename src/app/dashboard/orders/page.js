'use client';
import React from 'react';
import { 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip
} from '@mui/material';
import DashboardLayout from '../../../components/DashboardLayout';

const rows = [
  { id: 101, customer: 'John Doe', date: '2023-10-25', status: 'Completed', total: '$120.00' },
  { id: 102, customer: 'Jane Smith', date: '2023-10-26', status: 'Processing', total: '$85.50' },
  { id: 103, customer: 'Alice Johnson', date: '2023-10-26', status: 'Cancelled', total: '$45.00' },
  { id: 104, customer: 'Bob Brown', date: '2023-10-27', status: 'Completed', total: '$250.00' },
  { id: 105, customer: 'Charlie Davis', date: '2023-10-28', status: 'Pending', total: '$65.00' },
];

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Recent Orders
      </Typography>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  #{row.id}
                </TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.status} 
                    color={row.status === 'Completed' ? 'success' : row.status === 'Cancelled' ? 'error' : 'warning'} 
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
}
