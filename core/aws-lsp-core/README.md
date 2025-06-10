Core library, contains common code and utilities for servers.

## Important Notes

### Workspace Folders

Do not use `workspaceFolders` property directly from the LSP initialization parameters. The set of active workspace folders can change throughout a user's session. Instead, use the utility method `getAllWorkspaceFolders()` from the workspace utils.

```typescript
// ❌ Don't do this
const folders = params.workspaceFolders;

// ✅ Do this instead
const folders = workspace.getAllWorkspaceFolders();
```

This repository includes a TypeScript declaration override and ESLint rule to prevent direct usage of `workspaceFolders` property.