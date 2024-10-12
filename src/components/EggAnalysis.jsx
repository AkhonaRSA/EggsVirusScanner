
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './Styles.css';
export default function EggAnalysis() {
    return (
      <div className="egg-analysis">
        <h3>Egg Analysis Details</h3>
        <table className="egg-analysis-table">
          <thead>
            <tr>
              <th>Egg ID</th>
              <th>Quality Status</th>
              <th>Cracks Detected</th>
              <th>Contamination Status</th>
              <th>Spectral Analysis Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td className="status-pass">Pass</td>
              <td>No</td>
              <td>Clear</td>
              <td>Normal</td>
            </tr>
            <tr>
              <td>002</td>
              <td className="status-fail">Fail</td>
              <td>Yes</td>
              <td>Contaminated</td>
              <td>Anomaly Detected</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }