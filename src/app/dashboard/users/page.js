'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/DashboardLayout';

// Dummy Data
const initialRows = [
  { id: 1, username: 'mike1234', email: 'mike@gmail.com', location: 'New York City', status: 'Active', type: 'Free', points: '123,456', userId: 'AW-1234' },
  { id: 2, username: 'ray1234', email: 'ray@gmail.com', location: 'New York City', status: 'Active', type: 'Paid', points: '123,456', userId: 'AW-1234' },
  { id: 3, username: 'jake1234', email: 'jake@gmail.com', location: 'New York City', status: 'Active', type: 'Paid', points: '123,456', userId: 'AW-1234' },
  { id: 4, username: 'steve1234', email: 'steve@gmail.com', location: 'Hong Kong', status: 'Active', type: 'Free', points: '123,456', userId: 'AW-1234' },
  { id: 5, username: '1234', email: 'winnie@gmail.com', location: 'New York City', status: 'Suspended', type: 'Free', points: '123,456', userId: 'AW-1234' },
  // Add more rows to test pagination if needed
  { id: 6, username: 'dummy1', email: 'dummy1@gmail.com', location: 'London', status: 'Active', type: 'Free', points: '123,456', userId: 'AW-1234' },
  { id: 7, username: 'dummy2', email: 'dummy2@gmail.com', location: 'Paris', status: 'Suspended', type: 'Paid', points: '123,456', userId: 'AW-1234' },
  { id: 8, username: 'dummy3', email: 'dummy3@gmail.com', location: 'Tokyo', status: 'Active', type: 'Free', points: '123,456', userId: 'AW-1234' },
  { id: 9, username: 'dummy4', email: 'dummy4@gmail.com', location: 'Berlin', status: 'Active', type: 'Paid', points: '123,456', userId: 'AW-1234' },
  { id: 10, username: 'dummy5', email: 'dummy5@gmail.com', location: 'Sydney', status: 'Active', type: 'Free', points: '123,456', userId: 'AW-1234' },
];

export default function CustomersPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter Logic
  const filteredRows = initialRows.filter((row) => {
    const matchesSearch = row.username.toLowerCase().includes(search.toLowerCase()) || 
                          row.email.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter === 'All Locations' || row.location === locationFilter;
    const matchesType = typeFilter === 'All Types' || row.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <DashboardLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          User management
        </Typography>

        {/* Filters & Actions Bar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
            {/* Search */}
            <TextField 
              // Increased height by removing size="small" 
              placeholder="Name, email, etc..." 
              label="Search" // Added label to match standard MUI better or keep simple
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button variant="contained" sx={{ bgcolor: '#FF6D00', color: 'white', fontWeight: 'bold' }}>
              SEARCH
            </Button>

            {/* Location Filter */}
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Location Filter</InputLabel>
              <Select
                value={locationFilter}
                label="Location Filter"
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <MenuItem value="All Locations">All Locations</MenuItem>
                <MenuItem value="New York City">New York City</MenuItem>
                <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                <MenuItem value="London">London</MenuItem>
              </Select>
            </FormControl>

             {/* Type Filter */}
             <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Type Filter</InputLabel>
              <Select
                value={typeFilter}
                label="Type Filter"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="All Types">All Types</MenuItem>
                <MenuItem value="Free">Free</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ flexGrow: 1 }} />

            {/* Actions */}
            <Button 
              component={Link} 
              href="/dashboard/users/add"
              variant="contained" 
              sx={{ bgcolor: '#FF6D00', color: 'white', fontWeight: 'bold' }}
            >
              NEW USER
            </Button>
            <IconButton sx={{ height: '40px', width: '40px' }}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Username ↓</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email ↓</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location ↓</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Account Status ↓</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type ↓</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Points ↓</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>UserID ↓</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredRows
              ).map((row) => (
                <TableRow 
                  key={row.id} 
                  hover
                  onClick={() => router.push(`/dashboard/users/${row.id}`)}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer' 
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.status} 
                      size="small" 
                      sx={{ 
                        bgcolor: row.status === 'Active' ? '#E0E0E0' : '#FF6D00', 
                        color: row.status === 'Active' ? 'text.primary' : 'white',
                        minWidth: 80,
                        height: '30px'
                      }} 
                    />
                  </TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.points}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {/* Pagination & Export */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 2 }}>
             <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Button 
               variant="contained" 
               sx={{ ml: 2, bgcolor: '#FF6D00', color: 'white', fontWeight: 'bold' }}
            >
               EXPORT CSV
            </Button>
          </Box>
        </TableContainer>
      </Box>
    </DashboardLayout>
  );
}
