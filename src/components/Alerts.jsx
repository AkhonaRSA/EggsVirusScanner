
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './Styles.css';

export default function Alerts() {
    return (
      <div className="alerts">
        <h3>Alerts and Notifications</h3>
        <ul>
          <li className="alert-item alert-warning">Temperature Alert: Egg batch 005 - Temperature exceeded threshold</li>
          <li className="alert-item alert-danger">Crack Detected: Egg 002 - Crack found during inspection</li>
          <li className="alert-item alert-danger">Spectral Contamination Alert: Egg 003 - Possible contamination detected</li>
        </ul>
      </div>
    );
  }
  