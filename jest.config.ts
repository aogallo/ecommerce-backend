import { type JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'

// import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  detectOpenHandles: true,
  // extensionsToTreatAsEsm: ['.ts'],
  // modulePaths: [compilerOptions.baseUrl],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleNameMapper: {
    '@resolvers/(.*)$': '<rootDir>/src/resolvers/$1',
    '@permissions/(.*)$': '<rootDir>/src/permissions/$1',
    '@entities/(.*)$': '<rootDir>/src/entities/$1',
    '@src/(.*)$': '<rootDir>/src/$1',
  },
  // roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  // transform: {
  //   // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
  //   // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
  //   '^.+\\.tsx?$': [
  //     'ts-jest',
  //     {
  //       useESM: true,
  //     },
  //   ],
  // },
}

export default jestConfig
