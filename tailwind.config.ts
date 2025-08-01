import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6366F1',
          light: '#A5B4FC',
          dark: '#4F46E5',
        },
        background: {
          light: '#F9FAFB',
          dark: '#0F172A',
        },
        foreground: {
          light: '#1F2937',
          dark: '#F3F4F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
