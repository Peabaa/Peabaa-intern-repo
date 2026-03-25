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
