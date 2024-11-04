const packagesToTransform = [
  "react-native",
  "react-native-(.*)",
  "@react-native",
  "@react-native-community",
  "@react-navigation",
  "expo",
  "expo-(.*)",
  "react-native-svg",
  "moti",
]

const config = {
  preset: 'jest-expo',
  // test environment setup
  setupFiles: ['./jest.setup.js'],
  clearMocks: true,
  // module resolution
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transformIgnorePatterns: [
    `node_modules/(?!(${packagesToTransform.join("|")})/)`
  ],
  // module transformation
  testRegex: "\\.spec\\.tsx?$",
  //coverage
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 70,
    },
  },
  collectCoverageFrom: ['src/components/**/*.{ts,tsx}', 'src/pages/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}', 'src/context/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['index.ts', 'mock.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = config
