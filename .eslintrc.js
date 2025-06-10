module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'unused-imports', 'import'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        'no-restricted-properties': [
            'error',
            {
                object: 'params',
                property: 'workspaceFolders',
                message: 'Do not use workspaceFolders directly. Use getAllWorkspaceFolders() from workspace utils instead.'
            },
            {
                property: 'workspaceFolders',
                message: 'Do not use workspaceFolders directly. Use getAllWorkspaceFolders() from workspace utils instead.'
            }
        ],
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
        ],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                'newlines-between': 'never',
                alphabetize: { order: 'asc', caseInsensitive: true }
            }
        ]
    },
    ignorePatterns: ['**/node_modules/**', '**/out/**', '**/dist/**', '**/*.d.ts']
}