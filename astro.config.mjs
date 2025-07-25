import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import { rehypeH2TextGlow } from './src/utils/customMarkdownHeadings.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://nijaru.com',
  integrations: [
    tailwind(),
    solidJs(),
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
    ssr: {
      noExternal: ['solid-js'],
    },
  },
  publicDir: 'static',
  markdown: {
    rehypePlugins: [rehypeH2TextGlow],
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});