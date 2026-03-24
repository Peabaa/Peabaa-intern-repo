# Reflection

## Issue #34 Practise React Debugging in a Test Repo

### **BuggyCounter.jsx: Broken Code**

```jsx
import { useState, useEffect } from 'react';

export default function BuggyCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // We want a timer that adds 1 to the count every second
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <div className="p-4 border rounded shadow-md mt-4 max-w-sm">
      <h2 className="text-xl font-bold mb-4">Stale Closure Bug</h2>
      <p className="text-lg">Timer Count: {count}</p>
    </div>
  );
}
```

### **BuggyCounter.jsx: Fixed Code**

```jsx
import { useState, useEffect } from 'react';

export default function BuggyCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // We want a timer that adds 1 to the count every second
    const timer = setInterval(() => {
      //   setCount(count + 1); BROKEN LINE THAT CAUSED THE BUG
      setCount((prevCount) => prevCount + 1); // Bug Fix
    }, 1000);

    // Cleanup function
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <div className="p-4 border rounded shadow-md mt-4 max-w-sm">
      <h2 className="text-xl font-bold mb-4">Stale Closure Bug</h2>
      <p className="text-lg">Timer Count: {count}</p>
    </div>
  );
}
```

### What was the issue?

I created a `BuggyCounter` component that used `setInterval` inside a `useEffect` hook to increment a counter every second. However, the counter would increment from `0` to `1` and then completely freeze. The issue was a "stale closure." Because the `useEffect` had an empty dependency array `[]`, the interval captured the `count` variable exactly as it was on the first render (which was `0`). Every second, it was endlessly calculating `0 + 1`.

### What debugging method did you use?

I used `console.log(count)` directly inside the `setInterval` callback. By checking the browser's developer console, I observed that the printed value was permanently stuck at `0`, even though the UI showed `1`. This immediately confirmed that the interval did not have access to the freshly updated state.

### How did you resolve the problem?

I resolved the issue by changing the state setter to use a functional update: `setCount((prevCount) => prevCount + 1);`. Instead of relying on the locally scoped `count` variable, the functional update bypasses the closure entirely and fetches the most up-to-date state directly from React's internal queue before applying the increment.
