module.exports = {
    env: {
        es6: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:unicorn/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["tsconfig.eslint.json"],
        // Allows for the parsing of modern ECMAScript features if you're using modern node.js or frontend bundling
        // this will be inferred from tsconfig if left commented
        // ecmaVersion: 2020,
        sourceType: "module", // Allows for the use of imports
        // Allows for the parsing of JSX if you are linting React
        // ecmaFeatures: {
        //  jsx: true
        // }
    },
    rules: {
        "unicorn/filename-case": [
            "warn",
            {
                cases: {
                    camelCase: false,
                    pascalCase: false,
                },
            },
        ],
    },
    overrides: [
        {
            "files": [
                "*.ts",
            ],
            "rules": {
                "unicorn/require-post-message-target-origin": "off"
            }
        }
    ],
    plugins: ["@typescript-eslint", "import", "prefer-arrow", "unicorn"],
    settings: {
        "import/resolver": {
            typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
        },
    },
};
