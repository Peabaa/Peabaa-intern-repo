# Reflection

### What is the purpose of CI/CD?

The purpose of CI/CD is to automate the testing, integration, and deployment phases of software development. It acts as an automated safety net. Instead of hoping my new frontend components don't break existing features, the CI pipeline automatically tests the code against the main branch the moment I open a Pull Request, ensuring only stable, verified code makes it into production.

### How does automating style checks improve project quality?

Automating style checks (like linting and spell checks) enforces a unified codebase standard without requiring human intervention. It prevents arguments over code formatting and saves senior developers from wasting their time pointing out missing semicolons or typos during code reviews. This allows the team to focus entirely on the actual logic and architecture of the application.

### What are some challenges with enforcing checks in CI/CD?

One major challenge is dealing with false positives. An automated spell checker might flag valid technical abbreviations (like "JSON" or "OJT") or specific variable names as spelling errors, requiring developers to constantly update a custom dictionary. Another challenge is pipeline speed; if the automated tests take 30 minutes to run on every single commit, it can severely slow down the development momentum.

### How do CI/CD pipelines differ between small projects and large teams?

In small personal projects, a CI/CD pipeline might be as simple as a single GitHub Action that checks for markdown typos and builds a static site. For a large, remote team, the pipeline is vastly more complex. It typically involves multiple stages: strict linting, comprehensive unit and integration testing across different environments, security vulnerability scanning, and automated deployment to staging servers for QA review before finally pushing to the live user base.
