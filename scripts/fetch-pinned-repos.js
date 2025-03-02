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

// Paths to save the JSON file
const publicOutputDir = path.join(__dirname, '..', 'public', 'data');
const staticOutputDir = path.join(__dirname, '..', 'static', 'data');
const publicOutputPath = path.join(publicOutputDir, 'pinned-repos.json');
const staticOutputPath = path.join(staticOutputDir, 'pinned-repos.json');

// Ensure the output directories exist
if (!fs.existsSync(publicOutputDir)) {
  fs.mkdirSync(publicOutputDir, { recursive: true });
}
if (!fs.existsSync(staticOutputDir)) {
  fs.mkdirSync(staticOutputDir, { recursive: true });
}

// GitHub API request options
const options = {
  hostname: 'api.github.com',
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Node.js',
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN || 'ADD_TOKEN_HERE'}`
  }
};

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
      process.exit(1);
    }

    try {
      const response = JSON.parse(data);
      
      if (response.errors) {
        console.error('GraphQL Error:', response.errors);
        process.exit(1);
      }

      // Extract and format repository data
      const repos = response.data.user.pinnedItems.nodes.map(repo => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.url,
        homepage: repo.homepageUrl,
        language: repo.primaryLanguage ? repo.primaryLanguage.name : null,
        stargazers_count: repo.stargazerCount,
        forks_count: repo.forkCount
      }));

      // Write formatted data to files (both in public and static directories)
      const jsonData = JSON.stringify(repos, null, 2);
      fs.writeFileSync(publicOutputPath, jsonData);
      fs.writeFileSync(staticOutputPath, jsonData);
      console.log(`Successfully wrote ${repos.length} pinned repositories to both public and static directories`);
    } catch (error) {
      console.error('Error processing response:', error);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
  process.exit(1);
});

// Send the GraphQL query
req.write(JSON.stringify({ query }));
req.end();