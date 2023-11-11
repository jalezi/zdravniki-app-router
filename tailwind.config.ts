// https://www.color-name.com/hex/09afda
// https://www.tints.dev/brand/09AFDA
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
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
        text: {
          50: '#E6E8EB',
          100: '#CFD4D8',
          200: '#9FA8B2',
          300: '#6F7D8A',
          400: '#49525A',
          500: '#212529',
          600: '#1B1F22',
          700: '#141719',
          800: '#0E0F11',
          900: '#070808',
          950: '#020303',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'hamburger-close-1': {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, 0.5625rem, 0) rotate(0deg)' },
          '100%': {
            transform: 'translate3d(0, 0.5625rem, 0) rotate(-45deg)',
          },
        },
        'hamburger-close-2': {
          '0%': { opacity: '1' },
          '49%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
        'hamburger-close-3': {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -0.5625rem, 0) rotate(0deg)' },
          '100%': {
            transform: 'translate3d(0, -0.5625rem, 0) rotate(45deg)',
          },
        },
        'hamburger-open-1': {
          '0%': { transform: 'translate3d(0, 0.5625rem, 0) rotate(-45deg)' },
          '50%': { transform: 'translate3d(0, 0.5625rem, 0) rotate(0deg)' },
          '100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
        },
        'hamburger-open-2': {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
        'hamburger-open-3': {
          '0%': { transform: 'translate3d(0, -0.5625rem, 0) rotate(45deg)' },
          '50%': { transform: 'translate3d(0, -0.5625rem, 0) rotate(0deg)' },
          '100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'hamburger-close-1': 'hamburger-close-1 0.6s ease-out forwards',
        'hamburger-close-2': 'hamburger-close-2 0.6s ease-out forwards',
        'hamburger-close-3': 'hamburger-close-3 0.6s ease-out forwards',
        'hamburger-open-1': 'hamburger-open-1 0.6s ease-out forwards',
        'hamburger-open-2': 'hamburger-open-2 0.6s ease-out forwards',
        'hamburger-open-3': 'hamburger-open-3 0.6s ease-out forwards',
      },
      transitionDuration: {
        '600': '600ms',
        '650': '650ms',
        '367': '367ms',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addVariant, theme, matchUtilities }) {
      addVariant('child', '& > *');
      matchUtilities(
        {
          'translate-z': (value: string) => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }), // this is actual CSS
        },
        { values: theme('translate'), supportsNegativeValues: true }
      );
    }),
  ],
};
export default config;
