/*global $m: true, $$: true, document: true, $j: true, soundManager: true,
location: true */
(function () {
	/** Find Modevious location */
	// 1. Store length of array document.getElementsByTagName("script") or $$
	var scriptsIncluded = $$("script");
	var scriptsLength = scriptsIncluded.length;
	var modeviousScriptURL;
	var modeviousLocation;
	// 2. Use for loop to go through document.getElementsByTagName("script")[i].src or $$
	for (var i = 0; i < scriptsLength; i++) {
		// 2.1 Look for "modevious/library.js" script
		if (scriptsIncluded[i].src.include("modevious/library.js")) {
			// 2.1.1 Read and store URL of that script
			modeviousScriptURL = scriptsIncluded[i].src;
			// 2.1.2 Remove similar parts in both URLs and remove the last part "library.js"
			modeviousLocation = modeviousScriptURL.sub("library.js", '');
			i = scriptsLength;
		}
	}
	// 3. Use new URL as Modevious location and read in its other files
	if (modeviousLocation !== $m.config.location) {
		$m.config.location = modeviousLocation;
		if (typeof(window.$config) !== "undefined") {
			if (typeof(window.$config.jQuery.ui.theme.url) === "undefined") {
				$m.config.jQuery.ui.theme.url = modeviousLocation + "jquery-ui.css";
			}
			if (typeof(window.$config.soundManager.url) === "undefined") {
				$m.config.soundManager.url = modeviousLocation + "swf";
			}
		}
	}
	$m.include($m.config.jQuery.ui.theme.url);
	$m.include($m.config.location + "library.css");	
	soundManager.url = $m.config.soundManager.url;
	soundManager.flashVersion = $m.config.soundManager.flashVersion;
})();

var stack_topleft = {"dir1": "down", "dir2": "right", "firstpos1": 15, "firstpos2": 15};
var stack_bottomleft = {"dir1": "up", "dir2": "right", "firstpos1": 15, "firstpos2": 15};
var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 15, "firstpos2": 15};

$j(document).ready(function() {
	// initialize console 
	// if jQuery Dialog is available we will use that
	var theBody = $j("body");
	if (typeof(jQuery.dialog) === "undefined") {
		theBody.append([
		"<div id=\"modevious_console\">",
			"<div id=\"modevious_console_top\">",
				"<div id=\"modevious_minimize_console_button\"></div>",
			"</div>",
			"<div id=\"modevious_console_middle\">"
		].join(''));
	}
	theBody.append("<div id=\"modevious_console_text\"></div>");
	if (typeof(jQuery.dialog) === "undefined") {
		theBody.append([
			"</div>",
			"<div id=\"modevious_console_bottom\"></div>",
		"</div>"
		].join(''));
		// add close behavior to console close button
		$j("#modevious_minimize_console_button").click($m.console.hide);
		// allow for users to move the console
		$j("#modevious_console").draggable({ handle: "#modevious_console_top, #modevious_console_bottom"}).css("position", "fixed");
	} else {
		theWindow = $(window);
		theBody.dialog({
			autoOpen: false,
			width: theWindow.width() * 0.8,
			height: theWindow.height() * 0.8,
			maxWidth: theWindow.width(),
			maxHeight: theWindow.height()
		});
	}

	// create keypress listener for code to open console
	if (document.addEventListener) {
		document.addEventListener("keydown", function(event) {
			console.checkCode(event);
		}, false);
	} else {
		document.attachEvent("onkeydown", function(event) {
			console.checkCode(event);
		});
	}

	// initialize jQuery UI
	$j(".tabs").tabs();
	$j(".accordion").accordion({ 
		header: "h3", 
		autoHeight: false, 
		collapsible: true 
	});
	$j(":button, .button").button();
	$j(".buttonset").buttonset();
	$j(".draggable").draggable({
		cursor: "move",
		cancel: "p, img, h1, h2, h3, h4, h5, a"
	});
	$j(".resizable").resizable();
	console.log("jQuery User Interface initialized.");

	// initialize Expose elements
	$j(".expose").click(function(){
		$j(this).expose({
			api: true, 
			closeOnEsc: false, 
			zIndex: 10001
		}).load();
	});
	console.log("Expose elements initialized.");

	// initialize AutoMouseOver elements
	$j(".mouse-over").autoMouseOver();
	console.log("AutoMouseOver elements initialized.");

	// initialize email address de-obfuscation
	$m.showEmail();
	console.log("Email addressed de-obfuscated.");
	
	// set preferred style sheet from cookie if possible
	try {
		if ($m.readCookie("style").length !== 0) {
			$m.setActiveStyleSheet($m.readCookie("style"));
			console.log("Style sheet cookie found, setting active style sheet.");
		}
	} catch (err) {
		console.log("No cookie for style sheet found.");
	}
	console.log("Modevious started and running smoothly!");
	
	// Automatically initialize $m.vAlign
	var fn = function () {
		console.log("Window has been resized");
		$j(window).unbind("resize");
		$m.vAlign();
		setTimeout(function () {
			$j(window).bind("resize", fn);
			$m.vAlign();
		}, 250); // 250 ms
	}
	$j(window).bind("resize", fn);
	
	// After 5 seconds check for Sound Manager, if it fails notify the user and check again in 10 seconds
	setTimeout(function () {
		if (!soundManager.ok()) {
			$j.pnotify({
				pnotify_title: "Sound Manager",
				pnotify_text: "Failed to load. Please check that you have Flash installed and that it is not being blocked by a plugin."
			});
			console.log("Sound Manager check after 5 seconds has returned false.");
			setTimeout(function () {
				if (soundManager.ok()) { // false alarm, let the user know that Sound Manager did load correctly
					$j.pnotify({
						pnotify_title: "Sound Manager",
						pnotify_text: "False alarm. We apologize, but everything is fine! Carry on."
					});
					console.log("Sound Manager check after 15 seconds has returned true.");
				} else {
					console.log("Sound Manager check after 15 seconds has returned false.");
				}
			}, 10000);
		} else {
			console.log("Sound Manager check after 5 seconds has returned true.");
		}
	}, 5000);
});
