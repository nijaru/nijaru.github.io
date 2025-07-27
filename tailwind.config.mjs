/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Atkinson Hyperlegible Next', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['Atkinson Hyperlegible Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.5' }],     // 13px
        'sm': ['0.9375rem', { lineHeight: '1.5' }],     // 15px  
        'base': ['1.125rem', { lineHeight: '1.6' }],    // 18px (increased for readability)
        'lg': ['1.1875rem', { lineHeight: '1.6' }],     // 19px
        'xl': ['1.3125rem', { lineHeight: '1.6' }],     // 21px
        '2xl': ['1.5625rem', { lineHeight: '1.5' }],    // 25px
        '3xl': ['1.9375rem', { lineHeight: '1.4' }],    // 31px
        '4xl': ['2.4375rem', { lineHeight: '1.3' }],    // 39px
        '5xl': ['3.0625rem', { lineHeight: '1.2' }],    // 49px
        '6xl': ['3.8125rem', { lineHeight: '1.1' }],    // 61px
      },
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