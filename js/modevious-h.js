/**
* This codes shows examples of what can be done when "compiling" the library.
* My "compiled" production version I provide as a download at
* http://modevious.com doesn't use these as the scripts and CSS files listed
* here are already compacted into one large JS and CSS file.
*/

// Modevious libraries
$c.exclude("/js/lib/core.js");
$c.exclude("/js/lib/prototype.js");
$c.exclude("/js/lib/jquery-1.4.2.min.js");

// Exclude this configuration file
$c.exclude("/js/modevious-h.js");

// Modevious extensions
$c.include("/css/modevious/ui.css");
$c.include("/js/lib/jquery-ui-1.8.2.custom.min.js");

$c.include("/js/lib/tools.expose-1.0.5.js");

$c.include("/js/lib/jquery.autoMouseOver.js");

$c.include("/css/jquery.pnotify.default.css");
$c.include("/js/lib/jquery.pnotify.min.js");

$c.include("/css/dumbcrossfade.css");
$c.include("/js/lib/jquery.dumbcrossfade-1.2.min.js");

$c.include("/js/lib/soundmanager2-nodebug-jsmin.js");

// define configuration for components that allow it
soundManager.url = "/swf/";
soundManager.flashVersion = 9;
soundManager.useFlashBlock = false;

// define run-time event functions
$c.onLoad(function () {
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
});
