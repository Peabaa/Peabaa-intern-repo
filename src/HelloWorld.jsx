/* eslint-disable no-unused-vars */

import React from 'react';

// The { name } inside the parentheses is exactly how we "catch" the prop
export default function HelloWorld({ name }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 text-center max-w-sm mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {/* We use curly braces to dynamically insert the JavaScript variable */}
        Hello, {name}!
      </h2>
    </div>
  );
}
