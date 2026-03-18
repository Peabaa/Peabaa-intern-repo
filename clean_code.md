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

## Issue #41 Commenting & Documentation

### Poorly Commented Code:

```javascript
// Function to get the total
function calc(a, b) {
  // check if b is greater than 0
  if (b > 0) {
    // multiply a and b
    let d = a * b;
    // subtract d from a
    return a - d;
  }
  // return a
  return a;
}
```

### Improved Code: Used the JSDoc comment format

```javascript
/**
 * Calculates the final price of an item after applying a discount.
 * @param {number} basePrice - The original price of the item.
 * @param {number} discountRate - The discount percentage as a decimal (e.g., 0.20 for 20%).
 * @returns {number} The final calculated price.
 */
function calculateDiscountedPrice(basePrice, discountRate) {
  if (discountRate > 0) {
    const discountAmount = basePrice * discountRate;
    return basePrice - discountAmount;
  }

  return basePrice;
}
```

### When should you add comments?

Comments are good when dealing with complex or non-intuitive business logic that cannot be simplified. Aside from that, it can be helpful for explaining regular expressions (RegEx), which are notoriously hard to read. Additionally when documenting public APIs, functions, or classes, comments are helpful so other developers know what inputs are expected and what outputs are returned as well as leave warnings for future developers.

### When should you avoid comments and instead improve the code?

Comments are less needed when:

- the comment is just translating basic syntax
- compensating for terrible variable or function naming (instead of explaining the name of the function using comments, just change the name itself)
- explaining a massive 200-line function, when you can extract parts of that code into smaller, well-named helper functions.

## Issue #42 Refactoring Code for Simplicity

### Complicated Code Example

```javascript
function processPurchase(user, item) {
  let success = false;
  if (user !== null) {
    if (user.isVerified) {
      if (user.balance >= item.price) {
        user.balance -= item.price;
        success = true;
      } else {
        console.log("Insufficient funds");
      }
    } else {
      console.log("User not verified");
    }
  } else {
    console.log("User does not exist");
  }
  return success;
}
```

### Refactored Code Example

```javascript
function processPurchase(user, item) {
  if (!user) {
    console.log("User does not exist");
    return false;
  }

  if (!user.isVerified) {
    console.log("User not verified");
    return false;
  }

  if (user.balance < item.price) {
    console.log("Insufficient funds");
    return false;
  }

  user.balance -= item.price;
  return true;
}
```

### What made the original code complex?

The deep nesting created high cognitive load and required the reader to really think. You have to read through layers of conditions just to figure out what the function actually does, and it's hard to track which else belongs to which if.

### How did refactoring improve it?

By using guard clauses, the logic was flattened. It isolates the failure states at the top of the function, meaning the main purpose of the code isn't buried inside three layers of brackets. It is much easier to scan and understand quickly.
