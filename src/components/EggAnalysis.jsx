import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

function createData(
  eggId,
  qualityStatus,
  healthStatus,
  contaminationStatus,
  spectralAnalysis,
  parentChickenId,
  weight,
  size,
) {
  return { eggId, qualityStatus, healthStatus, contaminationStatus, spectralAnalysis, parentChickenId, weight, size };
}

const rows = [
  createData('001', 'Pass', 'Healthy', 'Clear', 'Normal', 'CHKN-001', 65, 'Large'),
  createData('002', 'Fail', 'Unhealthy', 'Contaminated', 'Anomaly Detected', 'CHKN-002', 58, 'Medium'),
  createData('003', 'Pass', 'Healthy', 'Clear', 'Normal', 'CHKN-003', 70, 'Large'),
  createData('004', 'Fail', 'Unhealthy', 'Clear', 'Anomaly Detected', 'CHKN-004', 50, 'Small'),
  createData('005', 'Pass', 'Healthy', 'Clear', 'Normal', 'CHKN-005', 68, 'Large'),
  createData('006', 'Pass', 'Healthy', 'Clear', 'Normal', 'CHKN-006', 66, 'Large'),
  createData('007', 'Fail', 'Unhealthy', 'Contaminated', 'Anomaly Detected', 'CHKN-007', 55, 'Medium'),
  createData('008', 'Pass', 'Healthy', 'Clear', 'Normal', 'CHKN-008', 72, 'Large'),
  createData('009', 'Fail', 'Unhealthy', 'Clear', 'Anomaly Detected', 'CHKN-009', 48, 'Small'),
  createData('010', 'Pass', 'Healthy', 'Clear', 'Normal', 'CHKN-010', 69, 'Large'),
  createData('011', 'Pass', 'Healthy', 'Clear', 'Normal', 'CHKN-011', 67, 'Large'),
  createData('012', 'Fail', 'Unhealthy', 'Contaminated', 'Anomaly Detected', 'CHKN-012', 60, 'Medium'),
  createData('013', 'Pass', 'Healthy', 'Clear', 'Normal', 'CHKN-013', 71, 'Large'),
  createData('014', 'Fail', 'Unhealthy', 'Clear', 'Anomaly Detected', 'CHKN-014', 52, 'Small'),
  createData('015', 'Pass', 'Healthy', 'Clear', 'Normal', 'CHKN-015', 68, 'Large'),
];

export default function EggAnalysis() {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleDownloadReport = () => {
    const reportData = rows.map(row => ({
      EggID: row.eggId,
      QualityStatus: row.qualityStatus,
      HealthStatus: row.healthStatus,
      ContaminationStatus: row.contaminationStatus,
      SpectralAnalysisResult: row.spectralAnalysis,
      ParentChickenID: row.parentChickenId,
      Weight: row.weight,
      Size: row.size,
    }));

    const csvContent = "data:text/csv;charset=utf-8," +
      Object.keys(reportData[0]).join(",") + "\n" +
      reportData.map(e => Object.values(e).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "egg_analysis_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <StyledButton onClick={handleBackToDashboard}>
        Back to Dashboard
      </StyledButton>
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 600, maxWidth: 800, margin: '0 auto' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Egg ID</StyledTableCell>
              <StyledTableCell align="right">Quality Status</StyledTableCell>
              <StyledTableCell align="right">Health Status</StyledTableCell>
              <StyledTableCell align="right">Contamination Status</StyledTableCell>
              <StyledTableCell align="right">Spectral Analysis Result</StyledTableCell>
              <StyledTableCell align="right">Parent Chicken ID</StyledTableCell>
              <StyledTableCell align="right">Weight (g)</StyledTableCell>
              <StyledTableCell align="right">Size</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.eggId}>
                <StyledTableCell component="th" scope="row">
                  {row.eggId}
                </StyledTableCell>
                <StyledTableCell align="right">{row.qualityStatus}</StyledTableCell>
                <StyledTableCell align="right">{row.healthStatus}</StyledTableCell>
                <StyledTableCell align="right">{row.contaminationStatus}</StyledTableCell>
                <StyledTableCell align="right">{row.spectralAnalysis}</StyledTableCell>
                <StyledTableCell align="right">{row.parentChickenId}</StyledTableCell>
                <StyledTableCell align="right">{row.weight}</StyledTableCell>
                <StyledTableCell align="right">{row.size}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledButton onClick={handleDownloadReport}>
        Download Report
      </StyledButton>
    </div>
  );
}