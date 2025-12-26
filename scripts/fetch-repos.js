/**
 * Fetch GitHub Repository Data via GraphQL API
 *
 * Fetches pinned repos and specific project repos in a single query.
 * Outputs to a single JSON file used by both Featured Repos and Recent Projects.
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const username = "nijaru";

// Repos to fetch (owner/name) - these are the project repos we track
const projectRepos = [
	{ owner: "omendb", name: "seerdb" },
	{ owner: "omendb", name: "omendb" },
	{ owner: "nijaru", name: "aircher" },
	{ owner: "nijaru", name: "zenith" },
	{ owner: "nijaru", name: "hygrep" },
	{ owner: "nijaru", name: "jb" },
	{ owner: "nijaru", name: "sy" },
	{ owner: "nijaru", name: "yt-text" },
];

// Build GraphQL query with aliases for each project repo
const repoQueries = projectRepos
	.map(
		(repo, i) => `
  repo${i}: repository(owner: "${repo.owner}", name: "${repo.name}") {
    name
    owner { login }
    description
    url
    homepageUrl
    primaryLanguage { name }
    stargazerCount
    forkCount
  }
`,
	)
	.join("\n");

const query = `
  query {
    user(login: "${username}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            owner { login }
            description
            url
            homepageUrl
            primaryLanguage { name }
            stargazerCount
            forkCount
          }
        }
      }
    }
    ${repoQueries}
  }
`;

const outputDir = path.join(__dirname, "..", "public", "data");
const outputPath = path.join(outputDir, "repos.json");

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const options = {
	hostname: "api.github.com",
	path: "/graphql",
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"User-Agent": "nijaru-github-io",
		Authorization: `Bearer ${process.env.GITHUB_TOKEN || ""}`,
	},
	timeout: 15000,
};

function formatRepo(repo) {
	return {
		name: repo.name,
		owner: repo.owner?.login || "nijaru",
		description: repo.description,
		html_url: repo.url,
		homepage: repo.homepageUrl,
		language: repo.primaryLanguage?.name || null,
		stargazers_count: repo.stargazerCount,
		forks_count: repo.forkCount,
	};
}

function generateFallbackData() {
	const fallbackData = { pinned: [], projects: {} };
	fs.writeFileSync(outputPath, JSON.stringify(fallbackData, null, 2));
	console.log("Created fallback repository data");
}

if (!process.env.GITHUB_TOKEN) {
	console.warn("Warning: GITHUB_TOKEN not set. API call will likely fail.");
}

const req = https.request(options, (res) => {
	let data = "";

	res.on("data", (chunk) => {
		data += chunk;
	});

	res.on("end", () => {
		if (res.statusCode !== 200) {
			console.error(`Error: Received status code ${res.statusCode}`);
			console.error(data);
			if (fs.existsSync(outputPath)) {
				console.warn("Using existing repository data as fallback");
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
				console.error("GraphQL Error:", response.errors);
				if (fs.existsSync(outputPath)) {
					console.warn("Using existing repository data as fallback");
					process.exit(0);
				} else {
					generateFallbackData();
					process.exit(0);
				}
				return;
			}

			// Extract pinned repos
			const pinned = (response.data?.user?.pinnedItems?.nodes || []).map(
				formatRepo,
			);

			// Extract project repos into a lookup by owner/name
			const projects = {};
			projectRepos.forEach((repo, i) => {
				const repoData = response.data[`repo${i}`];
				if (repoData) {
					const key = `${repo.owner}/${repo.name}`;
					projects[key] = formatRepo(repoData);
				}
			});

			const output = { pinned, projects };
			fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
			console.log(
				`Successfully wrote ${pinned.length} pinned + ${Object.keys(projects).length} project repos`,
			);
		} catch (error) {
			console.error("Error processing response:", error);
			if (fs.existsSync(outputPath)) {
				console.warn("Using existing repository data as fallback");
				process.exit(0);
			} else {
				generateFallbackData();
			}
		}
	});
});

req.on("error", (error) => {
	console.error("Request error:", error);
	if (fs.existsSync(outputPath)) {
		console.warn("Using existing repository data as fallback");
		process.exit(0);
	} else {
		generateFallbackData();
	}
});

req.write(JSON.stringify({ query }));
req.end();
