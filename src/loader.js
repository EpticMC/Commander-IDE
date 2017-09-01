const {webContents} = require('electron');
const { app, BrowserWindow } = require("electron");
window.$ = window.jQuery = require('jquery');

window.onload = () => {
	//Tasks
	$(document).ready(function() {
		setTimeout(function(){ window.location = "../layouts/main.html"; }, 3000);
	});
}