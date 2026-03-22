# Refelction

## Issue #23 Preventing Unnecessary Renders with useCallback

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

## Issue #24 Optimizing Performance with useMemo

### **UseMemoExample.jsx**

```jsx
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
```

### How does useMemo improve performance?

`useMemo` caches (or "memoizes") the final result of an expensive calculation. Whenever a component re-renders, `useMemo` checks its dependency array. If none of the dependencies have changed, React completely skips the heavy math and instantly returns the saved result from memory. This prevents time-consuming operations from lagging the application when unrelated UI updates happen.

### When should you avoid using useMemo?

You should avoid using `useMemo` for fast, simple calculations (like basic addition or mapping over a tiny array of 5 items). Caching data is not free, it requires React to allocate physical memory and run background checks on the dependency array. If the calculation takes less time to run than it takes React to check the cache, `useMemo` will actually slow your app down instead of speeding it up.

### What happens if you remove useMemo from your implementation?

If `useMemo` is removed from the component, the expensive calculation (like a loop of 50,000,000) will execute from scratch on every single render. This means if a user interacts with an entirely unrelated piece of state, like clicking the "Toggle Theme" button to change the background color, the whole app will freeze and stutter for a moment while it unnecessarily reprocesses the massive array.

## Issue #25 Understanding React Hooks: useEffect

### **UseEffectExample.jsx**

```jsx
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';

export default function UseEffectExample() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // EFFECT 1: Mount, Unmount, and Cleanup
  useEffect(() => {
    // This runs exactly once when the component first appears on screen
    console.log('Component MOUNTED!');

    // set up a side effect (timer)
    const timer = setInterval(() => {
      console.log('Timer ticking...');
    }, 5000);

    // CLEANUP FUNCTION: React runs this right before the component is destroyed
    // If we didn't clear this interval, it would run forever in the background and cause a memory leak
    return () => {
      console.log('Cleanup running: Component UNMOUNTED!');
      clearInterval(timer);
    };
  }, []); // The empty dependency array means "only run on mount/unmount"

  // EFFECT 2: Fetching Data triggered by a state change
  useEffect(() => {
    // skip the initial render when trigger is 0
    if (trigger === 0) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetching dummy data from a free public API
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts/1',
        );
        const result = await response.json();
        setData(result);
        console.log('Data fetched successfully!');
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [trigger]); // This effect ONLY runs when the 'trigger' state changes

  return (
    <div
      style={{ padding: '20px', border: '2px solid purple', maxWidth: '500px' }}
    >
      <h2>useEffect Demo</h2>

      {/* Clicking this changes the 'trigger' state, which alerts the second useEffect to run */}
      <button
        type="button"
        onClick={() => setTrigger((prev) => prev + 1)}
        disabled={isLoading}
      >
        {isLoading ? 'Fetching...' : 'Fetch Data API'}
      </button>

      {data && (
        <div
          style={{
            marginTop: '15px',
            padding: '10px',
            background: '#333',
            color: 'white',
          }}
        >
          <strong>{data.title}</strong>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}
```

### When should you use useEffect instead of handling logic inside event handlers?

You should use event handlers (like `onClick` or `onSubmit`) for logic that is triggered directly by a **user action**, such as purchasing an item or submitting a form.

You should use `useEffect` when you need to **synchronize** your component with an external system (like a database, an API, or a browser API) based on the component's lifecycle or state changes. For example, use `useEffect` to connect to a chat server as soon as the component appears on the screen, or to save a draft automatically whenever a text input state changes.

### What happens if you don’t provide a dependency array?

If you completely omit the dependency array (e.g., writing `useEffect(() => { ... })` instead of `useEffect(() => { ... }, [])`), React will run the effect after **every single render**.

If your effect happens to update a state variable, updating that state will trigger a re-render. That re-render will trigger the effect again, which updates the state again, instantly creating an infinite loop that will freeze or crash the user's browser.

### How can improper use of useEffect cause performance issues?

- **Infinite Loops:** As mentioned above, updating state inside an effect without a proper dependency array will lock up the browser.
- **Memory Leaks:** If you set up continuous background processes (like `setInterval` timers or window event listeners) inside an effect but fail to return a cleanup function (e.g., `clearInterval`), those processes will keep running invisibly even after the component is removed from the screen, eventually eating up the device's RAM.
- **Over-fetching:** Placing too many variables in the dependency array (or passing variables whose memory addresses change on every render, like un-memoized functions or objects) can cause the effect to run far more often than necessary, wasting network bandwidth and making the app stutter.
