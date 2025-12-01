// src/jest.config.js
module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testMatch: [
    '**/scripts/**/recommendation.test.ts',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-?react-native)|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*)',
    'node_modules/react-native/.*'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
