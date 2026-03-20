/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n'; // Import the configuration file we just created

export default function App() {
  // Use the hook to get the 't' (translate) function and the 'i18n' instance
  const { t, i18n } = useTranslation();

  // Helper function to easily swap languages
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Pass the exact key from our i18n.js translation objects */}
      <h1>{t('welcome_message')}</h1>

      <button type="button" style={{ marginRight: '10px' }}>
        {t('start_focus_session')}
      </button>

      <button type="button">{t('settings')}</button>

      <hr style={{ margin: '20px 0' }} />

      <div>
        <p>Change Language:</p>
        <button type="button" onClick={() => changeLanguage('en')}>
          English
        </button>
        <button type="button" onClick={() => changeLanguage('es')}>
          Español
        </button>
      </div>
    </div>
  );
}
