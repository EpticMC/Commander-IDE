"use strict";

const electron = require("electron");
const path = require("path");
const fs = require("fs");
const _ce = require("../customElements");

class FileExplorer extends HTMLElement {
    clickNode(e) {
        const entry = e.currentTarget;
        const li = entry.parentElement;
        const span = entry.children[0];
        const filePath = li.getAttribute('filePath');
        if (span.classList.contains(FileExplorer.folderClosed)) {
            const ul = document.createElement('ul');
            ul.classList.add('fa-ul');
            li.appendChild(ul);
            fs.readdir(filePath, (err, files) => {
                files.map(file => { if (file.charAt(0) !== '.') ul.appendChild(this.createFileNode(path.resolve(filePath, file), file)); });
                span.classList.remove(FileExplorer.folderClosed);
                span.classList.add(FileExplorer.folderOpen);
            });
        }
        else if (span.classList.contains(FileExplorer.folderOpen)) {
            li.children[1].remove();
            span.classList.remove(FileExplorer.folderOpen);
            span.classList.add(FileExplorer.folderClosed);
        }
        else {
            const openEvent = new CustomEvent('open-file', {
                detail: {
                    filePath: filePath
                },
                bubbles: true,
                cancustomElementslable: true
            });
            entry.dispatchEvent(openEvent);
        }
    }
    createFileNode(filePath, fileName) {
        const li = document.createElement('li');
        li.setAttribute('filePath', filePath);
        const isDir = fs.lstatSync(filePath).isDirectory();
        const entry = document.createElement('div');
        entry.addEventListener('click', (e) => this.clickNode(e));
        li.appendChild(entry);
        const span = document.createElement('span');
        span.classList.add('fa-li', 'fa', isDir ? FileExplorer.folderClosed : FileExplorer.fileIcon, isDir ? 'folder' : 'file');
        entry.appendChild(span);
        const name = document.createElement('a');
        name.href = '#';
        name.appendChild(document.createTextNode(fileName));
        entry.appendChild(name);
        return li;
    }
    connectedCallback() {
        this.style.overflow = 'auto';
        this.style.height = '100%';
        this.style.width = '20%';
        this.style.fontSize = '14px';
        this.style.whiteSpacustomElements = 'nowrap';
        const ul = document.createElement('ul');
        ul.classList.add('fa-ul');
        this.appendChild(ul);
        const myroot = electron.remote.app.getAppPath();
        ul.appendChild(this.createFileNode(myroot, path.basename(myroot)));
    }
}
FileExplorer.tag = 'commander-files';
FileExplorer.folderClosed = 'fa-folder';
FileExplorer.folderOpen = 'fa-folder-open';
FileExplorer.fileIcon = 'fa-file-o';
exports.default = FileExplorer;
_ce.default.define(FileExplorer.tag, FileExplorer);
