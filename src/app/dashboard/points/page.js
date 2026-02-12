'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid
} from '@mui/material';
import DashboardLayout from '../../../components/DashboardLayout';
import { useFormik } from 'formik';

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
  { label: '🗣️ Opened up to someone', name: 'openedUp' },
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
  const [openSave, setOpenSave] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const initialValuesFree = {
    exercise: '800',
    mindfulBreak: '500',
    mindBody: '600',
    journal: '500',
    steps10k: '700',
    openedUp: '400',
    healthyMealEatOut: '500',
    morningSkincare: '400',
    homeCookedMeal: '600',
    nightSkincare: '400',
    sleep7to8: '700',
    sunscreen: '400',
    unplugged11pm: '700',
    hydrated: '500',
  };

  const initialValuesPaid = {
    exercise: '1200',
    mindfulBreak: '800',
    mindBody: '1000',
    journal: '800',
    steps10k: '1100',
    openedUp: '700',
    healthyMealEatOut: '800',
    morningSkincare: '700',
    homeCookedMeal: '900',
    nightSkincare: '700',
    sleep7to8: '1000',
    sunscreen: '700',
    unplugged11pm: '1000',
    hydrated: '800',
  };

  const formikFree = useFormik({
    initialValues: initialValuesFree,
    onSubmit: (values) => {
      setOpenSave(true);
      setActiveForm('free');
    },
  });

  const formikPaid = useFormik({
    initialValues: initialValuesPaid,
    onSubmit: (values) => {
      setOpenSave(true);
      setActiveForm('paid');
    },
  });

  const handleConfirmSave = () => {
    setOpenSave(false);
    if (activeForm === 'free') {
      alert('Free points saved: ' + JSON.stringify(formikFree.values, null, 2));
    } else {
      alert('Paid points saved: ' + JSON.stringify(formikPaid.values, null, 2));
    }
  };

  const renderForm = (formik) => (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, maxWidth: '720px' }}>
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
            py: 1.5
          }}
        >
          SAVE CHANGES
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
            aria-label="points tabs"
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
