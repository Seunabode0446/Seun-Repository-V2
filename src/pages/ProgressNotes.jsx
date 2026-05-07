import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Avatar
} from '@mui/material';
import {
  Add,
  Assignment,
  Edit,
  Visibility,
  CheckCircle,
  Schedule,
  Person,
  Search,
  FilterList
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const ProgressNotes = () => {
  const { demoData, trackInteraction, addNote } = useDemo();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newNote, setNewNote] = useState({
    clientId: '',
    clientName: '',
    type: 'Daily Progress',
    content: '',
    goals: []
  });

  useEffect(() => {
    trackInteraction('progress-notes-view');
  }, []);

  const filteredNotes = demoData.notes.filter(note => {
    const matchesSearch = note.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddNote = () => {
    if (!newNote.clientName || !newNote.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    const noteData = {
      ...newNote,
      staffName: 'Demo User',
      date: new Date().toISOString().split('T')[0]
    };

    addNote(noteData);
    toast.success('Progress note added successfully!');
    setOpenDialog(false);
    setNewNote({
      clientId: '',
      clientName: '',
      type: 'Daily Progress',
      content: '',
      goals: []
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending Review':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const NoteCard = ({ note, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card sx={{ mb: 2, transition: 'all 0.2s ease', '&:hover': { boxShadow: 3 } }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Avatar sx={{ backgroundColor: '#1976d2', width: 48, height: 48 }}>
              <Assignment />
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {note.clientName} - {note.type}
                </Typography>
                <Chip 
                  label={note.status} 
                  color={getStatusColor(note.status)}
                  size="small"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {new Date(note.date).toLocaleDateString()} • By: {note.staffName}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                {note.content}
              </Typography>
              
              {note.goals.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    Related Goals:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {note.goals.map((goal, idx) => (
                      <Chip key={idx} label={goal} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}
              
              {note.status === 'Approved' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="caption" color="success.main">
                    Approved by {note.approvedBy} on {new Date(note.approvedDate).toLocaleDateString()}
                  </Typography>
                </Box>
              )}
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <IconButton color="primary" size="small">
                <Visibility />
              </IconButton>
              <IconButton color="secondary" size="small">
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
            Progress Notes 📝
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Document client progress, activities, and observations.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{ px: 3, py: 1.5 }}
        >
          Add Progress Note
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Pending Review">Pending Review</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
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
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
                {filteredNotes.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Notes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                {filteredNotes.filter(n => n.status === 'Approved').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Approved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#ed6c02' }}>
                {filteredNotes.filter(n => n.status === 'Pending Review').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                {Math.round((filteredNotes.filter(n => n.status === 'Approved').length / filteredNotes.length) * 100) || 0}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Approval Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Notes List */}
      <Box>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <NoteCard key={note.id} note={note} index={index} />
          ))
        ) : (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Assignment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                No progress notes found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Start documenting client progress by adding your first note.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
              >
                Add Progress Note
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Add Note Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Progress Note</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Client</InputLabel>
                <Select
                  value={newNote.clientName}
                  label="Client"
                  onChange={(e) => setNewNote(prev => ({ ...prev, clientName: e.target.value }))}
                >
                  {demoData.clients.map(client => (
                    <MenuItem key={client.id} value={`${client.firstName} ${client.lastName}`}>
                      {client.firstName} {client.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Note Type</InputLabel>
                <Select
                  value={newNote.type}
                  label="Note Type"
                  onChange={(e) => setNewNote(prev => ({ ...prev, type: e.target.value }))}
                >
                  <MenuItem value="Daily Progress">Daily Progress</MenuItem>
                  <MenuItem value="Behavioral">Behavioral</MenuItem>
                  <MenuItem value="Medical">Medical</MenuItem>
                  <MenuItem value="Social">Social</MenuItem>
                  <MenuItem value="Educational">Educational</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Progress Note Content"
                placeholder="Document client's progress, activities, behaviors, and observations..."
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNote} variant="contained">
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProgressNotes;