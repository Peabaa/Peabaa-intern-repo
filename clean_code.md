# Reflection

## Issue #39 Writing Unit Tests for Clean Code

### How do unit tests help keep code clean?

Unit tests help keep code clean by acting as a safety net during refactoring. When I cleaned up the code smells (like removing deeply nested conditionals and magic numbers), having unit tests would guarantee that my changes didn't break the original logic. Furthermore, writing tests naturally forces you to write cleaner, more modular code. If a function is too large or does too many things, it becomes incredibly difficult to test. By keeping functions small and focused on a single responsibility—like the `calculateBonus` function—testing becomes straightforward and the code remains highly readable.

### What issues did you find while testing?

I realized how strict the testing framework is. I deliberately experimented by changing an expected output from 60000 to 80000 to see how the test would fail. It immediately caught the discrepancy, which proved to me how easily tests can catch human errors or bad assumptions. I also found that thinking about tests forces you to consider edge cases you might otherwise forget, such as what happens if the database passes in a user object with missing data (like no salary or no role). Writing a test for that specific scenario ensured the guard clauses in my code handled it gracefully by returning 0 instead of crashing.

## Issue #40 Handling Errors & Edge Cases

### What was the issue with the original code?

The original code suffered from deeply nested `if/else` statements, making the core logic incredibly difficult to read and maintain at a glance. Furthermore, it didn't verify the actual data types. For example, it checked if `routine.tasks != null`, but it didn't verify if `tasks` was actually an array before trying to check its `.length` property. If a database glitch passed in a string instead of an array, the function could behave unpredictably.

### How does handling errors improve reliability?

Implementing Guard Clauses forces the function to evaluate edge cases upfront. By immediately rejecting invalid inputs (like `undefined` objects or missing arrays), the application is protected from crashing further down the execution line with errors like "Cannot read properties of undefined". This proactive error handling fails gracefully, returning clear, predictable messages rather than breaking the entire UI, ensuring a much more stable and reliable experience for the end user.
