import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Fab, Tooltip, Zoom } from '@mui/material';
import { Info, LiveHelp } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Demo Components
import Layout from './components/Layout';
import Login from './pages/Login';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ReportingDashboard from './pages/ReportingDashboard';
import AlertsDashboard from './pages/AlertsDashboard';
import ClientList from './pages/ClientList';
import ClientDetail from './pages/ClientDetail';
import ProgressNotes from './pages/ProgressNotes';
import Timesheets from './pages/Timesheets';
import Incidents from './pages/Incidents';
import Documents from './pages/Documents';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';

// Demo Context
import { DemoProvider } from './contexts/DemoContext';

// Modern theme with enhanced styling
const modernTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          fontSize: '0.95rem',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
                borderWidth: '2px',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1a202c',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '4px 0 20px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [userRole, setUserRole] = useState('staff'); // staff, admin, client

  useEffect(() => {
    // Auto-login for demo after 2 seconds
    const timer = setTimeout(() => {
      const demoUser = {
        id: 1,
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@ddd-healthcare.com',
        role: userRole,
        avatar: null,
        permissions: userRole === 'admin' ? ['all'] : userRole === 'staff' ? ['read', 'write'] : ['read']
      };
      
      setCurrentUser(demoUser);
      setIsLoggedIn(true);
      
      // Track demo start
      if (window.demoAnalytics) {
        window.demoAnalytics.trackInteraction('demo-started', { role: userRole });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [userRole]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setUserRole(userData.role);
    setIsLoggedIn(true);
    
    if (window.demoAnalytics) {
      window.demoAnalytics.trackInteraction('manual-login', { role: userData.role });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    
    if (window.demoAnalytics) {
      window.demoAnalytics.trackInteraction('logout');
    }
  };

  const getDashboardComponent = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'client':
        return <ClientDashboard />;
      default:
        return <StaffDashboard />;
    }
  };

  return (
    <DemoProvider>
      <ThemeProvider theme={modernTheme}>
        <CssBaseline />
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Login Route */}
              <Route 
                path="/login" 
                element={
                  !isLoggedIn ? 
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Login onLogin={handleLogin} />
                    </motion.div> : 
                    <Navigate to="/dashboard" replace />
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/" 
                element={
                  isLoggedIn ? 
                    <Layout user={currentUser} onLogout={handleLogout} /> : 
                    <Navigate to="/login" replace />
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={getDashboardComponent()} />
                <Route path="clients" element={<ClientList />} />
                <Route path="clients/:id" element={<ClientDetail />} />
                <Route path="notes" element={<ProgressNotes />} />
                <Route path="timesheets" element={<Timesheets />} />
                <Route path="incidents" element={<Incidents />} />
                <Route path="documents" element={<Documents />} />
                <Route path="reports" element={<ReportingDashboard />} />
                <Route path="alerts" element={<AlertsDashboard />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AnimatePresence>
        </Router>

        {/* Demo Info Fab */}
        {isLoggedIn && (
          <Zoom in timeout={1000}>
            <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
              <Tooltip title="Demo Information" placement="left" arrow>
                <Fab 
                  color="primary" 
                  size="medium"
                  onClick={() => setShowInfo(!showInfo)}
                  sx={{
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    }
                  }}
                >
                  <Info />
                </Fab>
              </Tooltip>
            </Box>
          </Zoom>
        )}

        {/* Demo Info Panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: 'fixed',
                bottom: 90,
                right: 20,
                width: 320,
                backgroundColor: 'white',
                borderRadius: 16,
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                padding: 20,
                zIndex: 999,
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#1976d2', fontSize: '1.2rem' }}>
                  🏥 DDD Healthcare Demo
                </h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>
                  Modern interactive healthcare management system for Division of Developmental Disabilities
                </p>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#333' }}>
                  ✨ Features to Explore:
                </h4>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>
                  <li>Real-time dashboards & analytics</li>
                  <li>Interactive data tables & charts</li>
                  <li>Smart forms & validation</li>
                  <li>Advanced search & filtering</li>
                  <li>Calendar scheduling system</li>
                  <li>Document management</li>
                  <li>Compliance monitoring</li>
                </ul>
              </Box>

              <Box sx={{ mb: 2 }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#333' }}>
                  👤 Current Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>
                  Switch roles by logging out and selecting a different user type
                </p>
              </Box>
              
              <Box sx={{ textAlign: 'center', pt: 2, borderTop: '1px solid #eee' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#999' }}>
                  📧 Contact: demo@ddd-healthcare.com
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#bbb' }}>
                  Built with React 18 + Material-UI v5
                </p>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </ThemeProvider>
    </DemoProvider>
  );
}

export default App;