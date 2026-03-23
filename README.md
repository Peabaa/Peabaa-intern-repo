# Peabaa-intern-repo

## Environment Setup

This project is a React Single Page Application (SPA) bundled with Vite and styled with Tailwind CSS (v3).

### Setup Process:

1. **Core Framework:** Installed Vite and its React plugin (`npm install -D vite @vitejs/plugin-react`) to act as the local development server and build tool.
2. **Architecture:** Reorganized the repository to match standard React architecture by moving all component code (`.jsx` files), CSS, and translation logic into a dedicated `src/` folder.
3. **Entry Points:** Created the `index.html` root file and the `src/main.jsx` file to initialize the React application and inject the global stylesheets.
4. **Tailwind CSS:** Installed Tailwind v3, generated the `tailwind.config.js` file, configured the `content` array to scan all `.jsx` files, and injected the `@tailwind` directives into `index.css`.
5. **Linting:** Configured the Airbnb ESLint ruleset to recognize Vite build files and ignore the custom Tailwind CSS rules to prevent false positive errors.
