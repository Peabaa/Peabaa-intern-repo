# Reflection

## Issue #27 Using Selectors in Redux Toolkit

### **Counter.jsx**

```jsx
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, selectCount } from './counterSlice';
import Button from './Button.jsx';

export default function Counter() {
  // 1. Grab the Redux state and dispatch tools instead of useState
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  // 2. Determine the dynamic message based on the Redux state
  let message = 'Keep clicking!';
  if (count >= 10) message = "Whoa, that's a high number!";
  if (count < 0) message = "We're in the negatives!";

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Counter</h2>

      {/* Dynamic text color based on the number! */}
      <p
        className={`text-5xl font-black ${count < 0 ? 'text-red-500' : 'text-green-500'}`}
      >
        {count}
      </p>

      {/* 3. Display the dynamic message required by the ticket */}
      <p className="text-sm text-gray-600 italic">{message}</p>

      <div className="flex space-x-4 w-full justify-center mt-4">
        {/* 4. Fire off the Redux actions instead of standard state setters */}
        <Button onClick={() => dispatch(decrement())}>Decrease</Button>
        <Button onClick={() => dispatch(increment())}>Increase</Button>
      </div>
    </div>
  );
}
```

### **counterSlice.js**

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Create the Asynchronous Action (Thunk)
// This simulates a network request that takes 1 second to fetch a number
export const fetchRandomNumber = createAsyncThunk(
  'counter/fetchRandomNumber',
  async () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(10), 1000); // Fakes fetching the number '10'
    }),
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, status: 'idle' }, // Added a 'status' tracker
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  // 2. Handle the Async Action's lifecycle
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomNumber.pending, (state) => {
        state.status = 'loading'; // While waiting for the API
      })
      .addCase(fetchRandomNumber.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload; // Adds the fetched '10' to the counter
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
export const selectCount = (state) => state.counter.value;
```

### What are the benefits of using selectors instead of directly accessing state?

Using selectors provides two massive benefits: **Reusability** and **Encapsulation**. If you directly access state in ten different components by writing `useSelector((state) => state.counter.value)`, and you later decide to change the structure of your Redux store (e.g., nesting `value` inside a `data` object), you would have to manually hunt down and update the path in all ten components. By using a selector like `selectCount`, you encapsulate that logic. You only have to update the path in one single place (inside the slice file), and every component using that selector will automatically receive the correct updated data. It acts as a single, highly maintainable source of truth.

## Issue #28 Introduction to Redux Toolkit

### **store.js**

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// 1. Remove the "export" keyword from this line
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// 2. Export it as the default at the bottom!
export default store;
```

### When should you use Redux instead of useState?

You should use `useState` for local, component-specific memory (like tracking if a temporary dropdown menu is open, or reading the text actively being typed into a specific form input).

You should use Redux when state is "global" and needs to be shared across many different, loosely connected components in your application (like user authentication status, a shopping cart, or a global dark mode theme). If you find yourself passing props down through multiple layers of components that don't actually need the data just to get it to a deeply nested child (a problem known as "Prop Drilling"), it is highly recommended to move that data into Redux.
