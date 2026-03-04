# What steps can you take to ensure you handle data securely in your daily tasks?

As a developer, my primary steps include ensuring I never hardcode sensitive information (like API keys or database passwords) directly into the source code. I will always use environment variables (e.g., `.env` files) and ensure they are added to my `.gitignore` file so they are never accidentally pushed to a public or shared GitHub repository. Additionally, I will ensure my computer is locked whenever I step away from my desk.

# How should you store, share, and dispose of sensitive information safely?

- **Store:** Sensitive credentials should be stored in a secure, approved password manager rather than plain text files or browser auto-fills.
- **Share:** If I must share a credential or sensitive test-user data with a team member, I will use secure, encrypted channels (like a password manager's sharing feature or temporary encrypted links) rather than pasting them directly into Slack or email.
- **Dispose:** I will securely delete local database dumps or files containing user data once they are no longer needed for testing. I will also ensure any temporary access tokens I generate are explicitly revoked.

# What are some common mistakes that lead to data privacy issues, and how can they be avoided?

A very common mistake for developers is accidentally committing sensitive data to version control (GitHub). This can be avoided by habitually running `git status` and `git diff` before every commit to review what is being uploaded. Another common mistake is leaving a workstation unlocked, which can be avoided by setting an aggressive auto-lock timer on my operating system.

# Identify at least one habit or practice you can adopt to improve data security in your role.

I will adopt the habit of strictly reviewing my code for any hardcoded secrets or sensitive user data before making any `git commit` or opening a Pull Request.

# Document at least one key learning or security measure you will implement.

I will implement and strictly adhere to the use of `.env` files for all local environment configurations, ensuring that my local `.gitignore` is properly configured from day one to prevent accidental data leaks.
