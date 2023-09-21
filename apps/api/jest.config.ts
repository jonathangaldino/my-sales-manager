import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { isolatedModules: true }],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: './jest.setup.ts',
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
};

export default config;
