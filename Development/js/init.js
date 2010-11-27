/*global $c: true, $$: true, document: true, $j: true, soundManager: true,
location: true */
/** Find Modevious location */
// 1. Store length of array document.getElementsByTagName("script") or $$
var scriptsIncluded = $$("script");
var scriptsLength = scriptsIncluded.length;
var modeviousScriptURL;
var modeviousLocation;
// 2. Get page location
var pageLocation = location.href;
// 3. Use for loop to go through document.getElementsByTagName("script")[i].src or $$
for (var i = 0; i < scriptsLength; i++) {
	// 3.1 Look for "modevious/library.js" script
	if (scriptsIncluded[i].src.include("modevious/library.js")) {
		// 3.1.1 Read and store URL of that script
		modeviousScriptURL = scriptsIncluded[i].src;
		// 3.1.2 Remove similar parts in both URLs and remove the last part "library.js"
		modeviousLocation = modeviousScriptURL.sub(pageLocation, '/').sub("library.js", '');
		i = scriptsLength;
	}
}
// 4. Use new URL as Modevious location and read in its other files
if (modeviousLocation != $c.config.modeviousLocation) {
	$c.config.modeviousLocation = modeviousLocation;
	$c.config.jQueryUIThemeURL = modeviousLocation + "jquery-ui-1.8.5.custom.css";
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
  "<div id=\"console\">",
    "<div id=\"console_top\">",
      "<div id=\"minimize_console_button\"></div>",
    "</div>",
    "<div id=\"console_middle\">",
      "<div id=\"console_text\"></div>",
    "</div>",
    "<div id=\"console_bottom\"></div>",
  "</div>"
  ].join(''));
  // add close behavior to console close button
  $j("#minimize_console_button").click($c.hideLog);
  // create keypress listener for code to open console
  // Default: UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A
  // currently using an IE hack to detect keypresses
  if (document.addEventListener) {
    document.addEventListener("keydown", function(event) {
      $c.showLog(event);
    }, false);
  } else {
    document.attachEvent("onkeydown", function(event) {
      $c.showLog(event);
    });    
  }
  // allow for users to move the console
  $j("#console").draggable({ handle: "#console_top, #console_bottom"});

  $c.trace("Starting Modevious...");
	// initialize jQuery UI
	$j(".tabs").tabs();
	$j(".accordion").accordion({ 
		header: "h3", 
		autoHeight: false, 
		collapsible: true 
	});
	$j(":button").button();
	$j(".draggable").draggable();
	$j(".resizable").resizable();
  $c.trace("jQuery User Interface initialized.");

	// initialize Expose elements
	$j(".expose").click(function(){
		$j(this).expose({
			api: true, 
			closeOnEsc: false, 
			zIndex: 10001
		}).load();
	});
  $c.trace("Expose elements initialized.");

	// initialize AutoMouseOver elements
	$j(".mouse-over").autoMouseOver();
  $c.trace("AutoMouseOver elements initialized.");

	// initialize DumbCrossFade elements
	$j(".dumbCrossFade .dumbItem").dumbCrossFade({
		doHoverPause: false 
	});
  $c.trace("DumbCrossFade elements initialized.");

	// initialize email address de-obfuscation
	$c.showEmail();
  $c.trace("Email addressed de-obfuscated.");
	
	// set preferred style sheet from cookie if possible
  try {
    if ($c.readCookie("style").length !== 0) {
      $c.setActiveStyleSheet($c.readCookie("style"));
      $c.trace("Style sheet cookie found, setting active style sheet.");
    }
  } catch (err) {
    $c.trace("No cookie for style sheet found.");
  }

	// Initialize Google Code Prettify
	prettyPrint();
	$c.trace("Initialized Google Code Prettify, your example or source code is now pretty!");
	
  $c.trace("Modevious started and running smoothly!");
});
