import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Paper, Typography, TextField, Button, Grid, Table, TableBody,
  TableCell, TableHead, TableRow
} from '@mui/material';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://registroclases-h0f5bjdgevhhcgh0.canadacentral-01.azurewebsites.net'
});

const RegisterClass = () => {
  const [idClase, setIdClase] = useState('');
  const [clases, setClases] = useState([]);             // Clases en las que estoy inscrito
  const [ultimaClase, setUltimaClase] = useState(null); // Clase seleccionada para confirmar asistencia
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Al montar, opcionalmente podrías cargar las clases disponibles
  // api.get('/classes').then(r => setDisponibles(r.data))

  const inputStyle = {
    '& label.Mui-focused': { color: '#910000' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'black' },
      '&:hover fieldset': { borderColor: '#910000' },
      '&.Mui-focused fieldset': { borderColor: '#910000' }
    }
  };

  // Inscribirme a la clase (Enrollment)
  const handleAdd = async () => {
    if (!idClase || !userId || !userEmail) {
      return alert('Debes ingresar ID de clase, usuario y correo');
    }
    try {
      const resp = await api.post(`/enrollments`, null, {
        params: { classId: idClase, userId, userEmail }
      });
      const nueva = resp.data;
      setClases([...clases, nueva]);
      setUltimaClase(nueva);
      setIdClase('');
      alert(`Inscripción exitosa a la clase ${nueva.classId}`);
    } catch (e) {
      console.error(e);
      alert('Error al inscribirse: ' + e.response?.data?.message || e.message);
    }
  };

  // Eliminar inscripción (solo local, no hay DELETE en el API)
  const handleDelete = () => {
    setClases(clases.filter(c => c.classId !== idClase));
    if (ultimaClase?.classId === idClase) {
      setUltimaClase(null);
      setUserId('');
      setUserEmail('');
    }
    setIdClase('');
  };

  // Confirmar asistencia (Attendance)
  const handleConfirmarAsistencia = async () => {
    if (!ultimaClase) return;
    try {
      const payload = {
        classId: ultimaClase.classId,
        userId,
        present: true
      };
      const resp = await api.post('/attendances', payload);
      alert(`Asistencia registrada: ${resp.data.id}`);
    } catch (e) {
      console.error(e);
      alert('Error al registrar asistencia');
    }
  };

  // Eliminar asistencia (solo local, no hay DELETE en el API)
  const handleEliminarAsistencia = () => {
    alert(`Asistencia eliminada de ${ultimaClase.classId}`);
    setUserId('');
    setUserEmail('');
    setUltimaClase(null);
  };

  const estiloPaper = { p: 3, borderRadius: 3, width: '100%' };

  return (
    <Box p={3} sx={{ width: '90%' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#910000' }}>
        Registro de Clases
      </Typography>

      <Grid container spacing={2} mt={2}>
        {/* Ingresar datos de inscripción */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={estiloPaper}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Inscribirme a una Clase
            </Typography>
            <TextField
              label="ID de la Clase"
              value={idClase}
              onChange={e => setIdClase(e.target.value)}
              fullWidth sx={inputStyle} margin="normal"
            />
            <TextField
              label="ID de Usuario"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              fullWidth sx={inputStyle} margin="normal"
            />
            <TextField
              label="Correo de Usuario"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              fullWidth sx={inputStyle} margin="normal"
            />
            <Button variant="contained" fullWidth sx={{ backgroundColor: '#910000', mt: 2 }}
              onClick={handleAdd}>
              Inscribir Clase
            </Button>
            <Button variant="outlined" fullWidth sx={{ borderColor: '#910000', color: '#910000', mt: 1 }}
              onClick={handleDelete}>
              Eliminar Inscripción
            </Button>
          </Paper>
        </Grid>

        {/* Confirmar / Eliminar asistencia */}
        {ultimaClase && (
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={estiloPaper}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
                Confirmar Asistencia ({ultimaClase.classId})
              </Typography>
              <Button variant="contained" fullWidth sx={{ backgroundColor: '#910000' }}
                onClick={handleConfirmarAsistencia}>
                Confirmar Asistencia
              </Button>
              <Button variant="outlined" fullWidth sx={{ borderColor: '#910000', color: '#910000', mt: 1 }}
                onClick={handleEliminarAsistencia}>
                Eliminar Asistencia
              </Button>
            </Paper>
          </Grid>
        )}

        {/* Tabla de inscripciones locales */}
        <Grid item xs={12}>
          <Paper elevation={4} sx={estiloPaper}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Mis Inscripciones
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Clase ID</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clases.map((c) => (
                  <TableRow key={`${c.classId}-${c.userId}`}>
                    <TableCell>{c.classId}</TableCell>
                    <TableCell>{c.userId}</TableCell>
                    <TableCell>{c.userEmail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterClass;
