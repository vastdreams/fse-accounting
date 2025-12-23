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
        // Ink palette - deep, professional
        ink: {
          300: '#b4bcc8',
          400: '#8892a4',
          500: '#5a6478',
          600: '#3a4254',
          700: '#252b37',
          800: '#1a1f28',
          900: '#12151b',
          950: '#0c0e12',
        },
        
        // Amber accent - warm, trustworthy
        amber: {
          300: '#fcd381',
          400: '#f9bc4a',
          500: '#f5a524',
          600: '#d98b0f',
        },
        
        // Semantic colors
        background: '#0c0e12',
        surface: '#12151b',
        'surface-elevated': '#1a1f28',
        border: '#252b37',
        'border-subtle': '#1a1f28',
        
        // Legacy support (for gradual migration)
        cream: {
          50: '#fefdfb',
          100: '#f8f9fa',
          200: '#e9ecef',
        },
        
        copper: {
          300: '#fcd381',
          400: '#f9bc4a',
          500: '#f5a524',
          600: '#d98b0f',
        },
        
        slate: {
          750: '#293548',
          850: '#1a1f28',
          950: '#0c0e12',
        },
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        // Legacy
        serif: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '20px',
        'xl': '28px',
        '2xl': '40px',
        '3xl': '48px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 165, 36, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 165, 36, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
