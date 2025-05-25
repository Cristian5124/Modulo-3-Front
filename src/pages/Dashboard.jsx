import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Paper, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails, IconButton, Badge
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';

const Dashboard = () => {
  const [asistencias, setAsistencias] = useState([]);

  const Bienvenido = () => (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#910000' }}>
        Bienvenido {asistencias[0]?.userId || ''}
      </Typography>
      <IconButton sx={{
        backgroundColor: '#910000',
        borderRadius: '50%',
        '& .MuiSvgIcon-root': { color: 'white' },
        '&:hover .MuiSvgIcon-root': { color: '#910000' },
      }}>
        <Badge badgeContent={0} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Box>
  );

  useEffect(() => {
    const fetchAsistencias = async () => {
      try {
        const response = await axios.get(
          'https://registroclases-h0f5bjdgevhhcgh0.canadacentral-01.azurewebsites.net/reports/by-user/1'
        );
        setAsistencias(response.data);
      } catch (error) {
        console.error('Error al obtener asistencias:', error);
      }
    };
    fetchAsistencias();
  }, []);

  const headerStyle = {
    backgroundColor: '#910000',
    color: '#fff',
    fontWeight: 'bold'
  };

  const cellStyle = {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: '8px',
    fontSize: '14px'
  };

  return (
    <Box p={3} sx={{ width: '90%' }}>
      <Bienvenido />

      <Grid container spacing={3} direction="column">
        <Grid item>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Registro de Asistencias
            </Typography>
            <Table sx={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Clase</TableCell>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Usuario</TableCell>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Asistencia</TableCell>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Registrado el</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asistencias.map((asistencia, index) => (
                  <TableRow key={index}>
                    <TableCell sx={cellStyle}>{asistencia.classId}</TableCell>
                    <TableCell sx={cellStyle}>{asistencia.userId}</TableCell>
                    <TableCell sx={cellStyle}>{asistencia.present ? 'Sí' : 'No'}</TableCell>
                    <TableCell sx={cellStyle}>
                      {asistencia.registeredAt
                        ? new Date(asistencia.registeredAt).toLocaleString()
                        : ''}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Detalle de Asistencias
            </Typography>
            {asistencias.map((asistencia, idx) => (
              <Accordion key={idx} sx={{ mb: 1, borderRadius: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                  sx={{ backgroundColor: '#910000', color: 'white', borderRadius: 2 }}
                >
                  <Typography sx={{color: 'white' }}>
                    <b>Clase:</b> {asistencia.classId}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography><strong>Usuario ID:</strong> {asistencia.userId}</Typography>
                  <Typography><strong>Asistencia:</strong> {asistencia.present ? 'Sí' : 'No'}</Typography>
                  <Typography><strong>Registrado el:</strong> {asistencia.registeredAt
                    ? new Date(asistencia.registeredAt).toLocaleString()
                    : ''}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
