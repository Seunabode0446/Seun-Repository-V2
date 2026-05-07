import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Fade,
  Grow,
  useTheme,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import {
  Analytics as AnalyticsIcon,
  TrendingUp,
  TrendingDown,
  People,
  Assignment,
  Warning,
  CheckCircle,
  Schedule,
  Description,
  Assessment,
  Refresh,
  Download,
  FilterList,
  Insights,
  BarChart,
  PieChart,
  ShowChart,
  TableChart
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import toast from 'react-hot-toast';

import { useDemo } from '../contexts/DemoContext';

const Analytics = () => {
  const theme = useTheme();
  const { demoData, trackInteraction } = useDemo();
  const [selectedCategory, setSelectedCategory] = useState('performance');
  const [timeRange, setTimeRange] = useState('month');
  const [refreshing, setRefreshing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    trackInteraction('analytics-view');
  }, []);

  // Sample analytics data
  const performanceMetrics = [
    { month: 'Jan', clientSatisfaction: 92, staffEfficiency: 88, complianceRate: 95, incidentRate: 5 },
    { month: 'Feb', clientSatisfaction: 94, staffEfficiency: 90, complianceRate: 96, incidentRate: 4 },
    { month: 'Mar', clientSatisfaction: 91, staffEfficiency: 87, complianceRate: 94, incidentRate: 6 },
    { month: 'Apr', clientSatisfaction: 96, staffEfficiency: 92, complianceRate: 97, incidentRate: 3 },
    { month: 'May', clientSatisfaction: 95, staffEfficiency: 91, complianceRate: 96, incidentRate: 4 },
    { month: 'Jun', clientSatisfaction: 97, staffEfficiency: 94, complianceRate: 98, incidentRate: 2 }
  ];

  const departmentAnalysis = [
    { department: 'Residential', performance: 95, staff: 15, clients: 45, budget: 85 },
    { department: 'Day Program', performance: 88, staff: 12, clients: 38, budget: 92 },
    { department: 'Supported Living', performance: 92, staff: 8, clients: 22, budget: 78 },
    { department: 'Vocational', performance: 85, staff: 6, clients: 18, budget: 88 },
    { department: 'Transportation', performance: 90, staff: 4, clients: 60, budget: 95 }
  ];

  const clientOutcomes = [
    { goal: 'Communication Skills', progress: 78, clients: 45 },
    { goal: 'Independent Living', progress: 65, clients: 38 },
    { goal: 'Social Integration', progress: 82, clients: 52 },
    { goal: 'Vocational Training', progress: 71, clients: 28 },
    { goal: 'Health Management', progress: 89, clients: 60 }
  ];

  const staffAnalytics = [
    { name: 'Jennifer Adams', efficiency: 95, caseload: 8, satisfaction: 4.8 },
    { name: 'Michael Rodriguez', efficiency: 88, caseload: 7, satisfaction: 4.6 },
    { name: 'Sarah Johnson', efficiency: 92, caseload: 9, satisfaction: 4.7 },
    { name: 'David Chen', efficiency: 85, caseload: 6, satisfaction: 4.5 },
    { name: 'Maria Gonzalez', efficiency: 90, caseload: 8, satisfaction: 4.9 }
  ];

  const financialAnalysis = [
    { category: 'Personnel', amount: 450000, percentage: 65, trend: 'up' },
    { category: 'Programs', amount: 120000, percentage: 17, trend: 'stable' },
    { category: 'Facilities', amount: 80000, percentage: 12, trend: 'down' },
    { category: 'Equipment', amount: 25000, percentage: 4, trend: 'up' },
    { category: 'Other', amount: 15000, percentage: 2, trend: 'stable' }
  ];

  const incidentTrends = [
    { week: 'W1', behavioral: 3, medical: 1, safety: 2, resolved: 5 },
    { week: 'W2', behavioral: 2, medical: 2, safety: 1, resolved: 4 },
    { week: 'W3', behavioral: 4, medical: 1, safety: 3, resolved: 7 },
    { week: 'W4', behavioral: 1, medical: 0, safety: 1, resolved: 2 }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    trackInteraction('analytics-refresh');
    
    setTimeout(() => {
      setRefreshing(false);
      toast.success('Analytics data refreshed!');
    }, 1500);
  };

  const handleExport = () => {
    toast.success('Exporting analytics report...');
    trackInteraction('analytics-export', { category: selectedCategory, timeRange });
  };

  const MetricCard = ({ title, value, change, icon, color, subtitle, trend }) => (
    <Grow in timeout={1000}>
      <Card 
        sx={{ 
          height: '100%',
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          border: `1px solid ${color}20`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 25px ${color}30`
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Avatar sx={{ backgroundColor: color, width: 48, height: 48 }}>
              {icon}
            </Avatar>
            <Box sx={{ textAlign: 'right' }}>
              {trend === 'up' ? (
                <TrendingUp sx={{ fontSize: 20, color: 'success.main' }} />
              ) : trend === 'down' ? (
                <TrendingDown sx={{ fontSize: 20, color: 'error.main' }} />
              ) : null}
            </Box>
          </Box>
          
          <Typography variant="h4" sx={{ fontWeight: 700, color: color, mb: 1 }}>
            {value}
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
              <Typography 
                variant="caption" 
                sx={{ 
                  color: change > 0 ? 'success.main' : 'error.main',
                  fontWeight: 600 
                }}
              >
                {change > 0 ? '+' : ''}{change}% from last period
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grow>
  );

  const CategoryCard = ({ title, description, icon, color, isSelected, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        sx={{ 
          cursor: 'pointer',
          height: '100%',
          border: isSelected ? `2px solid ${color}` : '2px solid transparent',
          background: isSelected ? `linear-gradient(135deg, ${color}15, ${color}05)` : 'white',
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

  const renderPerformanceOverview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Performance Trends
              </Typography>
              <Chip label="Last 6 Months" size="small" variant="outlined" />
            </Box>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="clientSatisfaction" 
                  stroke="#1976d2" 
                  strokeWidth={3}
                  name="Client Satisfaction"
                />
                <Line 
                  type="monotone" 
                  dataKey="staffEfficiency" 
                  stroke="#2e7d32" 
                  strokeWidth={3}
                  name="Staff Efficiency"
                />
                <Line 
                  type="monotone" 
                  dataKey="complianceRate" 
                  stroke="#9c27b0" 
                  strokeWidth={3}
                  name="Compliance Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Department Comparison
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={departmentAnalysis}>
                <PolarGrid />
                <PolarAngleAxis dataKey="department" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Performance"
                  dataKey="performance"
                  stroke="#1976d2"
                  fill="#1976d2"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderDepartmentAnalysis = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Department Performance Metrics
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <RechartsBarChart data={departmentAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#1976d2" name="Performance Score" />
                <Bar dataKey="budget" fill="#2e7d32" name="Budget Efficiency" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Resource Allocation
            </Typography>
            <List>
              {departmentAnalysis.map((dept, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemText
                    primary={dept.department}
                    secondary={`${dept.staff} staff • ${dept.clients} clients`}
                  />
                  <Chip 
                    label={`${dept.performance}%`} 
                    color={dept.performance >= 90 ? 'success' : dept.performance >= 80 ? 'warning' : 'error'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderClientOutcomes = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Client Goal Progress
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={clientOutcomes} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="goal" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="progress" fill="#1976d2" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Outcome Details
            </Typography>
            <List>
              {clientOutcomes.map((outcome, index) => (
                <ListItem key={index} sx={{ px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {outcome.goal}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                      {outcome.progress}%
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%', mb: 1 }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: 8,
                        backgroundColor: 'grey.200',
                        borderRadius: 4,
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        sx={{
                          width: `${outcome.progress}%`,
                          height: '100%',
                          backgroundColor: outcome.progress >= 80 ? '#2e7d32' : outcome.progress >= 60 ? '#ed6c02' : '#d32f2f',
                          transition: 'width 0.3s ease'
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {outcome.clients} clients participating
                  </Typography>
                  {index < clientOutcomes.length - 1 && <Divider sx={{ width: '100%', mt: 2 }} />}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderStaffAnalytics = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Staff Performance Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={staffAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="efficiency" fill="#1976d2" name="Efficiency %" />
                <Bar dataKey="caseload" fill="#2e7d32" name="Caseload" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Staff Metrics
            </Typography>
            <List>
              {staffAnalytics.map((staff, index) => (
                <ListItem key={index} sx={{ px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {staff.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={`${staff.efficiency}%`} size="small" color="primary" />
                      <Chip label={`★${staff.satisfaction}`} size="small" color="success" />
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Caseload: {staff.caseload} clients
                  </Typography>
                  {index < staffAnalytics.length - 1 && <Divider sx={{ width: '100%', mt: 2 }} />}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderFinancialAnalysis = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Cost Breakdown
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={financialAnalysis}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="percentage"
                >
                  {financialAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#1976d2', '#2e7d32', '#ed6c02', '#9c27b0', '#d32f2f'][index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Budget Analysis
            </Typography>
            <List>
              {financialAnalysis.map((item, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {item.trend === 'up' ? (
                      <TrendingUp color="success" />
                    ) : item.trend === 'down' ? (
                      <TrendingDown color="error" />
                    ) : (
                      <TrendingUp color="disabled" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.category}
                    secondary={`$${item.amount.toLocaleString()} (${item.percentage}%)`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const categories = [
    {
      id: 'performance',
      title: 'Performance Overview',
      description: 'Key performance indicators and trends',
      icon: <TrendingUp />,
      color: '#1976d2'
    },
    {
      id: 'department',
      title: 'Department Analysis',
      description: 'Department-wise performance metrics',
      icon: <BarChart />,
      color: '#2e7d32'
    },
    {
      id: 'clients',
      title: 'Client Outcomes',
      description: 'Client progress and goal tracking',
      icon: <People />,
      color: '#9c27b0'
    },
    {
      id: 'staff',
      title: 'Staff Analytics',
      description: 'Staff performance and workload analysis',
      icon: <Assignment />,
      color: '#ed6c02'
    },
    {
      id: 'financial',
      title: 'Financial Analysis',
      description: 'Cost breakdown and budget tracking',
      icon: <PieChart />,
      color: '#d32f2f'
    }
  ];

  const renderContent = () => {
    switch (selectedCategory) {
      case 'performance':
        return renderPerformanceOverview();
      case 'department':
        return renderDepartmentAnalysis();
      case 'clients':
        return renderClientOutcomes();
      case 'staff':
        return renderStaffAnalytics();
      case 'financial':
        return renderFinancialAnalysis();
      default:
        return renderPerformanceOverview();
    }
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Analytics Dashboard 📊
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive insights and data visualization for informed decision-making.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={refreshing ? <Refresh sx={{ animation: 'spin 1s linear infinite' }} /> : <Refresh />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleExport}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <MetricCard
            title="Client Satisfaction"
            value="97%"
            change={2.3}
            icon={<People />}
            color="#1976d2"
            subtitle="Average rating"
            trend="up"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MetricCard
            title="Staff Efficiency"
            value="94%"
            change={1.8}
            icon={<Assignment />}
            color="#2e7d32"
            subtitle="Performance score"
            trend="up"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MetricCard
            title="Compliance Rate"
            value="98%"
            change={0.5}
            icon={<CheckCircle />}
            color="#9c27b0"
            subtitle="Regulatory compliance"
            trend="up"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MetricCard
            title="Incident Rate"
            value="2%"
            change={-1.2}
            icon={<Warning />}
            color="#ed6c02"
            subtitle="Monthly incidents"
            trend="down"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MetricCard
            title="Cost Efficiency"
            value="92%"
            change={3.1}
            icon={<Assessment />}
            color="#d32f2f"
            subtitle="Budget utilization"
            trend="up"
          />
        </Grid>
      </Grid>

      {/* Category Selection */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Analytics Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={2.4} key={category.id}>
                <CategoryCard
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  color={category.color}
                  isSelected={selectedCategory === category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    trackInteraction('analytics-category-change', { category: category.id });
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Analytics Content */}
      <Fade in timeout={500} key={selectedCategory}>
        <Box>
          {renderContent()}
        </Box>
      </Fade>

      {/* Add CSS for spin animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default Analytics;