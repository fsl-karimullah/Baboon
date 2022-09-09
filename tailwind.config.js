module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    theme: {
      colors: {
        blueprimary: '#00a0e9',
      },
    },
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
