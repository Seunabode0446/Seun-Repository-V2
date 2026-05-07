import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  LinearProgress
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  Edit,
  Visibility,
  Person,
  TrendingUp,
  CalendarToday,
  Assignment
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const ClientList = () => {
  const navigate = useNavigate();
  const { demoData, trackInteraction } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  useEffect(() => {
    trackInteraction('client-list-view');
  }, []);

  const filteredClients = demoData.clients.filter(client => {
    const matchesSearch = client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = serviceFilter === 'all' || client.serviceType === serviceFilter;
    const matchesRisk = riskFilter === 'all' || client.riskLevel === riskFilter;
    
    return matchesSearch && matchesService && matchesRisk;
  });

  const handleClientView = (clientId) => {
    trackInteraction('client-view', { clientId });
    navigate(`/clients/${clientId}`);
  };

  const handleAddClient = () => {
    trackInteraction('add-client');
    toast.success('Opening new client form...');
  };

  const getAverageProgress = (goals) => {
    if (!goals || goals.length === 0) return 0;
    return Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'error';
      default:
        return 'default';
    }
  };

  const ClientCard = ({ client, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card 
        sx={{ 
          mb: 2,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 3,
            transform: 'translateY(-2px)'
          }
        }}
        onClick={() => handleClientView(client.id)}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60, 
                backgroundColor: '#1976d2',
                fontSize: '1.5rem',
                fontWeight: 600
              }}
            >
              {client.firstName[0]}{client.lastName[0]}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {client.firstName} {client.lastName}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {client.diagnosis} • {client.serviceType}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip 
                  label={`Risk: ${client.riskLevel}`} 
                  color={getRiskColor(client.riskLevel)}
                  size="small"
                />
                <Chip 
                  label={client.status} 
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Average Goal Progress
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={getAverageProgress(client.ispGoals)} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      backgroundColor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3
                      }
                    }} 
                  />
                  <Typography variant="caption" color="text.secondary">
                    {getAverageProgress(client.ispGoals)}%
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="text.secondary">
                    Case Manager
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {client.caseManager}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <IconButton 
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClientView(client.id);
                }}
              >
                <Visibility />
              </IconButton>
              <IconButton 
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success('Opening edit form...');
                }}
              >
                <Edit />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Client Management 👥
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage client profiles, track progress, and monitor service delivery.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddClient}
          sx={{ px: 3, py: 1.5 }}
        >
          Add New Client
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Service Type</InputLabel>
                <Select
                  value={serviceFilter}
                  label="Service Type"
                  onChange={(e) => setServiceFilter(e.target.value)}
                >
                  <MenuItem value="all">All Services</MenuItem>
                  <MenuItem value="Residential">Residential</MenuItem>
                  <MenuItem value="Day Program">Day Program</MenuItem>
                  <MenuItem value="Supported Living">Supported Living</MenuItem>
                  <MenuItem value="Vocational">Vocational</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Risk Level</InputLabel>
                <Select
                  value={riskFilter}
                  label="Risk Level"
                  onChange={(e) => setRiskFilter(e.target.value)}
                >
                  <MenuItem value="all">All Risk Levels</MenuItem>
                  <MenuItem value="Low">Low Risk</MenuItem>
                  <MenuItem value="Medium">Medium Risk</MenuItem>
                  <MenuItem value="High">High Risk</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ py: 1.5 }}
              >
                More Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ backgroundColor: '#1976d2', mx: 'auto', mb: 1, width: 48, height: 48 }}>
                <Person />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>
                {filteredClients.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Clients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ backgroundColor: '#2e7d32', mx: 'auto', mb: 1, width: 48, height: 48 }}>
                <TrendingUp />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                {Math.round(filteredClients.reduce((acc, client) => acc + getAverageProgress(client.ispGoals), 0) / filteredClients.length) || 0}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ backgroundColor: '#ed6c02', mx: 'auto', mb: 1, width: 48, height: 48 }}>
                <Assignment />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#ed6c02' }}>
                {filteredClients.reduce((acc, client) => acc + client.ispGoals.length, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Goals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ backgroundColor: '#9c27b0', mx: 'auto', mb: 1, width: 48, height: 48 }}>
                <CalendarToday />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                {demoData.events.filter(e => e.clientId).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Appointments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Client List */}
      <Box>
        {filteredClients.length > 0 ? (
          filteredClients.map((client, index) => (
            <ClientCard key={client.id} client={client} index={index} />
          ))
        ) : (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Person sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                No clients found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search criteria or add a new client.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddClient}
              >
                Add New Client
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default ClientList;