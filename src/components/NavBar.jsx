import { createSignal, Show } from 'solid-js';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen());
  
  return (
    <nav class="fixed top-0 left-0 right-0 z-50 bg-space-800/80 backdrop-blur-sm border-b border-space-700">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a href="/" class="text-xl font-bold text-white flex items-center">
              <span class="text-lime-400">Nick</span>
              <span class="text-white ml-1">Russo</span>
            </a>
          </div>
          
          <div class="hidden md:flex items-center space-x-4">
            <a href="/" class="px-3 py-2 text-lime-400 font-medium hover:text-lime-300 transition-colors">Home</a>
            <a href="/bio" class="px-3 py-2 text-gray-300 hover:text-white transition-colors">Bio</a>
            <a href="/blog" class="px-3 py-2 text-gray-300 hover:text-white transition-colors">Blog</a>
            <a href="/projects" class="px-3 py-2 text-gray-300 hover:text-white transition-colors">Projects</a>
          </div>
          
          <div class="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              class="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              <span class="sr-only">Open main menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isMenuOpen() ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <Show when={isMenuOpen()}>
        <div class="md:hidden bg-space-800 border-b border-space-700">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" class="block px-3 py-2 text-lime-400 font-medium">Home</a>
            <a href="/bio" class="block px-3 py-2 text-gray-300 hover:text-white">Bio</a>
            <a href="/blog" class="block px-3 py-2 text-gray-300 hover:text-white">Blog</a>
            <a href="/projects" class="block px-3 py-2 text-gray-300 hover:text-white">Projects</a>
          </div>
        </div>
      </Show>
    </nav>
  );
}