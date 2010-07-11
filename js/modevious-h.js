// Modevious libraries
$c.exclude("/js/lib/core.js");
$c.exclude("/js/lib/prototype.js");
$c.exclude("/js/lib/jquery-1.4.2.min.js");

// Exclude this configuration file
$c.exclude("/js/modevious-h.js");

// Modevious extensions
$c.include("/css/custom-theme/jquery-ui-1.8.1.custom.css");
$c.include("/js/lib/jquery-ui-1.8.1.custom.min.js");

$c.include("/js/lib/tools.expose-1.0.5.js");

$c.include("/js/lib/jquery.autoMouseOver.js");

$c.include("/css/jquery.pnotify.default.css");
$c.include("/js/lib/jquery.pnotify.min.js");

$c.include("/css/dumbcrossfade.css");
$c.include("/js/lib/jquery.dumbcrossfade-1.2.min.js");

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

	//* initialize popUp links
	$$("popUp").each(function(a){
		$c.popUp(a.readAttribute("src"));
	});
	/**/
});
