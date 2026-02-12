'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import DashboardLayout from '../../../../components/DashboardLayout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// --- Tab Panel Component ---
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// --- Validation Schemas ---
const accountSchema = yup.object({
  userID: yup.string().required('User ID is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Enter a valid email').required('Email address is required'),
  status: yup.string().required('Status is required'), 
  location: yup.string().required('Location is required'),
  type: yup.string().required('Type is required'),
  points: yup.number().typeError('Points must be a number').required('Amby Points are required'),
});

const passwordSchema = yup.object({
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('New Password is required'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
});

export default function EditUserPage({ params }) {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  const [openDelete, setOpenDelete] = useState(false);
  const [openSave, setOpenSave] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // --- Account Form ---
  const accountFormik = useFormik({
    initialValues: {
      userID: 'AW-012345',
      username: 'mike1234',
      email: 'mike@gmail.com',
      status: 'Active',
      location: 'New York City',
      type: 'Free',
      points: '123456',
    },
    validationSchema: accountSchema,
    onSubmit: (values) => {
      // Logic handled in confirm
      alert(JSON.stringify(values, null, 2));
      router.push('/dashboard/users');
    },
  });

  const handleConfirmSave = () => {
    setOpenSave(false);
    accountFormik.handleSubmit();
  };

  const handleConfirmDelete = () => {
    setOpenDelete(false);
    alert('User deleted!');
    router.push('/dashboard/users');
  };

  // --- Password Form ---
  const passwordFormik = useFormik({
      initialValues: {
          userID: 'AW-012345',
          username: 'mike1234',
          password: '',
          confirmPassword: '',
      },
      validationSchema: passwordSchema,
      onSubmit: (values) => {
          alert('Password Reset!');
      }
  });

  return (
    <DashboardLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
          Edit User
        </Typography>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="edit user tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab icon={<PersonIcon />} iconPosition="start" label="ACCOUNT" {...a11yProps(0)} sx={{ fontWeight: 'bold' }} />
            <Tab icon={<LockIcon />} iconPosition="start" label="PASSWORD" {...a11yProps(1)} sx={{ fontWeight: 'bold' }} />
            <Tab icon={<CalendarMonthIcon />} iconPosition="start" label="STATS" {...a11yProps(2)} sx={{ fontWeight: 'bold' }} />
          </Tabs>
        </Box>

        <Box sx={{ maxWidth: tabValue === 2 ? '100%' : 600 }}>
          
          {/* --- Tab 1: ACCOUNT --- */}
          <CustomTabPanel value={tabValue} index={0}>
            <form onSubmit={accountFormik.handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
                {/* UserID */}
                <TextField
                  fullWidth
                  id="userID"
                  name="userID"
                  label="UserID"
                  value={accountFormik.values.userID}
                  onChange={accountFormik.handleChange}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  sx={{ }}
                />

                {/* Username */}
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={accountFormik.values.username}
                  onChange={accountFormik.handleChange}
                  onBlur={accountFormik.handleBlur}
                  error={accountFormik.touched.username && Boolean(accountFormik.errors.username)}
                  helperText={accountFormik.touched.username && accountFormik.errors.username}
                  InputLabelProps={{ shrink: true }}
                />

                {/* Email Address */}
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email address *"
                  value={accountFormik.values.email}
                  onChange={accountFormik.handleChange}
                  onBlur={accountFormik.handleBlur}
                  error={accountFormik.touched.email && Boolean(accountFormik.errors.email)}
                  helperText={accountFormik.touched.email && accountFormik.errors.email}
                  InputLabelProps={{ shrink: true }}
                />

                {/* Status */}
                <FormControl fullWidth error={accountFormik.touched.status && Boolean(accountFormik.errors.status)}>
                  <InputLabel id="status-label" shrink>Active</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    label="Active"
                    displayEmpty
                    value={accountFormik.values.status}
                    onChange={accountFormik.handleChange}
                    onBlur={accountFormik.handleBlur}
                  >
                     <MenuItem value="" disabled><em>Select Status</em></MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                  </Select>
                </FormControl>

                 {/* Location */}
                 <FormControl fullWidth error={accountFormik.touched.location && Boolean(accountFormik.errors.location)}>
                  <InputLabel id="location-label" shrink>Location</InputLabel>
                  <Select
                    labelId="location-label"
                    id="location"
                    name="location"
                    label="Location"
                    displayEmpty
                    value={accountFormik.values.location}
                    onChange={accountFormik.handleChange}
                    onBlur={accountFormik.handleBlur}
                  >
                     <MenuItem value="" disabled><em>Select Location</em></MenuItem>
                    <MenuItem value="New York City">New York City</MenuItem>
                    <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                    <MenuItem value="London">London</MenuItem>
                  </Select>
                </FormControl>

                {/* Type */}
                <FormControl fullWidth error={accountFormik.touched.type && Boolean(accountFormik.errors.type)}>
                  <InputLabel id="type-label" shrink>Free</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    label="Free"
                    displayEmpty
                    value={accountFormik.values.type}
                    onChange={accountFormik.handleChange}
                    onBlur={accountFormik.handleBlur}
                  >
                    <MenuItem value="" disabled><em>Select Type</em></MenuItem>
                    <MenuItem value="Free">Free</MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                  </Select>
                </FormControl>

                {/* Amby Points */}
                <TextField
                  fullWidth
                  id="points"
                  name="points"
                  label="Amby Points"
                  value={accountFormik.values.points}
                  onChange={accountFormik.handleChange}
                  onBlur={accountFormik.handleBlur}
                  error={accountFormik.touched.points && Boolean(accountFormik.errors.points)}
                  helperText={accountFormik.touched.points && accountFormik.errors.points}
                  InputLabelProps={{ shrink: true }}
                />

                {/* Quick Add Points Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: -2 }}>
                    <Button variant="outlined" size="small" sx={{ minWidth: '80px', borderColor: '#e0e0e0', color: 'text.primary' }}>+20</Button>
                    <Button variant="outlined" size="small" sx={{ minWidth: '80px', borderColor: '#e0e0e0', color: 'text.primary' }}>+50</Button>
                    <Button variant="outlined" size="small" sx={{ minWidth: '80px', borderColor: '#e0e0e0', color: 'text.primary' }}>+100</Button>
                </Box>

                {/* Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                   <Button 
                    variant="contained" 
                    color="error" // Red button
                    onClick={() => setOpenDelete(true)}
                    sx={{ fontWeight: 'bold' }}
                  >
                    DELETE USER
                  </Button>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        variant="contained" 
                        onClick={() => router.back()}
                        sx={{ 
                        bgcolor: '#616161', 
                        color: 'white', 
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: '#424242' } 
                        }}
                    >
                        CANCEL
                    </Button>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        onClick={() => setOpenSave(true)}
                        sx={{ 
                        bgcolor: '#FF6D00', 
                        color: 'white', 
                        fontWeight: 'bold'
                        }}
                    >
                        SAVE CHANGES
                    </Button>
                  </Box>
                </Box>

              </Box>
            </form>
          </CustomTabPanel>

          {/* --- Tab 2: PASSWORD --- */}
          <CustomTabPanel value={tabValue} index={1}>
             <form onSubmit={passwordFormik.handleSubmit}>
               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth label="UserID" value={passwordFormik.values.userID} InputProps={{ readOnly: true }}
                    />
                     <TextField
                        fullWidth label="Username" value={passwordFormik.values.username} InputProps={{ readOnly: true }}
                    />
                     <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="New Password"
                        placeholder="Enter new password"
                        value={passwordFormik.values.password}
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        error={passwordFormik.touched.password && Boolean(passwordFormik.errors.password)}
                        helperText={passwordFormik.touched.password && passwordFormik.errors.password}
                        InputLabelProps={{ shrink: true }}
                    />
                     <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm new password"
                        placeholder="Re-type new password"
                        value={passwordFormik.values.confirmPassword}
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        error={passwordFormik.touched.confirmPassword && Boolean(passwordFormik.errors.confirmPassword)}
                        helperText={passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword}
                        InputLabelProps={{ shrink: true }}
                    />
                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button 
                            color="primary" 
                            variant="contained" 
                            type="submit"
                            sx={{ bgcolor: '#FF6D00', color: 'white', fontWeight: 'bold' }}
                        >
                            RESET PASSWORD
                        </Button>
                     </Box>
               </Box>
             </form>
          </CustomTabPanel>

          {/* --- Tab 3: STATS --- */}
          <CustomTabPanel value={tabValue} index={2}>
             <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>User: mike1234</Typography>
             <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Stat</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Value</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontSize: '1rem' }}>Date Joined</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>11/23/2025 13:18</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>ISO timestamp or MM/DD/YYYY</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell sx={{ fontSize: '1rem' }}>Last Active</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>1/12/2025 09:27</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>Last login or habit log timestamp</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontSize: '1rem' }}>Current Streak</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>23</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>Days of continuous habit logging</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontSize: '1rem' }}>Total Habits Logged</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>263</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>Total count across all categories</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell sx={{ fontSize: '1rem' }}>Healthy Years Added</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>6.5</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>e.g. "1.2 years" (if you track this in backend)</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
             </TableContainer>
             <Button 
                variant="contained" 
                onClick={() => router.back()}
                sx={{ bgcolor: '#616161', color: 'white', fontWeight: 'bold' }}
             >
                BACK
             </Button>
          </CustomTabPanel>

        </Box>
      </Box>

      {/* Delete Dialog */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        aria-labelledby="alert-dialog-title-delete"
      >
        <DialogTitle id="alert-dialog-title-delete">
           {"Are you sure you want to delete this user?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} sx={{ color: '#616161' }}>NO, CANCEL</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            YES, DELETE
          </Button>
        </DialogActions>
      </Dialog>

       {/* Save Dialog */}
       <Dialog
        open={openSave}
        onClose={() => setOpenSave(false)}
        aria-labelledby="alert-dialog-title-save"
      >
        <DialogTitle id="alert-dialog-title-save">
           {"Are you sure you want to save changes?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenSave(false)} sx={{ color: '#616161' }}>NO, CANCEL</Button>
          <Button onClick={handleConfirmSave} color="success" autoFocus>
            YES, SAVE
          </Button>
        </DialogActions>
      </Dialog>

    </DashboardLayout>
  );
}
