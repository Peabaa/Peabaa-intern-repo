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
