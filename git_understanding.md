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
