import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        'warm-white': '#FFF9F0',
        charcoal: '#1C1917',
        graphite: '#292524',
        stone: '#78716C',
        'warm-gray': '#A8A29E',
        accent: '#B45309',
        'accent-light': '#D97706',
        success: '#059669',
        border: '#E7E5E4',
      },
      fontFamily: {
        serif: ['var(--font-bricolage)', 'Georgia', 'serif'],
        sans: ['var(--font-geist)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        'narrow': '720px',
        'content': '960px',
        'wide': '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
