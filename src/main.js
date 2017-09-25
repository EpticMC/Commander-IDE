const { ipcRenderer } = require("electron");
const remote = require("electron").remote;
const { app, BrowserWindow }  = require("electron");
window.$ = window.jQuery = require("jquery");
const fs = require("fs");

window.onload = () => {
    var win = remote.getCurrentWindow();
    let currentWindow = remote.getCurrentWindow().removeAllListeners();
    win.setResizable(true);
    win.setMinimumSize(800, 400);
    win.setTitle(win.getTitle() + " - Main");

    currentWindow.on('resize', function () {
		//Width bugfix
    });
}
