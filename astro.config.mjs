import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { rehypeH2TextGlow } from './src/utils/customMarkdownHeadings.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://nijaru.com',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  },
  publicDir: 'static',
  markdown: {
    rehypePlugins: [rehypeH2TextGlow],
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
      transformers: [
        {
          name: 'add-copy-button',
          pre(node) {
            // Add data attributes for enhanced code blocks
            node.properties = node.properties || {};
            node.properties['data-language'] = this.options.lang || 'text';
            node.properties['data-code'] = this.source;
          }
        }
      ]
    },
  },
});