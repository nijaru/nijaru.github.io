/**
 * Fetch GitHub Pinned Repositories via GraphQL API
 *
 * This script fetches a user's pinned GitHub repositories using the GraphQL API
 * and stores them in a static JSON file for client-side consumption.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GitHub username to fetch pinned repos for
const username = 'nijaru';

// GraphQL query to fetch pinned repositories
const query = `
  query {
    user(login: "${username}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            primaryLanguage {
              name
            }
            stargazerCount
            forkCount
          }
        }
      }
    }
  }
`;

// Path to save the JSON file
const outputDir = path.join(__dirname, '..', 'public', 'data');
const outputPath = path.join(outputDir, 'pinned-repos.json');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// GitHub API request options
const options = {
  hostname: 'api.github.com',
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'nijaru-github-io',
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN || ''}`
  },
  timeout: 15000
};

// Function to generate fallback data
function generateFallbackData() {
  const fallbackData = [
    {
      name: "repository-placeholder",
      description: "Repository data could not be fetched",
      html_url: "https://github.com/nijaru",
      homepage: null,
      language: null,
      stargazers_count: 0,
      forks_count: 0
    }
  ];

  const jsonData = JSON.stringify(fallbackData, null, 2);
  fs.writeFileSync(outputPath, jsonData);
  console.log('Created fallback repository data');
}

// Verify GitHub token exists
if (!process.env.GITHUB_TOKEN) {
  console.warn('Warning: GITHUB_TOKEN not set. API call will likely fail.');
}

// Make the GraphQL request
const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`Error: Received status code ${res.statusCode}`);
      console.error(data);

      if (fs.existsSync(outputPath)) {
        console.warn('Using existing pinned repositories data as fallback');
        process.exit(0);
      } else {
        generateFallbackData();
        process.exit(0);
      }
      return;
    }

    try {
      const response = JSON.parse(data);

      if (response.errors) {
        console.error('GraphQL Error:', response.errors);

        if (fs.existsSync(outputPath)) {
          console.warn('Using existing pinned repositories data as fallback');
          process.exit(0);
        } else {
          generateFallbackData();
          process.exit(0);
        }
        return;
      }

      if (!response.data?.user?.pinnedItems?.nodes) {
        throw new Error('Unexpected API response structure');
      }

      const repos = response.data.user.pinnedItems.nodes.map(repo => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.url,
        homepage: repo.homepageUrl,
        language: repo.primaryLanguage ? repo.primaryLanguage.name : null,
        stargazers_count: repo.stargazerCount,
        forks_count: repo.forkCount
      }));

      const jsonData = JSON.stringify(repos, null, 2);
      fs.writeFileSync(outputPath, jsonData);
      console.log(`Successfully wrote ${repos.length} pinned repositories to public/data/`);
    } catch (error) {
      console.error('Error processing response:', error);

      if (fs.existsSync(outputPath)) {
        console.warn('Using existing pinned repositories data as fallback');
        process.exit(0);
      } else {
        generateFallbackData();
      }
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);

  if (fs.existsSync(outputPath)) {
    console.warn('Using existing pinned repositories data as fallback');
    process.exit(0);
  } else {
    generateFallbackData();
  }
});

req.write(JSON.stringify({ query }));
req.end();
