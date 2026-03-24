# Reflection

## Issue #17 Testing Redux with Jest

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
```

### **counterSlice.test.js**

```javascript
import reducer, {
  increment,
  decrement,
  incrementByAmount,
  fetchRandomNumber,
} from './counterSlice';

describe('counterSlice reducer', () => {
  // Test 1: Does it start with the correct default value?
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  // Test 2: Does the increment action work?
  it('should handle increment', () => {
    const previousState = { value: 0 };
    expect(reducer(previousState, increment())).toEqual({ value: 1 });
  });

  // Test 3: Does the decrement action work?
  it('should handle decrement', () => {
    const previousState = { value: 5 };
    expect(reducer(previousState, decrement())).toEqual({ value: 4 });
  });

  // Test 4: Does it accept dynamic data (payloads)?
  it('should handle incrementByAmount', () => {
    const previousState = { value: 2 };
    expect(reducer(previousState, incrementByAmount(3))).toEqual({ value: 5 });
  });

  // --- NEW ASYNC TESTS ---

  it('should set status to loading when fetchRandomNumber is pending', () => {
    const action = { type: fetchRandomNumber.pending.type };
    const initialState = { value: 0, status: 'idle' };
    const result = reducer(initialState, action);
    expect(result.status).toEqual('loading');
  });

  it('should update value and set status to idle when fetchRandomNumber is fulfilled', () => {
    const action = { type: fetchRandomNumber.fulfilled.type, payload: 10 };
    const initialState = { value: 5, status: 'loading' };
    const result = reducer(initialState, action);
    expect(result.value).toEqual(15); // 5 + 10 = 15
    expect(result.status).toEqual('idle');
  });
});
```

### **Jest Test Result**

```bash
$ npm test

> peabaa-intern-repo@1.0.0 test
> jest

 PASS  ./salaryCalculator.test.js
 PASS  src/counterSlice.test.js
 PASS  src/RegistrationForm.test.jsx

Test Suites: 3 passed, 3 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        2.095 s
Ran all test suites.
```

### What was the most challenging part of testing Redux?

The most challenging part is shifting your mindset away from the visual UI and understanding that you are testing isolated, pure JavaScript logic. If you start testing asynchronous Redux actions (like fetching data from an API using `createAsyncThunk`), it becomes much more complex because you have to handle different lifecycle states (pending, fulfilled, rejected) and ensure the linter is configured correctly to understand implicit returns.

### How do Redux tests differ from React component tests?

React component tests (using React Testing Library) focus on the User Interface. They simulate a user rendering a component, clicking buttons, and checking if specific HTML text appears on the screen.

Redux tests, on the other hand, focus strictly on data. There is no HTML or rendering involved. You simply pass an initial data object and an action into a reducer function, and write an assertion to check if the new data object being returned matches what you expect.
