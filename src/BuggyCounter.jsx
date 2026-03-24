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
