/**
 * @fileoverview Tests for no-workspace-folders rule
 */
"use strict";

const rule = require("../rules/no-workspace-folders");
const { RuleTester } = require("eslint");

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020 } });

ruleTester.run("no-workspace-folders", rule, {
  valid: [
    // Using getAllWorkspaceFolders() is valid
    "workspace.getAllWorkspaceFolders()",
    "const folders = workspace.getAllWorkspaceFolders()",
    "const { getAllWorkspaceFolders } = workspace",
    "getAllWorkspaceFolders()"
  ],
  invalid: [
    // Direct property access
    {
      code: "workspace.workspaceFolders",
      errors: [{ messageId: "noWorkspaceFolders" }]
    },
    {
      code: "const folders = workspace.workspaceFolders",
      errors: [{ messageId: "noWorkspaceFolders" }]
    },
    {
      code: "if (workspace.workspaceFolders) { console.log('has folders'); }",
      errors: [{ messageId: "noWorkspaceFolders" }]
    },
    // Object destructuring
    {
      code: "const { workspaceFolders } = workspace",
      errors: [{ messageId: "noWorkspaceFolders" }]
    },
    {
      code: "function test({ workspaceFolders }) { console.log(workspaceFolders); }",
      errors: [{ messageId: "noWorkspaceFolders" }]
    },
    {
      code: "const { workspaceFolders: folders } = workspace",
      errors: [{ messageId: "noWorkspaceFolders" }]
    }
  ]
});