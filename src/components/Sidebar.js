'use client';
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Collapse,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AmbyLogo from '../images/logo.svg';
import { supabase } from '../lib/supabase';

const drawerWidth = 280;

export default function Sidebar({ open, onClose, variant, sx }) {
  const pathname = usePathname();
  const router = useRouter();
  const [openUsers, setOpenUsers] = useState(true);
  const [openGlobalSettings, setOpenGlobalSettings] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  const handleToggleUsers = () => {
    setOpenUsers(!openUsers);
  };

  const handleToggleGlobalSettings = () => {
    setOpenGlobalSettings(!openGlobalSettings);
  };

  const isActive = (path) => pathname === path;

  const renderItem = (text, icon, path, onClick = null, nested = false) => (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        component={path ? Link : 'div'}
        href={path || '#'}
        onClick={onClick}
        selected={path ? isActive(path) : false}
        sx={{
          minHeight: 48,
          justifyContent: 'initial',
          px: 2.5,
          pl: nested ? 4 : 2.5,
          '&.Mui-selected': {
            backgroundColor: '#FFF3E0',
            color: '#FF6D00',
            '& .MuiListItemIcon-root': {
              color: '#FF6D00',
            },
            '&:hover': {
              backgroundColor: '#FFE0B2',
            },
            borderRight: '3px solid #FF6D00',
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          }
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 2,
            justifyContent: 'center',
            color: path && isActive(path) ? '#FF6D00' : 'text.secondary',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: 1 }} />
      </ListItemButton>
    </ListItem>
  );

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ position: 'relative', width: 120, height: 40 }}>
          <Image
            src={AmbyLogo}
            alt="Amby"
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>

      </Box>

      <Box sx={{ overflow: 'auto', flexGrow: 1, py: 2 }}>
        <List>
          <ListItemButton onClick={handleToggleUsers} sx={{ px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {openUsers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openUsers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderItem('All Users', <PersonIcon />, '/dashboard/users', null, true)}
              {renderItem('Add User', <PersonAddIcon />, '/dashboard/users/add', null, true)}
            </List>
          </Collapse>
          {renderItem('Redemptions', <ReceiptIcon />, '/dashboard/redemptions')}

          <ListItemButton onClick={handleToggleGlobalSettings} sx={{ px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Global Settings" />
            {openGlobalSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openGlobalSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderItem('Points Management', <StarIcon />, '/dashboard/points', null, true)}
            </List>
          </Collapse>

          {renderItem('Settings', <SettingsIcon />, '/dashboard/settings')}
        </List>

        <Box sx={{ flexGrow: 1 }} />
        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: 2, color: 'text.secondary' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, ...sx }}>
      {variant === 'temporary' && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {variant === 'permanent' && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
