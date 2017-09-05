"use strict";
const _ui = require("../../UIExtension");
const _cp = require("./CodePage");
let codeUIExtension = new _ui.UIExtension();
codeUIExtension.pageProviders['code-page'] = {
    label: 'Code',
    create() { return new _cp.default(); }
};
exports.default = codeUIExtension;
