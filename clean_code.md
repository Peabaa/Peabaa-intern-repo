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

## Issue #43 Avoiding Code Duplication

### Duplicated Code Example

```javascript
function calculateStandardShipping(cartTotal) {
  const tax = cartTotal * 0.12; // 12% tax
  const totalWithTax = cartTotal + tax;
  return totalWithTax + 5.0; // $5.00 standard fee
}

function calculateExpressShipping(cartTotal) {
  const tax = cartTotal * 0.12; // 12% tax
  const totalWithTax = cartTotal + tax;
  return totalWithTax + 15.0; // $15.00 express fee
}
```

### Refactored Code: We can extract the repeated logic into a single, reusable function that accepts the shipping fee as a parameter.

```javascript
function calculateTotalWithShipping(cartTotal, shippingFee) {
  const taxRate = 0.12;
  const totalWithTax = cartTotal + cartTotal * taxRate;

  return totalWithTax + shippingFee;
}

// Now you just call the single function with different arguments:
// calculateTotalWithShipping(50, 5.00);  // For Standard
// calculateTotalWithShipping(50, 15.00); // For Express
```

### What were the issues with duplicated code?

If a business rule changes (like a tax rate increasing), you have to hunt down every instance of that copied code to update it. If you miss even one, you introduce a bug. Additionally, it clutters the file and makes it harder for other developers to figure out what the code is actually doing.

### How did refactoring improve maintainability?

By extracting the logic into one reusable function, there is only one place to update the code if requirements change. You only have to write unit tests for one function instead of testing the same logic across five different duplicated functions.

## Issue #44 Writing Small, Focused Functions

### Long, Complex Function Example

```javascript
function submitOrder(order, user) {
  // 1. Validate the order
  if (!order.items || order.items.length === 0) {
    console.log("Order is empty");
    return false;
  }

  // 2. Calculate the total
  let totalAmount = 0;
  for (let i = 0; i < order.items.length; i++) {
    totalAmount += order.items[i].price * order.items[i].quantity;
  }

  // 3. Process the payment
  console.log(`Charging $${totalAmount} to ${user.paymentMethod}...`);
  let paymentSuccessful = true; // Simulated payment

  // 4. Send Confirmation
  if (paymentSuccessful) {
    console.log(`Emailing receipt to ${user.email}`);
    return true;
  } else {
    return false;
  }
}
```

### Refactored Code: extracting the logic into smaller helper functions, the main submitOrder function now acts like a table of contents.

```javascript
// The main function is now extremely clean and easy to read
function submitOrder(order, user) {
  if (!isValidOrder(order)) return false;

  const totalAmount = calculateOrderTotal(order.items);
  const paymentSuccessful = processPayment(user, totalAmount);

  if (paymentSuccessful) {
    sendReceiptEmail(user);
    return true;
  }
  return false;
}

// Small, focused helper functions

function isValidOrder(order) {
  return order.items && order.items.length > 0;
}

function calculateOrderTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

function processPayment(user, amount) {
  console.log(`Charging $${amount} to ${user.paymentMethod}...`);
  return true;
}

function sendReceiptEmail(user) {
  console.log(`Emailing receipt to ${user.email}`);
}
```

### Why is breaking down functions beneficial?

Using the example above as a reference, you can now use calculateOrderTotal() or isValidOrder() anywhere else in your application without having to trigger a payment or an email. You can write a unit test specifically for the math in calculateOrderTotal() without needing to mock up a fake payment gateway.

### How did refactoring improve the structure of the code?

It makes the code self-documenting. You don't need comments explaining what block of code does what because the descriptive function names tell you exactly what is happening step-by-step.
