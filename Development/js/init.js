// define run-time event functions for Modevious
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
