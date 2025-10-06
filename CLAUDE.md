# CLAUDE.md - Personal Website Guidelines

## Technology Stack
- **Astro v5.13.7** - Static site generation with pure vanilla JS components
- **Tailwind CSS v4** - Next-gen CSS engine via @tailwindcss/vite (5x faster builds)
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
- **Static generation**: All pages pre-rendered for performance (0KB JavaScript bundles)
- **Vanilla JS components**: Pure Astro components with inline scripts (no framework overhead)
- **Font loading**: Geist (body) + JetBrains Mono (code) via CDN/Google Fonts
- **GitHub integration**: Pinned repos fetched via Actions → static JSON, stars fetched at build time
- **SEO**: Comprehensive Open Graph, Twitter Cards, canonical URLs, structured data

## Code Patterns
- **Components**: PascalCase Astro files (NavBar.astro), functional with explicit props
- **Pages**: kebab-case Astro files (about.astro)
- **Styling**: Tailwind v4 utilities + custom CSS variables for theme colors
- **Typography**: CSS clamp() for responsive scaling (16px→18px body, 18px→20px nav)
- **Interactivity**: Inline vanilla JavaScript in <script> tags, DOM APIs
- **Error handling**: try/catch blocks with fallback UI states

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
├── components/     # Vanilla JS Astro components
├── content/        # Markdown blog posts
├── layouts/        # Astro layout templates
├── pages/          # Astro page routes
└── styles/         # Tailwind v4, design system, markdown CSS
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
- **Phase 4**: ✅ Framework migration - Solid.js → Vanilla JS (0KB bundle), Tailwind v3 → v4
- **Phase 5**: ✅ Blog & SEO enhancements - prev/next navigation, Open Graph tags, GitHub stars

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

## Recent Updates (October 2025)
- **Tailwind v4**: Migrated to @tailwindcss/vite for 5x faster full builds, 100x+ faster incremental
- **Framework Removal**: Converted all Solid.js components to vanilla JS (292KB → 0KB JavaScript)
- **GitHub Stars**: Added dynamic star count display with automated 6-hour updates via GitHub Actions
- **GitHub Automation**: Workflows for pinned repos and stars with repository-dispatch v4
- **Blog Navigation**: Implemented prev/next post navigation with sorted chronological order
- **SEO Optimization**: Comprehensive Open Graph tags, Twitter Cards (@nijaru0x), canonical URLs
- **Security**: Updated to Astro v5.13.7, resolved all vulnerabilities
- **Typography**: Geist + JetBrains Mono with responsive font sizing
- **Performance**: StarField 3.07kB (1.31kB gzipped), CSS-only tooltips, build-time data loading
- **Content**: 3-part AI blog series ("Type It Yourself", "Future", "Interface"), simplified bio
- **Components**: HiringNotice across blog/about/projects, professional design system
- **Navigation**: Fixed NavBar responsive layout - proper alignment on desktop, hamburger menu on mobile
- **Infrastructure**: Vercel/Netlify configs, RSS feed, sitemap, robots.txt