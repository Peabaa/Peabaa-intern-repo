/* eslint-disable no-unused-vars */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', border: '2px solid blue', margin: '20px' }}>
      <h2>Home Page</h2>
      <p>Welcome to the dashboard!</p>

      {/* Navigation using a Link component (behaves like an HTML <a> tag) */}
      <Link to="/profile" style={{ display: 'block', marginBottom: '10px' }}>
        Go to Profile (using Link)
      </Link>

      {/* Navigation using a button and the useNavigate hook */}
      <button type="button" onClick={() => navigate('/profile')}>
        Go to Profile (using useNavigate)
      </button>
    </div>
  );
}
