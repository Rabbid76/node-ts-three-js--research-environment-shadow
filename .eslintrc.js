/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint.
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/

module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    globals: {
      THREE: "writable",
      TWEEN: "writeable",
      Stats: "writeable",
      WebAssembly: "readonly",
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: ["./src/client/tsconfig.json", "./src/server/tsconfig.json"],
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "prettier"],
    ignorePatterns: [
      "*.glb",
      "*.json",
      "*.env",
      "*.envmap",
      "*.exr",
      "beta/**/*",
      "dist/**/*",
      "patches/**/*",
      "resources/**/*",
      "src/client/webpack.*.js",
      "/*.js",
    ],
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/ban-types": [
        "error",
        {
          types: {
            Object: {
              message: "Avoid using the `Object` type. Did you mean `object`?",
            },
            Function: {
              message:
                "Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
            },
            Boolean: {
              message: "Avoid using the `Boolean` type. Did you mean `boolean`?",
            },
            Number: {
              message: "Avoid using the `Number` type. Did you mean `number`?",
            },
            String: {
              message: "Avoid using the `String` type. Did you mean `string`?",
            },
            Symbol: {
              message: "Avoid using the `Symbol` type. Did you mean `symbol`?",
            },
          },
        },
      ],
      "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/dot-notation": "error",
      "@typescript-eslint/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "semi", requireLast: true },
          singleline: { delimiter: "semi", requireLast: false },
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-parameter-properties": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/quotes": ["error", "single"],
      "@typescript-eslint/semi": ["error", "always"],
      "@typescript-eslint/triple-slash-reference": [
        "error",
        {
          path: "always",
          types: "prefer-import",
          lib: "always",
        },
      ],
      "@typescript-eslint/unified-signatures": "error",
      "arrow-parens": ["error", "always"],
      "brace-style": "off",
      camelcase: "error",
      "comma-dangle": "off",
      complexity: ["error", { max: 13 }],
      "constructor-super": "error",
      curly: "error",
      "eol-last": "error",
      eqeqeq: ["error", "smart"],
      "for-direction": "error",
      "getter-return": "error",
      "guard-for-in": "off",
      "id-match": "error",
      "import/order": "off",
      "jsdoc/check-alignment": "off",
      "jsdoc/check-indentation": "off",
      "jsdoc/newline-after-description": "off",
      "max-classes-per-file": "off",
      "max-len": "off",
      "new-parens": "error",
      "no-async-promise-executor": "error",
      "no-bitwise": "off",
      "no-caller": "error",
      "no-case-declarations": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-console": "off",
      "no-const-assign": "error",
      "no-constant-condition": "error",
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-delete-var": "error",
      "no-dupe-args": "error",
      "no-dupe-class-members": "error",
      "no-dupe-else-if": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": "error",
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-eval": "error",
      "no-ex-assign": "error",
      "no-extra-boolean-cast": "error",
      "no-extra-semi": "error",
      "no-fallthrough": "off",
      "no-func-assign": "error",
      "no-global-assign": "error",
      "no-import-assign": "error",
      "no-inner-declarations": "error",
      "no-invalid-regexp": "error",
      "no-invalid-this": "off",
      "no-irregular-whitespace": "error",
      "no-misleading-character-class": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-multiple-empty-lines": "error",
      "no-new-symbol": "error",
      "no-new-wrappers": "error",
      "no-obj-calls": "error",
      "no-octal": "error",
      "no-redeclare": "error",
      "no-regex-spaces": "error",
      "no-self-assign": "error",
      "no-setter-return": "error",
      // 'no-shadow': ['error', {'hoist': 'all'}], --> see why we commented it: https://github.com/typescript-eslint/typescript-eslint/issues/2483#issuecomment-687095358
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      "no-this-before-super": "error",
      "no-throw-literal": "error",
      "no-trailing-spaces": "error",
      "no-undef": "error",
      "no-undef-init": "error",
      "no-underscore-dangle": 0,
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "no-unused-labels": "error",
      "no-useless-catch": "error",
      "no-with": "error",
      "object-shorthand": "error",
      "one-var": ["error", "never"],
      "prefer-arrow/prefer-arrow-functions": "off",
      "prefer-const": "off",
      "quote-props": ["error", "consistent-as-needed"],
      radix: "error",
      "require-yield": "error",
      "space-before-function-paren": [
        "error",
        { anonymous: "always", named: "never", asyncArrow: "always" },
      ],
      "use-isnan": "error",
      "valid-typeof": "off",
  
      // @todo review these rules because I needed to complete this MR and
      // have no time for further investigation
      "id-blacklist": "off",
      "arrow-body-style": "off",
      "no-useless-escape": "off",
      "prefer-rest-params": "off",
      "no-prototype-builtins": "off",
      "variable-name": "off",
  
      "@typescript-eslint/prefer-includes": "off",
      "@typescript-eslint/member-ordering": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off", // has a fix option
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-unsafe-call": "off", // @todo enable it again
      "@typescript-eslint/no-unsafe-member-access": "off", // @todo enable it again
      "@typescript-eslint/restrict-plus-operands": "off", // @todo enable it again
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        {
          "ts-ignore": { descriptionFormat: "^ -- " },
          "ts-nocheck": { descriptionFormat: "^ -- " },
        },
      ],
      "@typescript-eslint/no-unsafe-return": "off", // @todo enable it again
      "@typescript-eslint/no-unsafe-assignment": "off", // @todo enable it again
      "@typescript-eslint/no-unsafe-argument": "off", // @todo enable it again
      "@typescript-eslint/no-floating-promises": "off", // @todo enable it again
      "@typescript-eslint/restrict-template-expressions": "off", // @todo enable it again
  
      // see why we next two lines are needed:
      // https://github.com/typescript-eslint/typescript-eslint/issues/2483#issuecomment-687095358
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
        },
      ],
    },
    overrides: [
      {
        files: ["packages/common-core/mock/**/*.ts"],
        rules: {
          "@typescript-eslint/no-unused-vars": "off",
        },
      },
      {
        // node files
        files: [
          "./packages/package-build/**/*.js",
          "./packages/general-build/**/*.js",
          "./packages/test-helpers/unit/global-setup.ts",
          "./.eslintrc.js",
          "./prettier.config.js",
          "./typedoc.js",
          "./jest.config.js",
        ],
        parserOptions: {
          sourceType: "script",
        },
        env: {
          browser: false,
          node: true,
        },
        plugins: ["node"],
        extends: ["plugin:node/recommended"],
        rules: {
          // this can be removed once the following is fixed
          // https://github.com/mysticatea/eslint-plugin-node/issues/77
          "node/no-unpublished-require": "off",
        },
      },
      {
        // rollup.config.js files
        files: [
          "./packages/general-build/rollup-plugin-acceptance-test-creation.js",
          "./packages/general-build/rollup-defaults.js",
          "./**/rollup.config.js",
        ],
        parserOptions: {
          sourceType: "script",
        },
        env: {
          browser: false,
          node: true,
        },
        plugins: ["node"],
        extends: ["plugin:node/recommended"],
        rules: {
          // this can be removed once the following is fixed
          // https://github.com/mysticatea/eslint-plugin-node/issues/77
          "node/no-unpublished-require": "off",
          "node/no-unsupported-features/es-syntax": "off",
          "@typescript-eslint/no-var-requires": "off",
          "node/no-unpublished-import": "off",
        },
      },
      {
        // Test files:
        files: [
          "./packages/test-helpers/unit/setup-globals.js",
          "./packages/configurator-core/__acceptance__/boot.ts",
          "./packages/configurator-core/src/utils/test-helpers/**/*",
          "./packages/**/__tests__/**/*.ts",
        ],
        env: {
          "jest/globals": true,
        },
        plugins: ["jest"],
        extends: ["plugin:jest/recommended"],
        rules: {
          "no-useless-catch": "off", // @todo turn on later
          "@typescript-eslint/require-await": "off", // @todo turn on later
          "@typescript-eslint/no-unused-vars": "off", // @todo turn on later
          "@typescript-eslint/no-empty-function": "off", // @todo turn on later
          "@typescript-eslint/await-thenable": "off", // @todo turn on later
          "@typescript-eslint/no-non-null-assertion": "off", // @todo turn on later
          "jest/no-alias-methods": "off", // @todo turn on later
          "jest/no-conditional-expect": "off", // @todo turn on later
          "jest/no-done-callback": "off", // @todo turn on later
          "jest/no-commented-out-tests": "off", // @todo turn on later
          "jest/no-disabled-tests": "off", // @todo turn on later
          "jest/no-identical-title": "off", // @todo turn on later
          "jest/expect-expect": "off", // @todo turn on later
          "jest/valid-expect": "off", // @todo turn on later
        },
      },
    ],
  };
  