"use strict";
const _ce = require("../../customElements");
const _sp = require("../SplitPane");
const _fe = require("../FileExplorer");
const _me = require("../Monaco");
const path = require("path");
class CodePage extends HTMLElement {
    activateEditor(editor) {
        if (this.activeEditor) this.activeEditor.active = false;
        this.activeEditor = editor;
        this.activeEditor.active = true;
    }
    openEditor(filePath) {
        const name = path.basename(filePath);
        const monaco = new _me.default();
        this.editorSpacustomElements.appendChild(monaco);
        monaco.openFile(filePath);
        monaco.addEventListener('close-editor', (e) => {
            e.stopPropagation();
            const editor = e.detail.editor;
            if (editor === this.activeEditor) {
                for (let i = 1; i < this.editorSpacustomElements.children.length; ++i) {
                    if (editor !== this.editorSpacustomElements.children[i]) {
                        this.activateEditor(this.editorSpacustomElements.children[i]);
                        break;
                    }
                }
            }
            this.editorSpacustomElements.removeChild(editor);
            this.tabList.removeChild(editor.editorTab);
        });
        const tab = monaco.editorTab;
        this.tabList.appendChild(tab);
        tab.addEventListener('click', () => this.activateEditor(monaco));
        this.activateEditor(monaco);
    }
    connectedCallback() {
        const splitPane = new _sp.default();
        const fileExplorer = new _fe.default();
        splitPane.appendChild(fileExplorer);
        fileExplorer.addEventListener('open-file', (e) => {
            e.stopPropagation();
            this.openEditor(e.detail.filePath);
        });
        this.editorSpacustomElements = document.createElement('div');
        this.editorSpacustomElements.style.height = '100%';
        splitPane.appendChild(this.editorSpacustomElements);
        const nav = document.createElement('nav');
        this.editorSpacustomElements.appendChild(nav);
        nav.classList.add('editortabs');
        this.tabList = document.createElement('ul');
        nav.appendChild(this.tabList);
        this.appendChild(splitPane);
        document.addEventListener('keydown', (e) => {
            if (e.metaKey && e.which === 83) {
                console.log('Ctrl+S!');
                e.preventDefault();
                return false;
            }
        });
    }
}
CodePage.tag = 'commander-codeedit';
exports.default = CodePage;
_ce.default.define(CodePage.tag, CodePage);
