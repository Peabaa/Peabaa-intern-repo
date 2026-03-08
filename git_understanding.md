# Reflection

## Issue #48 Pull Requests

### Why are PRs important in a team workflow?

They let everyone in the project know the features you have been working on and the changes you've made. It helps your peers or mentors be on the same page with you on your code and allows them to help review or debug the code to prepare your feature branch for merging with the main branch. This also prevents messy or broken code from being merged into the main branch without approval, potential breaking the project.

### What makes a well-structured PR?

A well-structured PR has a descriptive title and a breakdown of the changes you have implemented to the code. It shows clear differences on the codebase between before you added your code and what happens after you have added your code. Furthermore, a well-structured PR may also have screenshots or recordings on the feature you made for clearer visual changes.

### What did you learn from reviewing an open-source PR?

I learned that PRs in a professional setting is a lot smaller and concise, prioritizing readability, modularity, and straightforwardness. These PRs truly focus on smaller details and changes, making them much easier to review and merge.

## Issue #49 Writing Meaningful Commit Messages

### What makes a good commit message?

A good commit message is clear, concise, and usually less than 50 characters for readability. It is descriptive in spite of the conciseness and may use imperative moods (e.g. fix: , add: , debug: ) to let everyone in the repository know what these commits may do to the code. A good commit provides good context to the reader without having to read every single line of code.

### How does a clear commit message help in team collaboration?

Clear commit messages help speed up the process of code reviewing. It helps developers in a team understand the evolution of the feature and the path it's going through. It is somewhat like a history-keeping method with short descriptions that pinpoints a specific change, addition, debug, or fix in the code.

### How can poor commit messages cause issues later?

Poor commit messages can cause a lot of confusion, whether upfront or down the line. It does not offer guidance on what a certain commit does, especially when developers backtrack to that commit to try and understand what was going on. This may lead to wasted time figuring out what this commit is supposed to do anda generally cluttered and unprofessional repository.

**Make three commits in your repo with different commit message styles:**
These are the three commit messages I made throughout this file:

1. Vague: `git commit -m "added answer"`
2. Overly Detailed: `git commit -m "I opened git-understanding.md and added my answer to the 2nd question. I also made small adjustments to the formatting of the whole markdown file for readability."`
3. Well-structured: `git commit -m "add: added answer to 3rd question of Issue #49"`

## Issue #50 Understand git bisect

### What does git bisect do?

`git bisect` performs a binary search through a project's commit history to pinpoint the exact commit that introduced a bug or issue. By setting a "good" boundary (a past commit where the code worked) and a "bad" boundary (the current broken state), it continuously splits the timeline in half, asking the developer to test the code at each step until the specific culprit is cornered.

### When would you use it in a real-world debugging situation?

In a complex frontend environment with constant updates, a UI component might suddenly stop working, like a focus timer failing to start or a dashboard layout breaking. If the bug is buried under dozens of recent pull requests from multiple teammates and it is completely unclear which file caused the issue, this tool allows for tracking it down by simply testing the live local server instead of blindly reading through hundreds of files.

### How does it compare to manually reviewing commits?

Manually reviewing commits is tedious, slow, and highly prone to human error, as it requires guessing which file might be broken and reading the code line-by-line. `git bisect`, on the other hand, operates on logarithmic time. It is mathematically much faster and relies entirely on testing the application's behavior rather than reading the code itself, saving hours of debugging time.
