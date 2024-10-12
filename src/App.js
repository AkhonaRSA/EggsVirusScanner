import logo from './logo.svg';
import { BrowserRouter as Router,Routes, Route, Switch, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import EggAnalysis from './components/EggAnalysis';
import Alerts from './components/EggAI';
import Reports from './components/Reports';
import Settings from './components/Settings';
import EggAI from './components/EggAI';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/egg-analysis" element={<EggAnalysis />} />
          <Route path="/eggAI" element={<EggAI/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
