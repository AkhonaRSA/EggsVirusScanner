import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './Styles.css';

// Landing Page Component
export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Egg Quality Monitor</h1>
      <h2>Automated Contamination and Defect Detection System Using IoT, AI, & Spectral Imaging</h2>
      <Link to="/dashboard">
        <button className="get-started-btn">Get Started</button>
      </Link>
    </div>
  );
}