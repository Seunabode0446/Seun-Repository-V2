import React, { createContext, useContext, useState } from 'react';

const DemoContext = createContext();

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};

export const DemoProvider = ({ children }) => {
  // Sample data for the demo
  const [demoData] = useState({
    clients: [
      {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        dateOfBirth: '1995-03-15',
        serviceType: 'Residential',
        caseManager: 'Dr. Emily Chen',
        riskLevel: 'Low',
        status: 'Active',
        emergencyContact: {
          name: 'Mary Johnson',
          relationship: 'Mother',
          phone: '(555) 123-4567'
        },
        medications: [
          { name: 'Risperidone', dosage: '2mg', frequency: 'Twice daily' },
          { name: 'Vitamin D', dosage: '1000 IU', frequency: 'Daily' }
        ],
        ispGoals: [
          {
            id: 1,
            goal: 'Improve communication skills',
            progress: 75,
            dueDate: '2024-06-30',
            category: 'Communication'
          },
          {
            id: 2,
            goal: 'Develop independent living skills',
            progress: 60,
            dueDate: '2024-08-15',
            category: 'Living Skills'
          },
          {
            id: 3,
            goal: 'Enhance social interactions',
            progress: 85,
            dueDate: '2024-05-20',
            category: 'Social Skills'
          }
        ]
      },
      {
        id: 2,
        firstName: 'Michael',
        lastName: 'Rodriguez',
        dateOfBirth: '1988-07-22',
        serviceType: 'Day Program',
        caseManager: 'Jennifer Adams',
        riskLevel: 'Medium',
        status: 'Active',
        emergencyContact: {
          name: 'Carlos Rodriguez',
          relationship: 'Father',
          phone: '(555) 987-6543'
        },
        medications: [
          { name: 'Sertraline', dosage: '50mg', frequency: 'Daily' }
        ],
        ispGoals: [
          {
            id: 4,
            goal: 'Vocational skill development',
            progress: 68,
            dueDate: '2024-07-10',
            category: 'Vocational'
          },
          {
            id: 5,
            goal: 'Community integration',
            progress: 73,
            dueDate: '2024-09-01',
            category: 'Social Skills'
          }
        ]
      },
      {
        id: 3,
        firstName: 'Emma',
        lastName: 'Davis',
        dateOfBirth: '1992-11-08',
        serviceType: 'Supported Living',
        caseManager: 'Maria Gonzalez',
        riskLevel: 'Low',
        status: 'Active',
        emergencyContact: {
          name: 'Robert Davis',
          relationship: 'Brother',
          phone: '(555) 456-7890'
        },
        medications: [],
        ispGoals: [
          {
            id: 6,
            goal: 'Financial management skills',
            progress: 82,
            dueDate: '2024-04-30',
            category: 'Living Skills'
          }
        ]
      }
    ],
    
    notes: [
      {
        id: 1,
        clientId: 1,
        clientName: 'Sarah Johnson',
        date: '2024-01-20',
        type: 'Progress Note',
        status: 'Approved',
        author: 'Jennifer Adams',
        content: 'Client showed significant improvement in communication during group therapy session.'
      },
      {
        id: 2,
        clientId: 2,
        clientName: 'Michael Rodriguez',
        date: '2024-01-19',
        type: 'Behavioral Note',
        status: 'Pending Review',
        author: 'David Chen',
        content: 'Client demonstrated excellent cooperation during vocational training activities.'
      },
      {
        id: 3,
        clientId: 1,
        clientName: 'Sarah Johnson',
        date: '2024-01-18',
        type: 'Medical Note',
        status: 'Pending Review',
        author: 'Dr. Emily Chen',
        content: 'Medication adjustment showing positive effects on mood stability.'
      }
    ],

    incidents: [
      {
        id: 1,
        date: '2024-01-20',
        clientId: 1,
        clientName: 'Sarah Johnson',
        type: 'Behavioral',
        severity: 'Low',
        status: 'Closed',
        reportedBy: 'Jennifer Adams',
        description: 'Minor verbal outburst during group activity, quickly resolved with redirection.',
        actionsTaken: 'Provided one-on-one support and implemented calming strategies.'
      },
      {
        id: 2,
        date: '2024-01-18',
        clientId: 2,
        clientName: 'Michael Rodriguez',
        type: 'Medical',
        severity: 'Medium',
        status: 'Under Review',
        reportedBy: 'Maria Gonzalez',
        description: 'Client experienced mild allergic reaction to new food item.',
        actionsTaken: 'Administered antihistamine, contacted physician, updated dietary restrictions.'
      },
      {
        id: 3,
        date: '2024-01-15',
        clientId: 3,
        clientName: 'Emma Davis',
        type: 'Safety',
        severity: 'High',
        status: 'Under Review',
        reportedBy: 'David Chen',
        description: 'Client slipped in bathroom area due to wet floor.',
        actionsTaken: 'First aid provided, incident area secured, maintenance notified.'
      }
    ],

    documents: [
      {
        id: 1,
        clientId: 1,
        clientName: 'Sarah Johnson',
        name: 'ISP Plan 2024',
        type: 'ISP Document',
        uploadDate: '2024-01-15',
        expiryDate: '2024-12-31',
        status: 'Active',
        uploadedBy: 'Dr. Emily Chen'
      },
      {
        id: 2,
        clientId: 2,
        clientName: 'Michael Rodriguez',
        name: 'Medical Records',
        type: 'Medical Record',
        uploadDate: '2024-01-10',
        expiryDate: '2024-02-15',
        status: 'Expiring Soon',
        uploadedBy: 'Jennifer Adams'
      },
      {
        id: 3,
        clientId: 1,
        clientName: 'Sarah Johnson',
        name: 'Training Certificate',
        type: 'Training Certificate',
        uploadDate: '2024-01-05',
        expiryDate: '2024-01-30',
        status: 'Expiring Soon',
        uploadedBy: 'Maria Gonzalez'
      }
    ],

    alerts: [
      {
        id: 1,
        type: 'Missing Note',
        message: 'Progress note overdue for Sarah Johnson',
        priority: 'High',
        status: 'Open',
        assignedTo: 'Jennifer Adams',
        dueDate: '2024-01-21',
        createdDate: '2024-01-20'
      },
      {
        id: 2,
        type: 'Document Expiry',
        message: 'Medical records expiring for Michael Rodriguez',
        priority: 'Medium',
        status: 'Open',
        assignedTo: 'Dr. Emily Chen',
        dueDate: '2024-02-15',
        createdDate: '2024-01-18'
      },
      {
        id: 3,
        type: 'Training Due',
        message: 'CPR certification renewal required',
        priority: 'Medium',
        status: 'In Progress',
        assignedTo: 'Maria Gonzalez',
        dueDate: '2024-02-01',
        createdDate: '2024-01-15'
      },
      {
        id: 4,
        type: 'Incident Follow-up',
        message: 'Follow-up required for safety incident',
        priority: 'High',
        status: 'Open',
        assignedTo: 'David Chen',
        dueDate: '2024-01-22',
        createdDate: '2024-01-20'
      }
    ],

    dashboardStats: {
      totalClients: 162,
      activeStaff: 25,
      pendingNotes: 8,
      complianceRate: 94,
      openIncidents: 3,
      expiringDocs: 12
    }
  });

  // Interaction tracking
  const [interactions, setInteractions] = useState([]);

  const trackInteraction = (action, data = {}) => {
    const interaction = {
      id: Date.now(),
      action,
      data,
      timestamp: new Date().toISOString(),
      sessionId: 'demo-session'
    };
    
    setInteractions(prev => [...prev, interaction]);
    
    // Log to console for demo purposes
    console.log('Demo Interaction:', interaction);
    
    // In a real app, this would send to analytics service
    if (window.demoAnalytics) {
      window.demoAnalytics.track(action, data);
    }
  };

  // Demo helper functions
  const addNote = (noteData) => {
    trackInteraction('note-added', noteData);
    // In real app, would update state and sync with backend
  };

  const addIncident = (incidentData) => {
    trackInteraction('incident-added', incidentData);
    // In real app, would update state and sync with backend
  };

  const updateClient = (clientId, updates) => {
    trackInteraction('client-updated', { clientId, updates });
    // In real app, would update state and sync with backend
  };

  const value = {
    demoData,
    interactions,
    trackInteraction,
    addNote,
    addIncident,
    updateClient
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};