// 'use client';
// import React from 'react';
// import { 
//   Box, 
//   Button, 
//   Container, 
//   TextField, 
//   Typography, 
//   Paper, 
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText
// } from '@mui/material';
// import DashboardLayout from '../../../../components/DashboardLayout'; // Correct Import Path
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { useRouter } from 'next/navigation';

// // Validation Schema
// const validationSchema = yup.object({
//   userID: yup.string().required('User ID is required'),
//   username: yup.string().required('Username is required'),
//   email: yup.string().email('Enter a valid email').required('Email address is required'),
//   status: yup.string().required('Status is required'), // Active
//   location: yup.string().required('Location is required'),
//   type: yup.string().required('Type is required'), // Free/Paid
//   points: yup.number().typeError('Points must be a number').required('Amby Points are required'),
//   password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
// });

// export default function AddUserPage() {
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues: {
//       userID: 'AW-012345', // Pre-filled as per design
//       username: '',
//       email: '',
//       status: '',
//       location: '',
//       type: '',
//       points: '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log('Form Submitted:', values);
//       // Simulate backend call
//       alert(JSON.stringify(values, null, 2));
//       router.push('/dashboard/users');
//     },
//   });

//   return (
//     <DashboardLayout>
//       <Box sx={{ p: 2 }}>
//         <Box sx={{ maxWidth: 600 }}>
          
//           <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
//             Add User
//           </Typography>

//           <Paper sx={{ p: 4 }}>
//             <form onSubmit={formik.handleSubmit}>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
//                 {/* UserID */}
//                 <TextField
//                   fullWidth
//                   id="userID"
//                   name="userID"
//                   label="UserID"
//                   value={formik.values.userID}
//                   onChange={formik.handleChange}
//                   error={formik.touched.userID && Boolean(formik.errors.userID)}
//                   helperText={formik.touched.userID && formik.errors.userID}
//                   InputProps={{
//                     readOnly: true, 
//                   }}
//                   variant="outlined"
//                   sx={{ }}
//                 />

//                 {/* Username */}
//                 <TextField
//                   fullWidth
//                   id="username"
//                   name="username"
//                   label="Username"
//                   placeholder="Enter username" // Placeholder from design
//                   value={formik.values.username}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.username && Boolean(formik.errors.username)}
//                   helperText={formik.touched.username && formik.errors.username}
//                   InputLabelProps={{ shrink: true }} // To show label above placeholder
//                 />

//                 {/* Email Address */}
//                 <TextField
//                   fullWidth
//                   id="email"
//                   name="email"
//                   label="Email address *"
//                   placeholder="Enter email address"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.email && Boolean(formik.errors.email)}
//                   helperText={formik.touched.email && formik.errors.email}
//                   InputLabelProps={{ shrink: true }}
//                 />

//                 {/* Status (Active) */}
//                 <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
//                   <InputLabel id="status-label" shrink>Active</InputLabel>
//                   <Select
//                     labelId="status-label"
//                     id="status"
//                     name="status"
//                     label="Active" // Ensures label alignment
//                     displayEmpty
//                     value={formik.values.status}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   >
//                     <MenuItem value="" disabled>
//                       <em>Select Status</em>
//                     </MenuItem>
//                     <MenuItem value="Active">Active</MenuItem>
//                     <MenuItem value="Suspended">Suspended</MenuItem>
//                   </Select>
//                   {formik.touched.status && formik.errors.status && (
//                     <FormHelperText>{formik.errors.status}</FormHelperText>
//                   )}
//                 </FormControl>

//                  {/* Location */}
//                  <FormControl fullWidth error={formik.touched.location && Boolean(formik.errors.location)}>
//                   <InputLabel id="location-label" shrink>Location</InputLabel>
//                   <Select
//                     labelId="location-label"
//                     id="location"
//                     name="location"
//                     label="Location"
//                     displayEmpty
//                     value={formik.values.location}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   >
//                      <MenuItem value="" disabled>
//                       <em>Select Location</em>
//                     </MenuItem>
//                     <MenuItem value="New York City">New York City</MenuItem>
//                     <MenuItem value="Hong Kong">Hong Kong</MenuItem>
//                     <MenuItem value="London">London</MenuItem>
//                   </Select>
//                   {formik.touched.location && formik.errors.location && (
//                     <FormHelperText>{formik.errors.location}</FormHelperText>
//                   )}
//                 </FormControl>

//                 {/* Type (Free/Paid) */}
//                 <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
//                   <InputLabel id="type-label" shrink>Free</InputLabel> {/* Label mimicking the design's "Free" dropdown behavior which is likely "Type" */}
//                   <Select
//                     labelId="type-label"
//                     id="type"
//                     name="type"
//                     label="Free"
//                     displayEmpty
//                     value={formik.values.type}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   >
//                      <MenuItem value="" disabled>
//                       <em>Select Type</em>
//                     </MenuItem>
//                     <MenuItem value="Free">Free</MenuItem>
//                     <MenuItem value="Paid">Paid</MenuItem>
//                   </Select>
//                    {formik.touched.type && formik.errors.type && (
//                     <FormHelperText>{formik.errors.type}</FormHelperText>
//                   )}
//                 </FormControl>


//                 {/* Amby Points */}
//                 <TextField
//                   fullWidth
//                   id="points"
//                   name="points"
//                   label="Amby Points"
//                   placeholder="Enter starting Amby Points"
//                   value={formik.values.points}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.points && Boolean(formik.errors.points)}
//                   helperText={formik.touched.points && formik.errors.points}
//                   InputLabelProps={{ shrink: true }}
//                 />

//                 {/* Password */}
//                 <TextField
//                   fullWidth
//                   id="password"
//                   name="password"
//                   label="Password"
//                   type="password"
//                   placeholder="Enter a password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.password && Boolean(formik.errors.password)}
//                   helperText={formik.touched.password && formik.errors.password}
//                   InputLabelProps={{ shrink: true }}
//                 />

//                 {/* Buttons */}
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
//                   <Button 
//                     variant="contained" 
//                     onClick={() => router.back()}
//                     sx={{ 
//                       bgcolor: '#616161', 
//                       color: 'white', 
//                       fontWeight: 'bold',
//                       minWidth: '120px',
//                       '&:hover': { bgcolor: '#424242' } 
//                     }}
//                   >
//                     CANCEL
//                   </Button>
//                   <Button 
//                     color="primary" 
//                     variant="contained" 
//                     type="submit"
//                     sx={{ 
//                       bgcolor: '#FF6D00', 
//                       color: 'white', 
//                       fontWeight: 'bold',
//                        minWidth: '150px'
//                     }}
//                   >
//                     ADD NEW USER
//                   </Button>
//                 </Box>

//               </Box>
//             </form>
//           </Paper>
//         </Box>
//       </Box>
//     </DashboardLayout>
//   );
// }


'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  TextField, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert
} from '@mui/material';
import DashboardLayout from '../../../../components/DashboardLayout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import { supabaseAdmin } from '../../../../lib/supabaseAdmin';

// Validation Schema
const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Enter a valid email').required('Email address is required'),
  location: yup.string().required('Location is required'),
  subscription_tier: yup.string().required('Subscription tier is required'),
  total_points: yup.number().typeError('Points must be a number').required('Points are required'),
  total_time_spent: yup.number().typeError('Time must be a number').required('Time is required'),
  password: yup.string().min(8, 'Password should be minimum 8 characters').required('Password is required'),
});

export default function AddUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      location: '',
      subscription_tier: 'Free',
      total_points: 0,
      total_time_spent: 0,
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        // 1️⃣ Create user in Supabase Auth
        
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: values.email,
          password: values.password,
          email_confirm: true, // auto confirm email
        });

        if (authError) throw authError;

        const userId = authUser.user.id;

        // 2️⃣ Insert into users table
        const { error: usersError } = await supabase.from('users').insert([
          {
            id: userId,
            email: values.email,
            username: values.username,
            location: values.location,
          },
        ]);

        if (usersError) throw usersError;

        // 3️⃣ Insert into profiles table
        const { error: profilesError } = await supabase.from('profiles').insert([
          {
            id: userId,
            avatar_url: '', // default blank
            subscription_tier: values.subscription_tier,
            total_points: values.total_points,
            total_time_spent: values.total_time_spent,
          },
        ]);

        if (profilesError) throw profilesError;

        setSnackbarMessage('User created successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        router.push('/dashboard/users');
      } catch (error) {
        console.error('Error creating user:', error.message || error);
        setSnackbarMessage(`Failed to create user: ${error.message || error}`);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }

      setLoading(false);
    },
  });

  return (
    <DashboardLayout>
      <Box sx={{ p: 2 }}>
        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            Add User
          </Typography>

          <Paper sx={{ p: 4 }}>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                {/* Username */}
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  placeholder="Enter username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  InputLabelProps={{ shrink: true }}
                />

                {/* Email */}
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email address"
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputLabelProps={{ shrink: true }}
                />

                {/* Location */}
                <FormControl fullWidth error={formik.touched.location && Boolean(formik.errors.location)}>
                  <InputLabel id="location-label">Location</InputLabel>
                  <Select
                    labelId="location-label"
                    id="location"
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value=""><em>Select Location</em></MenuItem>
                    <MenuItem value="New York">New York City</MenuItem>
                    <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                    {/* <MenuItem value="London">London</MenuItem> */}
                  </Select>
                  {formik.touched.location && formik.errors.location && (
                    <FormHelperText>{formik.errors.location}</FormHelperText>
                  )}
                </FormControl>

                {/* Subscription Tier */}
                <FormControl fullWidth error={formik.touched.subscription_tier && Boolean(formik.errors.subscription_tier)}>
                  <InputLabel id="subscription-label">Subscription Tier</InputLabel>
                  <Select
                    labelId="subscription-label"
                    id="subscription_tier"
                    name="subscription_tier"
                    value={formik.values.subscription_tier}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="free">Free</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                  </Select>
                  {formik.touched.subscription_tier && formik.errors.subscription_tier && (
                    <FormHelperText>{formik.errors.subscription_tier}</FormHelperText>
                  )}
                </FormControl>

                {/* Total Points */}
                <TextField
                  fullWidth
                  id="total_points"
                  name="total_points"
                  label="Total Points"
                  type="number"
                  placeholder="Enter starting points"
                  value={formik.values.total_points}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.total_points && Boolean(formik.errors.total_points)}
                  helperText={formik.touched.total_points && formik.errors.total_points}
                  InputLabelProps={{ shrink: true }}
                />

                {/* Total Time Spent */}
                

                {/* Password */}
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputLabelProps={{ shrink: true }}
                />

                {/* Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button 
                    variant="contained" 
                    onClick={() => router.back()}
                    sx={{ bgcolor: '#616161', color: 'white', fontWeight: 'bold', '&:hover': { bgcolor: '#424242' } }}
                  >
                    CANCEL
                  </Button>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    type="submit"
                    disabled={loading}
                    sx={{ bgcolor: '#FF6D00', color: 'white', fontWeight: 'bold' }}
                  >
                    {loading ? 'ADDING...' : 'ADD NEW USER'}
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>

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
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </DashboardLayout>
  );
}