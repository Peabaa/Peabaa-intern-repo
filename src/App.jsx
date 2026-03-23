/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n'; // Import the configuration file
import RegistrationForm from './RegistrationForm.jsx'; // Kept your existing import
import Home from './Home.jsx'; // Import the new Home page
import Profile from './Profile.jsx'; // Import the new Profile page
import Counter from './Counter.jsx'; // Import the Counter component
import HelloWorld from './HelloWorld.jsx';

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
            <Route path="/counter" element={<Counter />} />
            <Route path="/hello" element={<HelloWorld name="Focus Bear" />} />
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
