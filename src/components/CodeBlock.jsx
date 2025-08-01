import { createSignal, onMount } from 'solid-js';

/**
 * Enhanced code block component with copy functionality
 * Integrates with Shiki-rendered code blocks
 */
export default function CodeBlock() {
  const [copyStatus, setCopyStatus] = createSignal('copy');
  
  onMount(() => {
    // Find all pre elements with data-language (Shiki-generated)
    const codeBlocks = document.querySelectorAll('pre[data-language]');
    
    codeBlocks.forEach(pre => {
      // Skip if already enhanced
      if (pre.querySelector('.code-block-header')) return;
      
      const language = pre.getAttribute('data-language') || 'text';
      const code = pre.textContent || '';
      
      // Create header with language and copy button
      const header = document.createElement('div');
      header.className = 'code-block-header flex justify-between items-center px-4 py-2 bg-dark-900 border-b border-white/10 text-sm text-gray-400';
      
      // Language badge
      const languageBadge = document.createElement('span');
      languageBadge.className = 'text-accent-blue font-medium';
      languageBadge.textContent = language.toUpperCase();
      
      // Copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-btn flex items-center gap-2 px-3 py-1 rounded hover:bg-dark-700 transition-colors duration-200 text-gray-400 hover:text-accent-blue';
      copyButton.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <span class="copy-text">Copy</span>
      `;
      
      // Copy functionality
      let copyTimeout;
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code);
          const textSpan = copyButton.querySelector('.copy-text');
          const icon = copyButton.querySelector('svg');
          
          // Update button state
          textSpan.textContent = 'Copied!';
          copyButton.classList.add('text-green-400');
          icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>`;
          
          // Reset after 2 seconds
          clearTimeout(copyTimeout);
          copyTimeout = setTimeout(() => {
            textSpan.textContent = 'Copy';
            copyButton.classList.remove('text-green-400');
            icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>`;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
          const textSpan = copyButton.querySelector('.copy-text');
          textSpan.textContent = 'Failed';
          setTimeout(() => {
            textSpan.textContent = 'Copy';
          }, 2000);
        }
      });
      
      header.appendChild(languageBadge);
      header.appendChild(copyButton);
      
      // Wrap the pre element with enhanced styling
      const wrapper = document.createElement('div');
      wrapper.className = 'enhanced-code-block relative bg-dark-800 rounded-lg border border-white/5 my-6 overflow-hidden';
      
      // Move pre element into wrapper and update its styling
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
      
      // Update pre styling to work with the wrapper
      pre.className = 'bg-dark-800 m-0 rounded-none border-none overflow-x-auto p-4';
      
      // Add line numbers if the code block is long enough
      const lines = code.split('\n');
      if (lines.length > 3) {  // Only add line numbers for multi-line code
        const codeElement = pre.querySelector('code');
        if (codeElement) {
          codeElement.style.counterReset = 'line';
          codeElement.innerHTML = codeElement.innerHTML
            .split('\n')
            .map((line, index) => {
              if (index === lines.length - 1 && line.trim() === '') return line; // Skip empty last line
              return `<span class="line" data-line="${index + 1}">${line}</span>`;
            })
            .join('\n');
        }
      }
    });
  });
  
  return null; // This component doesn't render anything itself
}