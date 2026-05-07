import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider
} from '@mui/material';
import {
  CalendarToday,
  Add,
  Event,
  Person,
  Schedule,
  LocationOn,
  Edit,
  Delete,
  Visibility,
  Today,
  NavigateBefore,
  NavigateNext
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const Calendar = () => {
  const { demoData, trackInteraction } = useDemo();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewEventDialog, setViewEventDialog] = useState(false);

  useEffect(() => {
    trackInteraction('calendar-view');
  }, []);

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return demoData.calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Get today's events
  const getTodaysEvents = () => {
    const today = new Date();
    return getEventsForDate(today);
  };

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return demoData.calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= nextWeek;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Appointment':
        return '#1976d2';
      case 'Meeting':
        return '#2e7d32';
      case 'Training':
        return '#ed6c02';
      case 'Assessment':
        return '#9c27b0';
      case 'Medical':
        return '#d32f2f';
      default:
        return '#666';
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const events = getEventsForDate(date);
    if (events.length > 0) {
      // Show events for this date
      trackInteraction('calendar-date-click', { date: date.toDateString(), eventCount: events.length });
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setViewEventDialog(true);
    trackInteraction('calendar-event-click', { eventId: event.id });
  };

  const handleAddEvent = () => {
    setOpenDialog(true);
    trackInteraction('calendar-add-event');
  };

  const handleSaveEvent = () => {
    toast.success('Event added successfully!');
    setOpenDialog(false);
    trackInteraction('calendar-event-saved');
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    trackInteraction('calendar-navigate', { direction, month: newDate.getMonth() });
  };

  const CalendarDay = ({ date, isCurrentMonth, isToday, isSelected }) => {
    const events = getEventsForDate(date);
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Box
          sx={{
            minHeight: 100,
            border: '1px solid #e0e0e0',
            cursor: 'pointer',
            backgroundColor: isToday ? '#e3f2fd' : isSelected ? '#f3e5f5' : 'white',
            opacity: isCurrentMonth ? 1 : 0.5,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              boxShadow: 1
            }
          }}
          onClick={() => handleDateClick(date)}
        >
          <Box sx={{ p: 1 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: isToday ? 700 : 400,
                color: isToday ? '#1976d2' : 'text.primary'
              }}
            >
              {date.getDate()}
            </Typography>
            
            {events.slice(0, 3).map((event, index) => (
              <Chip
                key={event.id}
                label={event.title}
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  height: 20,
                  mb: 0.5,
                  display: 'block',
                  backgroundColor: getEventTypeColor(event.type),
                  color: 'white',
                  '& .MuiChip-label': {
                    px: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%'
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventClick(event);
                }}
              />
            ))}
            
            {events.length > 3 && (
              <Typography variant="caption" color="text.secondary">
                +{events.length - 3} more
              </Typography>
            )}
          </Box>
        </Box>
      </motion.div>
    );
  };

  const EventItem = ({ event }) => (
    <ListItem
      sx={{
        border: `1px solid ${getEventTypeColor(event.type)}30`,
        borderRadius: 2,
        mb: 1,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
      onClick={() => handleEventClick(event)}
    >
      <ListItemIcon>
        <Avatar sx={{ backgroundColor: getEventTypeColor(event.type), width: 32, height: 32 }}>
          <Event sx={{ fontSize: 16 }} />
        </Avatar>
      </ListItemIcon>
      <ListItemText
        primary={event.title}
        secondary={
          <Box>
            <Typography variant="caption" sx={{ display: 'block' }}>
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {event.type} • {event.location}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Calendar 📅
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage appointments, meetings, and important events.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddEvent}
          sx={{ px: 3, py: 1.5 }}
        >
          Add Event
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Calendar View */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {/* Calendar Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton onClick={() => navigateMonth(-1)}>
                    <NavigateBefore />
                  </IconButton>
                  <Typography variant="h5" sx={{ fontWeight: 600, minWidth: 200, textAlign: 'center' }}>
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </Typography>
                  <IconButton onClick={() => navigateMonth(1)}>
                    <NavigateNext />
                  </IconButton>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant={viewMode === 'month' ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setViewMode('month')}
                  >
                    Month
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Today />}
                    onClick={() => {
                      setCurrentDate(new Date());
                      setSelectedDate(new Date());
                    }}
                  >
                    Today
                  </Button>
                </Box>
              </Box>

              {/* Calendar Grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <Box
                    key={day}
                    sx={{
                      p: 1,
                      textAlign: 'center',
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #e0e0e0',
                      fontWeight: 600
                    }}
                  >
                    {day}
                  </Box>
                ))}
                
                {/* Calendar Days */}
                {generateCalendarDays().map((date, index) => (
                  <CalendarDay
                    key={index}
                    date={date}
                    isCurrentMonth={date.getMonth() === currentDate.getMonth()}
                    isToday={date.toDateString() === new Date().toDateString()}
                    isSelected={date.toDateString() === selectedDate.toDateString()}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Today's Events */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Today's Events
              </Typography>
              {getTodaysEvents().length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No events scheduled for today
                </Typography>
              ) : (
                <List sx={{ p: 0 }}>
                  {getTodaysEvents().map((event) => (
                    <EventItem key={event.id} event={event} />
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Upcoming Events
              </Typography>
              <List sx={{ p: 0 }}>
                {getUpcomingEvents().slice(0, 5).map((event) => (
                  <EventItem key={event.id} event={event} />
                ))}
              </List>
              {getUpcomingEvents().length > 5 && (
                <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                  View All Upcoming Events
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Event Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                placeholder="Enter event title"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select label="Event Type">
                  <MenuItem value="Appointment">Appointment</MenuItem>
                  <MenuItem value="Meeting">Meeting</MenuItem>
                  <MenuItem value="Training">Training</MenuItem>
                  <MenuItem value="Assessment">Assessment</MenuItem>
                  <MenuItem value="Medical">Medical</MenuItem>
                </Select>
              </FormControl>
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
              <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Time"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                placeholder="Enter location"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Add event description..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEvent}>
            Save Event
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={viewEventDialog} onClose={() => setViewEventDialog(false)} maxWidth="sm" fullWidth>
        {selectedEvent && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ backgroundColor: getEventTypeColor(selectedEvent.type) }}>
                  <Event />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedEvent.title}</Typography>
                  <Chip 
                    label={selectedEvent.type} 
                    size="small" 
                    sx={{ 
                      backgroundColor: getEventTypeColor(selectedEvent.type),
                      color: 'white'
                    }}
                  />
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Schedule />
                    <Typography variant="body1">
                      {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocationOn />
                    <Typography variant="body1">{selectedEvent.location}</Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Person />
                    <Typography variant="body1">{selectedEvent.clientName}</Typography>
                  </Box>
                </Grid>
                
                {selectedEvent.description && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedEvent.description}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setViewEventDialog(false)}>Close</Button>
              <Button variant="outlined" startIcon={<Edit />}>
                Edit
              </Button>
              <Button variant="outlined" color="error" startIcon={<Delete />}>
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Calendar;