import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Grid, Table, TableBody,
  TableCell, TableHead, TableRow
} from '@mui/material';

const RegisterClass = () => {
  const [idClase, setIdClase] = useState('');
  const [clases, setClases] = useState([]);
  const [ultimaClase, setUltimaClase] = useState(null);
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const clasesDisponibles = {
    1: {
      _id: '1',
      name: 'Programación',
      type: 'Tecnología',
      date: '2025-05-19',
      timeSlot: '08:00 - 10:00',
      maxCapacity: 30,
      currentAttendance: 10,
      resources: ['Proyector', 'Pizarra'],
      location: 'Sala 101',
      classDateTime: '2025-05-19T08:00:00'
    },
    2: {
      _id: '2',
      name: 'Física',
      type: 'Ciencia',
      date: '2025-05-20',
      timeSlot: '10:00 - 12:00',
      maxCapacity: 25,
      currentAttendance: 0,
      resources: ['Laboratorio'],
      location: 'Sala 102',
      classDateTime: '2025-05-20T10:00:00'
    },
    3: {
      _id: '3',
      name: 'Matemáticas',
      type: 'Ciencia',
      date: '2025-05-21',
      timeSlot: '08:00 - 10:00',
      maxCapacity: 20,
      currentAttendance: 20,
      resources: ['Pizarra'],
      location: 'Sala 103',
      classDateTime: '2025-05-21T08:00:00'
    }
  };

  const inputStyle = {
    '& label.Mui-focused': { color: '#910000' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'black' },
      '&:hover fieldset': { borderColor: '#910000' },
      '&.Mui-focused fieldset': { borderColor: '#910000' }
    }
  };

  const handleAdd = () => {
    const nuevaClase = clasesDisponibles[idClase];
    if (nuevaClase) {
      if (clases.find(c => c._id === nuevaClase._id)) {
        alert('Ya estás registrado en esta clase.');
        return;
      }
      setClases([...clases, nuevaClase]);
      setUltimaClase(nuevaClase);
      setIdClase('');
    } else {
      alert('ID de clase no encontrado.');
    }
  };

  const handleDelete = () => {
    const claseAEliminar = clases.find(c => c._id === idClase);
    if (claseAEliminar) {
      setClases(clases.filter(c => c._id !== idClase));
      if (ultimaClase && ultimaClase._id === idClase) {
        setUltimaClase(null);
        setUserId('');
        setUserEmail('');
        alert('Clase y asistencia eliminadas.');
      } else {
        alert('Clase eliminada.');
      }
      setIdClase('');
    } else {
      alert('No estás inscrito en esta clase.');
    }
  };

  const handleConfirmarAsistencia = () => {
    const payload = {
      classId: ultimaClase?._id,
      userId,
      userEmail
    };
    console.log("Datos enviados:", payload);
    alert(`Asistencia confirmada a ${ultimaClase?.name}.`);
  };

  const handleEliminarAsistencia = () => {
    alert(`Asistencia eliminada de ${ultimaClase?.name}.`);
    setUserId('');
    setUserEmail('');
    setUltimaClase(null);
  };

  const estiloPaper = { p: 3, borderRadius: 3, width: '100%' };

  return (
    <Box p={3} sx={{ width: '90%' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#910000' }}>
        Registro de Clases
        <br /><br />
      </Typography>

      <Grid>
        <Grid item xs={12}>
          <Paper elevation={4} sx={estiloPaper}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Ingresar ID de Clase
            </Typography>
            <TextField
              label="ID de la Clase"
              value={idClase}
              onChange={e => setIdClase(e.target.value)}
              fullWidth
              sx={inputStyle}
            />
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#910000' }}
                  onClick={handleAdd}
                >
                  Registrar Clase
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: '#910000',
                    color: '#910000',
                    '&:hover': {
                      borderColor: '#910000',
                      backgroundColor: '#fceaea'
                    }
                  }}
                  onClick={handleDelete}
                >
                  Eliminar Clase
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Paper elevation={4} sx={estiloPaper}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Mis Clases
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Nombre</b></TableCell>
                  <TableCell><b>Tipo</b></TableCell>
                  <TableCell><b>Fecha</b></TableCell>
                  <TableCell><b>Hora</b></TableCell>
                  <TableCell><b>Capacidad</b></TableCell>
                  <TableCell><b>Asistentes</b></TableCell>
                  <TableCell><b>Recursos</b></TableCell>
                  <TableCell><b>Ubicación</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clases.map((clase) => (
                  <TableRow key={clase._id}>
                    <TableCell>{clase._id}</TableCell>
                    <TableCell>{clase.name}</TableCell>
                    <TableCell>{clase.type}</TableCell>
                    <TableCell>{clase.date}</TableCell>
                    <TableCell>{clase.timeSlot}</TableCell>
                    <TableCell>{clase.maxCapacity}</TableCell>
                    <TableCell>{clase.currentAttendance}</TableCell>
                    <TableCell>{clase.resources.join(', ')}</TableCell>
                    <TableCell>{clase.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <br />
        {ultimaClase && (
          <Grid item xs={12}>
            <Paper elevation={4} sx={estiloPaper}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
                Confirmar Asistencia
              </Typography>
              <TextField
                label="ID del Usuario"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                fullWidth
                sx={{ ...inputStyle, mb: 2 }}
              />
              <TextField
                label="Correo del Usuario"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                fullWidth
                sx={{ ...inputStyle, mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: '#910000' }}
                    onClick={handleConfirmarAsistencia}
                  >
                    Confirmar asistencia a {ultimaClase.name}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderColor: '#910000',
                      color: '#910000',
                      '&:hover': {
                        borderColor: '#910000',
                        backgroundColor: '#fceaea'
                      }
                    }}
                    onClick={handleEliminarAsistencia}
                  >
                    Eliminar asistencia de {ultimaClase.name}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default RegisterClass;
