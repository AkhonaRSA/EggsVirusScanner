
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './Styles.css';
export default function Settings() {
    return (
      <div className="settings">
        <h3>Admin Settings</h3>
        <div className="user-management">
          <h4>User Management</h4>
          <button className="add-user-btn">Add User</button>
          <button className="remove-user-btn">Remove User</button>
        </div>
        <div className="system-configuration">
          <h4>System Configuration</h4>
          <p>Adjust sensor and spectral imaging settings.</p>
        </div>
      </div>
    );
  }
  