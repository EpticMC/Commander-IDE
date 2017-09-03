const { webContents } = require("electron");
const { app, BrowserWindow } = require("electron");
window.$ = window.jQuery = require("jquery");

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

	$("#e__copy").click(function() { document.execCommand('copy'); });
	$("#e__copy_all").click(function() {
		$(".monaco-editor").select();
		document.execCommand('copy'); 
	});
	$("#e__select_all").click(function() { $(".monaco-editor").select(); });
});
