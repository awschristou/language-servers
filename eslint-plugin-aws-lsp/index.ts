/**
 * @fileoverview ESLint plugin for AWS LSP
 * @author AWS LSP Team
 */

import noWorkspaceFolders from './rules/no-workspace-folders';

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

export = {
    rules: {
        "no-workspace-folders": noWorkspaceFolders,
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