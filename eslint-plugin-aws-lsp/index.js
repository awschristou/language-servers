/**
 * @fileoverview Custom ESLint rules for AWS Language Servers
 */
"use strict";

module.exports = {
  rules: {
    "no-workspace-folders": require("./rules/no-workspace-folders")
  },
  configs: {
    recommended: {
      plugins: ["aws-lsp"],
      rules: {
        "aws-lsp/no-workspace-folders": "error"
      }
    }
  }
};