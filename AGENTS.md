# AGENTS.md - Personal Website Guidelines

**Project Type:** Simple static site (portfolio/resume)
**AI Context:** No ai/ directory needed - project guidelines in this file

## Technology Stack
- **Astro v5** - Static site generation with component islands
- **Tailwind CSS v4** - Next-gen CSS engine via @tailwindcss/vite
- **Bun** - Fast JavaScript runtime and package manager
- **Atkinson Hyperlegible** - Accessibility-focused font (via Fontsource)
- **JetBrains Mono** - Monospace font for code (via Fontsource)
- **XeLaTeX** - Resume PDF generation

## Build & Development
```bash
bun install          # Install dependencies
bun run dev          # Development server (localhost:4321)
bun run build        # Build resume PDF + production build → dist/
bun run build:resume # Generate resume PDF only
bun run preview      # Preview production build
```

## Architecture Decisions
- **Static-first**: All pages pre-rendered for maximum performance
- **Bun over npm**: Faster installs and builds
- **Self-hosted fonts**: Atkinson Hyperlegible + JetBrains Mono, no external CDN dependencies
- **No external CSS**: Removed devicons CDN (~100KB) - add back via `<link href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">` in Layout.astro if needed for tech icons
- **Automated resume**: PDF generated from LaTeX source on build
- **GitHub integration**: Pinned repos fetched via Actions → static JSON
- **SEO**: Open Graph tags, sitemap, robots.txt
- **Deployment**: Cloudflare Pages with GitHub auto-deploy on push to main

## File Structure
```
src/
├── components/     # Astro components
├── content/        # Markdown blog posts
├── layouts/        # Astro layout templates
├── pages/          # File-based routing
│   ├── resume.astro     # Online resume
│   └── projects.astro   # Projects showcase
└── utils/          # Utilities
public/
├── data/           # Static JSON (pinned repos)
├── fonts/          # Self-hosted Inter font
├── Nicholas_Russo_Resume.pdf  # Generated from resume.tex
├── manifest.json   # PWA manifest
└── robots.txt      # SEO config
resume.tex          # LaTeX source for PDF resume
```

## Resume Generation
- **Source**: `resume.tex` (LaTeX)
- **Build**: `bun run build:resume` compiles to PDF
- **Output**: Copied to `public/Nicholas_Russo_Resume.pdf`
- **Automation**: Runs automatically before production builds
- **Requirements**: XeLaTeX (installed via TeX Live)

## Design System
- **Philosophy**: Clean, professional design with accessibility focus
- **Colors**: High contrast text, single blue accent (#4493f8)
- **Typography**: Atkinson Hyperlegible (18px base) + JetBrains Mono for code
- **Layout**: Responsive grid, mobile-first approach
- **Performance**: Static-first, self-hosted fonts, minimal JavaScript

## Deployment
- **Platform**: Cloudflare Pages (GitHub integration)
- **Build command**: `bun run build`
- **Build output directory**: `dist/`
- **Production branch**: `main` (automatic deployments on push)
- **Framework preset**: Astro (auto-detected)
- **Domain**: nijaru.com (Cloudflare DNS)

## Development Guidelines
- **Accessibility**: Semantic HTML, keyboard navigation, high contrast
- **Performance**: Static pages, optimized fonts, efficient bundles
- **Code quality**: Clean, maintainable Astro components
- **Git**: Conventional commits, frequent small commits

## AI Context Organization

**Project Pattern:** Simple static site - no ai/ directory needed

This portfolio site uses a simplified structure:
- **AGENTS.md** (this file): Project overview, tech stack, build commands
- **CLAUDE.md**: Symlink to AGENTS.md for compatibility
- **No ai/ directory**: Simple project with stable architecture, no complex development phases

**When to add ai/ structure:**
- If adding complex features requiring multi-session planning
- If tracking research/design decisions
- If project grows beyond simple static site

**Reference:** github.com/nijaru/agent-contexts
