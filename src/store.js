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