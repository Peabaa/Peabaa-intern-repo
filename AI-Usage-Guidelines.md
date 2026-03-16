## Reflection

# When to use AI for assistance, and when to should you rely on your own skills?

I will use AI whenever I need help with explaining, guiding, or giving context on certain code or topics that I may be confused with. I would also use AI to quickly generate templates of code that I have already made beforehand to speed up the process. As for my own skills, I will use them whenever I am making the bulk of my work. So, coding and other work that could rely on my own opinions, problem-solving, and critical thinking would be better if I were to rely on my own skills with the assistance of AI used as a tool and not a crutch.

# How can you avoid over-reliance on AI while still benefiting from it?

To avoid over-reliance on AI is to simply do your own research on the certain matter at hand. There are many YouTube videos that can help you understand fundamentals on coding and other concepts, same with online articles as well. Furthermore, you can personally practice what you learned online in your own time. You can still definitely benefit from AI at the same time by letting it help you provide more context on what you've just learned, as well as review your work and see what things you need to improve.

# What steps will you take to ensure data privacy when using AI tools?

It is best practice to not give any personally identifiable information of yourself and of Focus Bear, since this may be a breach of privacy and personal data. Always recheck your prompts and make sure credentials and other sensitive information is not accidentally being given. Always be careful from simply copy-pasting certain code that you need explaining from AI.

## Task

# Identify one task you can improve using an AI tool, and try it out.

**Task:** Debugging a React component where the state was not updating the user interface correctly.
**Context/Timestamp:** March 16, 2026, while practicing frontend component state management.
**Prompt given to AI:** "Why isn't the counter updating on the screen when I click the button? It logs the right number in the console, but the UI is frozen. Here is my code:

```javascript
import { useState } from "react";

export default function FocusTimer() {
  let [minutes, setMinutes] = useState(0);

  const addMinute = () => {
    minutes = minutes + 1; // The console shows this working
    console.log("Current minutes:", minutes);
  };

  return <button onClick={addMinute}>Focus Time: {minutes}m</button>;
}
```

**AI Response Snippet:** "In React, you cannot directly reassign a state variable like `minutes = minutes + 1`. While this changes the underlying variable's value, it bypasses React's internal tracking, meaning React doesn't know it needs to re-render the UI to show the new number. You must use the specific setter function (`setMinutes`) provided by `useState`."

Coding

# Review the AI-generated output critically—did it require editing or fact-checking?

For the specific task I had, it did well. The AI provided the correct conceptual explanation and suggested using `setMinutes(minutes + 1)`. I verified this by implementing the fix, and the React component immediately started re-rendering correctly with each click. It seems to do quite fine with simpler code. But for more complex code, I'm sure it would need some reviewing and editing since it may tend to be quite inefficient.

**Final (Edited/Fixed) Code:**

```javascript
import { useState } from "react";

export default function FocusTimer() {
  const [minutes, setMinutes] = useState(0);

  const addMinute = () => {
    setMinutes(minutes + 1); // Fixed: Using the state setter function to trigger a re-render
  };

  return <button onClick={addMinute}>Focus Time: {minutes}m</button>;
}
```

# Document one best practice you will follow when using AI tools at Focus Bear.

Always practice the "Verify First" Rule. Always make sure that the AI information that you have received is factual and relevant to anything that you are doing.
