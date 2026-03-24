import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Create the Asynchronous Action (Thunk)
// This simulates a network request that takes 1 second to fetch a number
export const fetchRandomNumber = createAsyncThunk(
  'counter/fetchRandomNumber',
  async () => new Promise((resolve) => {
      setTimeout(() => resolve(10), 1000); // Fakes fetching the number '10'
    })
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, status: 'idle' }, // Added a 'status' tracker
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action) => { state.value += action.payload; },
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