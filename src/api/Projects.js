"use strict";
const _ce = require("../customElements");

var text = "Test 2";

class Projects extends HTMLElement { connectedCallback() { this.textContent = text; } }
Projects.tag = 'commander-projects';
exports.default = Projects;
_ce.default.define(Projects.tag, Projects);
