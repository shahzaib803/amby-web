// 'use client';
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Tabs,
//   Tab,
//   Dialog,
//   DialogTitle,
//   DialogActions,
// } from '@mui/material';
// import DashboardLayout from '../../../components/DashboardLayout';
// import { useFormik } from 'formik';
// import { supabase } from '../../../lib/supabase'; // adjust if needed
// import { CircularProgress } from '@mui/material'

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`points-tabpanel-${index}`}
//       aria-labelledby={`points-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ pt: 3 }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `points-tab-${index}`,
//     'aria-controls': `points-tabpanel-${index}`,
//   };
// }

// const pointFields = [
//   { label: '🏋️ Exercise', name: 'exercise' },
//   { label: '🧘 Mindful break / meditation', name: 'mindfulBreak' },
//   { label: '🧘 Mind-body (yoga, pilates)', name: 'mindBody' },
//   { label: '📓 Journal / reflection', name: 'journal' },
//   { label: '🏃 10k Steps', name: 'steps10k' },
//   { label: '🗣️ Opened up to someone', name: 'openedup' },
//   { label: '🥗 Healthy meal (eat out)', name: 'healthyMealEatOut' },
//   { label: '☀️ Morning skincare', name: 'morningSkincare' },
//   { label: '🍳 Home-cooked meal', name: 'homeCookedMeal' },
//   { label: '🌙 Night skincare', name: 'nightSkincare' },
//   { label: '🛌 7-8 hours sleep', name: 'sleep7to8' },
//   { label: '🧴 Applied sunscreen', name: 'sunscreen' },
//   { label: '📵 Unplugged after 11pm', name: 'unplugged11pm' },
//   { label: '💧 Stayed hydrated', name: 'hydrated' },
//   // { label: '💧 Mental Well-being', name: 'Openedup' },
// ];

// export default function PointsManagementPage() {
//   const [tabValue, setTabValue] = useState(0);
//   const [openSave, setOpenSave] = useState(false);
//   const [activeForm, setActiveForm] = useState(null);
//   const [activityIds, setActivityIds] = useState({});
//   const [loading, setLoading] = useState(false); // ✅ loading state

//   const initialValues = pointFields.reduce((acc, field) => {
//     acc[field.name] = '0';
//     return acc;
//   }, {});

//   const formikFree = useFormik({
//     initialValues,
//     enableReinitialize: true,
//     onSubmit: () => {
//       setActiveForm('free');
//       setOpenSave(true);
//     },
//   });

//   const formikPaid = useFormik({
//     initialValues,
//     enableReinitialize: true,
//     onSubmit: () => {
//       setActiveForm('paid');
//       setOpenSave(true);
//     },
//   });

//   // ✅ FETCH DATA FROM SUPABASE
//   useEffect(() => {
//     fetchActivities();
//   }, []);

//   //   const { data, error } = await supabase
//   //     .from('activities')
//   //     .select('*');

//   //   if (error) {
//   //     console.error('Fetch error:', error);
//   //     return;
//   //   }

//   //   console.log('Fetched activities:', data);

//   //   // Step 1: Create default structure from pointFields
//   //   const freeData = {};
//   //   const paidData = {};

//   //   pointFields.forEach((field) => {
//   //     freeData[field.name] = '0';
//   //     paidData[field.name] = '0';
//   //   });

//   //   // Step 2: Override with database values
//   //   data.forEach((item) => {
//   //     if (freeData.hasOwnProperty(item.name)) {
//   //       freeData[item.name] = item.points_free?.toString() || '0';
//   //       paidData[item.name] = item.points_premium?.toString() || '0';
//   //     }
//   //   });

//   //   // Step 3: Set Formik values
//   //   formikFree.setValues(freeData);
//   //   formikPaid.setValues(paidData);
//   // };

//   // ✅ UPDATE SUPABASE
//   // const handleConfirmSave = async () => {
//   //   setOpenSave(false);

//   //   const values =
//   //     activeForm === 'free'
//   //       ? formikFree.values
//   //       : formikPaid.values;

//   //   for (const key in values) {
//   //     const updateColumn =
//   //       activeForm === 'free'
//   //         ? { point_free: parseInt(values[key]) }
//   //         : { point_permium: parseInt(values[key]) };

//   //     await supabase
//   //       .from('activities')
//   //       .update(updateColumn)
//   //       .eq('name', key);
//   //   }

//   //   alert('Points updated successfully!');
//   // };

//   // const handleConfirmSave = async () => {
//   //   setOpenSave(false);

//   //   const values =
//   //     activeForm === 'free'
//   //       ? formikFree.values
//   //       : formikPaid.values;

//   //   // Build update object dynamically
//   //   const updateData = {};

//   //   for (const key in values) {
//   //     updateData[key] = parseInt(values[key]);
//   //   }

//   //   const columnToUpdate =
//   //     activeForm === 'free'
//   //       ? { points_free: updateData }
//   //       : { points_premium: updateData };

//   //   const { error } = await supabase
//   //     .from('activities')
//   //     .update(columnToUpdate)
//   //     .eq('id', 1); // assuming single config row

//   //   if (error) {
//   //     console.error('Update error:', error);
//   //     alert('Error updating points');
//   //     return;
//   //   }

//   //   alert('Points updated successfully!');
//   // };
//   const fetchActivities = async () => {
//     const { data, error } = await supabase
//       .from('activities')
//       .select('id, name, points_free, points_premium');

//     if (error) {
//       console.error('Fetch error:', error);
//       return;
//     }

//     const freeData = {};
//     const paidData = {};
//     const idMap = {};

//     pointFields.forEach((field) => {
//       freeData[field.name] = '0';
//       paidData[field.name] = '0';
//     });

//     data.forEach((item) => {
//       if (freeData.hasOwnProperty(item.name)) {
//         freeData[item.name] = item.points_free?.toString() || '0';
//         paidData[item.name] = item.points_premium?.toString() || '0';
//         idMap[item.name] = item.id; // 🔥 store uuid for each activity
//       }
//     });

//     formikFree.setValues(freeData);
//     formikPaid.setValues(paidData);

//     // store idMap in component state
//     setActivityIds(idMap);
//   };

//   // const handleConfirmSave = async () => {
//   //   setOpenSave(false);

//   //   const values =
//   //     activeForm === 'free'
//   //       ? formikFree.values
//   //       : formikPaid.values;

//   //   // Step 1: Get first row (points config row)
//   //   const { data, error: fetchError } = await supabase
//   //     .from('activities')
//   //     .select('id')
//   //     .limit(1)
//   //     .single();

//   //   if (fetchError) {
//   //     console.error('Fetch ID error:', fetchError);
//   //     alert('Error finding record');
//   //     return;
//   //   }

//   //   const updateData = {};

//   //   for (const key in values) {
//   //     updateData[key] = parseInt(values[key]);
//   //   }

//   //   // Step 2: Update using real UUID
//   //   const { error } = await supabase
//   //     .from('activities')
//   //     .update(updateData)
//   //     .eq('id', data.id);

//   //   if (error) {
//   //     console.error('Update error:', error);
//   //     alert('Error updating points');
//   //     return;
//   //   }

//   //   alert('Points updated successfully!');
//   // };

//   const handleConfirmSave = async () => {
//     setOpenSave(false);
//     setLoading(true);
//     const values =
//       activeForm === 'free'
//         ? formikFree.values
//         : formikPaid.values;

//     for (const key in values) {
//       const rowId = activityIds[key];

//       if (!rowId) continue;

//       const updateColumn =
//         activeForm === 'free'
//           ? { points_free: parseInt(values[key]) }
//           : { points_premium: parseInt(values[key]) };

//       const { error } = await supabase
//         .from('activities')
//         .update(updateColumn)
//         .eq('id', rowId); // ✅ update using correct UUID

//       if (error) {
//         setLoading(false);
//         console.error(`Error updating ${key}:`, error);
//         alert(`Error updating ${key}`);
//         return;
//       }
//     }
//     setLoading(false);
//     alert('Points updated successfully!');
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const renderForm = (formik) => (
//     <form onSubmit={formik.handleSubmit}>
//       <Box
//         sx={{
//           display: 'grid',
//           gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
//           gap: 2,
//           maxWidth: '720px',
//         }}
//       >
//         {pointFields.map((field, index) => (
//           <Box key={index}>
//             <TextField
//               fullWidth
//               id={field.name}
//               name={field.name}
//               label={field.label}
//               value={formik.values[field.name]}
//               onChange={formik.handleChange}
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               placeholder="0"
//             />
//           </Box>
//         ))}
//       </Box>

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
//         <Button
//           color="primary"
//           variant="contained"
//           type="submit"
//           sx={{
//             bgcolor: '#FF6D00',
//             color: 'white',
//             fontWeight: 'bold',
//             px: 4,
//             py: 1.5,
//           }}
//           disabled={loading} // ✅ disable button while saving
//         >
//           {loading ? (
//             <CircularProgress size={24} sx={{ color: 'red' }} />
//           ) : (
//             'SAVE CHANGES'
//           )}
//         </Button>
//       </Box>
//     </form>
//   );

//   return (
//     <DashboardLayout>
//       <Box sx={{ p: 2 }}>
//         <Typography
//           variant="h4"
//           component="h1"
//           gutterBottom
//           sx={{ mb: 4, fontWeight: 'bold' }}
//         >
//           Points Management
//         </Typography>

//         <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             TabIndicatorProps={{ sx: { bgcolor: '#FF6D00' } }}
//             sx={{
//               '& .MuiTab-root': {
//                 color: '#9E9E9E',
//                 fontWeight: 'bold',
//               },
//               '& .Mui-selected': {
//                 color: '#FF6D00 !important',
//               },
//             }}
//           >
//             <Tab label="FREE USERS POINTS" {...a11yProps(0)} />
//             <Tab label="PAID USERS POINTS" {...a11yProps(1)} />
//           </Tabs>
//         </Box>

//         <CustomTabPanel value={tabValue} index={0}>
//           {renderForm(formikFree)}
//         </CustomTabPanel>

//         <CustomTabPanel value={tabValue} index={1}>
//           {renderForm(formikPaid)}
//         </CustomTabPanel>
//       </Box>


//       <Dialog open={openSave} onClose={() => setOpenSave(false)}>
//         <DialogTitle>
//           Are you sure you want to save changes?
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={() => setOpenSave(false)} sx={{ color: '#616161' }}>
//             NO, CANCEL
//           </Button>
//           <Button onClick={handleConfirmSave} color="success" autoFocus>
//             YES, SAVE
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </DashboardLayout>
//   );
// }

'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import DashboardLayout from '../../../components/DashboardLayout';
import { useFormik } from 'formik';
import { supabase } from '../../../lib/supabase';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`points-tabpanel-${index}`}
      aria-labelledby={`points-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `points-tab-${index}`,
    'aria-controls': `points-tabpanel-${index}`,
  };
}

const pointFields = [
  { label: '🏋️ Exercise', name: 'exercise' },
  { label: '🧘 Mindful break / meditation', name: 'mindfulBreak' },
  { label: '🧘 Mind-body (yoga, pilates)', name: 'mindBody' },
  { label: '📓 Journal / reflection', name: 'journal' },
  { label: '🏃 10k Steps', name: 'steps10k' },
  { label: '🗣️ Opened up to someone', name: 'openedup' },
  { label: '🥗 Healthy meal (eat out)', name: 'healthyMealEatOut' },
  { label: '☀️ Morning skincare', name: 'morningSkincare' },
  { label: '🍳 Home-cooked meal', name: 'homeCookedMeal' },
  { label: '🌙 Night skincare', name: 'nightSkincare' },
  { label: '🛌 7-8 hours sleep', name: 'sleep7to8' },
  { label: '🧴 Applied sunscreen', name: 'sunscreen' },
  { label: '📵 Unplugged after 11pm', name: 'unplugged11pm' },
  { label: '💧 Stayed hydrated', name: 'hydrated' },
];

export default function PointsManagementPage() {
  const [tabValue, setTabValue] = useState(0);
  const [activeForm, setActiveForm] = useState(null);
  const [activityIds, setActivityIds] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const initialValues = pointFields.reduce((acc, field) => {
    acc[field.name] = '0';
    return acc;
  }, {});

  const formikFree = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => handleSave('free', formikFree.values),
  });

  const formikPaid = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => handleSave('paid', formikPaid.values),
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from('activities')
      .select('id, name, points_free, points_premium');

    if (error) {
      console.error('Fetch error:', error);
      setSnackbar({ open: true, message: 'Error fetching activities', severity: 'error' });
      return;
    }

    const freeData = {};
    const paidData = {};
    const idMap = {};

    pointFields.forEach((field) => {
      freeData[field.name] = '0';
      paidData[field.name] = '0';
    });

    data.forEach((item) => {
      if (freeData.hasOwnProperty(item.name)) {
        freeData[item.name] = item.points_free?.toString() || '0';
        paidData[item.name] = item.points_premium?.toString() || '0';
        idMap[item.name] = item.id;
      }
    });

    formikFree.setValues(freeData);
    formikPaid.setValues(paidData);
    setActivityIds(idMap);
  };

  const handleSave = async (formType, values) => {
    setActiveForm(formType);
    setLoading(true);

    try {
      for (const key in values) {
        const rowId = activityIds[key];
        if (!rowId) continue;

        const updateColumn =
          formType === 'free'
            ? { points_free: parseInt(values[key]) }
            : { points_premium: parseInt(values[key]) };

        const { error } = await supabase
          .from('activities')
          .update(updateColumn)
          .eq('id', rowId);

        if (error) {
          console.error(`Error updating ${key}:`, error);
          setSnackbar({ open: true, message: `Error updating ${key}`, severity: 'error' });
          setLoading(false);
          return;
        }
      }

      setSnackbar({ open: true, message: 'Points updated successfully!', severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Unexpected error occurred', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderForm = (formik) => (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
          maxWidth: '720px',
        }}
      >
        {pointFields.map((field, index) => (
          <Box key={index}>
            <TextField
              fullWidth
              id={field.name}
              name={field.name}
              label={field.label}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              placeholder="0"
            />
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{
            bgcolor: '#FF6D00',
            color: 'white',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'SAVE CHANGES'}
        </Button>
      </Box>
    </form>
  );

  return (
    <DashboardLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Points Management
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            TabIndicatorProps={{ sx: { bgcolor: '#FF6D00' } }}
            sx={{
              '& .MuiTab-root': {
                color: '#9E9E9E',
                fontWeight: 'bold',
              },
              '& .Mui-selected': {
                color: '#FF6D00 !important',
              },
            }}
          >
            <Tab label="FREE USERS POINTS" {...a11yProps(0)} />
            <Tab label="PAID USERS POINTS" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={tabValue} index={0}>
          {renderForm(formikFree)}
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          {renderForm(formikPaid)}
        </CustomTabPanel>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}
