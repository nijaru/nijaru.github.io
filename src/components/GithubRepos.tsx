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
			<div class="text-sm text-center text-gray-400 mb-4">
				Generated from GitHub Actions workflow
			</div>
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
					<div class={getGridClass(repos()?.length || 0)}>
						<For each={repos() || []}>
							{(repo: Repository) => (
								<div class="relative group h-full">
									<a
										href={repo.html_url}
										target="_blank"
										rel="noopener noreferrer"
										class="absolute inset-0 z-10"
										aria-label={`View ${repo.name} repository on GitHub`}
									>
										<span class="sr-only">View {repo.name} on GitHub</span>
									</a>

									<div class="card-container group-hover:border-primary-500 relative h-full flex flex-col">
										<h3 class="text-xl font-semibold text-primary-400 mb-2 group-hover:text-primary-500">
											{repo.name}
										</h3>
										<p class="text-gray-300 mb-4">
											{repo.description || "No description available"}
										</p>

										<div class="flex space-x-3 text-responsive-sm mb-4">
											<span class="text-accent-blue">
												{repo.language || "Various"}
											</span>
											<span class="text-yellow-400">
												<span class="mr-1">★</span>
												{repo.stargazers_count || 0}
											</span>
										</div>

										<div class="relative z-20 pointer-events-none mt-auto">
											<span class="inline-flex items-center text-accent-blue group-hover:text-accent-purple">
												View on GitHub
												<svg
													class="w-4 h-4 ml-1"
													fill="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
													aria-hidden="true"
												>
													<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
												</svg>
											</span>
										</div>
									</div>
								</div>
							)}
						</For>
					</div>
				</Show>
			</Show>
		</div>
	);
}