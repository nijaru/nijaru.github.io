/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'responsive-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',     // 14px -> 16px
        'responsive-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',   // 16px -> 18px  
        'responsive-lg': 'clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)', // 18px -> 20px
        'responsive-xl': 'clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)',     // 20px -> 24px
      },
      colors: {
        // Professional dark theme
        space: {
          900: '#0a0a0a', // True black
          850: '#111111', // Near black  
          800: '#1a1a1a', // Dark gray
          700: '#262626', // Medium dark gray
          600: '#404040', // Lighter gray
          500: '#525252', // Mid gray for borders/tags
        },
        // Professional color palette
        primary: {
          400: '#818cf8', // Light indigo
          500: '#6366f1', // Indigo
          600: '#4f46e5', // Dark indigo
        },
        accent: {
          blue: '#06b6d4',   // Cyan
          indigo: '#6366f1', // Indigo
          purple: '#8b5cf6', // Purple
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