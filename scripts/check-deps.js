#!/usr/bin/env node
/**
 * check-deps.js - Check for outdated dependencies
 * 
 * This script runs npm outdated and formats the results into a more readable format.
 * It can be used to identify packages that need updating in the project.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// ANSI color codes for output formatting
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

console.log(`${colors.cyan}${colors.bold}Checking for outdated dependencies...${colors.reset}\n`);

try {
  // Read the current package.json
  const packageJsonPath = path.join(rootDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  console.log(`${colors.bold}Current package.json dependencies:${colors.reset}`);
  printDependencies(packageJson.dependencies, 'Dependencies');
  printDependencies(packageJson.devDependencies, 'DevDependencies');
  
  // Run npm outdated in JSON format and parse the results
  console.log(`\n${colors.bold}Checking for updates...${colors.reset}`);
  
  try {
    const outdated = JSON.parse(execSync('npm outdated --json', {
      cwd: rootDir,
      stdio: ['pipe', 'pipe', 'pipe']
    }));
    
    if (Object.keys(outdated).length === 0) {
      console.log(`\n${colors.green}All dependencies are up to date!${colors.reset}`);
    } else {
      console.log(`\n${colors.yellow}${colors.bold}Outdated dependencies:${colors.reset}`);
      console.log('\n-------------------------------------');
      console.log(`${colors.bold}Package name        Current  Wanted   Latest   Type${colors.reset}`);
      console.log('-------------------------------------');
      
      Object.entries(outdated).forEach(([packageName, info]) => {
        const current = info.current || 'N/A';
        const wanted = info.wanted || 'N/A';
        const latest = info.latest || 'N/A';
        const type = info.type || 'unknown';
        
        let color = colors.yellow;
        if (semverDiff(current, latest) === 'major') {
          color = colors.red;
        } else if (semverDiff(current, latest) === 'minor') {
          color = colors.yellow;
        } else {
          color = colors.green;
        }
        
        console.log(
          `${color}${packageName.padEnd(18)} ${current.padEnd(8)} ${wanted.padEnd(8)} ${latest.padEnd(8)} ${type}${colors.reset}`
        );
      });
      
      console.log('\n-------------------------------------');
      console.log(`${colors.bold}Update suggestions:${colors.reset}`);
      
      // Group packages by update type
      const majors = [];
      const minors = [];
      const patches = [];
      
      Object.entries(outdated).forEach(([packageName, info]) => {
        const diff = semverDiff(info.current, info.latest);
        if (diff === 'major') {
          majors.push(packageName);
        } else if (diff === 'minor') {
          minors.push(packageName);
        } else {
          patches.push(packageName);
        }
      });
      
      if (patches.length > 0) {
        console.log(`\n${colors.green}Safe to update (patch):${colors.reset}`);
        console.log(`npm install ${patches.map(p => `${p}@latest`).join(' ')}`);
      }
      
      if (minors.length > 0) {
        console.log(`\n${colors.yellow}Consider updating (minor):${colors.reset}`);
        console.log(`npm install ${minors.map(p => `${p}@latest`).join(' ')}`);
      }
      
      if (majors.length > 0) {
        console.log(`\n${colors.red}Breaking changes possible (major):${colors.reset}`);
        console.log(`npm install ${majors.map(p => `${p}@latest`).join(' ')}`);
      }
    }
  } catch (error) {
    // Handle the case where no outdated dependencies are found
    if (error.status === 0) {
      console.log(`\n${colors.green}All dependencies are up to date!${colors.reset}`);
    } else {
      console.error(`\n${colors.red}Error running npm outdated:${colors.reset}`, error.message);
      process.exit(1);
    }
  }
} catch (error) {
  console.error(`${colors.red}Error:${colors.reset}`, error.message);
  process.exit(1);
}

/**
 * Prints the dependencies from package.json in a formatted table
 * @param {Object} deps - Dependencies object from package.json
 * @param {string} title - Title for this section of dependencies
 */
function printDependencies(deps, title) {
  if (!deps || Object.keys(deps).length === 0) return;
  
  console.log(`\n${colors.bold}${title}:${colors.reset}`);
  console.log('-------------------------');
  
  Object.entries(deps).forEach(([name, version]) => {
    console.log(`${name.padEnd(25)} ${version}`);
  });
}

/**
 * Simple semver difference checker
 * @param {string} current - Current version
 * @param {string} latest - Latest version
 * @returns {'major'|'minor'|'patch'} The type of version difference
 */
function semverDiff(current, latest) {
  if (!current || !latest) return 'unknown';
  
  const currentParts = current.replace(/[^\d.]/g, '').split('.');
  const latestParts = latest.replace(/[^\d.]/g, '').split('.');
  
  if (parseInt(latestParts[0]) > parseInt(currentParts[0])) {
    return 'major';
  } else if (parseInt(latestParts[1]) > parseInt(currentParts[1])) {
    return 'minor';
  } else {
    return 'patch';
  }
}