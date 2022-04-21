module.exports = {
  mode: "jit",
  // purge: ['./src/**/*.{vue,js,ts,jsx,tsx}', './public/index.html'],
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],




}
