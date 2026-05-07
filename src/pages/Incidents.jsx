import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import {
  Add,
  Warning,
  Edit,
  Visibility,
  Person,
  CalendarToday,
  Assignment,
  CheckCircle,
  Schedule,
  Report
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const Incidents = () => {
  const { demoData, trackInteraction } = useDemo();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);

  useEffect(() => {
    trackInteraction('incidents-view');
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Closed':
        return 'success';
      case 'Under Review':
        return 'warning';
      case 'Open':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleViewIncident = (incident) => {
    setSelectedIncident(incident);
    setViewDialog(true);
    trackInteraction('incident-view', { incidentId: incident.id });
  };

  const incidentSteps = [
    'Incident Reported',
    'Initial Review',
    'Investigation',
    'Resolution',
    'Follow-up'
  ];

  const getActiveStep = (status) => {
    switch (status) {
      case 'Open':
        return 0;
      case 'Under Review':
        return 2;
      case 'Closed':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Incident Reports ⚠️
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track, manage, and resolve incidents with comprehensive reporting.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{ px: 3, py: 1.5 }}
        >
          Report Incident
        </Button>
      </Box>

      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ backgroundColor: '#d32f2f', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                  <Warning />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#d32f2f' }}>
                  {demoData.incidents.filter(i => i.status === 'Open').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Open Incidents
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ backgroundColor: '#ed6c02', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                  <Schedule />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#ed6c02' }}>
                  {demoData.incidents.filter(i => i.status === 'Under Review').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Under Review
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ backgroundColor: '#2e7d32', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                  <CheckCircle />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                  {demoData.incidents.filter(i => i.status === 'Closed').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Resolved
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ backgroundColor: '#9c27b0', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                  <Report />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                  {demoData.incidents.filter(i => i.severity === 'Critical').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Critical
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Incidents Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Recent Incidents
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Severity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Reporter</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {demoData.incidents.map((incident, index) => (
                  <motion.tr
                    key={incident.id}
                    component={TableRow}
                    hover
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        #{incident.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 16 }} />
                        {new Date(incident.date).toLocaleDateString()}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person sx={{ fontSize: 16 }} />
                        {incident.clientName}
                      </Box>
                    </TableCell>
                    <TableCell>{incident.type}</TableCell>
                    <TableCell>
                      <Chip 
                        label={incident.severity} 
                        color={getSeverityColor(incident.severity)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{incident.reportedBy}</TableCell>
                    <TableCell>
                      <Chip 
                        label={incident.status} 
                        color={getStatusColor(incident.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleViewIncident(incident)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton size="small" color="secondary">
                          <Edit />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Incident Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Report New Incident</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Incident Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Incident Time"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Client</InputLabel>
                <Select label="Client">
                  {demoData.clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.firstName} {client.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Incident Type</InputLabel>
                <Select label="Incident Type">
                  <MenuItem value="Behavioral">Behavioral</MenuItem>
                  <MenuItem value="Medical">Medical</MenuItem>
                  <MenuItem value="Safety">Safety</MenuItem>
                  <MenuItem value="Property">Property Damage</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Severity</InputLabel>
                <Select label="Severity">
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                placeholder="Where did the incident occur?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                placeholder="Provide detailed description of the incident..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Immediate Actions Taken"
                placeholder="Describe any immediate actions or interventions..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Witnesses"
                placeholder="List any witnesses present..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={() => {
              toast.success('Incident report submitted successfully!');
              setOpenDialog(false);
              trackInteraction('incident-reported');
            }}
          >
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Incident Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        {selectedIncident && (
          <>
            <DialogTitle>
              Incident Report #{selectedIncident.id}
              <Chip 
                label={selectedIncident.status} 
                color={getStatusColor(selectedIncident.status)}
                size="small"
                sx={{ ml: 2 }}
              />
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Incident Details
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Date:</strong> {new Date(selectedIncident.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Client:</strong> {selectedIncident.clientName}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Type:</strong> {selectedIncident.type}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Severity:</strong> {selectedIncident.severity}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Reported By:</strong> {selectedIncident.reportedBy}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                    Progress Tracking
                  </Typography>
                  <Stepper activeStep={getActiveStep(selectedIncident.status)} orientation="vertical">
                    {incidentSteps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                          <Typography variant="body2" color="text.secondary">
                            {index <= getActiveStep(selectedIncident.status) ? 'Completed' : 'Pending'}
                          </Typography>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Description
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedIncident.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Actions Taken
                  </Typography>
                  <Typography variant="body2">
                    {selectedIncident.actionsTaken || 'No actions recorded yet.'}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewDialog(false)}>Close</Button>
              <Button variant="outlined" startIcon={<Edit />}>
                Edit Report
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Incidents;