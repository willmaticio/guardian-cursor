import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Frameworks from './pages/Frameworks';
import Monitors from './pages/Monitors';
import Audits from './pages/Audits';
import Evidence from './pages/Evidence';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';
import Help from './pages/Help';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="frameworks" element={<Frameworks />} />
          <Route path="monitors" element={<Monitors />} />
          <Route path="audits" element={<Audits />} />
          <Route path="evidence" element={<Evidence />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
