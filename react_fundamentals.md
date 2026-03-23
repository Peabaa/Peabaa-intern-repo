# Refelction

## Issue #26 Navigation with React Router

### **Home.jsx**

```jsx
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
```

### **Profile.jsx**

```jsx
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
```

### **App.jsx**

```jsx
/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n'; // Import the configuration file
import RegistrationForm from './RegistrationForm.jsx'; // Kept your existing import
import Home from './Home.jsx'; // Import the new Home page
import Profile from './Profile.jsx'; // Import the new Profile page

export default function App() {
  // Use the hook to get the 't' (translate) function and the 'i18n' instance
  const { t, i18n } = useTranslation();

  // Helper function to easily swap languages
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    // BrowserRouter must wrap everything that needs routing
    <BrowserRouter>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {/* We can keep your translated title at the top of every page! */}
        <h1>{t('welcome_message')}</h1>

        {/* The Routes component handles swapping out the page content based on the URL */}
        <div
          style={{
            padding: '20px',
            border: '1px dashed #ccc',
            margin: '20px 0',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* --- GLOBAL FOOTER --- */}
        <hr style={{ margin: '20px 0' }} />

        <div>
          <p>Change Language:</p>
          <button
            type="button"
            onClick={() => changeLanguage('en')}
            style={{ marginRight: '10px' }}
          >
            English
          </button>
          <button type="button" onClick={() => changeLanguage('es')}>
            Español
          </button>
        </div>
      </div>
    </BrowserRouter>
  );
}
```

### What are the advantages of client-side routing?

- **Faster Navigation and Performance:** Because the browser doesn't have to contact the server to download a completely new HTML page every time you click a link, navigating between pages is virtually instantaneous. The application only swaps out the specific UI components that need to change.

- **Seamless User Experience (No Page Reloads):** Client-side routing eliminates the "white flash" or screen flicker that normally happens when a web page refreshes. This makes web applications feel smooth, responsive, and fast, much like a native mobile app. This is the core feature of a Single Page Application (SPA).

- **State Preservation:** When you navigate using client-side routing, the JavaScript application remains running in the background. This means any active state, like a partially filled-out form, an open chat window, or a playing audio track, is completely preserved when you click a link to view another component. A traditional server-side route change would wipe all of that data out.

- **Reduced Server Load:** Instead of the server having to process and build a full HTML document for every single click, it only has to send the initial bundle of code once. After that, the server only needs to send lightweight raw data (like JSON from an API) when requested, saving bandwidth and processing power.
