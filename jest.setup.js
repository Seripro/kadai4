require("@testing-library/jest-dom");
require("dotenv").config();
global.TextEncoder = require("util").TextEncoder;
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
if (!global.structuredClone) {
  global.structuredClone = function structuredClone(objectToClone) {
    if (objectToClone === undefined) return undefined;
    return JSON.parse(JSON.stringify(objectToClone));
  };
}
