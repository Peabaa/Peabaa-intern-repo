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

## Issue #51 Advanced Git Commands & When to Use Them

### What does each command do?

- **`git checkout main -- <file>`**: Restores a specific file to its exact state on the `main` branch, completely discarding any local, uncommitted changes made to that specific file.
- **`git cherry-pick <commit>`**: Takes a single, specific commit from one branch and applies it to your current working branch, without pulling in any of the other commits from that original branch.
- **`git log`**: Displays the commit history of the repository, showing the sequence of changes, who made them, the timestamp, and their unique commit hashes.
- **`git blame <file>`**: Annotates every single line in a file with the name of the author, the date, and the specific commit hash of the last person who modified that exact line.

### When would you use it in a real project (hint: these are all really important in long running projects with multiple developers)?

These commands are highly useful in a long-running project with multiple developers:

- **`checkout`**: If I am experimenting with a complex component and the code gets too messy, I can instantly revert just that one file back to the clean, working version on `main` without losing the progress I've made in other files.
- **`cherry-pick`**: If a teammate fixes a critical UI bug on a separate, unfinished feature branch, and I desperately need that fix to continue my own frontend work, I can "cherry-pick" just their bug-fix commit into my branch without merging their incomplete feature.
- **`log`**: I would use this to understand how a feature evolved over time, or to find a specific older commit hash to use as a "good" boundary when hunting down a bug with `git bisect`.
- **`blame`**: If I find a confusing line of code in the codebase, I can use `blame` to see exactly which teammate wrote it. This allows me to reach out to the right person directly for clarification instead of guessing or bothering the whole team.

### What surprised you while testing these commands?

I was most surprised by how "surgical" Git can be. Before this, I mostly thought of version control as just saving and loading the entire project at once. Seeing that I can selectively pluck a single commit from a different timeline (`cherry-pick`) showed me how much precise control professional developers have over a large codebase.

## Issue #52 Merge Conflicts & Conflict Resolution

### What caused the conflict?

The conflict happened because I edited the exact same line within the same file from both the main branch and conflict-test feature branch.

### How did you resolve it?

After entering the `git merge conflict-test` command, VS Code was able to show me the current change (main branch) and incoming change (conflict-test feature branch). I opened the conflicted file and was able to see four options: `Accept Current Change`, `Accept Incoming Change`, `Accept Both Changes`, or `Compare Changes`. I selected `Accept Current Change`, saved the file and committed it with the resolved merge conflict.

### What did you learn?

I learned that merge conflicts are not "errors" or signs that I broke the repository; they are actually a safety mechanism built into Git. As a Frontend Developer Intern, this will be crucial when I am working on the same UI components as my teammates, as it forces us to manually verify our code logic before it gets combined into the production branch.

## Issue #53 Branching & Team Collaboration

### Why is pushing directly to main problematic?

Pushing directly to main is risky because it bypasses the review process. If I accidentally commit code with a syntax error or a broken UI component, it immediately affects the "source of truth" for the entire team and could break the live application for users. It also makes it difficult for other developers to work on their own features without getting interrupted by my unverified changes.

### How do branches help with reviewing code?

Branches allow for a structured "Pull Request" process. By keeping my frontend changes on a separate branch, I can present a clean, isolated set of modifications to my lead or peers. This makes it much easier for them to understand the specific scope of my work, leave targeted feedback, and ensure the code meets quality standards before it is ever merged into the main project.

### What happens if two people edit the same file on different branches?

When two people edit the same file on different branches, Git can usually handle it if they edited different sections of the file. However, if both developers modified the exact same lines of code, a Merge Conflict occurs when they try to combine their branches. It is not a failure, but a safety feature that requires a person to manually review both versions and decide which one to keep, ensuring that no important logic is accidentally overwritten.
