/**
* This codes shows examples of what can be done when "compiling" the library.
* The "compiled" production version provided by PJ Fontillas as a download at
* http://modevious.com doesn't use this as the scripts and CSS files listed
* here are already compacted into one large JS and CSS file.
*/

// Other libraries
$c.exclude("/js/src/prototype.min.js");
$c.exclude("/js/src/jquery-1.4.2.min.js");

// Core libary
$c.include("/css/modevious/core.min.css");
$c.exclude("/js/src/core.js");

// Exclude this configuration file
$c.exclude("/js/modevious-h.js");

// jQuery User interface
$c.include("/css/modevious/jquery.ui.custom.css");
$c.include("/js/src/jquery-ui-1.8.4.min.js");

// jQuery Tools
$c.include("/js/src/jquery.tools.min.js");

// autoMouseOver jQuery plugin
$c.include("/js/src/jquery.autoMouseOver.min.js");

// Pines Notify jQuery plugin
$c.include("/css/modevious/jquery.pnotify.min.css");
$c.include("/js/src/jquery.pnotify.min.js");

// dumbCrossfade jQuery plugin
$c.include("/css/modevious/dumbcrossfade.min.css");
$c.include("/js/src/jquery.dumbcrossfade-2.0.min.js");

// Sound Manager 2 component
$c.include("/js/src/soundmanager2-nodebug-jsmin.js");

// Encryption components
$c.include("/js/src/md5-min.js");
$c.include("/js/src/ripemd160-min.js");
$c.include("/js/src/sha1-min.js");
$c.include("/js/src/sha256-min.js");
$c.include("/js/src/sha512-min.js");

// define run-time event functions
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
  // create listener for code to open console
  // UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT
  //Event.observe(document, "keypress", function(event) {$c.showLog(event);});
  // currently using an IE hack, may remove this if supported in IE6+ (or IE7+)
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
      setActiveStyleSheet($c.readCookie("style"));
      $c.trace("Style sheet cookie found, setting active style sheet.");
    }
  } catch (err) {
    $c.trace("No cookie for style sheet found.");
  }

  $c.trace("Modevious started and running smoothly!");
});
