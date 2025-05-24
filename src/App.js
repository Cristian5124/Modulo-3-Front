import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Dashboard from './Dashboard';
import RegisterClass from './RegisterClass';

function App() {
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
}

export default App;
