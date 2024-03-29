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
    './content/**/*.{js,ts,jsx,tsx,mdx}',
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
      boxShadow: {
        'nav-link': '#ffffff 0 -0.625rem 0 inset ',
      },
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
        footer: {
          50: '#F9FBFB',
          100: '#F4F8F8',
          200: '#D3E3E3',
          300: '#B1CDCD',
          400: '#8FB8B8',
          500: '#70A4A4',
          600: '#558686',
          700: '#3F6464',
          800: '#2A4141',
          900: '#162222',
          950: '#0A1010',
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
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'animate-in-and-out': {
          'entry 0%': {
            opacity: '0',
          },
          'entry 75%': {
            opacity: '0',
          },
          'entry 100%': {
            opacity: '1',
          },
          'exit 0%': {
            opacity: '1',
          },
          'exit 25%': {
            opacity: '0',
          },
          'exit 100%': {
            opacity: '0',
          },
        },
        'grow-width': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        'circle-chart-fill': {
          from: { strokeDasharray: '0 100' },
          to: { strokeDasharray: `var(--circle-chart-value) 100` }, // need to decide how to pass this value
        },
      },
      animation: {
        'hamburger-close-1': 'hamburger-close-1 0.6s ease-out forwards',
        'hamburger-close-2': 'hamburger-close-2 0.6s ease-out forwards',
        'hamburger-close-3': 'hamburger-close-3 0.6s ease-out forwards',
        'hamburger-open-1': 'hamburger-open-1 0.6s ease-out forwards',
        'hamburger-open-2': 'hamburger-open-2 0.6s ease-out forwards',
        'hamburger-open-3': 'hamburger-open-3 0.6s ease-out forwards',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        fadeInLinear: '367ms linear animate-in-and-out',
        growWidth: 'grow-width auto linear',
        circleChartFill: 'circle-chart-fill 1s ease-out forwards',
      },
      transitionDuration: {
        '600': '600ms',
        '650': '650ms',
        '367': '367ms',
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              boxShadow: 'inset 0 0 0 #ffffff, inset 0 -0.25rem #27CDF6 ',
              textDecoration: 'none',
              '&:hover': {
                boxShadow: 'inset 0 0 0 #ffffff, inset 0 -1.25rem #27CDF6 ',
              },
            },
            thead: {
              borderColor: '#93E6FB',
            },
            tfoot: {
              borderColor: '#93E6FB',
            },
            tr: {
              borderColor: '#93E6FB',
            },
            td: {
              textAlign: 'center',
            },
            th: {
              textAlign: 'center',
            },
            table: {
              backgroundColor: '#E2F8FE',
            },
            dd: {
              paddingLeft: '0',
            },
          },
        },
        sm: {
          css: {
            dd: {
              paddingLeft: '0',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
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
