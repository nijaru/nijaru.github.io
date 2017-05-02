/**
 * Test script for fetch-pinned-repos.js
 * 
 * This script creates mock data similar to what would be fetched from GitHub.
 * Use this for testing the workflow without needing a GitHub token.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create mock repo data
const mockRepos = [
  {
    name: "project-one",
    description: "A cool project with interesting features",
    html_url: "https://github.com/nijaru/project-one",
    homepage: "https://project-one.example.com",
    language: "JavaScript",
    stargazers_count: 12,
    forks_count: 3
  },
  {
    name: "awesome-tool",
    description: "Command line utility for productivity",
    html_url: "https://github.com/nijaru/awesome-tool",
    homepage: null,
    language: "Rust",
    stargazers_count: 45,
    forks_count: 8
  },
  {
    name: "data-visualizer",
    description: "Interactive visualization library",
    html_url: "https://github.com/nijaru/data-visualizer",
    homepage: "https://docs.example.com/visualizer",
    language: "TypeScript",
    stargazers_count: 27,
    forks_count: 5
  }
];

// Ensure directories exist
const publicOutputDir = path.join(__dirname, '..', 'public', 'data');
const staticOutputDir = path.join(__dirname, '..', 'static', 'data');

if (!fs.existsSync(publicOutputDir)) {
  fs.mkdirSync(publicOutputDir, { recursive: true });
}
if (!fs.existsSync(staticOutputDir)) {
  fs.mkdirSync(staticOutputDir, { recursive: true });
}

// Write to both locations
const jsonData = JSON.stringify(mockRepos, null, 2);
fs.writeFileSync(path.join(publicOutputDir, 'pinned-repos.json'), jsonData);
fs.writeFileSync(path.join(staticOutputDir, 'pinned-repos.json'), jsonData);

console.log('Successfully created mock pinned repos data in both directories!');