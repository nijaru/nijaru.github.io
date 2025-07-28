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
    <article class="group pb-8 border-b border-white/10 last:border-b-0 last:pb-0">
      <a 
        href={post.url} 
        class="block"
      >
        <h2 class="text-xl font-medium text-white group-hover:text-accent-blue transition-colors mb-2">
          {post.title}
        </h2>
        
        <div class="flex items-center gap-3 text-sm text-gray-400 mb-3">
          <time datetime={typeof post.pubDate === 'object' ? post.pubDate.toISOString() : post.pubDate}>
            {post.formattedDate}
          </time>
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>
        
        <p class="text-gray-300 mb-4">{post.excerpt}</p>
        
        <div class="flex flex-wrap gap-3 mb-4">
          {post.tags && post.tags.map((tag, index) => (
            <span key={tag + '-' + index} class="text-sm text-gray-400">
              {tag}
            </span>
          ))}
        </div>
        
        <div class="text-accent-blue group-hover:text-blue-400 text-sm font-medium transition-colors">
          Read more →
        </div>
      </a>
    </article>
  );
}