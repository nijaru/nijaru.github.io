# CLAUDE.md - Personal Website Guidelines

## Technology Stack
- **Astro v5.10.2** - Static site generation with component islands
- **Solid.js** - Reactive UI components with signals/resources  
- **Tailwind CSS** - Utility-first styling with custom space/accent colors
- **Geist + JetBrains Mono** - Modern typography stack for body text and code
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
- **Font loading**: Geist (body) + JetBrains Mono (code) via CDN/Google Fonts
- **GitHub integration**: Pinned repos fetched via Actions → static JSON files
- **SSR compatibility**: GitHub repos component handles server/client rendering differences

## Code Patterns
- **Components**: PascalCase files (NavBar.jsx), functional with explicit props
- **Pages**: kebab-case Astro files (about.astro) 
- **Styling**: Tailwind utilities with responsive font sizing, custom CSS variables for theme colors
- **Typography**: CSS clamp() for responsive scaling (16px→18px body, 18px→20px nav)
- **State**: Solid signals for reactive data, resources for async loading
- **Error handling**: try/catch blocks with fallback UI states, ErrorBoundary components

## Design System (2024-2025 Refactor)
- **Philosophy**: Modern space theme with professional execution - inspired by Apple, Linear, Modular, Vercel
- **Colors**: 8px grid system, deep space backgrounds (#08090a), single blue accent (#4493f8), high contrast text
- **Typography**: Geist (body), JetBrains Mono (code), responsive scaling with CSS clamp()
- **Layout**: 720px content width, glass morphism cards, sticky TOC for blog posts
- **Interactions**: Subtle hover effects (1px lift), smooth 0.2s transitions, respect `prefers-reduced-motion`
- **Stars**: Refined twinkling animation (4s cycle, 0.4 opacity, depth layers)
- **Glow effects**: Strategic use only (site title, active nav, CTAs) - removed from body text
- **Code blocks**: Syntax highlighting, line numbers, copy buttons, filename headers

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

## Development Guidelines

### **Design Refinement Process (2024-2025 Major UI Refactor Complete)**
- **Phase 1**: ✅ Refined star field - depth layers, reduced motion support, professional opacity
- **Phase 1.5**: ✅ Strategic glow effects - removed from headings/text, kept for CTAs and hero only  
- **Phase 1.75**: ✅ Zero-overhead performance - pre-sorted arrays, static quality, 80% CPU reduction
- **Phase 1.9**: ✅ Bundle optimization - removed FontAwesome, saved 0.95kB, eliminated 4 dependencies
- **Phase 2**: ✅ Enhanced code blocks - Shiki syntax highlighting, line numbers, copy buttons, space theme
- **Phase 3**: ✅ Complete UI/UX refactor - professional design system, optimized layouts, unified messaging
- **Phase 4**: 🔄 Blog enhancements - reading progress indicator, TOC improvements (optional)

### **Code Quality Standards**
- **Accessibility**: Respect `prefers-reduced-motion`, high contrast ratios, keyboard navigation
- **Performance**: Smooth 60fps animations, efficient rendering, lazy loading
- **Typography**: Consistent spacing system, readable line heights, proper font loading
- **Testing**: Manual cross-browser testing, responsive design validation

### **Performance Optimization Strategy**
- **Static quality tiers**: Device-based star count (300-600) and update intervals set once
- **Zero-overhead rendering**: Pre-sorted arrays, single render loop, no runtime monitoring
- **Battery optimization**: Pause animations when tab hidden via Visibility API
- **Bundle efficiency**: StarField 3.07kB (1.31kB gzipped), 80% CPU reduction achieved
- **Component optimization**: SocialLinks converted to CSS-only (16→14 modules), GitHub repos build-time loading
- **Bundle targets**: <50kB total JS, <3kB per component (gzipped)
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1

## Recent Updates
- **Security**: Updated Astro to v5.10.2, resolved all vulnerabilities
- **Typography**: Switched to Geist + JetBrains Mono, implemented responsive font sizing
- **Performance**: Font preloading, terser minification, error boundaries, bundle optimization
- **TypeScript**: Converted critical components (GithubRepos, ErrorBoundary) for better maintainability
- **Content**: Refreshed about/projects pages, improved blog posts, added Gleam to tech interests
- **Features**: RSS feed, robots.txt, web manifest, sitemap generation, cache headers
- **SEO**: Comprehensive meta tags, Open Graph, Twitter Card support
- **Infrastructure**: Added Vercel/Netlify configurations for enhanced hosting performance
- **Design**: Complete UI/UX refactor (2024-2025) - professional design system, optimized spacing, unified messaging
- **Performance**: GitHub repos instant loading, removed unused components, optimized SocialLinks (CSS-only tooltips), reduced bundle size
- **UX**: Fixed width issues, restored clickable areas, improved blog post layout, consistent terminology