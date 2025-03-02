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
    <article class="bg-space-800/60 backdrop-blur-sm p-6 rounded-lg border border-space-700 hover:border-lime-500 transition-all duration-300">
      <a href={post.url}>
        <h2 class="text-2xl font-semibold text-lime-400 mb-2">{post.title}</h2>
        
        <div class="mb-3">
          <time datetime={typeof post.pubDate === 'object' ? post.pubDate.toISOString() : post.pubDate} class="text-sm text-gray-400">
            {post.formattedDate}
          </time>
        </div>
        
        <p class="text-gray-300 mb-4">{post.excerpt}</p>
        
        <div class="flex flex-wrap gap-2">
          {post.tags && post.tags.map((tag) => (
            <span class="px-2 py-1 bg-space-700 rounded text-xs text-accent-blue">
              {tag}
            </span>
          ))}
        </div>
      </a>
    </article>
  );
}