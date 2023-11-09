module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaFeatures": {
            "tsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["react", "@typescript-eslint", "react-hooks", "prettier","simple-import-sort"],
    "rules": {
        "camelcase": "error",
        "no-duplicate-imports": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any":"off",
        "react/react-in-jsx-scope":"off",
        "no-console": "error",
        "no-alert": "error",
        "react-hooks/exhaustive-deps": "off",
        "react/prop-types": 0,
        "react/display-name": 0,
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "@typescript-eslint/no-empty-function":"off",
        "react/no-unknown-property":"off",
        "react/no-unescaped-entities ":"off"
    },
    "settings": {
        "import/resolver": {
            "typescript": {}
        }
    }
}
