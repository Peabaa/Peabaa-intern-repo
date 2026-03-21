# Refelction

## Issue #23 Preventing Unnecessary Renders with useCallback

## Code Examples:

### **UseCallbackexample.jsx**

```jsx
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
```

### What problem does useCallback solve?

In React, whenever a component re-renders, all the functions declared inside it are recreated from scratch with brand new memory addresses. If you pass these functions as props to child components, React assumes the prop has changed (because the memory address changed) and forces the child to re-render, even if the actual data is exactly the same. `useCallback` solves this by "freezing" or memoizing the function so its reference stays exactly the same across parent re-renders, thereby preventing unnecessary child re-renders.

### How does useCallback work differently from useMemo?

Both hooks are used for performance optimization, but they cache different things. `useMemo` executes a function and caches the returned value of that function (which is great for avoiding heavy, slow math calculations on every render). `useCallback`, on the other hand, caches the function itself so its memory address reference doesn't change.

### When would useCallback not be useful?

`useCallback` actually introduces a tiny bit of performance overhead because React has to do extra work to store the function in memory and check its dependency array. It is not useful (and can actually slow down your app slightly) in these situations:

1. When you pass the function to a child component that isn't wrapped in `React.memo()` (because the child will just re-render anyway).
2. When you pass the function to a standard HTML element (like a plain `<button onClick={...}>`), because standard DOM nodes don't have expensive React render cycles that need to be optimized.
3. When the function is only used internally by the component and isn't passed down as a prop or used in another hook's dependency array.
