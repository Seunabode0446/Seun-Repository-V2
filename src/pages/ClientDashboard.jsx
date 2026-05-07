import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  IconButton,
  Fade,
  Grow,
  useTheme,
  Paper
} from '@mui/material';
import {
  Person,
  CalendarToday,
  Assignment,
  TrendingUp,
  CheckCircle,
  Schedule,
  Description,
  Phone,
  Email,
  Home,
  LocalHospital,
  Medication,
  MoreVert,
  Star,
  Timeline
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const ClientDashboard = () => {
  const theme = useTheme();
  const { demoData, trackInteraction } = useDemo();
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    trackInteraction('client-dashboard-view');
    
    // Set default client (first one for demo)
    if (demoData.clients.length > 0) {
      setSelectedClient(demoData.clients[0]);
    }
  }, [demoData]);

  // Sample data for client progress
  const goalProgress = selectedClient?.ispGoals || [];
  
  const monthlyProgress = [
    { month: 'Jan', communication: 65, living: 45, social: 70 },
    { month: 'Feb', communication: 68, living: 50, social: 75 },
    { month: 'Mar', communication: 72, living: 55, social: 80 },
    { month: 'Apr', communication: 75, living: 60, social: 85 },
    { month: 'May', communication: 75, living: 60, social: 85 },
    { month: 'Jun', communication: 75, living: 60, social: 85 }
  ];

  const serviceHistory = [
    { date: '2024-01-20', service: 'Group Therapy', provider: 'Dr. Emily Chen', status: 'Completed' },
    { date: '2024-01-18', service: 'Individual Session', provider: 'Jennifer Adams', status: 'Completed' },
    { date: '2024-01-15', service: 'Medical Check-up', provider: 'Dr. Smith', status: 'Completed' },
    { date: '2024-01-12', service: 'Life Skills Training', provider: 'Maria Gonzalez', status: 'Completed' }
  ];

  const upcomingAppointments = [
    { date: '2024-01-25', time: '10:00 AM', service: 'Therapy Session', provider: 'Dr. Emily Chen' },
    { date: '2024-01-27', time: '2:00 PM', service: 'Medical Review', provider: 'Dr. Smith' },
    { date: '2024-01-30', time: '11:00 AM', service: 'Life Skills Training', provider: 'Maria Gonzalez' }
  ];

  const handleClientAction = (action) => {
    trackInteraction('client-action', { action, clientId: selectedClient?.id });
    
    switch (action) {
      case 'view-goals':
        toast.success('Opening ISP goals...');
        break;
      case 'schedule-appointment':
        toast.success('Opening appointment scheduler...');
        break;
      case 'contact-provider':
        toast.success('Opening contact form...');
        break;
      case 'view-documents':
        toast.success('Opening document library...');
        break;
      default:
        break;
    }
  };

  const GoalCard = ({ goal }) => {
    const progressColor = goal.progress >= 80 ? '#2e7d32' : 
                         goal.progress >= 60 ? '#ed6c02' : '#d32f2f';
    
    return (
      <Card sx={{ mb: 2, transition: 'all 0.2s ease', '&:hover': { boxShadow: 3 } }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
              {goal.goal}
            </Typography>
            <Chip 
              label={`${goal.progress}%`} 
              color={goal.progress >= 80 ? 'success' : goal.progress >= 60 ? 'warning' : 'error'}
              size="small"
            />
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={goal.progress} 
            sx={{ 
              height: 8, 
              borderRadius: 4, 
              mb: 2,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                backgroundColor: progressColor,
                borderRadius: 4
              }
            }} 
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Due: {new Date(goal.dueDate).toLocaleDateString()}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 16, color: progressColor }} />
              <Typography variant="caption" sx={{ color: progressColor, fontWeight: 600 }}>
                {goal.progress >= 80 ? 'Excellent' : goal.progress >= 60 ? 'Good' : 'Needs Focus'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const InfoCard = ({ title, value, icon, color }) => (
    <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
      <Avatar sx={{ backgroundColor: color, mx: 'auto', mb: 1, width: 48, height: 48 }}>
        {icon}
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Paper>
  );

  if (!selectedClient) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Typography variant="h6" color="text.secondary">
          Loading client information...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                backgroundColor: '#1976d2',
                fontSize: '2rem',
                fontWeight: 700
              }}
            >
              {selectedClient.firstName[0]}{selectedClient.lastName[0]}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                Welcome, {selectedClient.firstName}! 👋
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Here's your personal dashboard with goals, appointments, and progress.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip 
                  label={selectedClient.serviceType} 
                  color="primary" 
                  size="small" 
                />
                <Chip 
                  label={`Risk: ${selectedClient.riskLevel}`} 
                  color={selectedClient.riskLevel === 'Low' ? 'success' : 'warning'} 
                  size="small" 
                />
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* Quick Info Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Grow in timeout={1000}>
            <div>
              <InfoCard
                title="ISP Goals"
                value={selectedClient.ispGoals.length}
                icon={<Assignment />}
                color="#1976d2"
              />
            </div>
          </Grow>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Grow in timeout={1200}>
            <div>
              <InfoCard
                title="Avg Progress"
                value={`${Math.round(selectedClient.ispGoals.reduce((acc, goal) => acc + goal.progress, 0) / selectedClient.ispGoals.length)}%`}
                icon={<TrendingUp />}
                color="#2e7d32"
              />
            </div>
          </Grow>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Grow in timeout={1400}>
            <div>
              <InfoCard
                title="Medications"
                value={selectedClient.medications.length}
                icon={<Medication />}
                color="#9c27b0"
              />
            </div>
          </Grow>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Grow in timeout={1600}>
            <div>
              <InfoCard
                title="Case Manager"
                value="Dr. Chen"
                icon={<Person />}
                color="#ed6c02"
              />
            </div>
          </Grow>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* ISP Goals */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={2000}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    My ISP Goals
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleClientAction('view-goals')}
                  >
                    View All
                  </Button>
                </Box>
                
                {goalProgress.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Progress Chart */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={2200}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Progress Over Time
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="communication" 
                      stackId="1" 
                      stroke="#1976d2" 
                      fill="#1976d2" 
                      fillOpacity={0.6}
                      name="Communication"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="living" 
                      stackId="1" 
                      stroke="#2e7d32" 
                      fill="#2e7d32" 
                      fillOpacity={0.6}
                      name="Living Skills"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="social" 
                      stackId="1" 
                      stroke="#ed6c02" 
                      fill="#ed6c02" 
                      fillOpacity={0.6}
                      name="Social Skills"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={2400}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Upcoming Appointments
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleClientAction('schedule-appointment')}
                  >
                    Schedule
                  </Button>
                </Box>
                
                <List dense>
                  {upcomingAppointments.map((appointment, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CalendarToday color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={appointment.service}
                          secondary={`${appointment.date} at ${appointment.time} with ${appointment.provider}`}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItem>
                      {index < upcomingAppointments.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Recent Services */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={2600}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Recent Services
                </Typography>
                
                <List dense>
                  {serviceHistory.map((service, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary={service.service}
                          secondary={`${service.date} with ${service.provider}`}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                        <Chip 
                          label={service.status} 
                          color="success" 
                          size="small" 
                        />
                      </ListItem>
                      {index < serviceHistory.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12}>
          <Fade in timeout={2800}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Important Information
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person /> Case Manager
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedClient.caseManager}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone /> Emergency Contact
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedClient.emergencyContact.name} ({selectedClient.emergencyContact.relationship})
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedClient.emergencyContact.phone}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Medication /> Current Medications
                      </Typography>
                      {selectedClient.medications.map((med, index) => (
                        <Typography key={index} variant="body2" color="text.secondary">
                          {med.name} - {med.dosage} ({med.frequency})
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientDashboard;