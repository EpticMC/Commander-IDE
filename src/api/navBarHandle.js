const { webContents } = require("electron");
const { app, BrowserWindow } = require("electron");
window.$ = window.jQuery = require("jquery");
const remote = require("electron").remote;
const shell = require('electron').shell;
const {webFrame} = require('electron')

//Links
var _bug = "https://github.com/EpticMC/Commander-IDE/issues";
var _con = "https://nulldev.org/contact";
var _git = "https://github.com/EpticMC/Commander-IDE";
var _ept = "https://epticmc.com";

function modal(msg, headeroff, footeroff){
	if (headeroff) $(".nlmodal-header").css("display", "none");
	if (footeroff) $(".nlmodal-footer").css("display", "none");
	$(".nlmodal").css("display", "block");
	$("#nlmodal-text").html(msg);
}

function forceModalClose(){ 
	$(".nlmodal").css("display", "none"); 
	$(".nlmodal-header").css("display", "block");
	$(".nlmodal-footer").css("display", "block");
}

function open(url){
	shell.openExternal(url);
	modal(
		"Opening link in browser..." +
		"<br><br>" +
		"Note: This may take a while depending on your standard browser."
	);
}

$(document).ready(function() {
	var win = remote.getCurrentWindow();
	$(".nav-bar ul li").click(function(e) {
		e.stopPropagation();
		$(".visible").removeClass("visible");
		$(this).children(" div.submenu").addClass("visible").fadeIn();
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
	});
	$("html").click(function() {
		if ($(this).attr("id") == "v__zoom" || $(this).attr("class") == "zoomer") return;
		else {
			$(".selected").removeClass("selected");
			$(".visible").removeClass("visible");
		}
	});

	$(".nlmodal-close").click(function(e) { forceModalClose(); });
	window.onclick = function(event) { if (event.target == document.getElementById("nlmodal")) forceModalClose(); }

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
	$("#v__max").click(function() { remote.BrowserWindow.getFocusedWindow().maximize();	});
	$("#v__min").click(function() { remote.BrowserWindow.getFocusedWindow().minimize(); });
	$("#v__normal").click(function() { 
		if (win.isFullScreen()) win.setFullScreen(false);
		if (win.isMaximized()) win.unmaximize();
    	win.setSize(1000, 600, true);
	});
	$("#v__reload").click(function() { win.reload(); });
	$("#v__dev").click(function() { remote.getCurrentWindow().toggleDevTools(); });
	$(".zoomer").on("change", function() {
		var val = $(this).val();
		var rnd = (Math.round(val / 10) * 10);
		$(this).val(rnd);
		var newrnd = rnd + 50;
		$(".zoom_val").text("Zoom: " + newrnd + "%");
		var _zoom = newrnd / 100;
		webFrame.setZoomFactor(_zoom);
	});
	$("#v__reset_zoom").click(function() { 
		$(".zoom_val").text("Zoom: 100%");
		webFrame.setZoomFactor(1);
		$(".zoomer").val(50);
	});
	$("#v__fullscreen").click(function() { 
		if (win.isFullScreen()) win.setFullScreen(false);
		else win.setFullScreen(true);
	});

	//Help
	$("#h__about").click(function(){ 
		var _d = new Date();
		var _n = _d.getFullYear();
		modal(
			"<div style=\"text-align: center;\"><b>Commander IDE</b></div>" +
			"<br><br>" +
			"<img style=\"display: block; margin: auto;\" text-align=\"center\" width=\"auto\" height=\"100px\" src=\"../icon/icon.png\">" +
			"<br><br>" +
			"Commander IDE is an <b>I</b>ntegrated <b>D</b>evelopment <b>E</b>nvironment to \"Code\" CommandBlock programms." +
			"<br><br>" +
			"Developed by NullDev for the EpticMC Project." +
			"<br><br>" +
			"<img style=\"display: block; margin: auto;\" text-align=\"center\" width=\"auto\" height=\"100px\" src=\"../icon/nl.png\">" +
			"<br><br>" +
			"<div style=\"text-align: center;\">Copyright (c) " + _n + " NullDev</div>", 
			false, 
			true
		);
	});
	$("#h__bug").click(function()     { open(_bug); });
	$("#h__contact").click(function() { open(_con); });
	$("#h__code").click(function()    { open(_git); });
	$("#h__eptic").click(function()   { open(_ept); });
});
