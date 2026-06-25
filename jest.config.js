module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
