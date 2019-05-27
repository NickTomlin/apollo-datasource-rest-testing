module.exports = {
  modulePathIgnorePatterns: ["lib"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  setupFiles: ["./setupJest.ts"]
}
