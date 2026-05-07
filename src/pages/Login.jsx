import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Chip,
  Fade,
  Zoom,
  useTheme,
  alpha,
  IconButton,
  InputAdornment
} from '@mui/material';
import { 
  Person, 
  AdminPanelSettings, 
  People,
  Login as LoginIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Login = ({ onLogin }) => {
  const theme = useTheme();
  const [selectedRole, setSelectedRole] = useState('staff');
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const userTypes = [
    {
      role: 'staff',
      title: 'Staff Member',
      description: 'Direct care providers, case managers, and support staff',
      icon: <Person />,
      color: '#1976d2',
      features: ['Submit progress notes', 'Track timesheets', 'Report incidents', 'Manage documents']
    },
    {
      role: 'admin',
      title: 'Administrator',
      description: 'System administrators and supervisors',
      icon: <AdminPanelSettings />,
      color: '#d32f2f',
      features: ['Full system access', 'Compliance monitoring', 'User management', 'Advanced reporting']
    },
    {
      role: 'client',
      title: 'Client/Family',
      description: 'Clients and their family members',
      icon: <People />,
      color: '#2e7d32',
      features: ['View personal profile', 'Track ISP goals', 'Access service history', 'View calendar']
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    const selectedUser = userTypes.find(u => u.role === role);
    setCredentials({
      email: `demo.${role}@ddd-healthcare.com`,
      password: 'demo123'
    });
    
    toast.success(`Selected ${selectedUser.title} role`, {
      icon: selectedUser.icon,
      style: {
        background: selectedUser.color,
        color: 'white',
      }
    });
  };

  const handleLogin = () => {
    const selectedUser = userTypes.find(u => u.role === selectedRole);
    
    const userData = {
      id: Date.now(),
      firstName: 'Demo',
      lastName: selectedUser.title.split(' ')[0],
      email: credentials.email,
      role: selectedRole,
      avatar: null,
      permissions: selectedRole === 'admin' ? ['all'] : selectedRole === 'staff' ? ['read', 'write'] : ['read']
    };

    toast.success(`Welcome, ${userData.firstName} ${userData.lastName}!`, {
      duration: 2000,
      icon: '👋',
    });

    setTimeout(() => {
      onLogin(userData);
    }, 500);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, ${alpha('#ffffff', 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha('#ffffff', 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${alpha('#ffffff', 0.05)} 0%, transparent 50%)
          `,
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 1200 }}
      >
        <Card
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2.5rem',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                  }}
                >
                  🏥
                </Box>
              </motion.div>
              
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a202c', mb: 1 }}>
                DDD Healthcare
              </Typography>
              <Typography variant="h6" sx={{ color: '#4a5568', fontWeight: 400 }}>
                Modern Healthcare Management System
              </Typography>
              <Chip 
                label="Interactive Demo" 
                color="primary" 
                sx={{ mt: 2, fontWeight: 600 }}
              />
            </Box>

            {/* Role Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ textAlign: 'center', mb: 3, fontWeight: 600 }}>
                Choose Your Role
              </Typography>
              
              <Grid container spacing={3}>
                {userTypes.map((userType, index) => (
                  <Grid item xs={12} md={4} key={userType.role}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <Card
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          border: selectedRole === userType.role ? 
                            `3px solid ${userType.color}` : 
                            '3px solid transparent',
                          transform: selectedRole === userType.role ? 'scale(1.02)' : 'scale(1)',
                          boxShadow: selectedRole === userType.role ? 
                            `0 8px 30px ${alpha(userType.color, 0.3)}` : 
                            '0 4px 20px rgba(0,0,0,0.1)',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: `0 8px 30px ${alpha(userType.color, 0.2)}`,
                          }
                        }}
                        onClick={() => handleRoleSelect(userType.role)}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                          <Avatar
                            sx={{
                              backgroundColor: userType.color,
                              width: 64,
                              height: 64,
                              mx: 'auto',
                              mb: 2,
                              fontSize: '1.5rem'
                            }}
                          >
                            {userType.icon}
                          </Avatar>
                          
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {userType.title}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {userType.description}
                          </Typography>

                          <Box sx={{ textAlign: 'left' }}>
                            {userType.features.map((feature, idx) => (
                              <Typography 
                                key={idx}
                                variant="caption" 
                                sx={{ 
                                  display: 'block', 
                                  color: 'text.secondary',
                                  fontSize: '0.75rem',
                                  mb: 0.5,
                                  '&:before': {
                                    content: '"✓"',
                                    color: userType.color,
                                    fontWeight: 'bold',
                                    marginRight: 1
                                  }
                                }}
                              >
                                {feature}
                              </Typography>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Login Form */}
            <Fade in={!!selectedRole} timeout={500}>
              <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                <Typography variant="h6" sx={{ textAlign: 'center', mb: 3, fontWeight: 600 }}>
                  Demo Credentials
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                    sx={{ mb: 2 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleLogin}
                    startIcon={<LoginIcon />}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: selectedRole ? 
                        `linear-gradient(45deg, ${userTypes.find(u => u.role === selectedRole)?.color}, ${alpha(userTypes.find(u => u.role === selectedRole)?.color || '#1976d2', 0.8)})` :
                        'linear-gradient(45deg, #1976d2, #42a5f5)',
                      '&:hover': {
                        background: selectedRole ? 
                          `linear-gradient(45deg, ${alpha(userTypes.find(u => u.role === selectedRole)?.color || '#1976d2', 0.9)}, ${userTypes.find(u => u.role === selectedRole)?.color})` :
                          'linear-gradient(45deg, #1565c0, #1976d2)',
                      }
                    }}
                  >
                    Enter Demo as {userTypes.find(u => u.role === selectedRole)?.title}
                  </Button>
                </motion.div>

                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block', 
                    textAlign: 'center', 
                    mt: 2, 
                    color: 'text.secondary' 
                  }}
                >
                  This is a demonstration environment with sample data
                </Typography>
              </Box>
            </Fade>
          </CardContent>
        </Card>
      </motion.div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(1deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default Login;