const { ipcRenderer } = require("electron");
const remote = require("electron").remote;
const { app, BrowserWindow }  = require("electron");
const fs = require("fs");

window.onload = () => {
    var win = remote.getCurrentWindow();
    win.setResizable(true);
}
