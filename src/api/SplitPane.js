"use strict";

const _ce = require("../customElements");
class Splitter extends HTMLElement {
    constructor() {
        super();
        this.dragging = false;
        this._move = this.move.bind(this);
        this._stop = (e) => this.stopDragging(e);
    }
    getLeft()  { return this.previousElementSibling; }
    getRight() { return this.nextElementSibling; }
    move(e) {
        const widthLeft = e.pageX + this.startX - this.getLeft().offsetLeft;
        this.getLeft().style.width = `${widthLeft}px`;
        const widthRight = this.getRight().offsetLeft + this.getRight().offsetWidth - e.pageX - this.offsetWidth + this.startX;
        this.getRight().style.width = `${widthRight}px`;
    }
    startDragging(e) {
        this.dragging = true;
        this.startX = e.offsetX;
        window.addEventListener('mouseup', this._stop);
        window.addEventListener('mousemove', this._move);
    }
    stopDragging(e) {
        if (this.dragging) {
            window.removeEventListener('mousemove', this._move);
            window.removeEventListener('mouseup', this._stop);
            this.dragging = false;
        }
    }
    connectedCallback() {
        this.style.width       = '0';
        this.style.padding     = '1px';
        this.style.background  = '#ccc';
        this.style.cursor      = 'col-resize';
        if (this.nextElementSibling) this.nextElementSibling.style.flex = 'auto';
        this.addEventListener('mousedown', this.startDragging);
    }
}
Splitter.tag = 'commander-splitter';
_ce.default.define(Splitter.tag, Splitter);
class SplitPane extends HTMLElement {
    connectedCallback() {
        this.style.display  = 'flex';
        this.style.overflow = 'hidden';
        this.style.width    = '100%';
        this.style.height   = '100%';
        let kids = [];
        for (let i = 0; i < this.children.length; i++) kids.push(this.children[i]);
        for (let i = 1; i < kids.length; i++) {
            const splitter = new Splitter();
            this.insertBefore(splitter, kids[i]);
        }
    }
}
SplitPane.tag = 'commander-split';
exports.default = SplitPane;
_ce.default.define(SplitPane.tag, SplitPane);
