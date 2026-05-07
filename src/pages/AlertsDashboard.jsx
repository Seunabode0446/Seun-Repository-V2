import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Notifications,
  Warning,
  Error,
  Info,
  CheckCircle,
  Schedule,
  Assignment,
  Person,
  Description,
  School,
  LocalHospital,
  Close,
  MarkAsUnread,
  Delete,
  FilterList,
  NotificationsActive
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const AlertsDashboard = () => {
  const { demoData, trackInteraction } = useDemo();
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);

  useEffect(() => {
    trackInteraction('alerts-dashboard-view');
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return '#d32f2f';
      case 'High':
        return '#ed6c02';
      case 'Medium':
        return '#1976d2';
      case 'Low':
        return '#2e7d32';
      default:
        return '#666';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'Critical':
        return <Error />;
      case 'High':
        return <Warning />;
      case 'Medium':
        return <Info />;
      case 'Low':
        return <CheckCircle />;
      default:
        return <Notifications />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'Missing Notes':
        return <Assignment />;
      case 'Expiring Documents':
        return <Description />;
      case 'Training Due':
        return <School />;
      case 'Medical Alert':
        return <LocalHospital />;
      case 'Staff Schedule':
        return <Schedule />;
      default:
        return <Notifications />;
    }
  };

  const getFilteredAlerts = () => {
    let filtered = demoData.alerts;
    
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(alert => alert.priority === selectedPriority);
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(alert => alert.status === selectedStatus);
    }
    
    return filtered.sort((a, b) => {
      const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const handleAlertAction = (alertId, action) => {
    trackInteraction('alert-action', { alertId, action });
    
    switch (action) {
      case 'mark-read':
        toast.success('Alert marked as read');
        break;
      case 'dismiss':
        toast.success('Alert dismissed');
        break;
      case 'delete':
        toast.success('Alert deleted');
        break;
      default:
        break;
    }
  };

  const handleViewAlert = (alert) => {
    setSelectedAlert(alert);
    setViewDialog(true);
    trackInteraction('alert-view', { alertId: alert.id });
  };

  const alertStats = [
    {
      title: 'Critical Alerts',
      count: demoData.alerts.filter(a => a.priority === 'Critical').length,
      color: '#d32f2f',
      icon: <Error />
    },
    {
      title: 'High Priority',
      count: demoData.alerts.filter(a => a.priority === 'High').length,
      color: '#ed6c02',
      icon: <Warning />
    },
    {
      title: 'Open Alerts',
      count: demoData.alerts.filter(a => a.status === 'Open').length,
      color: '#1976d2',
      icon: <NotificationsActive />
    },
    {
      title: 'Total Alerts',
      count: demoData.alerts.length,
      color: '#2e7d32',
      icon: <Notifications />
    }
  ];

  const StatCard = ({ stat }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Avatar sx={{ backgroundColor: stat.color, mx: 'auto', mb: 2, width: 56, height: 56 }}>
            {stat.icon}
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
            {stat.count}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stat.title}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );

  const AlertItem = ({ alert, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <ListItem
        sx={{
          border: `1px solid ${getPriorityColor(alert.priority)}20`,
          borderRadius: 2,
          mb: 1,
          backgroundColor: alert.status === 'Open' ? 'background.paper' : 'grey.50',
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer'
          }
        }}
        onClick={() => handleViewAlert(alert)}
      >
        <ListItemIcon>
          <Badge
            color={alert.priority === 'Critical' ? 'error' : alert.priority === 'High' ? 'warning' : 'primary'}
            variant="dot"
            invisible={alert.status !== 'Open'}
          >
            <Avatar sx={{ backgroundColor: getPriorityColor(alert.priority), width: 40, height: 40 }}>
              {getAlertIcon(alert.type)}
            </Avatar>
          </Badge>
        </ListItemIcon>
        
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {alert.message}
              </Typography>
              <Chip 
                label={alert.priority} 
                size="small" 
                sx={{ 
                  backgroundColor: getPriorityColor(alert.priority),
                  color: 'white',
                  fontSize: '0.7rem'
                }}
              />
            </Box>
          }
          secondary={
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {alert.type} • Assigned to: {alert.assignedTo}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Created: {new Date(alert.createdAt).toLocaleString()}
              </Typography>
            </Box>
          }
        />
        
        <ListItemSecondaryAction>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              size="small" 
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleAlertAction(alert.id, 'mark-read');
              }}
            >
              <MarkAsUnread />
            </IconButton>
            <IconButton 
              size="small" 
              color="success"
              onClick={(e) => {
                e.stopPropagation();
                handleAlertAction(alert.id, 'dismiss');
              }}
            >
              <CheckCircle />
            </IconButton>
            <IconButton 
              size="small" 
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                handleAlertAction(alert.id, 'delete');
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        </ListItemSecondaryAction>
      </ListItem>
    </motion.div>
  );

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Alerts Dashboard 🔔
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage system alerts, notifications, and priority items.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<CheckCircle />}
          onClick={() => {
            toast.success('All alerts marked as read');
            trackInteraction('mark-all-read');
          }}
        >
          Mark All Read
        </Button>
      </Box>

      {/* Alert Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {alertStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <FilterList />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filter Alerts
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={selectedPriority}
                  label="Priority"
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  <MenuItem value="all">All Priorities</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {getFilteredAlerts().length} of {demoData.alerts.length} alerts
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Active Alerts
          </Typography>
          
          {getFilteredAlerts().length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                No alerts found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All alerts have been resolved or no alerts match your filters.
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {getFilteredAlerts().map((alert, index) => (
                <AlertItem key={alert.id} alert={alert} index={index} />
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Alert Detail Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        {selectedAlert && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ backgroundColor: getPriorityColor(selectedAlert.priority) }}>
                  {getAlertIcon(selectedAlert.type)}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    Alert Details
                  </Typography>
                  <Chip 
                    label={selectedAlert.priority} 
                    size="small" 
                    sx={{ 
                      backgroundColor: getPriorityColor(selectedAlert.priority),
                      color: 'white'
                    }}
                  />
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Alert Information
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Type:</strong> {selectedAlert.type}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Priority:</strong> {selectedAlert.priority}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {selectedAlert.status}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Assigned To:</strong> {selectedAlert.assignedTo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Created:</strong> {new Date(selectedAlert.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Related Information
                  </Typography>
                  {selectedAlert.clientName && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Client:</strong> {selectedAlert.clientName}
                    </Typography>
                  )}
                  {selectedAlert.dueDate && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Due Date:</strong> {new Date(selectedAlert.dueDate).toLocaleDateString()}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    <strong>Department:</strong> {selectedAlert.department || 'General'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Message
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedAlert.message}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Action Required
                  </Typography>
                  <Typography variant="body2">
                    {selectedAlert.actionRequired || 'Please review and take appropriate action.'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                    Add Note
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Add a note about this alert..."
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setViewDialog(false)}>
                Close
              </Button>
              <Button 
                variant="outlined" 
                color="success"
                onClick={() => {
                  handleAlertAction(selectedAlert.id, 'dismiss');
                  setViewDialog(false);
                }}
              >
                Mark Resolved
              </Button>
              <Button 
                variant="contained"
                onClick={() => {
                  toast.success('Note added to alert');
                  setViewDialog(false);
                }}
              >
                Save Note
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AlertsDashboard;