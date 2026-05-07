import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
  Tooltip,
  Fade
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Assignment,
  Schedule,
  Warning,
  Description,
  Assessment,
  Notifications,
  AccountCircle,
  Settings,
  Logout,
  AdminPanelSettings,
  Security,
  CalendarToday,
  Analytics,
  LiveHelp
} from '@mui/icons-material';
import { motion } from 'framer-motion';

import { useDemo } from '../contexts/DemoContext';

const drawerWidth = 280;

const Layout = ({ user, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { demoData, trackInteraction } = useDemo();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    trackInteraction('drawer-toggle');
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    trackInteraction('profile-menu-open');
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleProfileMenuClose();
    trackInteraction('logout');
    onLogout();
  };

  const handleNavigation = (path, feature) => {
    navigate(path);
    trackInteraction('navigation', { path, feature });
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const getMenuItems = () => {
    const baseItems = [
      { 
        text: 'Dashboard', 
        icon: <Dashboard />, 
        path: '/dashboard',
        description: 'Overview & Analytics',
        color: '#1976d2'
      },
      { 
        text: 'Clients', 
        icon: <People />, 
        path: '/clients',
        description: 'Client Management',
        badge: demoData.clients.length,
        color: '#2e7d32'
      },
      { 
        text: 'Progress Notes', 
        icon: <Assignment />, 
        path: '/notes',
        description: 'Documentation',
        badge: demoData.notes.filter(n => n.status === 'Pending Review').length,
        color: '#ed6c02'
      },
      { 
        text: 'Timesheets', 
        icon: <Schedule />, 
        path: '/timesheets',
        description: 'Time Tracking',
        color: '#9c27b0'
      },
      { 
        text: 'Incidents', 
        icon: <Warning />, 
        path: '/incidents',
        description: 'Incident Reports',
        badge: demoData.incidents.filter(i => i.status === 'Under Review').length,
        color: '#d32f2f'
      },
      { 
        text: 'Documents', 
        icon: <Description />, 
        path: '/documents',
        description: 'File Management',
        badge: demoData.documents.filter(d => d.status === 'Expiring Soon').length,
        color: '#1976d2'
      },
      { 
        text: 'Calendar', 
        icon: <CalendarToday />, 
        path: '/calendar',
        description: 'Scheduling & Events',
        color: '#7b1fa2'
      },
      { 
        text: 'Analytics', 
        icon: <Analytics />, 
        path: '/analytics',
        description: 'Advanced Reports',
        isNew: true,
        color: '#0288d1'
      },
      { 
        text: 'Reports', 
        icon: <Assessment />, 
        path: '/reports',
        description: 'Compliance Reports',
        color: '#388e3c'
      },
      { 
        text: 'Alerts', 
        icon: <Notifications />, 
        path: '/alerts',
        description: 'System Notifications',
        badge: demoData.alerts.filter(a => a.status === 'Open').length,
        color: '#f57c00'
      }
    ];

    // Filter based on user role
    if (user?.role === 'client') {
      return baseItems.filter(item => 
        ['Dashboard', 'Calendar'].includes(item.text)
      );
    }

    if (user?.role === 'staff') {
      return baseItems.filter(item => 
        !['Analytics', 'Reports'].includes(item.text)
      );
    }

    return baseItems; // Admin gets all items
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 3, py: 2 }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            }}
          >
            🏥
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', lineHeight: 1.2 }}>
              DDD Healthcare
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
              <Chip 
                label="MODERN" 
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ fontSize: '0.7rem', height: 20 }}
              />
              <Chip 
                label="DEMO" 
                size="small" 
                color="secondary" 
                variant="outlined"
                sx={{ fontSize: '0.7rem', height: 20 }}
              />
            </Box>
          </Box>
        </motion.div>
      </Toolbar>
      
      <Divider />
      
      <List sx={{ flex: 1, px: 2, py: 2 }}>
        {getMenuItems().map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Tooltip 
              title={item.description} 
              placement="right"
              arrow
            >
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleNavigation(item.path, item.text)}
                  sx={{
                    borderRadius: 3,
                    mx: 0.5,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&.Mui-selected': {
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      '&:hover': {
                        backgroundColor: `${item.color}20`,
                      },
                      '& .MuiListItemIcon-root': {
                        color: item.color,
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    {item.badge ? (
                      <Badge 
                        badgeContent={item.badge} 
                        color="error"
                        max={99}
                        sx={{
                          '& .MuiBadge-badge': {
                            fontSize: '0.7rem',
                            minWidth: 18,
                            height: 18,
                          }
                        }}
                      >
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: location.pathname === item.path ? 600 : 500
                    }}
                  />
                  {item.isNew && (
                    <Chip 
                      label="NEW" 
                      size="small" 
                      color="secondary"
                      sx={{ 
                        fontSize: '0.65rem', 
                        height: 20,
                        '& .MuiChip-label': { px: 1 }
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </motion.div>
        ))}
      </List>

      <Divider />
      
      {/* Demo Info */}
      <Box sx={{ p: 2 }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
              border: '1px solid rgba(25, 118, 210, 0.2)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LiveHelp sx={{ fontSize: 18, color: '#1976d2' }} />
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#1976d2' }}>
                Demo Mode Active
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#666', display: 'block', lineHeight: 1.4 }}>
              Explore all features with sample data. Contact us for a personalized demo!
            </Typography>
            <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(25, 118, 210, 0.1)' }}>
              <Typography variant="caption" sx={{ color: '#888', fontSize: '0.7rem' }}>
                Role: {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );

  const getPageTitle = () => {
    const item = getMenuItems().find(item => item.path === location.pathname);
    return item ? item.text : 'DDD Healthcare';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {getPageTitle()}
          </Typography>
          
          {/* Demo Badge */}
          <Chip 
            label="LIVE DEMO" 
            size="small" 
            sx={{ 
              mr: 2,
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              color: '#1976d2',
              fontWeight: 600,
              border: '1px solid rgba(25, 118, 210, 0.3)'
            }}
          />
          
          {/* User Profile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                color: 'text.primary',
                fontWeight: 500
              }}
            >
              {user?.firstName} {user?.lastName}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: 'text.primary' }}
            >
              <Avatar 
                sx={{ 
                  width: 36, 
                  height: 36,
                  backgroundColor: '#1976d2',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.05)',
            mt: 1,
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => trackInteraction('profile-view')}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => trackInteraction('settings-view')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Toolbar />
        <Fade in timeout={300}>
          <Box>
            <Outlet />
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default Layout;