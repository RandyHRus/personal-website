/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // This is to make sure material-ui uses tailwind css
  important: "#root",
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
        // https://www.pinterest.ca/pin/retro-purple-blues-color-scheme-blue--238339005266745082/
        quinary: '#465892',
        quaternary: '#546DA6',
        tertiary: '#968EAF',
        secondary: '#6D5593',
        primary: '#543D7B',
        //default
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
    }
  },
  plugins: [],
}
