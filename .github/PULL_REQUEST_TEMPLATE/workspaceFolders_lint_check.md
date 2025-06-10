---
title: "Lint check for workspaceFolders property usage"
labels: enhancement
assignees: ''
---

## Description

This PR adds a custom ESLint rule to detect and prevent usage of the `workspaceFolders` property, which can change during a user's session. Instead, developers should use the `getAllWorkspaceFolders()` method.

## Implementation

- Created a custom ESLint plugin (`eslint-plugin-aws-lsp`) with a rule to detect usage of `workspaceFolders`
- Added the plugin to the project's ESLint configuration
- Added tests to verify the rule works correctly

## Testing

- Ran ESLint on the codebase to verify the rule catches improper usage
- Added unit tests for the ESLint rule

## Checklist

- [ ] I have updated the documentation accordingly
- [ ] I have added tests to cover my changes
- [ ] All new and existing tests passed
- [ ] My changes generate no new warnings
- [ ] I have checked that my code follows the style guidelines of this project