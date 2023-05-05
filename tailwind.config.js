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
      zIndex: {
        'officeScene': 30,
        'officeScene-gradient': 35,
        'background': 40,
        'ui-items': 50,
        'popup-fade': 55,
        'popup': 60,
      }
    },
    colors: {
        // https://www.canva.com/colors/color-palettes/a-royal-bouquet-2/
        primary: '#420264',
        secondary: '#5C038C',
        tertiary: '#1B1734',
        quaternary: '#896FBC',
        //default
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
    }
  },
  plugins: [],
}
