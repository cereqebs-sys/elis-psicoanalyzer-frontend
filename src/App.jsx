import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar as páginas
import Landing from './pages/Landing';
import Success from './pages/Success';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sessions from './pages/Sessions';
import Documents from './pages/Documents';
import SessionSummary from './pages/SessionSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/success" element={<Success />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/summary" element={<SessionSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
