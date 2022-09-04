export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testMatch: [ '**/__tests__/**/*.m[jt]s?(x)', '**/?(*.)+(spec|test).m[tj]s?(x)']
};
