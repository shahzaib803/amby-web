// 'use client';
// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Button, 
//   Container, 
//   Typography, 
//   Paper, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   TablePagination,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   TextField,
//   Chip
// } from '@mui/material';
// import SettingsIcon from '@mui/icons-material/Settings';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import DashboardLayout from '../../../components/DashboardLayout';
// import { supabase } from '@/lib/supabase';

// export default function CustomersPage() {
//   const router = useRouter();

//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [search, setSearch] = useState('');
//   const [locationFilter, setLocationFilter] = useState('All Locations');
//   const [typeFilter, setTypeFilter] = useState('All Types');

//   // Fetch users from Supabase
//   const fetchUsers = async () => {
//     const { data, error } = await supabase
//       .from('users')
//       .select('*');
//     if (error) {
//       console.error(error);
//     } else {
//       console.log(data)
//       setUsers(data);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filter users
//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.username?.toLowerCase().includes(search.toLowerCase()) ||
//       user.email?.toLowerCase().includes(search.toLowerCase());
//     const matchesLocation =
//       locationFilter === 'All Locations' || user.location === locationFilter;
//     const matchesType =
//       typeFilter === 'All Types' || user.type === typeFilter;
//     return matchesSearch && matchesLocation && matchesType;
//   });

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

//   // Export CSV
//   const exportCSV = () => {
//     const headers = ['Username', 'Email', 'Location', 'Status', 'Type', 'Points', 'UserID'];
//     const rows = filteredUsers.map(user => [
//       user.username,
//       user.email,
//       user.location,
//       user.status||'Active',
//       user.type,
//       user.points,
//       user.id
//     ]);
//     const csvContent = "data:text/csv;charset=utf-8," 
//       + headers.join(",") + "\n" 
//       + rows.map(e => e.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "users.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   return (
//     <DashboardLayout>
//       <Box sx={{ p: 2 }}>
//         <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
//           User management
//         </Typography>

//         {/* Filters & Actions Bar */}
//         <Paper sx={{ p: 2, mb: 3 }}>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
//             {/* Search */}
//             <TextField 
//               placeholder="Name, email, etc..." 
//               label="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               sx={{ flexGrow: 1 }}
//             />
//             <Button variant="contained" sx={{ bgcolor: '#FF6D00', color: 'white', fontWeight: 'bold' }}>
//               SEARCH
//             </Button>

//             {/* Location Filter */}
//             <FormControl sx={{ minWidth: 150 }}>
//               <InputLabel>Location Filter</InputLabel>
//               <Select
//                 value={locationFilter}
//                 label="Location Filter"
//                 onChange={(e) => setLocationFilter(e.target.value)}
//               >
//                 <MenuItem value="All Locations">All Locations</MenuItem>
//                 <MenuItem value="New York City">New York City</MenuItem>
//                 <MenuItem value="Hong Kong">Hong Kong</MenuItem>
//                 {/* <MenuItem value="London">London</MenuItem> */}
//               </Select>
//             </FormControl>

//              {/* Type Filter */}
//              <FormControl sx={{ minWidth: 150 }}>
//               <InputLabel>Type Filter</InputLabel>
//               <Select
//                 value={typeFilter}
//                 label="Type Filter"
//                 onChange={(e) => setTypeFilter(e.target.value)}
//               >
//                 <MenuItem value="All Types">All Types</MenuItem>
//                 <MenuItem value="Free">Free</MenuItem>
//                 <MenuItem value="Paid">Paid</MenuItem>
//               </Select>
//             </FormControl>

//             <Box sx={{ flexGrow: 1 }} />

//             {/* Actions */}
//             <Button 
//               component={Link} 
//               href="/dashboard/users/add"
//               variant="contained" 
//               sx={{ bgcolor: '#FF6D00', color: 'white', fontWeight: 'bold' }}
//             >
//               NEW USER
//             </Button>
//             <IconButton sx={{ height: '40px', width: '40px' }}>
//               <SettingsIcon />
//             </IconButton>
//           </Box>
//         </Paper>

//         {/* Table */}
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="user table">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Username ↓</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Email ↓</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Location ↓</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Account Status ↓</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Type ↓</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Points ↓</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>UserID ↓</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {(rowsPerPage > 0
//                 ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 : filteredUsers
//               ).map((row) => (
//                 <TableRow 
//                   key={row.id} 
//                   hover
//                   onClick={() => router.push(`/dashboard/users/${row?.id}`)}
//                   sx={{ 
//                     '&:last-child td, &:last-child th': { border: 0 },
//                     cursor: 'pointer' 
//                   }}
//                 >
//                   <TableCell component="th" scope="row">{row?.username}</TableCell>
//                   <TableCell>{row?.email}</TableCell>
//                   <TableCell>{row?.location}</TableCell>
//                   <TableCell>
//                     <Chip 
//                       label={row?.status||'Active'} 
//                       size="small" 
//                       sx={{ 
//                         bgcolor: row?.status === 'Active' ? '#E0E0E0' : '#FF6D00', 
//                         color: row?.status === 'Active' ? 'text.primary' : 'white',
//                         minWidth: 80,
//                         height: '30px'
//                       }} 
//                     />
//                   </TableCell>
//                   <TableCell>{row?.type}</TableCell>
//                   <TableCell>{row?.points}</TableCell>
//                   <TableCell>{row?.id}</TableCell>
//                 </TableRow>
//               ))}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: 53 * emptyRows }}>
//                   <TableCell colSpan={7} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>

//           {/* Pagination & Export */}
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 2 }}>
//              <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={filteredUsers.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={(e, newPage) => setPage(newPage)}
//               onRowsPerPageChange={(e) => {
//                 setRowsPerPage(parseInt(e.target.value, 10));
//                 setPage(0);
//               }}
//             />
//             <Button 
//                variant="contained" 
//                sx={{ ml: 2, bgcolor: '#FF6D00', color: 'white', fontWeight: 'bold' }}
//                onClick={exportCSV}
//             >
//                EXPORT CSV
//             </Button>
//           </Box>
//         </TableContainer>
//       </Box>
//     </DashboardLayout>
//   );
// }


'use client';
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
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
  TextField,
  Chip
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/DashboardLayout';
import { supabase } from '@/lib/supabase';

export default function CustomersPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [typeFilter, setTypeFilter] = useState('All Types');

  // Fetch users + profiles and merge
  const fetchUsers = async () => {
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*');

    if (usersError) return console.error(usersError);

    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*');

      console.log('profilesData',profilesData)
      console.log('profilesData',profilesError)
    if (profilesError) return console.error(profilesError);

    // Merge users with profile info
    const merged = usersData.map(user => {
      const profile = profilesData.find(p => p.id === user.id) || {};
      return {
        ...user,
        points: profile.total_points || 0,
        userType: profile.subscription_tier || 'N/A',
      };
    });

    setUsers(merged);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    const matchesLocation =
      locationFilter === 'All Locations' || user.location === locationFilter;
    const matchesType =
      typeFilter === 'All Types' || user.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  // Export CSV
  const exportCSV = () => {
    const headers = ['Username', 'Email', 'Location', 'Status', 'Type', 'Points', 'UserID', 'User Type'];
    const rows = filteredUsers.map(user => [
      user.username,
      user.email,
      user.location,
      user.status || 'Active',
      user.type,
      user.points,
      user.userId,
      user.userType
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          User management
        </Typography>
        {/* Filters & Actions Bar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
            <TextField 
              placeholder="Name, email, etc..." 
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button variant="contained" sx={{ bgcolor: '#FF6D00', color: 'white', fontWeight: 'bold' }}>
              SEARCH
            </Button>

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
              </Select>
            </FormControl>

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
                <TableCell sx={{ fontWeight: 'bold' }}>User Type ↓</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Points ↓</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>UserID ↓</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredUsers
              ).map((row) => (
                <TableRow 
                  key={row.userId} 
                  hover
                  onClick={() => router.push(`/dashboard/users/${row?.userId}`)}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer' 
                  }}
                >
                  <TableCell>{row?.username}</TableCell>
                  <TableCell>{row?.email}</TableCell>
                  <TableCell>{row?.location}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row?.status || 'Active'} 
                      size="small" 
                      sx={{ 
                        bgcolor: row?.status === 'Active' ? '#E0E0E0' : '#FF6D00', 
                        color: row?.status === 'Active' ? 'text.primary' : 'white',
                        minWidth: 80,
                        height: '30px'
                      }} 
                    />
                  </TableCell>
                  <TableCell>{row?.userType}</TableCell>
                  <TableCell>{row?.points}</TableCell>
                  <TableCell>{row?.id}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination & Export */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 2 }}>
             <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
            <Button 
               variant="contained" 
               sx={{ ml: 2, bgcolor: '#FF6D00', color: 'white', fontWeight: 'bold' }}
               onClick={exportCSV}
            >
               EXPORT CSV
            </Button>
          </Box>
        </TableContainer>
      </Box>
    </DashboardLayout>
  );
}