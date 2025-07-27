# nijaru.github.io

Personal website built with Astro v5.10.2 and Solid.js, featuring a space-themed design with responsive typography and interactive components.

## Technology Stack

- **Astro v5.10.2** - Static site generation with component islands architecture
- **Solid.js** - Reactive UI components with signals/resources  
- **Tailwind CSS** - Utility-first styling with custom responsive font system
- **TypeScript** - Type safety for critical components
- **Atkinson Hyperlegible** - Accessible typography optimized for readability

## Project Structure

```
src/
├── components/          # Solid.js interactive components
│   ├── GithubRepos.tsx     # GitHub repositories display (TypeScript)
│   ├── ErrorBoundary.tsx   # Error handling wrapper (TypeScript)
│   ├── NavBar.jsx          # Navigation with responsive sizing
│   ├── TextGlow.jsx        # Text glow animation effects
│   └── ...
├── content/             # Markdown blog posts with frontmatter
├── layouts/             # Astro layout templates
├── pages/               # File-based routing
└── styles/              # Global CSS and markdown styles
public/
├── data/                # Static JSON data (GitHub repos)
├── manifest.json        # PWA manifest
└── robots.txt           # SEO configuration
```

## Features

### Core
- **Responsive Design** - CSS clamp() typography that scales from mobile to desktop
- **Component Islands** - Selective hydration for optimal performance
- **Blog System** - Markdown-based with RSS feed generation
- **GitHub Integration** - Automated pinned repository display
- **PWA Ready** - Web manifest and offline-capable architecture

### Performance
- **Font Optimization** - Preloaded Atkinson Hyperlegible with subset loading
- **Bundle Optimization** - Terser minification with tree shaking
- **Error Boundaries** - Graceful failure handling for API components
- **Cache Headers** - Long-term caching for static assets (Vercel/Netlify)

### Accessibility
- **Screen Reader Support** - Semantic HTML and ARIA attributes
- **Keyboard Navigation** - Full keyboard accessibility
- **High Contrast** - Space theme with sufficient color contrast
- **Readable Fonts** - Atkinson Hyperlegible designed for accessibility

## Development

```bash
npm install          # Install dependencies
npm run dev          # Development server (localhost:4321)
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

## GitHub Integration

Pinned repositories are automatically fetched and displayed using GitHub Actions:

```bash
# Workflow runs every 6 hours and fetches pinned repos
# Data stored in public/data/pinned-repos.json
# Client-side component reads static JSON (no API calls)
```

**Setup:**
1. Create GitHub Personal Access Token with `read:user` scope
2. Add as repository secret: `PINNED_FETCH_TOKEN`
3. Workflow automatically updates data and commits changes

## Responsive Typography

The site uses CSS `clamp()` for responsive font scaling:

```css
/* Examples from tailwind.config.mjs */
'responsive-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)'   /* 16px → 18px */
'responsive-lg': 'clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)' /* 18px → 20px */
```

**Applied to:**
- Body text: Scales from 16px (mobile) to 18px (desktop)
- Navigation: Scales from 18px (mobile) to 20px (desktop)
- Brand name: Scales from 20px (mobile) to 24px (desktop)

## Hosting & Performance

**Optimized for:**
- **GitHub Pages** - Default hosting with automatic deployments
- **Vercel/Netlify** - Enhanced with cache headers for better performance
- **Cloudflare Pages** - Full optimization with 1-week asset caching

**Lighthouse Scores:** Optimized for Core Web Vitals with font preloading, minification, and selective component hydration.

## Architecture Decisions

- **Static-first** - Pre-rendered pages for maximum performance
- **Island architecture** - JavaScript only where needed (`client:idle`, `client:visible`)
- **TypeScript** - Critical components converted for better maintainability
- **Error boundaries** - Graceful degradation for API failures
- **Responsive fonts** - Better readability across all devices

## License

MIT License - see [LICENSE](LICENSE) file for details.
