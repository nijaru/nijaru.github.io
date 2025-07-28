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
            pushedAt
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
    'User-Agent': 'nijaru-github-io',
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN || ''}`
  },
  timeout: 15000 // Increase to 15 second timeout
};

// Function to generate fallback data if API call fails
function generateFallbackData() {
  try {
    console.log('Attempting to use test-fetch.js to generate mock data');
    
    // Create a minimal fallback dataset
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
    fs.writeFileSync(publicOutputPath, jsonData);
    fs.writeFileSync(staticOutputPath, jsonData);
    console.log('Created fallback repository data');
  } catch (error) {
    console.error('Failed to generate fallback data:', error);
    process.exit(1);
  }
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
      
      // Fall back to existing data if available
      if (fs.existsSync(publicOutputPath)) {
        console.warn('Using existing pinned repositories data as fallback');
        process.exit(0);
      } else {
        // Generate mock data as last resort
        console.warn('Generating mock data as fallback');
        generateMockData();
        process.exit(0);
      }
      return;
    }

    try {
      const response = JSON.parse(data);
      
      if (response.errors) {
        console.error('GraphQL Error:', response.errors);
        
        // Fall back to existing data if available
        if (fs.existsSync(publicOutputPath)) {
          console.warn('Using existing pinned repositories data as fallback');
          process.exit(0);
        } else {
          // Generate mock data as last resort
          console.warn('Generating mock data as fallback');
          generateMockData();
          process.exit(0);
        }
        return;
      }

      // Check if data structure is as expected
      if (!response.data?.user?.pinnedItems?.nodes) {
        throw new Error('Unexpected API response structure');
      }

      // Extract and format repository data
      const repos = response.data.user.pinnedItems.nodes.map(repo => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.url,
        homepage: repo.homepageUrl,
        language: repo.primaryLanguage ? repo.primaryLanguage.name : null,
        stargazers_count: repo.stargazerCount,
        forks_count: repo.forkCount,
        pushed_at: repo.pushedAt
      }));

      // Write formatted data to files (both in public and static directories)
      const jsonData = JSON.stringify(repos, null, 2);
      fs.writeFileSync(publicOutputPath, jsonData);
      fs.writeFileSync(staticOutputPath, jsonData);
      console.log(`Successfully wrote ${repos.length} pinned repositories to both public and static directories`);
    } catch (error) {
      console.error('Error processing response:', error);
      
      // Fall back to existing data if available
      if (fs.existsSync(publicOutputPath)) {
        console.warn('Using existing pinned repositories data as fallback');
        process.exit(0);
      } else {
        // Generate mock data as last resort
        console.warn('Generating mock data as fallback');
        generateMockData();
      }
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
  
  // Fall back to existing data if available
  if (fs.existsSync(publicOutputPath)) {
    console.warn('Using existing pinned repositories data as fallback');
    process.exit(0);
  } else {
    // Generate mock data as last resort
    console.warn('Generating mock data as fallback');
    generateMockData();
  }
});

// Function to generate mock data if all else fails
function generateMockData() {
  try {
    // Import mock data generation logic
    import('./test-fetch.js')
      .then(() => console.log('Successfully generated mock data'))
      .catch(err => {
        console.error('Error importing mock data generator:', err);
        
        // Last resort fallback - create minimal mock data inline
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
        fs.writeFileSync(publicOutputPath, jsonData);
        fs.writeFileSync(staticOutputPath, jsonData);
        console.log('Created emergency fallback repository data');
      });
  } catch (error) {
    console.error('Failed to generate mock data:', error);
    process.exit(1);
  }
}

// Send the GraphQL query
req.write(JSON.stringify({ query }));
req.end();