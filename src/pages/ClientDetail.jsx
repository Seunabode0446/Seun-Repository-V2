import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  IconButton,
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Assignment,
  CalendarToday,
  Warning,
  Description,
  Person,
  Phone,
  Email,
  Home,
  LocalHospital,
  Medication,
  TrendingUp,
  CheckCircle,
  Schedule
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { demoData, trackInteraction, getClientById, getClientNotes, getClientIncidents, getClientDocuments } = useDemo();
  const [selectedTab, setSelectedTab] = useState(0);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const clientData = getClientById(parseInt(id));
    setClient(clientData);
    trackInteraction('client-detail-view', { clientId: id });
  }, [id, getClientById, trackInteraction]);

  if (!client) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Typography variant="h6" color="text.secondary">
          Client not found
        </Typography>
      </Box>
    );
  }

  const clientNotes = getClientNotes(client.id);
  const clientIncidents = getClientIncidents(client.id);
  const clientDocuments = getClientDocuments(client.id);

  // Sample progress data
  const progressData = [
    { month: 'Jan', communication: 65, living: 45, social: 70 },
    { month: 'Feb', communication: 68, living: 50, social: 75 },
    { month: 'Mar', communication: 72, living: 55, social: 80 },
    { month: 'Apr', communication: 75, living: 60, social: 85 },
    { month: 'May', communication: 75, living: 60, social: 85 },
    { month: 'Jun', communication: 75, living: 60, social: 85 }
  ];

  const goalData = client.ispGoals.map(goal => ({
    name: goal.goal.substring(0, 20) + '...',
    progress: goal.progress,
    fill: goal.progress >= 80 ? '#2e7d32' : goal.progress >= 60 ? '#ed6c02' : '#d32f2f'
  }));

  const handleEdit = () => {
    trackInteraction('client-edit', { clientId: client.id });
    toast.success('Opening edit form...');
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton onClick={() => navigate('/clients')}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {client.firstName} {client.lastName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Client Profile & Service Management
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={handleEdit}
        >
          Edit Profile
        </Button>
      </Box>

      {/* Client Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto', 
                    mb: 2,
                    backgroundColor: '#1976d2',
                    fontSize: '3rem',
                    fontWeight: 700
                  }}
                >
                  {client.firstName[0]}{client.lastName[0]}
                </Avatar>
                
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {client.firstName} {client.lastName}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Born: {new Date(client.dateOfBirth).toLocaleDateString()}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                  <Chip 
                    label={client.serviceType} 
                    color="primary" 
                  />
                  <Chip 
                    label={`Risk: ${client.riskLevel}`} 
                    color={client.riskLevel === 'Low' ? 'success' : client.riskLevel === 'Medium' ? 'warning' : 'error'}
                  />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Primary Diagnosis
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {client.diagnosis}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Case Manager
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {client.caseManager}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Last Visit
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(client.lastVisit).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  ISP Goal Progress
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart data={goalData} innerRadius="20%" outerRadius="80%">
                    <RadialBar dataKey="progress" cornerRadius={10} />
                    <Tooltip formatter={(value) => `${value}%`} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
                    {client.ispGoals.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Goals
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                    {Math.round(client.ispGoals.reduce((acc, goal) => acc + goal.progress, 0) / client.ispGoals.length)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Progress
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#ed6c02' }}>
                    {clientNotes.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Progress Notes
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                    {clientIncidents.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Incidents
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Grid>
      </Grid>

      {/* Detailed Information Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
            <Tab label="ISP Goals" />
            <Tab label="Progress Notes" />
            <Tab label="Incidents" />
            <Tab label="Documents" />
            <Tab label="Medical Info" />
            <Tab label="Emergency Contacts" />
          </Tabs>
        </Box>

        <TabPanel value={selectedTab} index={0}>
          <Grid container spacing={3}>
            {client.ispGoals.map((goal) => (
              <Grid item xs={12} md={6} key={goal.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                        {goal.goal}
                      </Typography>
                      <Chip 
                        label={`${goal.progress}%`} 
                        color={goal.progress >= 80 ? 'success' : goal.progress >= 60 ? 'warning' : 'error'}
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
                          borderRadius: 4
                        }
                      }} 
                    />
                    
                    <Typography variant="body2" color="text.secondary">
                      Due: {new Date(goal.dueDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <List>
            {clientNotes.map((note, index) => (
              <React.Fragment key={note.id}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <Assignment color={note.status === 'Approved' ? 'success' : 'warning'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {note.type} - {new Date(note.date).toLocaleDateString()}
                        </Typography>
                        <Chip 
                          label={note.status} 
                          color={note.status === 'Approved' ? 'success' : 'warning'}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                          {note.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          By: {note.staffName} | Goals: {note.goals.join(', ')}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < clientNotes.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={selectedTab} index={2}>
          <List>
            {clientIncidents.map((incident, index) => (
              <React.Fragment key={incident.id}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <Warning color={incident.severity === 'Minor' ? 'warning' : 'error'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {incident.type} - {new Date(incident.date).toLocaleDateString()}
                        </Typography>
                        <Chip 
                          label={incident.severity} 
                          color={incident.severity === 'Minor' ? 'warning' : 'error'}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                          {incident.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Reported by: {incident.reportedBy} | Status: {incident.status}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < clientIncidents.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={selectedTab} index={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Upload Date</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientDocuments.map((doc) => (
                  <TableRow key={doc.id} hover>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(doc.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip 
                        label={doc.status} 
                        color={doc.status === 'Active' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={selectedTab} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Current Medications
              </Typography>
              <List>
                {client.medications.map((med, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Medication color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={med.name}
                      secondary={`${med.dosage} - ${med.frequency}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Medical History
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Primary Diagnosis: {client.diagnosis}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Last Medical Review: {new Date(client.lastVisit).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={selectedTab} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Emergency Contact
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Person />
                    <Typography variant="body1">
                      {client.emergencyContact.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {client.emergencyContact.relationship}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone />
                    <Typography variant="body2">
                      {client.emergencyContact.phone}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default ClientDetail;