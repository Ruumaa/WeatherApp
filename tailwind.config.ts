import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1f2937',

          secondary: '#9ca3af',

          accent: '#155e75',

          neutral: '#141414',

          'base-100': '#111827',

          info: '#0284c7',

          success: '#16a34a',

          warning: '#ffa300',

          error: '#b91c1c',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
export default config;
