/* eslint-disable no-unused-vars */

import React from 'react';

export default function Button({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-500 active:bg-blue-800 text-white font-bold py-2 px-6 rounded-md shadow-sm transition-colors duration-200"
    >
      {children}
    </button>
  );
}
