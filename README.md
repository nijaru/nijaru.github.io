# nijaru.github.io

Personal website built with Astro and Tailwind CSS v4, featuring clean design with responsive typography.

## Technology Stack

- **Astro v5** - Static site generation with component islands architecture
- **Tailwind CSS v4** - Utility-first styling with custom responsive font system
- **Bun** - Fast JavaScript runtime and package manager
- **Inter** - Self-hosted variable font for consistent typography
- **LaTeX** - Resume generation with XeLaTeX

## Project Structure

```
src/
├── components/          # Astro components
├── content/             # Markdown blog posts
├── layouts/             # Astro layout templates
├── pages/               # File-based routing
│   ├── resume.astro         # Online resume
│   └── projects.astro       # Projects showcase
└── utils/               # Utilities and helpers
public/
├── data/                    # Static JSON (pinned repos)
├── fonts/                   # Self-hosted Inter font
├── Nicholas_Russo_Resume.pdf  # Generated from resume.tex
├── manifest.json            # PWA manifest
└── robots.txt               # SEO config
resume.tex               # LaTeX source for PDF resume
```

## Features

### Core
- **Responsive Design** - CSS clamp() typography that scales from mobile to desktop
- **Component Islands** - Selective hydration for optimal performance
- **Blog System** - Markdown-based with RSS feed generation
- **GitHub Integration** - Automated pinned repository display
- **PWA Ready** - Web manifest and offline-capable architecture

### Performance
- **Font Optimization** - Self-hosted Inter variable font with subset loading
- **Bundle Optimization** - Terser minification with tree shaking
- **Static-first** - Pre-rendered pages for maximum speed

### Accessibility
- **Screen Reader Support** - Semantic HTML and ARIA attributes
- **Keyboard Navigation** - Full keyboard accessibility
- **Readable Fonts** - Inter variable font for clarity

## Development

```bash
bun install          # Install dependencies
bun run dev          # Development server (localhost:4321)
bun run build        # Build resume PDF + production build → dist/
bun run build:resume # Generate resume PDF only
bun run preview      # Preview production build
```

**Resume Generation:**
- `bun run build:resume` - Compiles `resume.tex` to PDF and copies to `public/`
- Requires XeLaTeX (installed via TeX Live)
- PDF automatically generated before each production build

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

## Hosting

**Deployed on:**
- **Cloudflare Pages** - Automatic deployments from main branch
- Domain managed through Cloudflare DNS

**Lighthouse Scores:** Optimized for Core Web Vitals with font preloading, minification, and selective component hydration.

## Architecture Decisions

- **Static-first** - Pre-rendered pages for maximum performance
- **Bun over npm** - Faster installs and builds
- **Self-hosted fonts** - No external font CDN dependencies
- **Automated resume** - PDF generated from LaTeX on build
- **Responsive fonts** - CSS clamp() for fluid typography

## License

MIT License - see [LICENSE](LICENSE) file for details.
