# Reflection

### What code smells did you find in your code?

I wrote a code that pretty much had all seven code smells:

1. **Magic Numbers/Strings:** Hardcoding "admin" and the `1.2` multiplier without context.
2. **Long Functions:** The `process_usr_data` method tried to do too much at once.
3. **Duplicate Code:** The salary calculation was copy-pasted for both admins and managers.
4. **Large Classes:** `appManager` acted as a "God Object," handling things outside its scope.
5. **Deeply Nested Conditionals:** Using three layers of `if` statements just to verify a user.
6. **Commented-Out Code:** Leftover `authUser` functions and variables cluttering the screen.
7. **Inconsistent Naming:** Using `usr` and `process_usr_data` instead of standard camelCase (`user`, `processUserData`).

# How did refactoring improve the readability and maintainability of the code?

Refactoring made the code instantly understandable. By replacing the deeply nested `if` statements with "Guard Clauses" (early returns), the code now reads from top to bottom without forcing the brain to track multiple indentation levels. Pulling the magic numbers out into explicitly named constants (like `BONUS_MULTIPLIER`) ensures that if the company changes the bonus rate, a developer only has to update it in one central place instead of hunting through hundreds of lines of logic.

# How can avoiding code smells make future debugging easier?

Code smells often hide bugs by making the flow of logic confusing. By keeping functions small and giving them a single responsibility, debugging becomes highly isolated. If a user's bonus calculates incorrectly, I know exactly which small 10-line function to check, rather than sifting through a massive 500-line "God Object" class where state is mutating unpredictably.
