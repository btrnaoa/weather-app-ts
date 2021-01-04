module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb-typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
