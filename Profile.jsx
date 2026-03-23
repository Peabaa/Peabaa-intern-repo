/* eslint-disable no-unused-vars */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', border: '2px solid green', margin: '20px' }}>
      <h2>👤 Profile Page</h2>
      <p>This is your personal user profile.</p>

      <Link to="/" style={{ display: 'block', marginBottom: '10px' }}>
        Back to Home (using Link)
      </Link>

      <button type="button" onClick={() => navigate('/')}>
        Back to Home (using useNavigate)
      </button>
    </div>
  );
}
