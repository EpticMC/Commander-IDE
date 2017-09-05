"use strict";
const _ce = require("../customElements");

//No Operation
const noop = () => {};

class TabElement extends HTMLElement {
    activateTab() {
        this.tabItem.style.display = 'block';
        this.classList.add(TabFolder.classActive);
    }
    deactivateTab() {
        this.tabItem.style.display = 'none';
        this.classList.remove(TabFolder.classActive);
    }
    connectedCallback() {
        if (!this.tabItem) return;
        if (this.tabItem.tabContent) this.appendChild(this.tabItem.tabContent);
        else {
            let label = this.tabItem.getAttribute(TabFolder.attributeLabel);
            if (!label) label = this.tabItem.nodeName; 
            const closable = this.tabItem.classList.contains(TabFolder.classClosable);
            const labelElement = document.createElement('a');
            labelElement.href = '#';
            labelElement.textContent = label;
            this.appendChild(labelElement);
            if (closable) {
                const close = document.createElement('span');
                this.classList.add('fa', 'fa-close');
                this.appendChild(close);
            }
        }
        this.deactivateTab();
    }
}
TabElement.tag = 'commander-tabs';
_ce.default.define(TabElement.tag, TabElement);
class TabFolder extends HTMLElement {
    addItem(element) {
        const header = this.children[0];
        const tab = new TabElement();
        tab.tabItem = element;
        tab.addEventListener('click', e => { this.activateTab(tab); });
        header.appendChild(tab);
        element.style.height = '100%';
        if (header.children.length == 1 || element.classList.contains(TabFolder.classActive)) this.activateTab(tab);
    }
    activateTab(tab) {
        if (this.currentTab) this.currentTab.deactivateTab();
        this.currentTab = tab;
        tab.activateTab();
    }
    activateItem(item) {
        const header = this.querySelector(`.${TabFolder.classHeader}`);
        for (let i = 0; i < header.children.length; i++) {
            const tab = header.children[i];
            if (tab.tabItem === item) {
                this.activateTab(tab);
                return;
            }
        }
    }
    connectedCallback() {
        const header = document.createElement('ul');
        header.classList.add(TabFolder.classHeader);
        if (this.children.length > 0) document.insertBefore(header, this.children[0]);
        else this.appendChild(header);
        for (let i = 1; i < this.children.length; i++) (this.children[i] instanceof HTMLElement) ? this.addItem(this.children[i]) : noop();
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                for (let i = 0; i < mutation.addedNodes.length; i++) (mutation.addedNodes[i] instanceof HTMLElement) ? this.addItem(mutation.addedNodes[i]) : noop();
                return;
            });
        });
        observer.observe(this, { childList: true });
    }
}
TabFolder.tag            = 'commander-tabs-folder';
TabFolder.attributeLabel = 'two-class-label';
TabFolder.classClosable  = 'commander-tabs-closable';
TabFolder.classActive    = 'commander-tabs-active';
TabFolder.classHeader    = 'commander-tabs-header';

exports.default = TabFolder;
_ce.default.define(TabFolder.tag, TabFolder);
