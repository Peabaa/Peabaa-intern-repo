# Reflection

### How do unit tests help keep code clean?

Unit tests help keep code clean by acting as a safety net during refactoring. When I cleaned up the code smells (like removing deeply nested conditionals and magic numbers), having unit tests would guarantee that my changes didn't break the original logic. Furthermore, writing tests naturally forces you to write cleaner, more modular code. If a function is too large or does too many things, it becomes incredibly difficult to test. By keeping functions small and focused on a single responsibility—like the `calculateBonus` function—testing becomes straightforward and the code remains highly readable.

### What issues did you find while testing?

I realized how strict the testing framework is. I deliberately experimented by changing an expected output from 60000 to 80000 to see how the test would fail. It immediately caught the discrepancy, which proved to me how easily tests can catch human errors or bad assumptions. I also found that thinking about tests forces you to consider edge cases you might otherwise forget, such as what happens if the database passes in a user object with missing data (like no salary or no role). Writing a test for that specific scenario ensured the guard clauses in my code handled it gracefully by returning 0 instead of crashing.
