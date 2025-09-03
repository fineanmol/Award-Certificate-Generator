/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Ensure dynamic border classes are included
    'border-8',
    'border-[12px]',
    'border-[16px]',
    'ring-1',
    'shadow-lg',
    'rounded-none',
    'rounded-xl',
    'rounded-2xl',
  ]
}
