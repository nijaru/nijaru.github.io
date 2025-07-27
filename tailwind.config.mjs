/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'responsive-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',     // 14px -> 16px
        'responsive-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',   // 16px -> 18px  
        'responsive-lg': 'clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)', // 18px -> 20px
        'responsive-xl': 'clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)',     // 20px -> 24px
      },
      colors: {
        // True Apple dark theme - deeper blacks
        dark: {
          950: '#000000', // Pure black background
          900: '#0a0a0a', // Near black containers
          800: '#1a1a1a', // Dark cards
          700: '#2a2a2a', // Medium dark
          600: '#3a3a3a', // Borders
          500: '#4a4a4a', // Subtle elements
          400: '#6a6a6a', // Medium gray
          300: '#8a8a8a', // Light gray
          200: '#aaaaaa', // Lighter gray
          100: '#cccccc', // Very light gray
        },
        // Single blue accent - more Apple-like
        blue: {
          400: '#60a5fa', // Light blue
          500: '#007aff', // Apple blue
          600: '#0056cc', // Dark Apple blue
        },
        // Softer whites for reduced contrast
        white: '#f8f8f8',     // Off-white instead of pure white
        gray: {
          50: '#f8f8f8',      // Off-white
          100: '#e8e8e8',     // Very light gray
          200: '#d0d0d0',     // Light gray
          300: '#b8b8b8',     // Medium-light gray (main text)
          400: '#a0a0a0',     // Medium gray (muted text)
          500: '#888888',     // True medium gray
          600: '#606060',     // Dark gray
          700: '#404040',     // Very dark gray
          800: '#202020',     // Near black
          900: '#101010',     // Almost black
        },
        // Minimal colors only
        accent: {
          blue: '#007aff',   // Apple blue
          gray: '#8e8e93',   // Apple secondary gray
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