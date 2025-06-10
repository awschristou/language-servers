/**
 * @fileoverview ESLint plugin for AWS LSP
 * @author AWS LSP Team
 */

"use strict";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
    rules: {
        "no-workspace-folders": require("./rules/no-workspace-folders"),
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