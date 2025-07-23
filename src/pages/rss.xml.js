import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.data.pubDate) - new Date(a.data.pubDate)
  );

  return rss({
    title: 'Nick Russo\'s Blog',
    description: 'Software engineering thoughts, projects, and insights from a backend developer exploring AI, systems programming, and new technologies.',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      author: 'Nick Russo',
      categories: post.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
}