import logo from './logo.svg';
import { BrowserRouter as Router,Routes, Route, Switch, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import EggAnalysis from './components/EggAnalysis';
import Alerts from './components/Alerts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/egg-analysis" element={<EggAnalysis />} />
          <Route path="/alert" element={<Alerts/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
