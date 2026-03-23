import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Create translations for English and Spanish
const resources = {
  en: {
    translation: {
      welcome_message: 'Welcome to your Focus Bear Dashboard!',
      start_focus_session: 'Start Focus Session',
      settings: 'Settings',
    },
  },
  es: {
    translation: {
      welcome_message: '¡Bienvenido a tu panel de Focus Bear!',
      start_focus_session: 'Iniciar Sesión de Enfoque',
      settings: 'Ajustes',
    },
  },
};

i18n
  .use(initReactI18next) // Passes the i18n instance to the react-i18next binding
  .init({
    resources,
    lng: 'en', // Set the default starting language
    fallbackLng: 'en', // If a Spanish translation is missing, default back to English
    interpolation: {
      escapeValue: false, // React already safely escapes values to prevent XSS attacks
    },
  });

export default i18n;
