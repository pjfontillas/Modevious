/**
* This codes shows examples of what can be done when "compiling" the library.
* The "compiled" production version provided by PJ Fontillas as a download at
* http://modevious.com doesn't use this as the scripts and CSS files listed
* here are already compacted into one large JS and CSS file.
*/

// Other libraries
$c.exclude("/js/lib/prototype.js");
$c.exclude("/js/lib/jquery-1.4.2.min.js");

// Core libary
$c.include("/css/core.css");
$c.exclude("/js/lib/core.js");

// Exclude this configuration file
$c.exclude("/js/modevious-h.js");

// jQuery User interface
$c.include("/css/modevious/ui.css");
$c.include("/js/lib/jquery-ui-1.8.2.min.js");

// Expose jQuery plugin
$c.include("/js/lib/tools.expose-1.0.5.js");

// autoMouseOver jQuery plugin
$c.include("/js/lib/jquery.autoMouseOver.js");

// Pines Notify jQuery plugin
$c.include("/css/jquery.pnotify.default.css");
$c.include("/js/lib/jquery.pnotify.min.js");

// dumbCrossfade jQuery plugin
$c.include("/css/dumbcrossfade.css");
$c.include("/js/lib/jquery.dumbcrossfade-2.0.min.js");

// Sound Manager 2 component
$c.include("/js/lib/soundmanager2-nodebug-jsmin.js");

// Encryption components
$c.include("/js/lib/md5-min.js");
$c.include("/js/lib/ripemd160-min.js");
$c.include("/js/lib/sha1-min.js");
$c.include("/js/lib/sha256-min.js");
$c.include("/js/lib/sha512-min.js");

// define run-time event functions
$c.onLoad(function () {
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

	// initialize Expose elements
	$j(".expose").click(function(){
		$j(this).expose({
			api: true, 
			closeOnEsc: false, 
			zIndex: 10001
		}).load();
	});

	// initialize AutoMouseOver elements
	$j(".mouse-over").autoMouseOver();

	// initialize DumbCrossFade elements
	$j(".dumbCrossFade .dumbItem").dumbCrossFade({
		doHoverPause: false 
	});

	// initialize email address de-obfuscation
	$c.showEmail();
	
	// set preferred style sheet from cookie if possible
  try {
    if ($c.readCookie("style").length !== 0) {
      setActiveStyleSheet($c.readCookie("style"));
    }
  } catch (err) {
  } // do nothing
  
  // initialize console 
  $j("body").append([
  "<div id=\"console\">",
    "<div id=\"console_top\">",
      "<p id=\"console_close_button\">close X</p>",
    "</div>",
    "<div id=\"console_middle\">",
      "<div id=\"console_text\"></div>",
    "</div>",
    "<div id=\"console_bottom\"></div>",
  "</div>"
  ].join(''));
  // add close behavior to console close button
  $j("#console_close_button").click($c.hideLog);
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
 
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");
  $c.trace("Modevious started and running smoothly!");

});
