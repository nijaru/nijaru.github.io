# CLAUDE.md - Agent Guidelines for nijaru.github.io

## Technology Stack
- [Astro](https://astro.build/) - Web framework for content-focused websites
- [Solid.js](https://www.solidjs.com/) - Reactive JavaScript UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Node.js (>=18.0.0) or Bun (>=1.0.0) required
- GitHub Actions - For automated workflows (pinned repos fetching)

## Build Commands
- Install dependencies: `npm install`
- Development server: `npm run dev` or `npm start`
- Build site: `npm run build` (outputs to dist/ directory)
- Preview build: `npm run preview`
- Run specific script: `node scripts/script-name.js`

## Code Style Guidelines
- **JavaScript/JSX**:
  - Use ES modules for imports/exports
  - Follow Solid.js reactive patterns with signals and resources
  - Document components with JSDoc comments including @param descriptions
  - Use const for variables that don't change, let otherwise
  - Use async/await for asynchronous operations
  - Handle errors with try/catch blocks and provide meaningful error messages
- **CSS**: Use Tailwind utility classes, prefer composition over custom classes
- **Component Structure**:
  - Name files: PascalCase for components (NavBar.jsx), kebab-case for pages (about.astro)
  - Prefer functional components with explicit props destructuring
  - Group related state declarations at the top of components
  - Use cleanup handlers to prevent memory leaks (onCleanup, onMount)
- **Formatting**:
  - Use consistent indentation (2 spaces)
  - Place component props on new lines when they exceed 3 properties
  - Use semicolons at the end of statements
- **Commit messages**: Use present tense, concise descriptions

## Theme Guidelines
- Color palette: 
  - Dark space backgrounds (space-800, space-900)
  - Lime green highlights (lime-400, lime-500)
  - Light blue/purple accents (accent-blue, accent-purple)
- Animation classes available for star field effects
- Responsive design using Tailwind breakpoints (md:, lg:)

## GitHub Integration
- GitHub pinned repositories are fetched via a scheduled GitHub Action
- Uses GitHub GraphQL API with a token (GITHUB_TOKEN)
- Data is pre-generated and stored in both:
  - `/public/data/pinned-repos.json` (for production)
  - `/static/data/pinned-repos.json` (for development)
- GithubRepos component fetches from these static files instead of direct API calls