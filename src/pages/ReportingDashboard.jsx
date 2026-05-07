import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Divider
} from '@mui/material';
import {
  Assessment,
  GetApp,
  PictureAsPdf,
  TableChart,
  BarChart,
  TrendingUp,
  Security,
  People,
  Assignment,
  Warning
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const ReportingDashboard = () => {
  const { demoData, trackInteraction } = useDemo();
  const [selectedReport, setSelectedReport] = useState('compliance');
  const [dateRange, setDateRange] = useState('last30days');

  useEffect(() => {
    trackInteraction('reporting-dashboard-view');
  }, []);

  // Sample data for reports
  const complianceData = [
    { month: 'Jan', documentation: 94, training: 89, medical: 97 },
    { month: 'Feb', documentation: 96, training: 92, medical: 98 },
    { month: 'Mar', documentation: 95, training: 94, medical: 96 },
    { month: 'Apr', documentation: 97, training: 96, medical: 99 },
    { month: 'May', documentation: 98, training: 95, medical: 97 },
    { month: 'Jun', documentation: 96, training: 97, medical: 98 }
  ];

  const incidentTrends = [
    { month: 'Jan', behavioral: 8, medical: 3, safety: 2 },
    { month: 'Feb', behavioral: 6, medical: 2, safety: 1 },
    { month: 'Mar', behavioral: 9, medical: 4, safety: 3 },
    { month: 'Apr', behavioral: 5, medical: 1, safety: 2 },
    { month: 'May', behavioral: 7, medical: 3, safety: 1 },
    { month: 'Jun', behavioral: 4, medical: 2, safety: 1 }
  ];

  const staffProductivity = [
    { name: 'Jennifer Adams', notes: 45, clients: 8, hours: 160 },
    { name: 'Michael Rodriguez', notes: 38, clients: 6, hours: 152 },
    { name: 'Sarah Johnson', notes: 42, clients: 7, hours: 158 },
    { name: 'David Chen', notes: 35, clients: 5, hours: 145 },
    { name: 'Maria Gonzalez', notes: 40, clients: 7, hours: 155 }
  ];

  const reportTypes = [
    {
      id: 'compliance',
      title: 'Compliance Report',
      description: 'Documentation, training, and regulatory compliance metrics',
      icon: <Security />,
      color: '#1976d2'
    },
    {
      id: 'incidents',
      title: 'Incident Analysis',
      description: 'Incident trends, patterns, and resolution metrics',
      icon: <Warning />,
      color: '#d32f2f'
    },
    {
      id: 'productivity',
      title: 'Staff Productivity',
      description: 'Staff performance, caseloads, and efficiency metrics',
      icon: <People />,
      color: '#2e7d32'
    },
    {
      id: 'client',
      title: 'Client Outcomes',
      description: 'ISP goal progress, service utilization, and outcomes',
      icon: <TrendingUp />,
      color: '#9c27b0'
    }
  ];

  const handleExportReport = (format) => {
    toast.success(`Exporting ${selectedReport} report as ${format.toUpperCase()}...`);
    trackInteraction('report-export', { type: selectedReport, format });
    
    // Simulate export delay
    setTimeout(() => {
      toast.success(`${format.toUpperCase()} report downloaded successfully!`);
    }, 2000);
  };

  const ReportCard = ({ report, isSelected, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        sx={{ 
          cursor: 'pointer',
          border: isSelected ? `2px solid ${report.color}` : '2px solid transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 3,
            transform: 'translateY(-2px)'
          }
        }}
        onClick={onClick}
      >
        <CardContent sx={{ textAlign: 'center', py: 3 }}>
          <Avatar sx={{ backgroundColor: report.color, mx: 'auto', mb: 2, width: 56, height: 56 }}>
            {report.icon}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {report.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {report.description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'compliance':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Compliance Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={complianceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="documentation" stroke="#1976d2" strokeWidth={3} name="Documentation" />
                      <Line type="monotone" dataKey="training" stroke="#2e7d32" strokeWidth={3} name="Training" />
                      <Line type="monotone" dataKey="medical" stroke="#9c27b0" strokeWidth={3} name="Medical Records" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Compliance Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
                          96%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Documentation Compliance
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                          97%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Training Compliance
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                          98%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Medical Records Compliance
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 'incidents':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Incident Trends by Type
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={incidentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="behavioral" fill="#d32f2f" name="Behavioral" />
                      <Bar dataKey="medical" fill="#ed6c02" name="Medical" />
                      <Bar dataKey="safety" fill="#1976d2" name="Safety" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 'productivity':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Staff Productivity Metrics
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Staff Member</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Progress Notes</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Active Clients</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Hours Worked</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Efficiency</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {staffProductivity.map((staff, index) => (
                          <TableRow key={index} hover>
                            <TableCell>{staff.name}</TableCell>
                            <TableCell>{staff.notes}</TableCell>
                            <TableCell>{staff.clients}</TableCell>
                            <TableCell>{staff.hours}</TableCell>
                            <TableCell>
                              <Chip 
                                label={`${Math.round((staff.notes / staff.hours) * 100)}%`}
                                color={staff.notes / staff.hours > 0.25 ? 'success' : 'warning'}
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
            </Grid>
          </Grid>
        );

      case 'client':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Client Outcome Metrics
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#2e7d32', mb: 1 }}>
                          78%
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          Average ISP Goal Progress
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Across all active clients
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                          92%
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          Service Plan Adherence
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Meeting scheduled services
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Reporting Dashboard 📊
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Generate comprehensive reports and analytics for compliance and performance monitoring.
          </Typography>
        </Box>
      </Box>

      {/* Report Type Selection */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reportTypes.map((report) => (
          <Grid item xs={12} sm={6} md={3} key={report.id}>
            <ReportCard
              report={report}
              isSelected={selectedReport === report.id}
              onClick={() => {
                setSelectedReport(report.id);
                trackInteraction('report-type-selected', { type: report.id });
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Report Controls */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="last7days">Last 7 Days</MenuItem>
                  <MenuItem value="last30days">Last 30 Days</MenuItem>
                  <MenuItem value="last3months">Last 3 Months</MenuItem>
                  <MenuItem value="last6months">Last 6 Months</MenuItem>
                  <MenuItem value="lastyear">Last Year</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<PictureAsPdf />}
                  onClick={() => handleExportReport('pdf')}
                  sx={{ flex: 1 }}
                >
                  PDF
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<TableChart />}
                  onClick={() => handleExportReport('excel')}
                  sx={{ flex: 1 }}
                >
                  Excel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Report Content */}
      <motion.div
        key={selectedReport}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderReportContent()}
      </motion.div>

      {/* Quick Stats */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Quick Statistics
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ backgroundColor: '#1976d2', mx: 'auto', mb: 1 }}>
                  <Assignment />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {demoData.notes.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Progress Notes
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ backgroundColor: '#2e7d32', mx: 'auto', mb: 1 }}>
                  <People />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {demoData.clients.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Clients
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ backgroundColor: '#ed6c02', mx: 'auto', mb: 1 }}>
                  <Warning />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {demoData.incidents.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Incidents
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ backgroundColor: '#9c27b0', mx: 'auto', mb: 1 }}>
                  <BarChart />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  96%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Overall Compliance
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportingDashboard;