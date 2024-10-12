// Dashboard Component
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Styles.css';

export default function Dashboard() {
    return (
      <div className="dashboard">
        <header>
          <h2>System Status: Active</h2>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </header>
        <nav>
          <ul>
            <li><Link to="/dashboard">Overview</Link></li>
            <li><Link to="/egg-analysis">Egg Analysis</Link></li>
            <li><Link to="/eggAI">AI</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </nav>
        <div className="real-time-monitoring">
          <div className="live-feed">
            <h3>Live Feed</h3>
            {/* Placeholder for video stream of eggs */}
            <div className="video-stream">[Video Stream Here]</div>
          </div>
          <div className="spectral-imaging-feed">
            <h3>Spectral Imaging Feed</h3>
            {/* Placeholder for spectral imaging scan */}
            <div className="spectral-scan">[Spectral Imaging Scan Here]</div>
          </div>
         
        </div>
      </div>
    );
  }
  