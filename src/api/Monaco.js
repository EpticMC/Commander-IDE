"use strict";

const Editor_1 = require("../Editor");
const _ce = require("../customElements");
const electron = require("electron");
const path = require("path");
const fs = require("fs");
class MonacoEditor extends Editor_1.Editor {
    openFile(filePath) {
        super.openFile(filePath);
        fs.readFile(filePath, 'UTF-8', (err, data) => {
            if (typeof monaco === 'undefined') {
                const amdRequire = require('monaco-editor/min/vs/loader.js').require;
                const basePath = path.resolve(path.join(electron.remote.app.getAppPath(), 'node_modules/monaco-editor/min')).replace(/\\/g, '/').replace(/ /g, '%20');
                const baseUrl = ('/' === basePath.charAt(0) ? 'file://' : 'file:///') + basePath;
                amdRequire.config({ baseUrl: baseUrl });
                self.module = undefined;
                self.process.browser = true;
                amdRequire(['vs/editor/editor.main'], () => this.createEditor(data));
            }
            else this.createEditor(data);
        });
    }
    createEditor(contents) {
        if (this.editor) this.editor.dispose();
        let language;
        switch (path.extname(this.filePath)) {
            case '.js': {
                language = 'javascript';
                break;
            }
            case '.html': {
                language = 'html';
                break;
            }
            case '.css': {
                language = 'css';
                break;
            }
            case '.json': {
                language = 'json';
                break;
            }
            case '.ts': {
                language = 'typescript';
                break;
            }
            case '.md': {
                language = 'markdown';
                break;
            }
            //case '.cobl': {
            default {
                language = 'commandblock';
                break;
            }
        }
        this.editor = monaco.editor.create(this, {
            value: contents,
            language: language,
            theme: 'vs-dark'
        });
    }
    connectedCallback() {
        this.style.height = '100%';
        this.style.width = '100%';
    }
}
MonacoEditor.tag = 'monaco-editor';
exports.default = MonacoEditor;
_ce.default.define(MonacoEditor.tag, MonacoEditor);
