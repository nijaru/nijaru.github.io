import { createResource, For, Show } from 'solid-js';

export default function GithubRepos({ username, limit, pinned = false }) {
  // Fetch repositories from GitHub API
  const [repos] = createResource(async () => {
    try {
      // Try different APIs for pinned repositories, with fallbacks
      if (pinned) {
        // First attempt - use a public API that returns pinned repos
        try {
          const response = await fetch(`https://gh-pinned-repos-api.vercel.app/api/user/${username}`);
          if (response.ok) {
            const pinnedData = await response.json();
            if (pinnedData && pinnedData.length > 0) {
              // Apply limit if requested
              const limitedData = limit > 0 ? pinnedData.slice(0, limit) : pinnedData;
              return limitedData.map(repo => ({
                name: repo.repo,
                description: repo.description,
                html_url: repo.link,
                language: repo.language,
                stargazers_count: repo.stars,
                owner: { login: username }
              }));
            }
          }
        } catch (error) {
          console.error('Error fetching pinned repos from primary API:', error);
        }

        // Second attempt - alternative API
        try {
          const response = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${username}`);
          if (response.ok) {
            const pinnedData = await response.json();
            if (pinnedData && pinnedData.length > 0) {
              // Apply limit if requested
              const limitedData = limit > 0 ? pinnedData.slice(0, limit) : pinnedData;
              return limitedData.map(repo => ({
                name: repo.repo,
                description: repo.description,
                html_url: `https://github.com/${repo.owner}/${repo.repo}`,
                language: repo.language,
                stargazers_count: repo.stars,
                owner: { login: repo.owner }
              }));
            }
          }
        } catch (error) {
          console.error('Error fetching pinned repos from secondary API:', error);
        }
      }
      
      // Regular repository fetch as final fallback
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      
      let data = await response.json();
      
      // Sort by stars (descending)
      data.sort((a, b) => b.stargazers_count - a.stargazers_count);
      
      // Limit the number of repos
      if (limit && limit > 0) {
        data = data.slice(0, limit);
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      return [];
    }
  });

  return (
    <div class="w-full">
      <Show when={!repos.loading} fallback={<div class="text-center py-4">Loading repositories...</div>}>
        <Show when={repos()?.length > 0} fallback={<div class="text-center py-4">No repositories found</div>}>
          <div class="grid gap-4 md:grid-cols-2">
            <For each={repos()}>
              {(repo) => (
                <div class="bg-space-800/60 backdrop-blur-sm p-6 rounded-lg border border-space-700 transition-all duration-300 hover:border-lime-500 group">
                  <h3 class="text-xl font-semibold text-lime-400 mb-2 group-hover:text-lime-300">{repo.name}</h3>
                  <p class="text-gray-300 mb-4">{repo.description || "No description available"}</p>
                  
                  <div class="flex space-x-3 text-sm mb-4">
                    <span class="px-2 py-1 bg-space-700 rounded text-accent-blue">{repo.language || "Various"}</span>
                    <span class="px-2 py-1 bg-space-700 rounded text-yellow-400">
                      <span class="mr-1">★</span>
                      {repo.stargazers_count}
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
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