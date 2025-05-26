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
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [clases, setClases] = useState([]);

  const inputStyle = {
    '& label.Mui-focused': { color: '#910000' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'black' },
      '&:hover fieldset': { borderColor: '#910000' },
      '&.Mui-focused fieldset': { borderColor: '#910000' }
    }
  };

  const fetchClasesInscritas = async () => {
    if (!userId) return alert('Ingresa un ID de usuario');
    try {
      const clasesRes = await api.get(`/reports/class-by-user/${userId}`);
      const asistenciasRes = await api.get(`/reports/by-user/${userId}`);
      const asistencias = asistenciasRes.data;

      const clasesConEstado = clasesRes.data.map(clase => {
        const confirmada = asistencias.some(
          a => a.classId === clase.id && a.present === true
        );
        return { ...clase, asistenciaConfirmada: confirmada };
      });

      setClases(clasesConEstado);
    } catch (e) {
      console.error(e);
      alert('Error al obtener clases o asistencias');
    }
  };

  const handleAdd = async () => {
    if (!idClase || !userId || !userEmail || !userName) {
      return alert('Debes ingresar el nombre de la clase, ID, nombre y correo');
    }
    try {
      await api.post('/enrollments', null, {
        params: { className: idClase, userId, userEmail, userName }
      });
      setIdClase('');
      alert(`Inscripción exitosa a la clase ${idClase}`);
      fetchClasesInscritas();
    } catch (e) {
      console.error(e);
      alert('Error al inscribirse: ' + (e.response?.data?.message || e.message));
    }
  };

  const handleConfirmarAsistencia = async (classId) => {
    try {
      await api.post('/attendances', {
        classId,
        userId,
        present: true
      });
      setClases(prev =>
        prev.map(c => c.id === classId ? { ...c, asistenciaConfirmada: true } : c)
      );
    } catch (e) {
      console.error(e);
      alert('Error al registrar asistencia');
    }
  };

  const handleCancelarAsistencia = async (classId) => {
    try {
      await api.delete(`/attendances/${classId}/${userId}`);
      setClases(prev =>
        prev.map(c => c.id === classId ? { ...c, asistenciaConfirmada: false } : c)
      );
      alert('Asistencia cancelada correctamente');
    } catch (e) {
      console.error(e);
      alert('Error al cancelar la asistencia');
    }
  };

  const handleEliminarInscripcion = async (classId) => {
    try {
      await api.delete(`/enrollments/${classId}/${userId}`);
      setClases(prev => prev.filter(c => c.id !== classId));
      alert('Inscripción eliminada correctamente');
    } catch (e) {
      console.error(e);
      alert('Error al eliminar la inscripción');
    }
  };

  const estiloPaper = { p: 3, borderRadius: 3, width: '100%' };

  return (
    <Box p={3} sx={{ width: '90%' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#910000' }}>
        Registro de Clases
      </Typography>

      <Grid container spacing={2} mt={2}>
        {/* Formulario de inscripción */}
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
            <Button variant="text" fullWidth sx={{ mt: 1, color: '#910000' }}
              onClick={fetchClasesInscritas}>
              Ver Clases Inscritas
            </Button>
          </Paper>
        </Grid>

        {/* Tabla de clases inscritas con botones de asistencia y eliminación */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ ...estiloPaper, minHeight: '200px' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#910000' }}>
              Clases Inscritas
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Inicio</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Fin</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ubicación</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Asistencia</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤNo hay clases inscritasㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
                    </TableCell>
                  </TableRow>
                ) : (
                  clases.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell align="center">{c.name}</TableCell>
                      <TableCell align="center">{c.type}</TableCell>
                      <TableCell align="center">{c.date}</TableCell>
                      <TableCell align="center">{c.startTime}</TableCell>
                      <TableCell align="center">{c.endTime}</TableCell>
                      <TableCell align="center">{c.location}</TableCell>
                      <TableCell align="center">
                        {c.asistenciaConfirmada ? (
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ borderColor: '#910000', color: '#910000' }}
                            onClick={() => handleCancelarAsistencia(c.id)}
                          >
                            Cancelar
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ backgroundColor: '#910000' }}
                            onClick={() => handleConfirmarAsistencia(c.id)}
                          >
                            Confirmar
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="text"
                          size="small"
                          color="error"
                          onClick={() => handleEliminarInscripcion(c.id)}
                        >
                          Eliminar inscripción
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterClass;
