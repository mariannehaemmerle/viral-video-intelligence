import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fdf7f0',
          100: '#fde6d9',
          200: '#fbcbb0',
          300: '#f9b088',
          400: '#f78f5f',
          500: '#f56a36',
          600: '#E87722',
          700: '#c9600f',
          800: '#a54a0b',
          900: '#813a08',
        },
      },
    },
  },
  plugins: [],
}
export default config
