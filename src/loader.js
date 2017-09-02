const {webContents} = require('electron');
const { app, BrowserWindow } = require("electron");
window.$ = window.jQuery = require('jquery');

var _r = true;

window.onload = () => {
	$(document).ready(function() {
		setTimeout(startLoader(), 500);
		return;
	});
}

function next(){ setTimeout(end(), 500); }

function end(){ if(_r) window.location = "../layouts/main.html"; }

function preloader(s_msg, s_style){
	this.start = function(){
		var _ = this;
		function startAnim(arr) {
			var len = arr.length, i = 0, interval = 90;
			var drawTick = function(){
				var _s = arr[i++ % len];
				$(".l_ico").text(_s);
				$(".l_txt").text(s_msg);
			};
			_.timer = setInterval(drawTick, interval);
		}
		var frames = s_style.map(function(c){ return c; });
		startAnim(frames, 70);
	};
	this.message = function(msg){ s_msg = msg; };
	this.stop = function(){ clearInterval(this.timer); };
}

function startLoader(){
	var loader = new preloader("Loading ", ["◡","◟","◜","◠","◝","◞"]);
	loader.start();
	var _c = 4;
	var _dot = "";
	setInterval(function(){
		_c--;
		_dot += ".";
		loader.message("Loading" + _dot + " ");
		if (_c === 0){
			loader.stop();
			clearInterval(this);
			next();
		}
	}, 500);
}