
module.exports = {
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "prettier/react",
    "prettier"
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  rules: {
    "max-len": ["error", { "code": 60 }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "import/prefer-default-export": "off",
    "react/destructuring-assignment": "off",
    // airnb-typescript is stale to support eslint https://github.com/typescript-eslint/typescript-eslint/issues/2077
    "@typescript-eslint/camelcase": "off",
  }
}
