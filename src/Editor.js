"use strict";

const _ce = require("customElements");
const path = require("path");
class EditorTab extends HTMLElement {
    connectedCallback() {
        this.a = document.createElement('a');
        this.a.href = '#';
        this.a.textContent = path.basename(this.editor.filePath);
        this.appendChild(this.a);
        const span = document.createElement('span');
        span.classList.add('fa', 'fa-times-circle');
        span.addEventListener('click', (e) => {
            e.stopPropagation();
            const closeEvent = new CustomEvent('close-editor', {
                detail: { editor: this.editor },
                bubbles: true,
                cancustomElementslable: true
            });
            this.editor.dispatchEvent(closeEvent);
        });
        this.appendChild(span);
    }
}
EditorTab.tag = 'commander-editor';
exports.EditorTab = EditorTab;
_ce.default.define(EditorTab.tag, EditorTab);
class Editor extends HTMLElement {
    openFile(filePath) {
        this.filePath = filePath;
    }
    get editorTab() {
        if (!this._editorTab) {
            this._editorTab = new EditorTab();
            this._editorTab.editor = this;
        }
        return this._editorTab;
    }
    set active(val) {
        if (val) {
            this.style.display = 'block';
            this.editorTab.classList.add('active');
        }
        else {
            this.style.display = 'none';
            this.editorTab.classList.remove('active');
        }
    }
}
exports.Editor = Editor;
