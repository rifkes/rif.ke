/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xxs': '0px',
      'xs': '500px',
      'sm': '768px',
      'sm-md': '1024px',
      'md': '1200px',
      'lg': '1500px',
      'xl': '1920px',
      'xxl': '2500px',
    },
    extend: {
      screens: {
        'tall': { 'raw': '(min-height: 800px)' },
        'hover-hover': { 'raw': '(hover: hover)' },
        'hover-none': { 'raw': '(hover: none)' },
        
        'touch': { 'raw': '(hover: none)' },
        'mouse': { 'raw': '(hover: hover)' },
        'max-xs': { 'raw': '(max-width: 499px)' },
        'max-sm': { 'raw': '(max-width: 767px)' },
        'max-sm-md': { 'raw': '(max-width: 1023px)' },
        'max-md': { 'raw': '(max-width: 1199px)' },
        'max-lg': { 'raw': '(max-width: 1499px)' },
        'max-xl': { 'raw': '(max-width: 1919px)' },
        'max-xxl': { 'raw': '(max-width: 2499px)' },
      }
    },
  },
  plugins: [],
}
