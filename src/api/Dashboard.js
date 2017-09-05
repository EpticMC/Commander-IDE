"use strict";
const _ce = require("../customElements");

var text = "Test";

class Dashboard extends HTMLElement { connectedCallback() { this.textContent = text; } }
Dashboard.tag = 'commander-setting';
exports.default = Dashboard;
_ce.default.define(Dashboard.tag, Dashboard);
