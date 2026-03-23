/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import Button from './Button.jsx';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    // Tailwind classes for a centered card with a border and shadow
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Counter</h2>

      {/* Dynamic text color based on the number! */}
      <p
        className={`text-5xl font-black ${count < 0 ? 'text-red-500' : 'text-green-500'}`}
      >
        {count}
      </p>

      {/* Flexbox container to space out the buttons */}
      <div className="flex space-x-4 w-full justify-center mt-4">
        <Button onClick={() => setCount((prev) => prev - 1)}>Decrease</Button>
        <Button onClick={() => setCount((prev) => prev + 1)}>Increase</Button>
      </div>
    </div>
  );
}
