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
  FormControl
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardLayout from '../../../components/DashboardLayout';

const initialRows = [
  { id: 1, userId: 'AW-1234', username: 'steve1234', email: 'steve@gmail.com', location: 'Hong Kong', lastRedemDate: '01 March 2026', lastReward: 'Starbucks', lastDollar: '$50', lastPoints: '$50', totalDollar: '123,456', totalPoints: '123,456' },
  { id: 2, userId: 'AW-1234', username: 'winnie1234', email: 'winnie@gmail.com', location: 'New York City', lastRedemDate: '01 March 2026', lastReward: 'Amazon', lastDollar: '$25', lastPoints: '$25', totalDollar: '123,456', totalPoints: '123,456' },
  { id: 3, userId: 'AW-1234', username: 'steve1234', email: 'steve@gmail.com', location: 'Hong Kong', lastRedemDate: '01 March 2026', lastReward: 'Starbucks', lastDollar: '$15', lastPoints: '$15', totalDollar: '123,456', totalPoints: '123,456' },
  { id: 4, userId: 'AW-1234', username: 'steve1234', email: 'steve@gmail.com', location: 'Hong Kong', lastRedemDate: '01 March 2026', lastReward: 'Starbucks', lastDollar: '$5', lastPoints: '$5', totalDollar: '123,456', totalPoints: '123,456' },
  { id: 5, userId: 'AW-1234', username: 'winnie1234', email: 'winnie@gmail.com', location: 'New York City', lastRedemDate: '01 March 2026', lastReward: 'Amazon', lastDollar: '$5', lastPoints: '$5', totalDollar: '123,456', totalPoints: '123,456' },
  { id: 6, userId: 'AW-1234', username: 'winnie1234', email: 'winnie@gmail.com', location: 'New York City', lastRedemDate: '01 March 2026', lastReward: 'Amazon', lastDollar: '$15', lastPoints: '$15', totalDollar: '123,456', totalPoints: '123,456' },
];

export default function RedemptionsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [typeFilter, setTypeFilter] = useState('Retail');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = initialRows.filter((row) => {
    const matchesSearch = row.username.toLowerCase().includes(search.toLowerCase()) || 
                          row.email.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter === 'All Locations' || row.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <DashboardLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Rewards Redemptions Log
        </Typography>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
            <TextField 
              placeholder="Name, email, etc..." 
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: 300 }}
            />

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Location Filter</InputLabel>
              <Select
                value={locationFilter}
                label="Location Filter"
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <MenuItem value="All Locations">All Locations</MenuItem>
                <MenuItem value="New York City">New York City</MenuItem>
                <MenuItem value="Hong Kong">Hong Kong</MenuItem>
              </Select>
            </FormControl>

               <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Type Filter</InputLabel>
              <Select
                value={typeFilter}
                label="Type Filter"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="Retail">Retail</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ flexGrow: 1 }} />

            <IconButton sx={{ color: 'text.secondary' }}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="redemptions table">
            <TableHead>
              <TableRow>
                {['UserID', 'Username', 'Email', 'Location', 'Last Redem Date', 'Last reward redeemed', 'Last $ redeemed', 'Last points used', 'Total $ redeemed', 'Total points used'].map((head) => (
                    <TableCell key={head} sx={{ fontWeight: 'bold' }}>{head}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredRows
              ).map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.lastRedemDate}</TableCell>
                  <TableCell>{row.lastReward}</TableCell>
                  <TableCell>{row.lastDollar}</TableCell>
                  <TableCell>{row.lastPoints}</TableCell>
                  <TableCell>{row.totalDollar}</TableCell>
                  <TableCell>{row.totalPoints}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            <Box /> 
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          </Box>
        </TableContainer>
      </Box>
    </DashboardLayout>
  );
}
