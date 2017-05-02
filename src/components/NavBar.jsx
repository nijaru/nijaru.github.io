import { createSignal, Show, createEffect } from 'solid-js';

export default function NavBar(props) {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  // Initialize with server-side props.pathname if available
  const [currentPath, setCurrentPath] = createSignal(props.pathname || '');
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen());
  
  // Update currentPath on the client side to handle navigation after initial load
  createEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
      
      // Optional: Add event listener to update path on navigation
      const handleNavigation = () => {
        setCurrentPath(window.location.pathname);
      };
      
      window.addEventListener('popstate', handleNavigation);
      return () => window.removeEventListener('popstate', handleNavigation);
    }
  });
  
  // Function to check if the current path matches a given route
  // Use a simple cache to prevent recalculating on each render
  const activeCache = {};
  const isActive = (path) => {
    const pathname = currentPath();
    const cacheKey = `${path}-${pathname}`;
    
    if (activeCache[cacheKey] !== undefined) {
      return activeCache[cacheKey];
    }
    
    let result;
    // Special case for blog - consider active for any path under /blog/
    if (path === '/blog' && (pathname === '/blog' || pathname.startsWith('/blog/'))) {
      result = true;
    } else {
      // Direct path match
      result = pathname === path;
    }
    
    activeCache[cacheKey] = result;
    return result;
  };
  
  return (
    <nav class="fixed top-0 left-0 right-0 z-50 bg-space-800 border-b border-space-700">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a href="/" class="text-xl font-bold text-white flex items-center">
              <span class="text-lime-400">Nick</span>
              <span class="text-white ml-1">Russo</span>
            </a>
          </div>
          
          <div class="hidden md:flex items-center space-x-4">
            <a href="/" class={`px-3 py-2 font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${isActive('/') ? 'text-lime-400 hover:text-lime-300' : 'text-white hover:text-lime-300'}`}>Home</a>
            <a href="/about" class={`px-3 py-2 font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${isActive('/about') ? 'text-lime-400 hover:text-lime-300' : 'text-white hover:text-lime-300'}`}>About</a>
            <a href="/blog" class={`px-3 py-2 font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${isActive('/blog') ? 'text-lime-400 hover:text-lime-300' : 'text-white hover:text-lime-300'}`}>Blog</a>
            <a href="/projects" class={`px-3 py-2 font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${isActive('/projects') ? 'text-lime-400 hover:text-lime-300' : 'text-white hover:text-lime-300'}`}>Projects</a>
          </div>
          
          <div class="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              class="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
              aria-expanded={isMenuOpen()}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen() ? "Close main menu" : "Open main menu"}
            >
              <span class="sr-only">{isMenuOpen() ? "Close main menu" : "Open main menu"}</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isMenuOpen() ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <Show when={isMenuOpen()}>
        <div id="mobile-menu" class="md:hidden bg-space-800 border-b border-space-700" role="navigation" aria-label="Mobile navigation">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" class={`block px-3 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${isActive('/') ? 'text-lime-400' : 'text-white hover:text-lime-300'}`}>Home</a>
            <a href="/about" class={`block px-3 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${isActive('/about') ? 'text-lime-400' : 'text-white hover:text-lime-300'}`}>About</a>
            <a href="/blog" class={`block px-3 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${isActive('/blog') ? 'text-lime-400' : 'text-white hover:text-lime-300'}`}>Blog</a>
            <a href="/projects" class={`block px-3 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${isActive('/projects') ? 'text-lime-400' : 'text-white hover:text-lime-300'}`}>Projects</a>
          </div>
        </div>
      </Show>
    </nav>
  );
}