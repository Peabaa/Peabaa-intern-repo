/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function ListExample() {
  // State 1: The current text inside the input box
  const [inputValue, setInputValue] = useState('');
  
  // State 2: The actual list of items (starting with a few defaults)
  const [items, setItems] = useState(['High-airflow Mesh Panel', 'AIO Liquid Cooler']);

  // This function runs when the form is submitted
  const handleAddItem = (e) => {
    e.preventDefault(); // Stop the page from refreshing!

    // Don't add empty blank spaces to the list
    if (inputValue.trim() === '') return;

    // We use the updater function to guarantee we have the latest list.
    // The [...prevItems] syntax creates a brand new array, copies the old stuff into it, and tacks the new item onto the end.
    setItems((prevItems) => [...prevItems, inputValue]);
    
    // Clear the input box so the user can type the next item
    setInputValue('');
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #ff5722', maxWidth: '400px', margin: '20px' }}>
      <h2>🛒 PC Build Wishlist</h2>
      
      {/* The Form */}
      <form onSubmit={handleAddItem} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g., 1000W PSU..."
          style={{ padding: '8px', width: '70%', marginRight: '5px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Add</button>
      </form>

      {/* The List display using .map() */}
      <ul style={{ textAlign: 'left' }}>
        {items.map((item, index) => (
          // React strictly requires a unique 'key' prop on every mapped element
          // Using index is okay for simple, non-reorderable lists like this one
          <li key={index} style={{ marginBottom: '8px' }}>
            {item}
          </li>
        ))}
      </ul>
      
      {/* Just to show the array length dynamically */}
      <p style={{ fontSize: '0.8em', color: 'gray' }}>Total items: {items.length}</p>
    </div>
  );
}