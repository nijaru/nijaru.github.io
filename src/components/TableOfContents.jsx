import { createSignal, onMount, createEffect } from 'solid-js';

/**
 * Automatic table of contents generator with smooth scrolling
 * Detects headings in content and creates navigation links
 */
export default function TableOfContents() {
  const [headings, setHeadings] = createSignal([]);
  const [activeId, setActiveId] = createSignal('');
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    // Find all headings in the blog content
    const contentArea = document.querySelector('.blog-content');
    if (!contentArea) return;

    const headingElements = contentArea.querySelectorAll('h2, h3');
    if (headingElements.length < 2) return; // Don't show TOC for short posts

    // Generate TOC data
    const tocData = Array.from(headingElements).map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || '';
      const id = heading.id || generateId(text, index);
      
      // Ensure heading has an ID for linking
      if (!heading.id) {
        heading.id = id;
      }

      return {
        id,
        text,
        level,
        element: heading
      };
    });

    setHeadings(tocData);
    setIsVisible(true);

    // Set up intersection observer for active heading detection
    const observerOptions = {
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all headings
    tocData.forEach(({ element }) => {
      observer.observe(element);
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  });

  // Generate a clean ID from heading text
  const generateId = (text, fallbackIndex) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .trim() || `heading-${fallbackIndex}`;
  };

  // Smooth scroll to heading
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {isVisible() && headings().length > 0 && (
        <nav class="toc-container">
          <div class="toc-header">
            <h3 class="text-sm font-semibold text-gray-300 mb-3">
              Table of Contents
            </h3>
          </div>
          <ul class="toc-list space-y-2">
            {headings().map((heading) => (
              <li key={heading.id}>
                <button
                  class={`toc-link block text-left w-full px-3 py-1.5 rounded text-sm transition-all duration-200 ${
                    heading.level === 3 ? 'ml-4 text-xs' : ''
                  } ${
                    activeId() === heading.id
                      ? 'text-accent-blue bg-accent-blue/10 border-l-2 border-accent-blue'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                  onClick={() => scrollToHeading(heading.id)}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}