import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx,css}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
        '5xl': '36px',
        '6xl': '40px',
      },
      screens: {
        xs: '320px',
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1684px',
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px',
      },
      boxShadow: {
        sm: '0px 2px 8px 0px rgba(0, 0, 0, 0.08)',
        md: '0px 4px 16px 0px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.focus-visible': {
          outline: '2px solid var(--color-primary)',
          outlineOffset: '2px',
        },
        '.high-contrast': {
          color: 'var(--color-black)',
          backgroundColor: 'var(--color-white)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'focus', 'hover']);
    },
  ],
};
export default config;
