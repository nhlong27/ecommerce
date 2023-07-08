/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary": "#2563eb",
        "secondary": "#60a5fa",
        "tertiary": "#93c5fd",
        "warning": "#ef4444",
        "danger": "#dc2626",
      },
    },
  },
  plugins: [],
}
