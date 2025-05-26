import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Grid, Chip, Stack
} from '@mui/material';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://registroclases-h0f5bjdgevhhcgh0.canadacentral-01.azurewebsites.net',
});

const CreateClass = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: '',
    startTime: '',
    endTime: '',
    maxCapacity: '',
    location: '',
    resources: [],
    resourceInput: '',
    creatorId: '',
    creatorEmail: '',
    creatorName: ''
  });

  const [classNameToDelete, setClassNameToDelete] = useState('');

  const inputStyle = {
    '& label.Mui-focused': { color: '#910000' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'black' },
      '&:hover fieldset': { borderColor: '#910000' },
      '&.Mui-focused fieldset': { borderColor: '#910000' }
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRemoveResource = (index) => {
    const updated = [...formData.resources];
    updated.splice(index, 1);
    setFormData({ ...formData, resources: updated });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = { ...formData };
      delete dataToSend.resourceInput;
      dataToSend.maxCapacity = parseInt(dataToSend.maxCapacity, 10) || 0;

      const res = await api.post('/classes', dataToSend);
      alert('Clase creada correctamente: ' + res.data.id);

      setFormData({
        name: '',
        type: '',
        date: '',
        startTime: '',
        endTime: '',
        maxCapacity: '',
        location: '',
        resources: [],
        resourceInput: '',
        creatorId: '',
        creatorEmail: '',
        creatorName: ''
      });
    } catch (e) {
      console.error(e);
      alert('Error al crear la clase');
    }
  };

  const handleDeleteClass = async () => {
    if (!classNameToDelete) return alert('Ingresa el nombre de la clase a eliminar');
    try {
      await api.delete(`/classes/del-by-name/${classNameToDelete}`);
      alert(`Clase "${classNameToDelete}" eliminada correctamente`);
      setClassNameToDelete('');
    } catch (e) {
      console.error(e);
      alert('Error al eliminar la clase');
    }
  };

  const estiloPaper = { p: 3, borderRadius: 3, width: '100%' };

  return (
    <Box p={3} sx={{ width: '90%' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#910000', mb: 2 }}>
        Crear Clase
      </Typography>

      <Paper elevation={4} sx={estiloPaper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Nombre de la Clase" fullWidth value={formData.name}
              onChange={e => handleChange('name', e.target.value)} sx={inputStyle} margin="normal" />
            <TextField label="Tipo de Clase" fullWidth value={formData.type}
              onChange={e => handleChange('type', e.target.value)} sx={inputStyle} margin="normal" />
            <TextField label="Fecha" type="date" fullWidth value={formData.date}
              onChange={e => handleChange('date', e.target.value)} sx={inputStyle} margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField label="Hora de Inicio" type="time" fullWidth value={formData.startTime}
              onChange={e => handleChange('startTime', e.target.value)} sx={inputStyle} margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField label="Hora de Fin" type="time" fullWidth value={formData.endTime}
              onChange={e => handleChange('endTime', e.target.value)} sx={inputStyle} margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField label="Capacidad Máxima" type="number" fullWidth value={formData.maxCapacity}
              onChange={e => handleChange('maxCapacity', e.target.value)} sx={inputStyle} margin="normal" />
            <TextField label="Ubicación" fullWidth value={formData.location}
              onChange={e => handleChange('location', e.target.value)} sx={inputStyle} margin="normal" />
            <TextField
              label="Recursos (separados por comas)"
              fullWidth
              value={formData.resourceInput}
              onChange={(e) => {
                const input = e.target.value;
                if (input.endsWith(',')) {
                  const nuevo = input.slice(0, -1).trim();
                  if (nuevo.length > 0 && !formData.resources.includes(nuevo)) {
                    setFormData({
                      ...formData,
                      resources: [...formData.resources, nuevo],
                      resourceInput: ''
                    });
                  }
                } else {
                  setFormData({ ...formData, resourceInput: input });
                }
              }}
              sx={inputStyle}
              margin="normal"
            />
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {formData.resources.map((r, i) => (
                <Chip key={i} label={r} onDelete={() => handleRemoveResource(i)} color="primary" />
              ))}
            </Stack>
            <TextField label="ID del Creador" fullWidth value={formData.creatorId}
              onChange={e => handleChange('creatorId', e.target.value)} sx={inputStyle} margin="normal" />
            <TextField label="Nombre del Creador" fullWidth value={formData.creatorName}
              onChange={e => handleChange('creatorName', e.target.value)} sx={inputStyle} margin="normal" />
            <TextField label="Correo del Creador" fullWidth value={formData.creatorEmail}
              onChange={e => handleChange('creatorEmail', e.target.value)} sx={inputStyle} margin="normal" />
          </Grid>

          {/* Botón dentro del Grid */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#910000', mt: 2 }}
              onClick={handleSubmit}
            >
              Crear Clase
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Sección para eliminar clase */}
      <Box mt={3}>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ color: '#910000', fontWeight: 'bold', mb: 1 }}>
            Eliminar Clase
          </Typography>
          <TextField
            label="Nombre de la Clase"
            value={classNameToDelete}
            onChange={e => setClassNameToDelete(e.target.value)}
            fullWidth
            sx={inputStyle}
            margin="normal"
          />
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleDeleteClass}
          >
            Eliminar Clase
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreateClass;
