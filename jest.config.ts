import type { Config } from '@jest/types';
import path from 'path';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^modules/(.*)$': '<rootDir>/src/modules/$1',
    '^db/(.*)$': '<rootDir>/src/db/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  collectCoverageFrom: ['src/modules/useCases/*.ts', 'src/shared/utils/*.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: path.resolve(__dirname, 'tsconfig.json') }],
  },
};

export default config;
