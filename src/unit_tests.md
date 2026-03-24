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

### **Jest Test Result: Issue #17**

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

## Issue #18 Mocking API Calls in Jest

### **UserList.jsx**

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // We ping a real, free testing API
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 border rounded shadow-md mt-4 max-w-sm">
      <h2 className="text-xl font-bold mb-4">User Directory</h2>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          // We add a data-testid here to make it super easy for Jest to find these!
          <li key={user.id} data-testid="user-item">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### **UserList.test.jsx**

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Gives us the .toBeInTheDocument() matcher
import axios from 'axios';
import UserList from './UserList.jsx';

// 1. Tell Jest to intercept all calls to the 'axios' library
jest.mock('axios');

describe('UserList Component', () => {
  it('displays a loading message initially', () => {
    // Mock a pending promise so the component gets stuck in the loading state
    axios.get.mockImplementation(() => new Promise(() => {}));

    render(<UserList />);
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('fetches and displays a list of users successfully', async () => {
    // 2. Create the exact fake data we want axios to return
    const fakeUsers = [
      { id: 1, name: 'Alice Focus' },
      { id: 2, name: 'Bob Bear' },
    ];

    // 3. Force axios to instantly return our fake data
    axios.get.mockResolvedValue({ data: fakeUsers });

    render(<UserList />);

    // 4. Wait for the asynchronous API call to finish and the DOM to update
    await waitFor(() => {
      const listItems = screen.getAllByTestId('user-item');
      expect(listItems).toHaveLength(2); // Did it render both users?
      expect(screen.getByText('Alice Focus')).toBeInTheDocument();
      expect(screen.getByText('Bob Bear')).toBeInTheDocument();
    });
  });

  it('displays an error message if the API call fails', async () => {
    // Simulate a 500 Internal Server Error or a network crash
    axios.get.mockRejectedValue(new Error('Network Error'));

    render(<UserList />);

    // Wait for the component to catch the error and display the text
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch users')).toBeInTheDocument();
    });
  });
});
```

### **Jest Test Result: Issue #18**

```bash
$ npm test

> peabaa-intern-repo@1.0.0 test
> jest

 PASS  src/UserList.test.jsx
 PASS  src/RegistrationForm.test.jsx
 PASS  src/counterSlice.test.js
 PASS  ./salaryCalculator.test.js

Test Suites: 4 passed, 4 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        2.179 s
Ran all test suites.
```

### Why is it important to mock API calls in tests?

Mocking API calls is critical because unit tests should be fast, isolated, and highly predictable. If tests relied on live production APIs, they would randomly fail every time the server was down or the internet connection dropped, leading to "flaky tests." Mocking also prevents tests from accidentally modifying real databases, charging credit cards, or triggering API rate limits.

### What are some common pitfalls when testing asynchronous code?

The most common pitfall is forgetting that asynchronous network operations take time to resolve. If you run a standard `expect` assertion immediately after rendering a component that fetches data, the test will automatically fail because the data hasn't arrived in the DOM yet. You must always use asynchronous testing utilities like `await waitFor()` or `findByText()` to pause the test until the component has actually updated with the new state.
