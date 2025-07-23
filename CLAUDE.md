# CLAUDE.md - Personal Website Guidelines

## Technology Stack
- **Astro v5.10.2** - Static site generation with component islands
- **Solid.js** - Reactive UI components with signals/resources  
- **Tailwind CSS** - Utility-first styling with custom space/accent colors
- **Atkinson Hyperlegible fonts** - Accessible typography (Next + Mono variants)
- **Node.js >=18** - Runtime requirement

## Build & Development
```bash
npm install          # Install dependencies
npm run dev          # Development server (localhost:4321)
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

## Architecture Decisions
- **Static generation**: All pages pre-rendered for performance
- **Component islands**: Solid.js components hydrated on demand with `client:` directives
- **Font loading**: Atkinson Hyperlegible Next (body) + Mono (code) via Google Fonts
- **GitHub integration**: Pinned repos fetched via Actions → static JSON files
- **SSR compatibility**: GitHub repos component handles server/client rendering differences

## Code Patterns
- **Components**: PascalCase files (NavBar.jsx), functional with explicit props
- **Pages**: kebab-case Astro files (about.astro) 
- **Styling**: Tailwind utilities, custom CSS variables for theme colors
- **State**: Solid signals for reactive data, resources for async loading
- **Error handling**: try/catch blocks with fallback UI states

## Theme System
- **Colors**: Dark space backgrounds, lime-400/500 highlights, accent-blue/purple
- **Typography**: Atkinson Hyperlegible Next (accessible), Mono for code blocks
- **Layout**: Responsive grid, card-containers with hover effects
- **Animation**: Star field background, text glow effects, smooth transitions

## GitHub Automation
- **Workflow**: `.github/workflows/fetch-pinned-repos.yml` runs every 6 hours
- **Script**: `scripts/fetch-pinned-repos.js` fetches via GraphQL API
- **Data**: Stored in `public/data/pinned-repos.json` for production
- **Token**: Uses `PINNED_FETCH_TOKEN` secret for API access

## File Structure
```
src/
├── components/     # Solid.js UI components
├── content/        # Markdown blog posts
├── layouts/        # Astro layout templates  
├── pages/          # Astro page routes
└── styles/         # Global CSS and markdown styles
public/
└── data/           # Static JSON data files
scripts/            # Build and utility scripts
```

## Recent Updates
- **Security**: Updated Astro to v5.10.2, resolved all vulnerabilities
- **Fonts**: Implemented Atkinson Hyperlegible for accessibility
- **Content**: Refreshed about/projects pages with current work
- **Links**: Added GitHub repository links to project cards