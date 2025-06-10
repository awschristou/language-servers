---
title: "Add TypeScript compiler check for workspaceFolders property"
labels: enhancement
assignees: awschristou
base: awschristou/language-servers
---

## Description

This PR adds a TypeScript compiler check to prevent usage of the `workspaceFolders` property in favor of the `getAllWorkspaceFolders()` method. The `workspaceFolders` property is deprecated because the set of active workspace folders can change throughout a user's session.

## Changes

- Added a TypeScript declaration file that marks `workspaceFolders` property as `never` type, which will cause a compiler error when accessed
- Updated documentation to explain why `workspaceFolders` should not be used
- Added test files to demonstrate proper usage of `getAllWorkspaceFolders()`

## Testing

- Verified that accessing `workspaceFolders` property causes a compiler error
- Verified that using `getAllWorkspaceFolders()` method works correctly

## Related Issues

Fixes the issue described in the feature request about linting for usage of `workspaceFolders` property.