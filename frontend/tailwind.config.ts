import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // FSE Accounting brand colors (matching Finsoeasy)
        background: '#0a0c10',
        surface: '#0f1419',
        'surface-elevated': '#141a22',
        border: '#243040',
        'border-subtle': '#1a222d',
        
        cream: {
          50: '#fefdfb',
          100: '#faf8f5',
          200: '#f5f0e8',
        },
        
        slate: {
          750: '#293548',
          850: '#1a222d',
          950: '#0a0c10',
        },
        
        copper: {
          300: '#e8bc8c',
          400: '#dfa76a',
          500: '#d4823a',
          600: '#b86d2e',
        },
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['Satoshi', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

