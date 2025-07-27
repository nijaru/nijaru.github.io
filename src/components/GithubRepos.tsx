import {
	For,
	Show,
	createResource,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";

interface Repository {
	name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
}

interface GithubReposProps {
	username?: string; // Not used in current implementation but kept for API compatibility
	limit?: number;
}

/**
 * Displays GitHub repositories from a pre-generated JSON file
 */
export default function GithubRepos({ username, limit }: GithubReposProps) {
	const [isLoading, setIsLoading] = createSignal(true);
	const [errorMessage, setErrorMessage] = createSignal<string | null>(null);
	let loadingTimeout: number | undefined;

	// Fetch pinned repositories from static JSON file
	const [repos] = createResource<Repository[]>(async () => {
		try {
			setIsLoading(true);
			let data: Repository[];
			
			if (typeof window !== 'undefined') {
				// Client-side: use fetch with relative path
				const basePath = import.meta.env.BASE_URL || "/";
				const jsonPath = `${basePath.endsWith("/") ? basePath.slice(0, -1) : basePath}/data/pinned-repos.json`;
				const response = await fetch(jsonPath);
				if (!response.ok) {
					throw new Error(`Failed to fetch repositories: ${response.status}`);
				}
				data = await response.json() as Repository[];
			} else {
				// Server-side: read file directly
				const { readFileSync } = await import('fs');
				const { fileURLToPath } = await import('url');
				const { dirname, join } = await import('path');
				const __filename = fileURLToPath(import.meta.url);
				const __dirname = dirname(__filename);
				const filePath = join(__dirname, '../../public/data/pinned-repos.json');
				const fileContent = readFileSync(filePath, 'utf-8');
				data = JSON.parse(fileContent) as Repository[];
			}

			// Limit the number of repos based on the limit prop
			if (limit && limit > 0 && Array.isArray(data)) {
				data = data.slice(0, limit);
			}

			if (!Array.isArray(data)) {
				throw new Error("Invalid repository data format");
			}

			setIsLoading(false);
			return data;
		} catch (error) {
			console.error("Error fetching GitHub repos:", error);
			setErrorMessage("Failed to load repositories. Please try again later.");
			setIsLoading(false);
			return [];
		}
	});

	// Force loading to complete after a timeout (fallback)
	onMount(() => {
		loadingTimeout = window.setTimeout(() => {
			if (isLoading()) {
				setIsLoading(false);
				console.debug("GitHub repos loading timed out - forcing completion");
			}
		}, 3000); // Reduced timeout for better UX
	});

	// Clean up timeout when component unmounts
	onCleanup(() => {
		if (loadingTimeout) {
			clearTimeout(loadingTimeout);
		}
	});

	// Grid classes memoized to prevent recalculation
	// This is a simple memoization since the function only depends on limit and repoCount
	const gridClassCache: Record<string, string> = {};
	const getGridClass = (repoCount: number): string => {
		const cacheKey = `${limit || 0}-${repoCount}`;
		
		if (gridClassCache[cacheKey]) {
			return gridClassCache[cacheKey];
		}
		
		let result: string;
		// For homepage layout (max 2)
		if (limit === 2) {
			result = "grid gap-4 md:grid-cols-2";
		}
		// For projects page with variable number of repos
		else if (repoCount <= 1) {
			result = "grid gap-6 md:grid-cols-1";
		} else if (repoCount <= 4) {
			result = "grid gap-6 md:grid-cols-2";
		} else {
			// For 5 or more repos, use 3 columns layout
			result = "grid gap-6 md:grid-cols-2 lg:grid-cols-3";
		}
		
		gridClassCache[cacheKey] = result;
		return result;
	};

	return (
		<div class="w-full">
			<Show
				when={!isLoading()}
				fallback={<div class="text-center py-4">Loading repositories...</div>}
			>
				<Show when={errorMessage()} fallback={null}>
					<div class="text-center py-4 text-red-400">{errorMessage()}</div>
				</Show>

				<Show
					when={repos()?.length > 0}
					fallback={<div class="text-center py-4">No repositories found.</div>}
				>
					<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						<For each={repos() || []}>
							{(repo: Repository) => (
								<div class="group">
									<a
										href={repo.html_url}
										target="_blank"
										rel="noopener noreferrer"
										class="block"
									>
										<h3 class="text-lg font-medium text-white group-hover:text-accent-blue transition-colors mb-2">
											{repo.name}
										</h3>
										<p class="text-gray-300 text-sm mb-3">
											{repo.description || "No description available"}
										</p>
										<div class="flex items-center space-x-4 text-xs text-gray-400">
											{repo.language && (
												<span>{repo.language}</span>
											)}
											<span>★ {repo.stargazers_count || 0}</span>
										</div>
									</a>
								</div>
							)}
						</For>
					</div>
					
					{/* Subtle attribution moved to bottom right */}
					<div class="text-right mt-4">
						<span class="text-xs text-gray-500">Updated via GitHub Actions</span>
					</div>
				</Show>
			</Show>
		</div>
	);
}