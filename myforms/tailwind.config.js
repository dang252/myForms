/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'dark-text': '#fffffe',
        'dark-button': '#7f5af0',
        'dark-p': '#94a1b2',
        'dark-bg': '#16161a',
        'light-text': '#272343',
        'light-button': '#ffd803',
        'light-p': '#2d334a',
        'light-bg': '##fffffe'
      }
    },
  },
  plugins: [],
}
