module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Setup for testing library
};