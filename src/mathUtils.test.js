import add from './mathUtils';

describe('Math Utility Functions', () => {
  it('should correctly add two positive numbers', () => {
    // We expect the result of add(2, 3) to strictly equal 5
    expect(add(2, 3)).toBe(5);
  });

  it('should correctly handle negative numbers', () => {
    expect(add(-5, 10)).toBe(5);
  });

  it('should correctly handle zeros', () => {
    expect(add(0, 0)).toBe(0);
  });
});
