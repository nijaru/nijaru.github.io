/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Dark background colors for space theme
        space: {
          900: '#0a0a0f', // Almost black
          850: '#0e0e19', // Darker deep space
          800: '#121224', // Deep space
          700: '#1a1a35', // Dark purple-blue
          600: '#232342', // Midnight
        },
        // Lime green highlights
        lime: {
          400: '#a3e635',
          500: '#84cc16',
        },
        // Light blue/purple accents
        accent: {
          blue: '#93c5fd',   // Light blue
          indigo: '#a5b4fc', // Light indigo
          purple: '#c4b5fd', // Light purple
        }
      },
      animation: {
        'twinkle-slow': 'twinkle 4s ease-in-out infinite',
        'twinkle-medium': 'twinkle 3s ease-in-out infinite',
        'twinkle-fast': 'twinkle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}