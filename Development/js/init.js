/*global $c: true, $$: true, document: true, $j: true, soundManager: true,
location: true */
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
if (modeviousLocation != $c.config.modeviousLocation) {
	$c.config.modeviousLocation = modeviousLocation;
	$c.config.jQueryUIThemeURL = modeviousLocation + "jquery-ui.css";
	$c.config.libraryURL = modeviousLocation + "library.css";
	$c.config.soundManager.url = modeviousLocation + "swf";
}
$c.include($c.config.jQueryUIThemeURL);
$c.include($c.config.libraryURL);	
soundManager.url = $c.config.soundManager.url;
soundManager.flashVersion = $c.config.soundManager.flashVersion;

var stack_topleft = {"dir1": "down", "dir2": "right", "firstpos1": 15, "firstpos2": 15};
var stack_bottomleft = {"dir1": "up", "dir2": "right", "firstpos1": 15, "firstpos2": 15};
var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 15, "firstpos2": 15};

$c.onLoad(function () {	
	// initialize console 
	$j("body").append([
	"<div id=\"modevious_console\">",
		"<div id=\"modevious_console_top\">",
			"<div id=\"modevious_minimize_console_button\"></div>",
		"</div>",
		"<div id=\"modevious_console_middle\">",
			"<div id=\"modevious_console_text\"></div>",
		"</div>",
		"<div id=\"modevious_console_bottom\"></div>",
	"</div>"
	].join(''));
	// add close behavior to console close button
	$j("#modevious_minimize_console_button").click($c.console.hide);
	// create keypress listener for code to open console
	// Default: UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A
	// currently using an IE hack to detect keypresses
	if (document.addEventListener) {
		document.addEventListener("keydown", function(event) {
			$c.console.checkCode(event);
		}, false);
	} else {
		document.attachEvent("onkeydown", function(event) {
			$c.console.checkCode(event);
		});
	}
	// allow for users to move the console
	$j("#modevious_console").draggable({ handle: "#modevious_console_top, #modevious_console_bottom"}).css("position", "fixed");

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

	if (typeof(window.console) != "undefined") {
		console.log("jQuery User Interface initialized.");
	}
	$c.console.log("jQuery User Interface initialized.");

	// initialize Expose elements
	$j(".expose").click(function(){
		$j(this).expose({
			api: true, 
			closeOnEsc: false, 
			zIndex: 10001
		}).load();
	});
	if (typeof(window.console) != "undefined") {
		console.log("Expose elements initialized.");
	}
	$c.console.log("Expose elements initialized.");

	// initialize AutoMouseOver elements
	$j(".mouse-over").autoMouseOver();
	if (typeof(window.console) != "undefined") {
		console.log("AutoMouseOver elements initialized.");
	}
	$c.console.log("AutoMouseOver elements initialized.");

	// initialize email address de-obfuscation
	$c.showEmail();
	if (typeof(window.console) != "undefined") {
		console.log("Email addressed de-obfuscated.");
	}
	$c.console.log("Email addressed de-obfuscated.");
	
	// set preferred style sheet from cookie if possible
	try {
		if ($c.readCookie("style").length !== 0) {
			$c.setActiveStyleSheet($c.readCookie("style"));
			if (typeof(window.console) != "undefined") {
				console.log("Style sheet cookie found, setting active style sheet.");
			}
			$c.console.log("Style sheet cookie found, setting active style sheet.");
		}
	} catch (err) {
		if (typeof(window.console) != "undefined") {
			console.log("No cookie for style sheet found.");
		}
		$c.console.log("No cookie for style sheet found.");
	}
	if (typeof(window.console) != "undefined") {
		console.log("Modevious started and running smoothly!");
	}
	$c.console.log("Modevious started and running smoothly!");
	
	// Automatically initialize $c.vAlign
	var fn = function () {
		if (typeof(window.console) != "undefined") {
			console.log("Window has been resized");
		}
		$c.console.log("Window has been resized");
		$j(window).unbind("resize");
		$c.vAlign();
		setTimeout(function () {
			$j(window).bind("resize", fn);
		}, 250); // 250 ms
	}
	$j(window).bind("resize", fn);
});
