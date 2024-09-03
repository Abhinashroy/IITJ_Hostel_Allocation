import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Header';
import Home from './pages/Home';
import Hostels from './pages/Hostels';
import RoomGrid from './pages/RoomGrid';
import AllocateRoom from './pages/AllocateRoom';
import Students from './pages/Students';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/hostels/:id" element={<RoomGrid />} />
        <Route path="/allocate-room" element={<AllocateRoom />} />
        <Route path="/students" element={<Students />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
