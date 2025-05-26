import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Paper, Typography, TextField, Button, Grid, Table, TableBody,
  TableCell, TableHead, TableRow
} from '@mui/material';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://registroclases-h0f5bjdgevhhcgh0.canadacentral-01.azurewebsites.net',
});

const RegisterClass = () => {
  const [idClase, setIdClase] = useState('');
  const [clases, setClases] = useState([]);
  const [ultimaClase, setUltimaClase] = useState(null);
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const inputStyle = {
    '& label.Mui-focused': { color: '#910000' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'black' },
      '&:hover fieldset': { borderColor: '#910000' },
      '&.Mui-focused fieldset': { borderColor: '#910000' }
    }
  };

  // Obtener inscripciones del usuario
  const fetchInscripciones = async () => {
    if (!userId) return alert('Ingresa un ID de usuario para buscar inscripciones');
    try {
      const res = await api.get('/enrollments', { params: { userId } });
      setClases(res.data);
    } catch (e) {
      console.error(e);
      alert('Error al obtener clases inscritas');
    }
  };

  // Inscribirme a la clase (Enrollment)
  const handleAdd = async () => {
    if (!idClase || !userId || !userEmail || !userName) {
      return alert('Debes ingresar el nombre de la clase, usuario, nombre y correo');
    }
    try {
      const resp = await api.post('/enrollments', null, {
        params: { className: idClase, userId, userEmail, userName }
      });
      const nueva = resp.data;
      setUltimaClase(nueva);
      setIdClase('');
      alert(`Inscripción exitosa a la clase ${nueva.classId}`);
      fetchInscripciones();
    } catch (e) {
      console.error(e);
      alert('Error al inscribirse: ' + (e.response?.data?.message || e.message));
    }
  };

  // Confirmar asistencia
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

  const handleEliminarAsistencia = () => {
    alert(`Asistencia eliminada de ${ultimaClase.classId}`);
    setUserId('');
    setUserEmail('');
    setUserName('');
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
              label="Nombre de la Clase"
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
              label="Nombre de Usuario"
              value={userName}
              onChange={e => setUserName(e.target.value)}
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

        {/* Tabla de inscripciones reales */}
        <Grid item xs={12}>
          <Paper elevation={4} sx={estiloPaper}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Clases Inscritas
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre de la Clase</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clases.map((c) => (
                  <TableRow key={`${c.className}-${c.userId}`}>
                    <TableCell>{c.classId}</TableCell>
                    <TableCell>{c.userId}</TableCell>
                    <TableCell>{c.userName}</TableCell>
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
