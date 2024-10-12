import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '15px',
  marginBottom: '20px',
  fontSize: '18px',
  backgroundColor: '#4caf50',
  color: 'white',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  margin: '20px auto',
  maxWidth: '800px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
}));

export default function Reports() {
  const navigate = useNavigate();

  const handleDownloadReport = () => {
    const reportData = [
      { batch: 'Batch 001', details: 'Percentage Defective: 5%' },
      { batch: 'Batch 002', details: 'Percentage Defective: 10%' },
      { batch: 'Batch 003', details: 'Common Defect Types: Cracks, Contamination' },
      { batch: 'Batch 004', details: 'Percentage Defective: 7%, Common Defect Types: Cracks' },
      { batch: 'Batch 005', details: 'Percentage Defective: 12%, Common Defect Types: Contamination' },
      { batch: 'Batch 006', details: 'Percentage Defective: 8%, Common Defect Types: Size Variability' },
      { batch: 'Batch 007', details: 'Percentage Defective: 4%, Common Defect Types: Surface Cracks' },
    ];

    const csvContent = "data:text/csv;charset=utf-8," +
      reportData.map(e => `${e.batch},${e.details}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "batch_quality_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <StyledButton onClick={handleBackToDashboard}>Back to Dashboard</StyledButton>
      <StyledPaper>
        <h3 style={{ textAlign: 'center', color: '#333' }}>Batch Quality Reports</h3>
        <List>
          <ListItem>
            <ListItemText primary="Batch 001" secondary="Percentage Defective: 5%" />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary="Batch 002" secondary="Percentage Defective: 10%" />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary="Batch 003" secondary="Common Defect Types: Cracks, Contamination" />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary="Batch 004" secondary="Percentage Defective: 7%, Common Defect Types: Cracks" />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary="Batch 005" secondary="Percentage Defective: 12%, Common Defect Types: Contamination" />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary="Batch 006" secondary="Percentage Defective: 8%, Common Defect Types: Size Variability" />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary="Batch 007" secondary="Percentage Defective: 4%, Common Defect Types: Surface Cracks" />
          </ListItem>
        </List>
        <StyledButton onClick={handleDownloadReport}>Download Report</StyledButton>
      </StyledPaper>
    </div>
  );
}