/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, { useState, useMemo } from 'react';

// Helper function to generate an array of 10,000 numbers
const generateLargeArray = () => {
  const arr = [];
  for (let i = 1; i <= 10000; i += 1) {
    arr.push(i);
  }
  return arr;
};

export default function UseMemoExample() {
  const [numbers] = useState(generateLargeArray);
  const [multiplier, setMultiplier] = useState(1);
  const [theme, setTheme] = useState('light'); // use this to trigger unrelated re-renders

  // EXPENSIVE CALCULATION
  // wrap this in useMemo so it only recalculates if 'numbers' or 'multiplier' changes.
  const processedNumbers = useMemo(() => {
    console.log('Running expensive calculation...');

    // An artificial delay to simulate a very heavy calculation (like processing an image or sorting huge data)
    let slowDown = 0;
    for (let i = 0; i < 50000000; i += 1) {
      slowDown += 1;
    }

    return numbers.map((num) => num * multiplier);
  }, [numbers, multiplier]); // Dependency array

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: theme === 'light' ? '#f4f4f4' : '#222',
        color: theme === 'light' ? '#000' : '#fff',
        minHeight: '100vh',
      }}
    >
      <h2>useMemo Optimization Example</h2>

      {/* Toggling the theme forces the component to re-render. 
          Without useMemo, this button would feel laggy! */}
      <button
        type="button"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Toggle Theme (Triggers Re-render)
      </button>

      {/* Changing the multiplier actually changes the data, so it WILL trigger the calculation */}
      <button
        type="button"
        onClick={() => setMultiplier(multiplier + 1)}
        style={{ marginLeft: '10px' }}
      >
        Increase Multiplier: {multiplier}
      </button>

      <h3>First 10 Processed Results:</h3>
      <ul>
        {processedNumbers.slice(0, 10).map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
    </div>
  );
}
