import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, Typography
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ClassIcon from '@mui/icons-material/Class';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 260, boxSizing: 'border-box' }
      }}
    >
      <Toolbar />
      <br />
      <List>
        <Typography variant="subtitle2" sx={{ px: 2, color: 'gray' }}>
          General
        </Typography>

        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ color: 'black' }}><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: 'black' }} />
        </ListItem>

        <ListItem button component={Link} to="/login">
          <ListItemIcon sx={{ color: 'black' }}><PersonSearchIcon /></ListItemIcon>
          <ListItemText primary="Login" sx={{ color: 'black' }} />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <List>
        <Typography variant="subtitle2" sx={{ px: 2, color: 'gray' }}>
          Módulo de Asistencia
        </Typography>

        <ListItem button component={Link} to="/registro">
          <ListItemIcon sx={{ color: 'black' }}><EventAvailableIcon /></ListItemIcon>
          <ListItemText primary="Registro de Asistencias" sx={{ color: 'black' }} />
        </ListItem>

        <ListItem button component={Link} to="/registro">
          <ListItemIcon sx={{ color: 'black' }}><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Registro de Clases" sx={{ color: 'black' }} />
        </ListItem>

        <ListItem button component={Link} to="/crear-clases">
          <ListItemIcon sx={{ color: 'black' }}><ClassIcon /></ListItemIcon>
          <ListItemText primary="Crear Clases" sx={{ color: 'black' }} />
        </ListItem>

      </List>
    </Drawer>
  );
};

export default Sidebar;
