// @ts-check

/**
 * @typedef {Object} BlogPost
 * @property {string} url - The URL of the blog post
 * @property {string} title - The title of the blog post
 * @property {Date|string} pubDate - The publication date
 * @property {string} formattedDate - The formatted date string
 * @property {string} excerpt - A short excerpt from the post
 * @property {string[]} tags - Array of tags for the post
 */

/**
 * Component to display a preview of a blog post
 * @param {{ post: BlogPost }} props - The component props
 */
export default function BlogPostPreview(props) {
  const { post } = props;
  
  return (
    <article class="relative group">
      <a 
        href={post.url} 
        class="absolute inset-0 z-10"
        aria-label={`Read blog post: ${post.title}`}
      >
        <span class="sr-only">Read blog post: {post.title}</span>
      </a>
      
      <div class="bg-space-600/90 backdrop-blur-sm p-6 rounded-lg border border-space-700 group-hover:border-lime-500 transition-all duration-300 relative">
        <h2 class="text-2xl font-semibold mb-2 text-lime-400 group-hover:text-lime-300">
          {post.title}
        </h2>
        
        <div class="mb-3">
          <time datetime={typeof post.pubDate === 'object' ? post.pubDate.toISOString() : post.pubDate} class="text-sm text-gray-400">
            {post.formattedDate}
          </time>
        </div>
        
        <p class="text-gray-300 mb-4">{post.excerpt}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          {post.tags && post.tags.map((tag, index) => (
            <span key={tag + '-' + index} class="px-2 py-1 bg-space-500 rounded text-xs text-accent-blue">
              {tag}
            </span>
          ))}
        </div>
        
        <div class="relative z-20 pointer-events-none">
          <span class="inline-flex items-center text-accent-blue group-hover:text-accent-purple">
            Read more
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}