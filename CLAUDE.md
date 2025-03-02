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

## Project Structure
- `src/` - Source code
  - `components/` - Solid.js UI components
  - `layouts/` - Page layouts (Astro)
  - `pages/` - Content pages (Astro)
  - `styles/` - CSS styles
- `public/` - Static assets served at root
- `static/` - Static assets like favicons and site manifest
- `scripts/` - Backend scripts (GitHub pinned repos fetcher)
- `.github/workflows/` - GitHub Action configurations
- `dist/` - Build output (generated)

## Key Configuration Files
- `astro.config.mjs` - Astro configuration with Solid.js and Tailwind integrations
- `tailwind.config.mjs` - Tailwind CSS customizations for space theme
- `package.json` - Dependencies and scripts

## Code Style
- JavaScript/JSX: Use ES modules, Solid.js reactive patterns
- CSS: Use Tailwind utility classes
- Astro: Follow Astro component structure
- File naming: Use PascalCase for components, kebab-case for pages
- Commit messages: Use present tense, concise descriptions

## Theme Guidelines
- Color palette: 
  - Dark space backgrounds (space-800, space-900)
  - Lime green highlights (lime-400, lime-500)
  - Light blue/purple accents
- Animation classes available for star field effects
- Responsive design using Tailwind breakpoints

## Project Context
- Personal website/blog for Nick Russo
- Space-themed design with interactive components
- Content focuses on software engineering and technical topics

## GitHub Integration
- GitHub pinned repositories are fetched via a scheduled GitHub Action
- Uses GitHub GraphQL API with a token (PINNED_FETCH_TOKEN)
- Data is pre-generated and stored in both:
  - `/public/data/pinned-repos.json` (for production)
  - `/static/data/pinned-repos.json` (for development)
- GithubRepos component fetches from these static files instead of direct API calls