// https://www.color-name.com/hex/09afda
// https://www.tints.dev/brand/09AFDA
import { fontFamily } from 'tailwindcss/defaultTheme';
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
        accent: {
          50: '#E2F8FE',
          100: '#C9F2FD',
          200: '#93E6FB',
          300: '#5DD9F8',
          400: '#27CDF6',
          500: '#09AFDA',
          600: '#078FB0',
          700: '#056B84',
          800: '#044758',
          900: '#02242C',
          950: '#011014',
        },
        brand: {
          50: '#E7F9FD',
          100: '#D5F4FB',
          200: '#AAE8F8',
          300: '#7BDCF4',
          400: '#51D1F1',
          500: '#26C5ED',
          600: '#11A5CB',
          700: '#0C7B97',
          800: '#095568',
          900: '#042A34',
          950: '#021318',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
