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
  LinearProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add,
  Description,
  CloudUpload,
  Download,
  Visibility,
  Edit,
  Delete,
  Folder,
  InsertDriveFile,
  PictureAsPdf,
  Image,
  VideoFile,
  AudioFile
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const Documents = () => {
  const { demoData, trackInteraction } = useDemo();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    trackInteraction('documents-view');
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Expiring Soon':
        return 'warning';
      case 'Expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <PictureAsPdf sx={{ color: '#d32f2f' }} />;
      case 'Image':
        return <Image sx={{ color: '#1976d2' }} />;
      case 'Video':
        return <VideoFile sx={{ color: '#9c27b0' }} />;
      case 'Audio':
        return <AudioFile sx={{ color: '#2e7d32' }} />;
      default:
        return <InsertDriveFile sx={{ color: '#666' }} />;
    }
  };

  const handleUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          toast.success('Document uploaded successfully!');
          setOpenDialog(false);
          trackInteraction('document-uploaded');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const documentCategories = [
    { label: 'All Documents', count: demoData.documents.length },
    { label: 'Medical Records', count: demoData.documents.filter(d => d.category === 'Medical').length },
    { label: 'ISP Documents', count: demoData.documents.filter(d => d.category === 'ISP').length },
    { label: 'Training Certificates', count: demoData.documents.filter(d => d.category === 'Training').length },
    { label: 'Legal Documents', count: demoData.documents.filter(d => d.category === 'Legal').length }
  ];

  const getFilteredDocuments = () => {
    if (selectedTab === 0) return demoData.documents;
    const category = documentCategories[selectedTab].label.replace(' Documents', '').replace(' Certificates', '');
    return demoData.documents.filter(d => d.category === category);
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Document Management 📁
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Upload, organize, and manage all client and organizational documents.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{ px: 3, py: 1.5 }}
        >
          Upload Document
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
                <Avatar sx={{ backgroundColor: '#1976d2', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                  <Description />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
                  {demoData.documents.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Documents
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
                <Avatar sx={{ backgroundColor: '#2e7d32', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                  <Folder />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                  {demoData.documents.filter(d => d.status === 'Active').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Documents
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
                <Avatar sx={{ backgroundColor: '#ed6c02', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                  <CloudUpload />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#ed6c02' }}>
                  {demoData.documents.filter(d => d.status === 'Expiring Soon').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expiring Soon
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
                <Avatar sx={{ backgroundColor: '#d32f2f', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                  <Description />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#d32f2f' }}>
                  {demoData.documents.filter(d => d.status === 'Expired').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expired
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Document Categories */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Tabs 
            value={selectedTab} 
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {documentCategories.map((category, index) => (
              <Tab 
                key={index}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {category.label}
                    <Chip label={category.count} size="small" />
                  </Box>
                }
              />
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            {documentCategories[selectedTab].label}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Document</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Upload Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Expiry Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredDocuments().map((document, index) => (
                  <motion.tr
                    key={document.id}
                    component={TableRow}
                    hover
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {getFileIcon(document.type)}
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {document.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {document.size}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={document.type} 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{document.category}</TableCell>
                    <TableCell>{document.clientName}</TableCell>
                    <TableCell>{new Date(document.uploadDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {document.expiryDate ? (
                        <Typography 
                          variant="body2" 
                          color={new Date(document.expiryDate) < new Date() ? 'error' : 'text.primary'}
                        >
                          {new Date(document.expiryDate).toLocaleDateString()}
                        </Typography>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={document.status} 
                        color={getStatusColor(document.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <Visibility />
                        </IconButton>
                        <IconButton size="small" color="success">
                          <Download />
                        </IconButton>
                        <IconButton size="small" color="secondary">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
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

      {/* Upload Document Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Upload New Document</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.05)'
                  }
                }}
              >
                <CloudUpload sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Drop files here or click to browse
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG, MP4
                </Typography>
              </Box>
            </Grid>
            
            {uploading && (
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Uploading... {uploadProgress}%
                  </Typography>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                </Box>
              </Grid>
            )}
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Document Name"
                placeholder="Enter document name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="Medical">Medical Records</MenuItem>
                  <MenuItem value="ISP">ISP Documents</MenuItem>
                  <MenuItem value="Training">Training Certificates</MenuItem>
                  <MenuItem value="Legal">Legal Documents</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
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
                label="Expiry Date (Optional)"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Add any additional notes or description..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={uploading}>
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleUpload}
            disabled={uploading}
            startIcon={<CloudUpload />}
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Documents;