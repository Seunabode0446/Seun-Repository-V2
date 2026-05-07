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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  SupervisorAccount,
  Assessment,
  Security,
  Warning,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  People,
  Assignment,
  Schedule,
  Notifications,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  AdminPanelSettings,
  Description,
  CalendarToday
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const AdminDashboard = () => {
  const theme = useTheme();
  const { demoData, trackInteraction } = useDemo();
  const [animatedStats, setAnimatedStats] = useState({});

  useEffect(() => {
    trackInteraction('admin-dashboard-view');
    
    // Animate stats on load
    const timer = setTimeout(() => {
      setAnimatedStats({
        totalClients: demoData.clients.length,
        activeStaff: 12,
        complianceRate: 94,
        openIncidents: demoData.incidents.filter(i => i.status !== 'Closed').length,
        pendingReviews: demoData.notes.filter(n => n.status === 'Pending Review').length,
        expiringDocs: demoData.documents.filter(d => d.status === 'Expiring Soon').length
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [demoData]);

  // Sample data for admin-specific charts
  const systemMetrics = [
    { month: 'Jan', users: 45, compliance: 92, incidents: 8 },
    { month: 'Feb', users: 48, compliance: 94, incidents: 6 },
    { month: 'Mar', users: 52, compliance: 96, incidents: 4 },
    { month: 'Apr', users: 55, compliance: 94, incidents: 7 },
    { month: 'May', users: 58, compliance: 95, incidents: 5 },
    { month: 'Jun', users: 62, compliance: 97, incidents: 3 }
  ];

  const departmentPerformance = [
    { name: 'Residential', compliance: 96, staff: 15, clients: 45 },
    { name: 'Day Program', compliance: 94, staff: 12, clients: 38 },
    { name: 'Supported Living', compliance: 98, staff: 8, clients: 22 },
    { name: 'Vocational', compliance: 92, staff: 6, clients: 18 }
  ];

  const alertDistribution = [
    { name: 'Missing Notes', value: 35, color: '#d32f2f' },
    { name: 'Expiring Docs', value: 25, color: '#ed6c02' },
    { name: 'Training Due', value: 20, color: '#1976d2' },
    { name: 'Incidents', value: 20, color: '#9c27b0' }
  ];

  const handleAdminAction = (action) => {
    trackInteraction('admin-action', { action });
    
    switch (action) {
      case 'user-management':
        toast.success('Opening user management...');
        break;
      case 'compliance-report':
        toast.success('Generating compliance report...');
        break;
      case 'system-settings':
        toast.success('Opening system settings...');
        break;
      case 'audit-log':
        toast.success('Opening audit log...');
        break;
      default:
        break;
    }
  };

  const StatCard = ({ title, value, change, icon, color, subtitle, trend, onClick }) => (
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
            <Box sx={{ textAlign: 'right' }}>
              {trend && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {trend === 'up' ? (
                    <TrendingUp sx={{ fontSize: 20, color: 'success.main' }} />
                  ) : (
                    <TrendingDown sx={{ fontSize: 20, color: 'error.main' }} />
                  )}
                </Box>
              )}
            </Box>
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
                {Math.abs(change)}% from last month
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grow>
  );

  const AdminActionCard = ({ title, description, icon, color, onClick }) => (
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
            System Administration 🛡️
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor system performance, compliance, and manage organizational operations.
          </Typography>
        </motion.div>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Total Clients"
            value={animatedStats.totalClients || 0}
            change={8.2}
            icon={<People />}
            color="#1976d2"
            subtitle="System-wide"
            trend="up"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Active Staff"
            value={animatedStats.activeStaff || 0}
            change={4.1}
            icon={<SupervisorAccount />}
            color="#2e7d32"
            subtitle="Currently employed"
            trend="up"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Compliance Rate"
            value={`${animatedStats.complianceRate || 0}%`}
            change={2.3}
            icon={<Security />}
            color="#9c27b0"
            subtitle="Overall system"
            trend="up"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Open Incidents"
            value={animatedStats.openIncidents || 0}
            change={-15.7}
            icon={<Warning />}
            color="#d32f2f"
            subtitle="Require attention"
            trend="down"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Pending Reviews"
            value={animatedStats.pendingReviews || 0}
            change={-8.4}
            icon={<Assignment />}
            color="#ed6c02"
            subtitle="Awaiting approval"
            trend="down"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Expiring Docs"
            value={animatedStats.expiringDocs || 0}
            change={-12.1}
            icon={<Description />}
            color="#f57c00"
            subtitle="Next 30 days"
            trend="down"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* System Metrics Trend */}
        <Grid item xs={12} md={8}>
          <Fade in timeout={1500}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    System Performance Metrics
                  </Typography>
                  <Chip label="Last 6 Months" size="small" variant="outlined" />
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={systemMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#1976d2" 
                      strokeWidth={3}
                      name="Active Users"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="compliance" 
                      stroke="#2e7d32" 
                      strokeWidth={3}
                      name="Compliance %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="incidents" 
                      stroke="#d32f2f" 
                      strokeWidth={3}
                      name="Incidents"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Alert Distribution */}
        <Grid item xs={12} md={4}>
          <Fade in timeout={2000}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Alert Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={alertDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {alertDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2 }}>
                  {alertDistribution.map((item, index) => (
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
        {/* Department Performance */}
        <Grid item xs={12} md={8}>
          <Fade in timeout={2500}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Department Performance Overview
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Staff</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Clients</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Compliance</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {departmentPerformance.map((dept, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {dept.name}
                            </Typography>
                          </TableCell>
                          <TableCell>{dept.staff}</TableCell>
                          <TableCell>{dept.clients}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={dept.compliance} 
                                sx={{ 
                                  width: 60, 
                                  height: 6, 
                                  borderRadius: 3,
                                  backgroundColor: 'grey.200',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: dept.compliance >= 95 ? '#2e7d32' : 
                                                   dept.compliance >= 90 ? '#ed6c02' : '#d32f2f'
                                  }
                                }} 
                              />
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {dept.compliance}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={dept.compliance >= 95 ? 'Excellent' : 
                                     dept.compliance >= 90 ? 'Good' : 'Needs Attention'}
                              color={dept.compliance >= 95 ? 'success' : 
                                     dept.compliance >= 90 ? 'warning' : 'error'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Admin Actions */}
        <Grid item xs={12} md={4}>
          <Fade in timeout={3000}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Admin Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <AdminActionCard
                      title="User Management"
                      description="Manage staff accounts & permissions"
                      icon={<SupervisorAccount />}
                      color="#1976d2"
                      onClick={() => handleAdminAction('user-management')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AdminActionCard
                      title="Compliance Report"
                      description="Generate compliance reports"
                      icon={<Assessment />}
                      color="#2e7d32"
                      onClick={() => handleAdminAction('compliance-report')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AdminActionCard
                      title="System Settings"
                      description="Configure system parameters"
                      icon={<AdminPanelSettings />}
                      color="#9c27b0"
                      onClick={() => handleAdminAction('system-settings')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AdminActionCard
                      title="Audit Log"
                      description="View system activity logs"
                      icon={<Security />}
                      color="#ed6c02"
                      onClick={() => handleAdminAction('audit-log')}
                    />
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

export default AdminDashboard;