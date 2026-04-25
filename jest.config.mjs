export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/test/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$":
      "<rootDir>/test/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};
