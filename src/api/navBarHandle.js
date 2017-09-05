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
	$("#f__new").click(function() {

	});
	$("#f__open").click(function() {

	});
	$("#f__recent").click(function() {

	});
	$("#f__save").click(function() {

	});
	$("#f__save_as").click(function() {

	});
	$("#f__save_and_quit").click(function() {

	});
	$("#f__quit").click(function() {

	});

	//Edit
	$("#e__undo").click(function() { 

	});
	$("#e__redo").click(function() { 

	});
	$("#e__cut").click(function() { 

	});
	$("#e__copy").click(function() { 

	});
	$("#e__copy_all").click(function() {

	});
	$("#e__paste").click(function() { 

	});
	$("#e__paste_and_replace").click(function() { 

	});
	$("#e__select_all").click(function() { 

	});

	//View
	$("#v__max").click(function() { 

	});
	$("#v__min").click(function() { 

	});
	$("#v__normal").click(function() { 

	});
	$("#v__reload").click(function() { 

	});
	$("#v__dev").click(function() { remote.getCurrentWindow().toggleDevTools(); });
	$("#v__zoom_in").click(function() { 

	});
	$("#v__zoom_out").click(function() { 

	});
	$("#v__fullscreen").click(function() { 

	});

	//Help
	$("#h__about").click(function(){ 

	});
	$("#h__bug").click(function()     { shell.openExternal(_bug); });
	$("#h__contact").click(function() { shell.openExternal(_con); });
	$("#h__code").click(function()    { shell.openExternal(_git); });
	$("#h__eptic").click(function()   { shell.openExternal(_ept); });
});
