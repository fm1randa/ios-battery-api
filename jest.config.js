/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  watchPathIgnorePatterns: ["<rootDir>/data/"],
  testPathIgnorePatterns: ["<rootDir>/dist/"],
};
