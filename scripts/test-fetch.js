/**
 * Test script for fetch-pinned-repos.js
 *
 * This script creates mock data similar to what would be fetched from GitHub.
 * Use this for testing the workflow without needing a GitHub token.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const outputDir = path.join(__dirname, '..', 'public', 'data');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const jsonData = JSON.stringify(mockRepos, null, 2);
fs.writeFileSync(path.join(outputDir, 'pinned-repos.json'), jsonData);

console.log('Successfully created mock pinned repos data in public/data/');
