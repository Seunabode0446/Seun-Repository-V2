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
  alpha
} from '@mui/material';
import {
  Assignment,
  Schedule,
  Warning,
  CheckCircle,
  Add,
  TrendingUp,
  Notifications,
  CalendarToday,
  Person,
  Description,
  MoreVert,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const StaffDashboard = () => {
  const theme = useTheme();
  const { demoData, trackInteraction, addNote, addIncident } = useDemo();
  const [animatedStats, setAnimatedStats] = useState({});

  useEffect(() => {
    trackInteraction('staff-dashboard-view');
    
    // Animate stats on load
    const timer = setTimeout(() => {
      setAnimatedStats({
        myClients: 8,
        pendingNotes: 3,
        todayAppointments: 5,
        completedTasks: 12
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Sample data for staff-specific charts
  const weeklyProductivity = [
    { day: 'Mon', notes: 4, appointments: 6, tasks: 8 },
    { day: 'Tue', notes: 6, appointments: 4, tasks: 10 },
    { day: 'Wed', notes: 5, appointments: 7, tasks: 9 },
    { day: 'Thu', notes: 8, appointments: 5, tasks: 12 },
    { day: 'Fri', notes: 7, appointments: 8, tasks: 11 },
  ];

  const taskDistribution = [
    { name: 'Progress Notes', value: 35, color: '#1976d2' },
    { name: 'Client Meetings', value: 25, color: '#2e7d32' },
    { name: 'Documentation', value: 20, color: '#ed6c02' },
    { name: 'Training', value: 20, color: '#9c27b0' }
  ];

  const handleQuickAction = (action) => {
    trackInteraction('quick-action', { action });
    
    switch (action) {
      case 'add-note':
        toast.success('Opening progress note form...');
        break;
      case 'clock-in':
        toast.success('Clocked in successfully!');
        break;
      case 'view-schedule':
        toast.success('Opening today\'s schedule...');
        break;
      case 'report-incident':
        toast.success('Opening incident report form...');
        break;
      default:
        break;
    }
  };

  const StatCard = ({ title, value, change, icon, color, subtitle, onClick }) => (
    <Grow in timeout={1000}>
      <Card 
        sx={{ 
          height: '100%',
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          border: `1px solid ${color}20`,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: onClick ? 'translateY(-4px)' : 'translateY(-2px)',
            boxShadow: `0 8px 25px ${color}30`
          }
        }}
        onClick={onClick}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Avatar sx={{ backgroundColor: color, width: 48, height: 48 }}>
              {icon}
            </Avatar>
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              trackInteraction('stat-card-menu', { title });
            }}>
              <MoreVert />
            </IconButton>
          </Box>
          
          <Typography variant="h4" sx={{ fontWeight: 700, color: color, mb: 1 }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </Typography>
          
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {title}
          </Typography>
          
          {subtitle && (
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              {subtitle}
            </Typography>
          )}
          
          {change && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {change > 0 ? (
                <ArrowUpward sx={{ fontSize: 16, color: 'success.main' }} />
              ) : (
                <ArrowDownward sx={{ fontSize: 16, color: 'error.main' }} />
              )}
              <Typography 
                variant="caption" 
                sx={{ 
                  color: change > 0 ? 'success.main' : 'error.main',
                  fontWeight: 600 
                }}
              >
                {Math.abs(change)}% from last week
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grow>
  );

  const QuickActionCard = ({ title, description, icon, color, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        sx={{ 
          cursor: 'pointer',
          height: '100%',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 3,
            background: `linear-gradient(135deg, ${color}10, ${color}05)`
          }
        }}
        onClick={onClick}
      >
        <CardContent sx={{ textAlign: 'center', py: 3 }}>
          <Avatar sx={{ backgroundColor: color, mx: 'auto', mb: 2, width: 56, height: 56 }}>
            {icon}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Good morning, Demo Staff! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's your daily overview and tasks for today.
          </Typography>
        </motion.div>
      </Box>

      {/* Key Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="My Clients"
            value={animatedStats.myClients || 0}
            change={5.2}
            icon={<Person />}
            color="#1976d2"
            subtitle="Active caseload"
            onClick={() => handleQuickAction('view-clients')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Notes"
            value={animatedStats.pendingNotes || 0}
            change={-15.3}
            icon={<Assignment />}
            color="#ed6c02"
            subtitle="Due today"
            onClick={() => handleQuickAction('add-note')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Appointments"
            value={animatedStats.todayAppointments || 0}
            change={8.7}
            icon={<CalendarToday />}
            color="#2e7d32"
            subtitle="Scheduled meetings"
            onClick={() => handleQuickAction('view-schedule')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Tasks"
            value={animatedStats.completedTasks || 0}
            change={12.1}
            icon={<CheckCircle />}
            color="#9c27b0"
            subtitle="This week"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Weekly Productivity */}
        <Grid item xs={12} md={8}>
          <Fade in timeout={1500}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Weekly Productivity
                  </Typography>
                  <Chip label="This Week" size="small" variant="outlined" />
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyProductivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="notes" 
                      stackId="1" 
                      stroke="#1976d2" 
                      fill="#1976d2" 
                      fillOpacity={0.6}
                      name="Progress Notes"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="appointments" 
                      stackId="1" 
                      stroke="#2e7d32" 
                      fill="#2e7d32" 
                      fillOpacity={0.6}
                      name="Appointments"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="tasks" 
                      stackId="1" 
                      stroke="#ed6c02" 
                      fill="#ed6c02" 
                      fillOpacity={0.6}
                      name="Tasks"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Task Distribution */}
        <Grid item xs={12} md={4}>
          <Fade in timeout={2000}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Task Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2 }}>
                  {taskDistribution.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box 
                        sx={{ 
                          width: 12, 
                          height: 12, 
                          backgroundColor: item.color, 
                          borderRadius: 1, 
                          mr: 1 
                        }} 
                      />
                      <Typography variant="caption" sx={{ flex: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {item.value}%
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={2500}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <QuickActionCard
                      title="Add Note"
                      description="Create progress note"
                      icon={<Add />}
                      color="#1976d2"
                      onClick={() => handleQuickAction('add-note')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <QuickActionCard
                      title="Clock In"
                      description="Start your shift"
                      icon={<Schedule />}
                      color="#2e7d32"
                      onClick={() => handleQuickAction('clock-in')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <QuickActionCard
                      title="View Schedule"
                      description="Today's appointments"
                      icon={<CalendarToday />}
                      color="#9c27b0"
                      onClick={() => handleQuickAction('view-schedule')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <QuickActionCard
                      title="Report Incident"
                      description="Log new incident"
                      icon={<Warning />}
                      color="#d32f2f"
                      onClick={() => handleQuickAction('report-incident')}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={3000}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Recent Activities
                  </Typography>
                  <Chip 
                    label="Today" 
                    size="small" 
                    color="primary"
                  />
                </Box>
                <List dense>
                  {[
                    { 
                      icon: <Assignment color="primary" />, 
                      primary: 'Progress note submitted', 
                      secondary: 'Sarah Johnson - 2 hours ago',
                      time: '2h'
                    },
                    { 
                      icon: <CalendarToday color="success" />, 
                      primary: 'Appointment completed', 
                      secondary: 'Michael Rodriguez - 4 hours ago',
                      time: '4h'
                    },
                    { 
                      icon: <Description color="warning" />, 
                      primary: 'Document uploaded', 
                      secondary: 'Emma Davis - 6 hours ago',
                      time: '6h'
                    },
                    { 
                      icon: <CheckCircle color="success" />, 
                      primary: 'Training completed', 
                      secondary: 'CPR Certification - Yesterday',
                      time: '1d'
                    }
                  ].map((activity, index) => (
                    <React.Fragment key={index}>
                      <ListItem 
                        sx={{ 
                          px: 0,
                          cursor: 'pointer',
                          borderRadius: 1,
                          '&:hover': { backgroundColor: 'action.hover' }
                        }}
                        onClick={() => trackInteraction('activity-click', { activity: activity.primary })}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {activity.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.primary}
                          secondary={activity.secondary}
                          primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                          secondaryTypographyProps={{ fontSize: '0.8rem' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </ListItem>
                      {index < 3 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                  onClick={() => trackInteraction('view-all-activities')}
                >
                  View All Activities
                </Button>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffDashboard;