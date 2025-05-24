import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Paper, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails, IconButton, Badge
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';

const Dashboard = () => {
  const [clases, setClases] = useState([]);

  const Bienvenido = () => (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#910000' }}>
        Bienvenido Pepito Pérez
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

  const [horario, setHorario] = useState([]);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get('https://registroclases-h0f5bjdgevhhcgh0.canadacentral-01.azurewebsites.net');
        setClases(response.data);
      } catch (error) {
        console.error('Error al obtener clases:', error);
      }
    };
    fetchClases();
  }, []);

  useEffect(() => {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const horas = [...new Set(clases.map(c => c.timeSlot?.split(' - ')[0]))].sort();

    const horarioGenerado = horas.map(hora => {
      const fila = { hora };
      dias.forEach(dia => {
        const clase = clases.find(c => {
          if (!c.classDateTime) return false;
          const dt = new Date(c.classDateTime);
          const horaClase = dt.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false });
          const diaClase = dt.toLocaleDateString('es-ES', { weekday: 'long' });
          return horaClase === hora && diaClase.toLowerCase() === dia.toLowerCase();
        });
        fila[dia.toLowerCase()] = clase ? clase.name : '';
      });
      return fila;
    });

    setHorario(horarioGenerado);
  }, [clases]);

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
              Horario de Clases
            </Typography>
            <Table sx={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ ...headerStyle, textAlign: 'center' }}>Hora</TableCell>
                  <TableCell sx={headerStyle}>Lunes</TableCell>
                  <TableCell sx={headerStyle}>Martes</TableCell>
                  <TableCell sx={headerStyle}>Miércoles</TableCell>
                  <TableCell sx={headerStyle}>Jueves</TableCell>
                  <TableCell sx={headerStyle}>Viernes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {horario.map((fila, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ ...cellStyle, fontWeight: 'bold' }}>{fila.hora}</TableCell>
                    <TableCell sx={cellStyle}>{fila.lunes}</TableCell>
                    <TableCell sx={cellStyle}>{fila.martes}</TableCell>
                    <TableCell sx={cellStyle}>{fila.miércoles}</TableCell>
                    <TableCell sx={cellStyle}>{fila.jueves}</TableCell>
                    <TableCell sx={cellStyle}>{fila.viernes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Detalle de Clases
            </Typography>
            {clases.map((clase, idx) => (
              <Accordion key={idx} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography><strong>{clase.name}</strong> - {clase.timeSlot}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography><strong>Tipo:</strong> {clase.type}</Typography>
                  <Typography><strong>Fecha:</strong> {clase.date}</Typography>
                  <Typography><strong>Franja horaria:</strong> {clase.timeSlot}</Typography>
                  <Typography><strong>Capacidad máxima:</strong> {clase.maxCapacity}</Typography>
                  <Typography><strong>Asistencia actual:</strong> {clase.currentAttendance}</Typography>
                  <Typography><strong>Ubicación:</strong> {clase.location}</Typography>
                  <Typography><strong>Recursos:</strong> {clase.resources?.join(', ')}</Typography>
                  <Typography><strong>classDateTime:</strong> {new Date(clase.classDateTime).toLocaleString()}</Typography>
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
