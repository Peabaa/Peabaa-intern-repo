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
