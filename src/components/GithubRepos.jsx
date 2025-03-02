import { createResource, For, Show, createSignal, onMount } from 'solid-js';

export default function GithubRepos({ username, limit }) {
  const [isLoading, setIsLoading] = createSignal(true);
  const [errorMessage, setErrorMessage] = createSignal(null);
  
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
    setTimeout(() => {
      if (isLoading()) {
        setIsLoading(false);
      }
    }, 5000);
  });

  // Determine grid column count based on potential number of repos
  const getGridClass = (repoCount) => {
    // For homepage (max 2)
    if (limit === 2) return "grid gap-4 md:grid-cols-2";
    
    // For projects page with variable number of repos (max 6)
    if (repoCount <= 2) return "grid gap-4 md:grid-cols-2";
    if (repoCount <= 6) return "grid gap-4 md:grid-cols-2 lg:grid-cols-3";
    
    // Default
    return "grid gap-4 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <div class="w-full">
      <Show when={!isLoading()} fallback={<div class="text-center py-4">Loading repositories...</div>}>
        <Show when={errorMessage()} fallback={null}>
          <div class="text-center py-4 text-red-400">{errorMessage()}</div>
        </Show>
        
        <Show when={repos()?.length > 0} fallback={<div class="text-center py-4">No repositories found. Showing popular repositories instead.</div>}>
          <div class={getGridClass(repos()?.length || 0)}>
            <For each={repos() || []}>
              {(repo) => (
                <div class="bg-space-800/60 backdrop-blur-sm p-6 rounded-lg border border-space-700 transition-all duration-300 hover:border-lime-500 group">
                  <h3 class="text-xl font-semibold text-lime-400 mb-2 group-hover:text-lime-300">{repo.name}</h3>
                  <p class="text-gray-300 mb-4">{repo.description || "No description available"}</p>
                  
                  <div class="flex space-x-3 text-sm mb-4">
                    <span class="px-2 py-1 bg-space-700 rounded text-accent-blue">{repo.language || "Various"}</span>
                    <span class="px-2 py-1 bg-space-700 rounded text-yellow-400">
                      <span class="mr-1">★</span>
                      {repo.stargazers_count || 0}
                    </span>
                  </div>
                  
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center text-accent-blue hover:text-accent-purple"
                  >
                    View on GitHub
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              )}
            </For>
          </div>
        </Show>
      </Show>
    </div>
  );
}