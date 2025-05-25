// src/routes/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Dashboard from '../pages/Dashboard';
import RegisterClass from '../pages/RegisterClass';

const AppRoutes = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Topbar />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/registro" element={<RegisterClass />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default AppRoutes;
