const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  '^@/(.*)$': '<rootDir>/src/$1',
  moduleNameMapper: {
    // Support CSS modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle absolute imports based on atomic design folders
    '^@atoms/(.*)$': '<rootDir>/src/components/atoms/$1',
    '^@molecules/(.*)$': '<rootDir>/src/components/molecules/$1',
    '^@organisms/(.*)$': '<rootDir>/src/components/organisms/$1',
    '^@templates/(.*)$': '<rootDir>/src/components/templates/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
};

module.exports = createJestConfig(customJestConfig);
