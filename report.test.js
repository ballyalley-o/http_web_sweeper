const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages 2 pages", () => {
  const input = {
    "https://wagslane.dev/path": 6,
    "https://wagslane.dev": 9
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev", 9],
    ["https://wagslane.dev/path", 6]
]
  expect(actual).toEqual(expected);
});

test("sortPages 6 pages", () => {
  const input = {
    "https://wagslane.dev/path": 6,
    "https://wagslane.dev": 9,
    "https://wagslane.dev/path2": 10,
    "https://wagslane.dev/path3": 12,
    "https://wagslane.dev/path4": 3,
    "https://wagslane.dev/path5": 1,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev/path3", 12],
    ["https://wagslane.dev/path2", 10],
    ["https://wagslane.dev", 9],
    ["https://wagslane.dev/path", 6],
    ["https://wagslane.dev/path4", 3],
    ["https://wagslane.dev/path5", 1]
  ];
  expect(actual).toEqual(expected);
});
