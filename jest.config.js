// This code uses a default export
const testMatch = ['**/__tests__/**/*.test.js'];
const transform = {
  '^.+\\.jsx?$': 'babel-jest',

};
export default { testMatch, transform };
