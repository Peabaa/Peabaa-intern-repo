# Which AI tools did you try?

I tried using GitHub Copilot, ChatGPT, and Claude AI. I asked each of them to generate code, solve a coding problem, and give explanations.

# What worked well? What didn’t?

What worked well is how they are able to explain the code that they wrote, especially if you request for simpler explanations when it comes to more complex problems. What didn't work as well, which is a case-to-case basis, is how they write the code. They may give working code, but at times it can be quite inefficient. Other times it just doesn't work, so you have to reprompt and be more specific with your requests.

# When do you think AI is most useful for coding?

I believe that AI is a useful coding partner, especially when you are stuck or when you do not understand certain concepts of your task. The caveat here is to not fully rely on AI to write the code for you, but rather help you understand your own work and even elevate it.

### Experiment Evidence:

I used AI to assist with both code generation and learning a new testing framework. Here are the specific logs from my sessions.

**1. Using AI for Code Refactoring (Generating Code Snippets):**

- **Tool Used:** Gemini
- **The Problem:** I was learning about code smells and needed to refactor a deeply nested if/else statement (the "Arrow Anti-Pattern") into cleaner code.
- **My Prompt:** "How can I refactor this deeply nested user routine function using guard clauses?"

- **The AI's Generated Code:**

```javascript
function processUserRoutine(routine) {
  if (!routine) return "No routine provided.";
  if (!routine.tasks || !Array.isArray(routine.tasks)) return "Invalid format.";
  if (routine.tasks.length === 0) return "Routine has no tasks.";

  return `Starting routine with ${routine.tasks.length} tasks.`;
}
```

- **Did it work?**
  Yes. The AI not only provided the flattened code but also explained how returning early makes the function much more readable and safer from edge-case crashes.

**2. Using AI to Explain a New Concept (Explaining & Debugging):**

- **Tool Used:** Gemini
- **The Problem:** I was setting up Jest for the first time to test a calculateBonus function and didn't fully understand the syntax of the test blocks.
- **My Prompt:** "Can you please explain to me how this Jest test code works?" (Followed by pasting a snippet of my test file).
- **The AI's Explanation:** The AI broke the code down into the "Arrange, Act, and Assert" pattern. It explained that expect(calculateBonus(adminUser)).toBe(60000) is the Assertion, telling Jest exactly what number the function is required to output.

- **Did it work?**
  Yes. To actively debug and verify the AI's explanation, I intentionally broke the test by changing the expected value to 80000. I watched the test fail in the terminal, which proved the AI's breakdown of the assertion logic was completely accurate.
