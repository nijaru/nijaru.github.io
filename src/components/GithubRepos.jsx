import { createResource, For, Show, createSignal, onMount, onCleanup } from 'solid-js';

export default function GithubRepos({ username, limit }) {
  const [isLoading, setIsLoading] = createSignal(true);
  const [errorMessage, setErrorMessage] = createSignal(null);
  let loadingTimeout;
  
  // Fetch pinned repositories from static JSON file
  const [repos] = createResource(async () => {
    try {
      setIsLoading(true);
      // Determine the correct path based on base URL
      const basePath = import.meta.env.BASE_URL || '/';
      const jsonPath = `${basePath.endsWith('/') ? basePath.slice(0, -1) : basePath}/data/pinned-repos.json`;
      
      // Fetch pre-generated JSON file with pinned repositories
      const response = await fetch(jsonPath);
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      
      let data = await response.json();
      
      // Limit the number of repos based on the limit prop
      if (limit && limit > 0) {
        data = data.slice(0, limit);
      }
      
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      setErrorMessage('Failed to load repositories. Please try again later.');
      setIsLoading(false);
      return [];
    }
  });

  // Force loading to complete after a timeout (fallback)
  onMount(() => {
    loadingTimeout = setTimeout(() => {
      if (isLoading()) {
        setIsLoading(false);
      }
    }, 5000);
  });

  // Clean up timeout when component unmounts
  onCleanup(() => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
  });

  // Grid class mapping for different repo counts
  const gridClassMap = {
    // Homepage layout (max 2)
    homepage: "grid gap-4 md:grid-cols-2",
    // Projects page layouts
    1: "grid gap-4 md:grid-cols-1",
    2: "grid gap-4 md:grid-cols-2",
    3: "grid gap-6 md:grid-cols-3 [&>*]:md:mx-auto [&>*]:md:max-w-md lg:grid-cols-3",
    4: "grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2",
    5: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
    6: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
    // Default
    default: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
  };

  // Determine grid column count based on potential number of repos
  const getGridClass = (repoCount) => {
    // For homepage (max 2)
    if (limit === 2) return gridClassMap.homepage;
    
    // For projects page with variable number of repos (max 6)
    return gridClassMap[repoCount] || gridClassMap.default;
  };

  return (
    <div class="w-full">
      <div class="text-sm text-center text-gray-400 mb-4">These repositories are automatically fetched by a scheduled GitHub Action</div>
      <Show when={!isLoading()} fallback={<div class="text-center py-4">Loading repositories...</div>}>
        <Show when={errorMessage()} fallback={null}>
          <div class="text-center py-4 text-red-400">{errorMessage()}</div>
        </Show>
        
        <Show when={repos()?.length > 0} fallback={<div class="text-center py-4">No repositories found. Showing popular repositories instead.</div>}>
          <div class={getGridClass(repos()?.length || 0)}>
            <For each={repos() || []}>
              {(repo) => (
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
                  
                  <div class="bg-space-600/90 backdrop-blur-sm p-6 rounded-lg border border-space-700 transition-all duration-300 group-hover:border-lime-500 relative h-full flex flex-col">
                    <h3 class="text-xl font-semibold text-lime-400 mb-2 group-hover:text-lime-300">{repo.name}</h3>
                    <p class="text-gray-300 mb-4">{repo.description || "No description available"}</p>
                    
                    <div class="flex space-x-3 text-sm mb-4">
                      <span class="px-2 py-1 bg-space-500 rounded text-accent-blue">{repo.language || "Various"}</span>
                      <span class="px-2 py-1 bg-space-500 rounded text-yellow-400">
                        <span class="mr-1">★</span>
                        {repo.stargazers_count || 0}
                      </span>
                    </div>
                    
                    <div class="relative z-20 pointer-events-none mt-auto">
                      <span class="inline-flex items-center text-accent-blue group-hover:text-accent-purple">
                        View on GitHub
                        <svg 
                          class="w-4 h-4 ml-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
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