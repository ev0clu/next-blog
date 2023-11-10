import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      minWidth: {
        '300': '300px'
      },
      maxWidth: {
        '1050': '1050px'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
export default config;
