# nijaru.github.io

My personal website built with Astro and Solid.js, featuring a space-themed design with interactive components.

## Project Structure

- `src/` - Source code
  - `components/` - Solid.js components
    - `ArrowLink.jsx` - Reusable arrow link component
    - `BlogPostPreview.jsx` - Blog post card component
    - `GithubRepos.jsx` - GitHub repositories display
    - `NavBar.jsx` - Navigation bar with mobile menu
    - `TextGlow.jsx` - Text with glow animation effect
    - And more...
  - `layouts/` - Page layouts
  - `pages/` - Site pages
- `public/` - Static assets

## Features

- Space-themed dark design
- Interactive components built with Solid.js
- Responsive layout with Tailwind CSS
- Blog section
- Project showcase
- Enhanced accessibility with ARIA attributes
- Keyboard navigation support
- Proper component cleanup for SPA navigation

## Design Elements

- Dark space background
- Lime green highlights
- Light blue/purple accents
- Animated star field
- Glowing text effects

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build site
npm run build
```

### GitHub Repository Data

This site displays pinned GitHub repositories using a secure GitHub Action workflow:

1. A GitHub Action fetches pinned repos via GraphQL API using a dedicated token
2. The data is stored in a static JSON file at `public/data/pinned-repos.json`
3. The SolidJS component reads from this file instead of making API calls

#### Setting up the GitHub Token

To enable the pinned repository feature:

1. Create a GitHub Personal Access Token with the `read:user` and `repo` scopes
2. Add the token to your repository secrets with the name `PINNED_FETCH_TOKEN` 
3. The workflow will automatically fetch repos before each deploy and once daily

#### Local Development

For testing and local development:

1. Create directories if needed: `mkdir -p public/data static/data`
2. For mock data (without API call): `node scripts/test-fetch.js`
3. For real data (with your token): `GITHUB_TOKEN=your_token node scripts/fetch-pinned-repos.js`

#### Workflow Integration

- The deploy workflow will fetch pinned repos before building the site
- The fetch-pinned-repos workflow runs daily to keep data fresh
- Both workflows commit changes directly to the repository

## Bio Page

Contains information about:
- Technical background (Python, Go, C/C++, etc.)
- Areas of interest
- Current projects
- Social links (GitHub, X, Bluesky, LinkedIn)

## Roadmap

- Expand blog content
- Add more interactive components
- Create dedicated project pages
- Implement dark/light mode toggle
- Continue improving accessibility features
- Add e2e testing with Playwright

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
