import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import Dashboard from '../pages/Dashboard';
import RegisterClass from '../pages/RegisterClass';
import CreateClass from '../pages/CreateClass';

import Login from '../pages/Login';
import User from '../pages/User';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas (sin sidebar ni navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />

        {/* Rutas internas con layout */}
        <Route
          path="*"
          element={
            <Box sx={{ display: 'flex' }}>
              <Navbar />
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/registro" element={<RegisterClass />} />
                  <Route path="/crear-clases" element={<CreateClass />} />
                </Routes>
              </Box>
            </Box>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
