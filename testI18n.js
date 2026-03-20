/* eslint-disable no-console */
// eslint-disable-next-line import/extensions
import i18n from './i18n.js';

console.log('i18next Translation Engine Test\n');

// Test 1: Default Language (English)
console.log('--- Testing Default Language (English) ---');
console.log(`Key 'welcome_message': ${i18n.t('welcome_message')}`);
console.log(`Key 'settings': ${i18n.t('settings')}\n`);

// Test 2: Switch to Spanish
console.log("--- Switching to Spanish ('es') ---");
i18n.changeLanguage('es');
console.log(`Key 'welcome_message': ${i18n.t('welcome_message')}`);
console.log(`Key 'settings': ${i18n.t('settings')}\n`);

// Test 3: Fallback Language Test
console.log('--- Testing Fallback (Missing Spanish Translation) ---');
// Let's pretend we asked for a key that doesn't exist anywhere
console.log(`Missing key output: ${i18n.t('missing_key')}`);
