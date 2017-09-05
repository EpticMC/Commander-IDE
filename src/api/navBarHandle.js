const { webContents } = require("electron");
const { app, BrowserWindow } = require("electron");
window.$ = window.jQuery = require("jquery");
const remote = require("electron").remote;
const shell = require('electron').shell;

//Links
var _bug = "https://github.com/EpticMC/Commander-IDE/issues";
var _con = "https://nulldev.org/contact";
var _git = "https://github.com/EpticMC/Commander-IDE";
var _ept = "https://epticmc.com";

$(document).ready(function() {
	$(".nav-bar ul li").click(function(e) {
		e.stopPropagation();
		$(".visible").removeClass("visible");
		$(this).children(" div.submenu").addClass("visible").fadeIn();
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
	});
	$("body:not(.nav-bar ul.left li), body:not(.nav-bar li input#search)").click(function() {
		$(".selected").removeClass("selected");
		$(".visible").removeClass("visible");
	});


	//File

	//Edit
	$("#e__copy").click(function() { document.execCommand('copy'); });
	$("#e__copy_all").click(function() {
		$(".monaco-editor").select();
		document.execCommand('copy'); 
	});
	$("#e__select_all").click(function() { $(".monaco-editor").select(); });


	//View
	$("#v__dev").click(function()     { remote.getCurrentWindow().toggleDevTools(); });

	//Help
	$("#h__about").click(function(){ 

	});
	$("#h__bug").click(function()     { shell.openExternal(_bug); });
	$("#h__contact").click(function() { shell.openExternal(_con); });
	$("#h__code").click(function()    { shell.openExternal(_git); });
	$("#h__eptic").click(function()   { shell.openExternal(_ept); });
});
