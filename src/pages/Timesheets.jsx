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
  InputAdornment,
  Fade,
  Grow,
  Paper,
  Divider
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  Edit,
  Visibility,
  Schedule,
  Person,
  CalendarToday,
  CheckCircle,
  AccessTime,
  Warning,
  Download,
  MoreVert,
  PlayArrow,
  Stop,
  Pause
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const Timesheets = () => {
  const { demoData, trackInteraction } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('current');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [isClocked, setIsClocked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    trackInteraction('timesheets-view');
    
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sample timesheet data
  const timesheets = [
    {
      id: 1,
      staffName: 'Jennifer Adams',
      date: '2024-01-20',
      clockIn: '08:00',
      clockOut: '16:30',
      totalHours: 8.5,
      breakTime: 0.5,
      overtime: 0.5,
      status: 'Approved',
      client: 'Sarah Johnson',
      location: 'Residential Facility'
    },
    {
      id: 2,
      staffName: 'Michael Rodriguez',
      date: '2024-01-20',
      clockIn: '09:00',
      clockOut: '17:00',
      totalHours: 8.0,
      breakTime: 0.5,
      overtime: 0,
      status: 'Pending',
      client: 'Emma Davis',
      location: 'Day Program Center'
    },
    {
      id: 3,
      staffName: 'Sarah Johnson',
      date: '2024-01-19',
      clockIn: '07:30',
      clockOut: '16:00',
      totalHours: 8.5,
      breakTime: 0.5,
      overtime: 0,
      status: 'Approved',
      client: 'Michael Rodriguez',
      location: 'Community Setting'
    },
    {
      id: 4,
      staffName: 'David Chen',
      date: '2024-01-19',
      clockIn: '10:00',
      clockOut: '18:30',
      totalHours: 8.5,
      breakTime: 0.5,
      overtime: 0.5,
      status: 'Rejected',
      client: 'Sarah Johnson',
      location: 'Residential Facility'
    }
  ];

  const filteredTimesheets = timesheets.filter(timesheet => {
    const matchesSearch = 
      timesheet.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || timesheet.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Sample data for charts
  const weeklyHours = [
    { day: 'Mon', regular: 8, overtime: 0.5 },
    { day: 'Tue', regular: 8, overtime: 0 },
    { day: 'Wed', regular: 8, overtime: 1 },
    { day: 'Thu', regular: 8, overtime: 0.5 },
    { day: 'Fri', regular: 8, overtime: 0 },
    { day: 'Sat', regular: 6, overtime: 0 },
    { day: 'Sun', regular: 0, overtime: 0 }
  ];

  const staffHours = [
    { name: 'Jennifer Adams', hours: 42, overtime: 2 },
    { name: 'Michael Rodriguez', hours: 40, overtime: 0 },
    { name: 'Sarah Johnson', hours: 38, overtime: 1 },
    { name: 'David Chen', hours: 44, overtime: 4 },
    { name: 'Maria Gonzalez', hours: 40, overtime: 0 }
  ];

  const statusDistribution = [
    { name: 'Approved', value: 65, color: '#2e7d32' },
    { name: 'Pending', value: 25, color: '#ed6c02' },
    { name: 'Rejected', value: 10, color: '#d32f2f' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleClockInOut = () => {
    if (isClocked) {
      toast.success('Clocked out successfully!');
      trackInteraction('clock-out');
    } else {
      toast.success('Clocked in successfully!');
      trackInteraction('clock-in');
    }
    setIsClocked(!isClocked);
  };

  const handleViewTimesheet = (timesheet) => {
    setSelectedTimesheet(timesheet);
    setViewDialog(true);
    trackInteraction('timesheet-view', { timesheetId: timesheet.id });
  };

  const handleAddTimesheet = () => {
    setOpenDialog(true);
    trackInteraction('timesheet-add-dialog-open');
  };

  const handleSubmitTimesheet = () => {
    toast.success('Timesheet submitted successfully!');
    setOpenDialog(false);
    trackInteraction('timesheet-submitted');
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Grow in timeout={1000}>
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Avatar sx={{ backgroundColor: color, mx: 'auto', mb: 2, width: 56, height: 56 }}>
            {icon}
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, color: color }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grow>
  );

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Time Management ⏰
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track work hours, manage schedules, and monitor attendance.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant={isClocked ? "outlined" : "contained"}
            startIcon={isClocked ? <Stop /> : <PlayArrow />}
            onClick={handleClockInOut}
            color={isClocked ? "error" : "success"}
            sx={{ px: 3, py: 1.5 }}
          >
            {isClocked ? 'Clock Out' : 'Clock In'}
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddTimesheet}
            sx={{ px: 3, py: 1.5 }}
          >
            Add Entry
          </Button>
        </Box>
      </Box>

      {/* Clock Status Card */}
      {isClocked && (
        <Fade in timeout={500}>
          <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #2e7d32, #4caf50)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                    <AccessTime />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      Currently Clocked In
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Started at 8:00 AM • Client: Sarah Johnson
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                    {currentTime.toLocaleTimeString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    {Math.floor((currentTime.getTime() - new Date().setHours(8, 0, 0, 0)) / (1000 * 60 * 60))}h {Math.floor(((currentTime.getTime() - new Date().setHours(8, 0, 0, 0)) % (1000 * 60 * 60)) / (1000 * 60))}m elapsed
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      )}

      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="This Week"
            value="42h"
            icon={<Schedule />}
            color="#1976d2"
            subtitle="Regular hours"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Overtime"
            value="2h"
            icon={<AccessTime />}
            color="#ed6c02"
            subtitle="This week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={timesheets.filter(t => t.status === 'Pending').length}
            icon={<Warning />}
            color="#9c27b0"
            subtitle="Awaiting approval"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Approved"
            value={timesheets.filter(t => t.status === 'Approved').length}
            icon={<CheckCircle />}
            color="#2e7d32"
            subtitle="This month"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Weekly Hours Chart */}
        <Grid item xs={12} md={8}>
          <Fade in timeout={1500}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Weekly Hours Breakdown
                  </Typography>
                  <Chip label="Current Week" size="small" variant="outlined" />
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyHours}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="regular" fill="#1976d2" name="Regular Hours" />
                    <Bar dataKey="overtime" fill="#ed6c02" name="Overtime Hours" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Status Distribution */}
        <Grid item xs={12} md={4}>
          <Fade in timeout={2000}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Timesheet Status
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2 }}>
                  {statusDistribution.map((item, index) => (
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

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search timesheets..."
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
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Period</InputLabel>
                <Select
                  value={filterPeriod}
                  label="Period"
                  onChange={(e) => setFilterPeriod(e.target.value)}
                >
                  <MenuItem value="current">Current Week</MenuItem>
                  <MenuItem value="last">Last Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="quarter">This Quarter</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setFilterPeriod('current');
                  trackInteraction('timesheet-filters-reset');
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Timesheets Table */}
      <Fade in timeout={1000}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Time Entries ({filteredTimesheets.length} entries)
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={() => {
                  toast.success('Exporting timesheets...');
                  trackInteraction('timesheets-export');
                }}
              >
                Export
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Staff</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Clock In</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Clock Out</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Total Hours</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Overtime</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTimesheets.map((timesheet, index) => (
                    <motion.tr
                      key={timesheet.id}
                      component={TableRow}
                      hover
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarToday sx={{ fontSize: 16 }} />
                          {new Date(timesheet.date).toLocaleDateString()}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person sx={{ fontSize: 16 }} />
                          {timesheet.staffName}
                        </Box>
                      </TableCell>
                      <TableCell>{timesheet.clockIn}</TableCell>
                      <TableCell>{timesheet.clockOut}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {timesheet.totalHours}h
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {timesheet.overtime > 0 ? (
                          <Chip 
                            label={`${timesheet.overtime}h`} 
                            color="warning"
                            size="small"
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            -
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{timesheet.client}</TableCell>
                      <TableCell>
                        <Chip 
                          label={timesheet.status} 
                          color={getStatusColor(timesheet.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleViewTimesheet(timesheet)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="secondary"
                            onClick={() => {
                              toast.success('Opening timesheet editor...');
                              trackInteraction('timesheet-edit', { timesheetId: timesheet.id });
                            }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton size="small">
                            <MoreVert />
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
      </Fade>

      {/* Add Timesheet Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Time Entry</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                defaultValue={new Date().toISOString().split('T')[0]}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
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
              <TextField
                fullWidth
                type="time"
                label="Clock In Time"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Clock Out Time"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Break Time (hours)"
                inputProps={{ step: 0.25, min: 0 }}
                defaultValue={0.5}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                placeholder="Work location or setting"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Activities Performed"
                placeholder="Describe the work activities and services provided..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Notes"
                placeholder="Additional notes or comments..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={handleSubmitTimesheet}
          >
            Submit Entry
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Timesheet Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        {selectedTimesheet && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  Timesheet - {selectedTimesheet.staffName}
                </Typography>
                <Chip 
                  label={selectedTimesheet.status} 
                  color={getStatusColor(selectedTimesheet.status)}
                  size="small"
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Time Details
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Date:</strong> {new Date(selectedTimesheet.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Clock In:</strong> {selectedTimesheet.clockIn}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Clock Out:</strong> {selectedTimesheet.clockOut}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Total Hours:</strong> {selectedTimesheet.totalHours}h
                  </Typography>
                  <Typography variant="body2">
                    <strong>Overtime:</strong> {selectedTimesheet.overtime}h
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Service Details
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Client:</strong> {selectedTimesheet.client}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Location:</strong> {selectedTimesheet.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Break Time:</strong> {selectedTimesheet.breakTime}h
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {selectedTimesheet.status}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewDialog(false)}>Close</Button>
              <Button 
                variant="outlined" 
                startIcon={<Edit />}
                onClick={() => {
                  toast.success('Opening timesheet editor...');
                  trackInteraction('timesheet-edit-from-view', { timesheetId: selectedTimesheet.id });
                }}
              >
                Edit Entry
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Timesheets;