"use strict";

const electron = require("electron");
const path     = require("path");
const fs       = require("fs");

require('app-module-path').addPath(path.resolve(electron.remote.app.getAppPath(), 'src'));

const customElements = require("./customElements");
const tabHandle      = require("./api/TabFolder");
const dashHandle     = require("./api/Dashboard");
const projectHandle  = require("./api/Projects");
class CommanderIDE extends tabHandle.default {
    constructor() {
        super();
        this.loadExtensions();
    }
    loadExtensions() {
        this.extensions = {};
        const extDir = path.resolve(electron.remote.app.getAppPath(), "src/api/extensions");
        fs.readdirSync(extDir).map(dir => {
            const extension = require("./api/extensions/CodeUI").default;
            this.extensions["commander-code"] = extension;
        });
    }
    connectedCallback() {
        super.connectedCallback();
        const codeProvider = this.extensions['commander-code'].pageProviders['code-page'];
        const codePage = codeProvider.create();
        codePage.setAttribute(tabHandle.default.attributeLabel, codeProvider.label);
        codePage.classList.add(tabHandle.default.classActive);
        this.appendChild(codePage);
        
        const dashboard = new dashHandle.default();
        dashboard.setAttribute(tabHandle.default.attributeLabel, 'Settings');
        this.appendChild(dashboard);

        const projects = new projectHandle.default();
        projects.setAttribute(tabHandle.default.attributeLabel, 'Projects');
        this.appendChild(projects);
    }
}
CommanderIDE.tag = 'commander-ide';
exports.default = CommanderIDE;
customElements.default.define(CommanderIDE.tag, CommanderIDE);
