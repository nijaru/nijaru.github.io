# nijaru.github.io

My personal website built with Astro and Solid.js, featuring a space-themed design with interactive components.

## Project Structure

- `src/` - Source code
  - `components/` - Solid.js components
  - `layouts/` - Page layouts
  - `pages/` - Site pages
- `public/` - Static assets

## Features

- Space-themed dark design
- Interactive components built with Solid.js
- Responsive layout with Tailwind CSS
- Blog section
- Project showcase
- Accessible design

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
3. Make sure directories exist: `mkdir -p public/data static/data`
4. The GitHub Action will run automatically on pushes to main and once daily
5. For testing without a token: `node scripts/test-fetch.js`
6. For testing with a token: `GITHUB_TOKEN=your_token node scripts/fetch-pinned-repos.js`

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
