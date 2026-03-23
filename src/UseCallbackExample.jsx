/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';

// wrap the Child in React.memo()
const ChildComponent = React.memo(({ onButtonClick }) => {
  // We put a console.log here to prove when it re-renders!
  console.log('ChildComponent rendered!');

  return (
    <div
      style={{ padding: '10px', border: '2px solid blue', marginTop: '10px' }}
    >
      <p>I am the Child Component</p>
      <button type="button" onClick={onButtonClick}>
        Increment Parent Count
      </button>
    </div>
  );
});

export default function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  console.log('ParentComponent rendered!');

  // We wrap the function in useCallback
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Empty dependency array because we use the 'prev' state updater

  return (
    <div
      style={{ padding: '20px', border: '2px solid green', maxWidth: '400px' }}
    >
      <h2>Parent Component</h2>
      <p>Count: {count}</p>

      <p>Type here to trigger a Parent re-render:</p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />

      {/* pass the memoized function to the Child */}
      <ChildComponent onButtonClick={handleIncrement} />
    </div>
  );
}
