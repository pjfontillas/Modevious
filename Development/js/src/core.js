/**
 * Core Library
 * http://Modevious.com/
 *
 * Bridges the Prototype and jQuery libraries and also contains
 * commonly found functions.
 *
 * Copyright 2010, Patrick James Fontillas
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://modevious.com/modevious/licenses.txt
 *
 */
/*jslint evil: true */
/*global window: true, document: true, XMLHttpRequest: true, Event: true, 
ActiveXObject: true, alert: true, $$: true, jQuery: true, window.$config: true,
location: true, navigator:true */
var $j = jQuery.noConflict(); // Bridge Prototype and jQuery.
var $c = (function () {
	// private methods and variables
	var version = 133;
	var versionString = "v1.3.3";
	var loadedScripts = [];
	var log = [];
	var updateName = [];
	var updateVersion = [];
	var updateURL = [];
	var updateCounter = 0;
	var consoleCounter = 0;
	return { // public methods and variables
		loadedScripts: loadedScripts,
		log: log,
		consoleCounter: consoleCounter,
		updateName: updateName,
		updateVersion: updateVersion,
		updateURL: updateURL,
		updateCounter: updateCounter,
		config: {
			warnings: false,
			at: "(AT)",
			dot: "(DOT)",
			soundManager: {
				url: "/modevious/swf",
				flashVersion: 9
			},
			consoleCode: [ // Konami Code
				Event.KEY_UP,
				Event.KEY_UP,
				Event.KEY_DOWN,
				Event.KEY_DOWN,
				Event.KEY_LEFT,
				Event.KEY_RIGHT,
				Event.KEY_LEFT,
				Event.KEY_RIGHT,
				66,
				65
			],
			modeviousLocation: "/modevious/",
			jQueryUIThemeURL: "/modevious/jquery-ui.css",
			libraryURL: "/modevious/library.css"
		},
		updateFound: false,
		/**
		 *	init ()
		 *		Checks to see if window.$config is set. May be used later on to initialize
		 *		other components but for now only does configuration.
		 */
		init: function () {
			if (typeof(window.$config) !== "undefined") {
				if (typeof(window.$config.warnings) !== "undefined") {
					this.config.warnings = window.$config.warnings;
				}
				if (typeof(window.$config.at) !== "undefined") {
					this.config.at = window.$config.at;
				}
				if (typeof(window.$config.dot) !== "undefined") {
					this.config.dot = window.$config.dot;
				}
				if (typeof(window.$config.soundManager.url) !== "undefined") {
					this.config.soundManager.url = window.$config.soundManager.url;
				}
				if (typeof(window.$config.soundManager.flashVersion) !== "undefined") {
					this.config.soundManager.flashVersion = window.$config.soundManager.flashVersion;
				}
				if (typeof(window.$config.consoleCode) !== "undefined") {
					this.config.consoleCode = window.$config.consoleCode;
				}
				if (typeof(window.$config.modeviousLocation) !== "undefined") {
					this.config.modeviousLocation = window.$config.modeviousLocation;
				}
				if (typeof(window.$config.jQueryUIThemeURL) !== "undefined") {
					this.config.jQueryUIThemeURL = window.$config.jQueryUIThemeURL;
				}
				if (typeof(window.$config.libraryURL) !== "undefined") {
					this.config.libraryURL = window.$config.libraryURL;
				}
			}
		},
		/**
		 *	getVersion
		 *		Returns this library's current version as an integer.
		 */
		getVersion: function () {
			return version;
		},
		/**
		 *	getVersionString ()
		 *		Returns version string.
		 */
		getVersionString: function () {
			return versionString;
		},
		/**
		 *	changePage (String, Element)
		 *		Updates <objectID>'s innerHTML with content from <pageName>.
		 */
		changePage: function (pageName, objectID) {
			$c.fetchData(pageName, null, objectID);
		},
		/**
		 *	createCookie (String, String, Int)
		 *		Creates a cookie of <name> with <value>, and lasts for number of <days>.
		 */
		createCookie: function (name, value, days) {
			var date = new Date();
			var expires;
			if (days) {
				date.setTime(date.getTime() + (days *	24 *	60 *	60 *	1000));
				expires = ["; expires=", date.toGMTString()].join('');
			} else {
				expires = '';
			}
			document.cookie = [name, '=', value, expires, "; path=/"].join('');
		},
		/**
		 *	readCookie (String)
		 *		Returns value of cookie <name>, if !found, returns null.
		 */
		readCookie: function (name) {
			var nameEQ = [name, '='].join('');
			var ca = document.cookie.split(';');
			for (var i = 0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0) === ' ') {
					c = c.substring(1, c.length);
				}
				if (c.indexOf(nameEQ) === 0) {
					return c.substring(nameEQ.length, c.length);
				}
			}
			return null;
		},
		/**
		 *	eraseCookie (String)
		 *		Deletes a cookie by assigning its days to a negative value.
		 */
		eraseCookie: function (name) {
			$c.createCookie(name, '', -1);
		},
		/**
		 *	onLoad(Function) 
		 *		Similar to the onLoad HTML attribute, onLoad() runs the specified 
		 *		function after the page is done loading.
		 */
		addLoadEvent: function (func) {
			$j("document").ready(func);
		},
		onLoad: function (func) {
			$c.addLoadEvent(func);
		},
		/**
		 *	getUrlVariable (String)
		 *		Gets the value of a variable embedded in a URL
		 *		(e.g.: http://modevious.com/?jsVars=sweet. Pass the name of the variable
		 *		(e.g.'s case: jsVar) to the function to get its value.
		 */
		getUrlVariable: function (urlVariable) {
			var urlArray = [];
			var tempUrlArray = [];
			tempUrlArray = location.href.split('?');
			tempUrlArray[1].replace("&amp;", '&'); // replace &amp; with &
			urlArray = tempUrlArray[1].split('&'); // split using &
			for (var arrayPos = 0;arrayPos < urlArray.length;arrayPos++) {
				tempUrlArray = urlArray[arrayPos].split('=');
				if (tempUrlArray[0] === urlVariable) {
					return tempUrlArray[1];
				}
			}
			return null;
		},
		/**
		 *	include (String)
		 *		Imports and records scripts to be used as part of our library. Helps
		 *		prevent scripts being loaded multiple times and reduces bandwith usage 
		 *		if JavaScript is disabled by the browser. HTML can have few includes, or
		 *		at least the files included (aka header files = script-h.js) are much 
		 *		smaller than the actual libraries.
		*
		 *		<scriptID> is the location of the script, it's possible that the script 
		 *		exists in multiple locations, and each will be loaded, this function is 
		 *		currently only used to help prevent multiple loading of the same exact 
		 *		script (e.g. multiple versions of a script can be used, and although 
		 *		discouraged, it might be necessary to do so). They just require 
		 *		different paths.
		 */
		include: function (scriptID) {
			var loaded = false; // flag indicating if a script is loaded.
			for (var i = 0;i < $c.loadedScripts.length;i++) {
				if ($c.loadedScripts[i].indexOf(scriptID) !== -1) {
					//set flag to true, meaning a script is already loaded.
					loaded = true;
					// Optional, if <warnings> is true throw an alert when 
					// a page tries to load the same script multiple times.
					if (this.config.warnings) {
						alert([
							"This page attempted to load: <",
							scriptID,
							"> multiple times.",
							"Please contact the webmaster to correct $c."
						].join(''));
					}
				}
			}
			if (!loaded) { 
				// if the script has not been loaded yet add it to the array, the 
				// array.length returns size, so a size of 0 would put the ID in the 
				// first cell, 1 would be the next cell, which is the array.length
				$c.loadedScripts[$c.loadedScripts.length] = scriptID;
				var ext = scriptID.substr((scriptID.lastIndexOf('.') + 1),
					scriptID.length).toLowerCase();
				switch (ext) {
				case "js":		
					// load script, safe to use document.write because this runs ONLY 
					// when page is first loaded, even though document.write is not 
					// encouraged for use in AJAX calls.
					// This is the only eval type statement I allow!
					document.write([
						"<script type=\"text/javascript\" src=\"",
						scriptID,
						"\"></script>"
					].join(''));
					break;
				case "css":
					document.write([
						"<link type=\"text/css\" href=\"",
						scriptID,
						"\" rel=\"stylesheet\" />"
					].join(''));
					break;
				default:
					alert(["Unsupported filetype: .", ext].join(''));		
				}
			}
		},
		/**
		 *	exclude (String)
		 *		Certain libraries are either already loaded through an HTML include/link
		 *		or are blacklisted for the sake of other libraries. The exclude() 
		 *		function simply adds the scripts to the included libraries list, 
		 *		preventing them from being loaded. They are not actually loaded, just 
		 *		stored as if loaded.
		 */
		add2Lib: function (scriptID) {
			// add to array without loading the script, used for scripts that are
			// already loaded without the use of Core's include().
			$c.loadedScripts[$c.loadedScripts.length] = scriptID;
		},
		exclude: function (scriptID) {
			$c.add2Lib(scriptID);
		},
		/**
		 *	showEmail ()
		 *		De-obfuscate any email address on the page, replacing the link content 
		 *		as well as the href attribute.
		 */
		showEmail: function () {
			var url;
			$$(".enc_email").each(function (a) {
				url = a.href.replace($c.config.at, '@');
				url = url.replace($c.config.dot, '.');
				a.href = url;
				url = url.replace("mailto:", '');
				a.update(url);			 
			}.bind(this));
		},
		/**
		 *	getTime ()
		 *		Returns time in HH:MM AM/PM format.
		 */
		getTime: function () {
			var a_p = "";
			var d = new Date();
			var curr_hour = d.getHours();
			if (curr_hour < 12) {
				a_p = "AM";
			} else {
				a_p = "PM";
			}
			if (curr_hour === 0) {
				curr_hour = 12;
			}
			if (curr_hour > 12) {
				curr_hour = curr_hour - 12;
			}
			var curr_min = d.getMinutes();	
			curr_min = [
				curr_min,
				''
			].join('');
			if (curr_min.length === 1) {
				curr_min = ['0', curr_min].join('');
			}
			var curr_ms = d.getMilliseconds();
			if (curr_ms < 100) {
				curr_ms = [
					'0',
					curr_ms
				].join('');
			}
			return [
				curr_hour,
				":",
				curr_min,
				":",
				curr_ms,
				a_p
			].join(' ');
		},
		/**
		 *	getFileType (String)
		 *		Returns the extension for a file/link/url.
		 */
		getFileType: function (file) {
			var extArray = [];
			extArray = file.split('.'); // Store extension in last element of array
			return extArray[extArray.length - 1];
		},
		/**
		 *	getFileName (String)
		 *		Returns the name for a file/link/url.
		 */
		getFileName: function (file) {
			var fileArray = [];
			fileArray = file.split('/'); // Store name in the last element of array
			return fileArray[fileArray.length - 1];
		},
		/**
		 *	vAlign ()
		 *		Vertically aligns an element relative to their parent element. The 
		 *		element may not have any top or bottom margins, but may be horizontally 
		 *		aligned (centered) using "margin: 0px auto;". Using "margin: 50px auto;"
		 *		will produce errors, and you should not be setting a margin for 
		 *		top/bottom anyways since you will are vertically aligning the element!
		 *		If an element also has the class "centered" then align it horizontally
		 *		as well.
		 */
		vAlign: function () {
			var parentHeight;
			var thisHeight;
			var newTop;
			var parentWidth;
			var thisWidth;
			var newLeft;
			// align most elements to their parent element
			$j(".vAlign").each(function(){
				// get parent height - get element height	
				// get difference and set as new top
				parentHeight = $j(this).parent().outerHeight(true);
				thisHeight = $j(this).outerHeight(true);
				// get the new top positioning but split the free space in half
				newTop = (parentHeight - thisHeight) / 2;
				// if element is larger than parent somehow (ie element vs browser 
				//	window) reset newTop to 0 to prevent pushing the element off-screen.
				if (newTop < 1) {
					newTop = 0;
				}
				// set style
				$j(this).css({
					"position": "relative",
					"top": [newTop, "px"].join('')
				});
			});
			// some elements should be aligned with the browser window
			$j(".vAlignWindow").each(function(){
				// get browser height - get element height	
				parentHeight = document.viewport.getHeight();
				thisHeight = $j(this).outerHeight(true);
				newTop = (parentHeight - thisHeight) / 2;
				if (newTop < 1) {
					newTop = 0;
				}
				$j(this).css({
					"position": "fixed",
					"top": [newTop, "px"].join('')
				});
				if ($j(this).hasClass("centered")) {
					parentWidth = document.viewport.getWidth();
					thisWidth = $j(this).outerWidth(true);
					newLeft = (parentWidth - thisWidth) / 2;
					if (newLeft < 1) {
						newLeft = 0;
					}
					$j(this).css({
						"left": [newLeft, "px"].join('')
					});
				}
			});
		},
		/**
		 *	vAlignThis (element)
		 *		Vertically aligns a single element. If they also have the class centered
		 *		then align it horizontally as well. Only align the element that is sent
		 *		assuming we passed a jQuery element/object
		 */
		vAlignThis: function (element) {
			var parentHeight;
			var thisHeight;
			var newTop;
			var parentWidth;
			var thisWidth;
			var newLeft;
			if (element.hasClass("vAlignWindow")) {
				parentHeight = document.viewport.getHeight();
				thisHeight = element.outerHeight(true);
				newTop = (parentHeight - thisHeight) / 2;
				if (newTop < 1) {
					newTop = 0;
				}
				element.css({
					'position': 'fixed',
					'top': newTop + 'px'
				});
				if (element.hasClass('centered')) {
					//alert('single element centered to browser');
					parentWidth = document.viewport.getWidth();
					thisWidth = element.outerWidth(true);
					newLeft = (parentWidth - thisWidth) / 2;
					if (newLeft < 1) {
						newLeft = 0;
					}
					element.css({
						"left": [newLeft, "px"].join('')
					});
				}
			} else {
				parentHeight = element.parent().outerHeight(true);
				thisHeight = element.outerHeight(true);
				newTop = (parentHeight - thisHeight) / 2;
				if (newTop < 1) {
					newTop = 0;
				}
				// set style
				element.css({
					"position": "relative",
					"top": [newTop, "px"].join('')
				});
			}
		},
		/**
		 *	setStyleSheet (title)
		 *		Activates style sheet or group of style sheets matching <title>.
		 */
		setActiveStyleSheet: function (title) {
			var i, a;
			for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
				if (a.getAttribute("rel").indexOf("style") !== -1 &&
					a.getAttribute("title")) {
					a.disabled = true;
					if (a.getAttribute("title") === title) {
						a.disabled = false;
					}
				}
			}
			$c.createCookie("style", title, 365);
		},
		/**
		 *	getActiveStyleSheet ()
		 *		Returns title of active style sheet or group of style sheets.
		 */
		getActiveStyleSheet: function () {
			var i, a;
			for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
				if (a.getAttribute("rel").indexOf("style") !== -1 &&
					a.getAttribute("title") && !a.disabled) {
					return a.getAttribute("title");
				}
			}
			return null;
		},
		/**
		 *	trace (message)
		 *		Stores <message> in a log to serve for debugging regardless of
		 *		browser used for testing. Can be sent to a server side 
		 *		script (PHP, ASP, etc.) that can then store the log in a database
		 *		or send it via email.
		 */
		trace: function (message) {
			var args = Array.prototype.slice.call(arguments);
			// log and debug support
			$c.log[$c.log.length] = [
				$c.getTime(),
				": ",
				message
			].join('');
			$j("#modevious_console_text").append([
				"<p>",
				$c.log[$c.log.length - 1],
				"</p>"
			].join(''));
			return message; // chains message for possible use with other utilities
		},
		/**
		 *	Emulates part of the Firebug console and native console
		 *	found in Chrome and Safari. Acts as a wrapper for 
		 *	several console functions. The message will eventually
		 *	make it the real console if they are available but is
		 *	also stored elsewhere so that it can be sent via email
		 *	to the site admin.
		 */
		console: {
			/**
			 *	Emulates string substitution found in Firebug.
			 *	Returns parsed string.
			 */
			parse: function (args) {
				var currentArg = 1;
				var parsedString = args[0];
				while (currentArg < args.length) {
					var subPosition = parsedString.indexOf('%');
					if  (subPosition == -1) {
						// simply concactenate everything
						while (currentArg < args.length) {
							parsedString += ' ' + args[currentArg];
							currentArg++;
						}
					} else {
						var subType = parsedString.charAt(subPosition + 1);
						switch (subType) {
							case 's':
							case 'o':
								parsedString = parsedString.sub('%' + subType, String(args[currentArg]));
								break;
							case 'd':
							case 'i':
							case 'f':
								if (isNaN(args[currentArg])) {
									args[currentArg] = 0;
								}
								parsedString = parsedString.sub('%' + subType, Number(args[currentArg]));
								break;
							case 'c':
								// not currently supported
								break;
							default:
								// invalid substitution code
						}
						currentArg++;
					}
				}
				return parsedString;
			},
			log: function () {
				var args = Array.prototype.slice.call(arguments); 
				var output = $c.console.parse(args);
				$c.trace("Log: " + output);
				return output;
			},
			debug: function () {
				var args = Array.prototype.slice.call(arguments); 
				var output = $c.console.parse(args);
				$c.trace("Debug: " + output);
				return output;
			},
			info: function () {
				var args = Array.prototype.slice.call(arguments); 
				var output = $c.console.parse(args);
				$c.trace("Info: " + output);
				return output;
			},
			warn: function () {
				var args = Array.prototype.slice.call(arguments); 
				var output = $c.console.parse(args);
				$c.trace("Warning: " + output);
				return output;
			},
			error: function () {
				var args = Array.prototype.slice.call(arguments); 
				var output = $c.console.parse(args);
				$c.trace("Error: " + output);
				return output;
			},
			assert: function () {
				var args = Array.prototype.slice.call(arguments);
				var output;
				if (!args[0]) {
					args.shift();
					output = $c.console.parse(args);
					$c.trace("Assertion failed: " + output);
				}
				return arguments;
			},
			clear: function () {
				if (typeof(window.console.clear) != "undefined") {
					console.clear();
				}
				$j("#modevious_console_text").html('');
			},
			send: function () {
				var url = [
					$c.config.modeviousLocation,
					"send_log.php"
				].join('');
				var log = $j("#modevious_console_text").html();
				var ajaxRequest = new Ajax.Request(url, {
					parameters: {
						method: "post",
						log: log,
						url: window.document.location.href
					},
					onSuccess: function (transport) {
						if (typeof(window.console) != "undefined") {
							console.info(transport.responseText);
						}
						$c.console.info(transport.responseText);
					},
					onFailure: function (transport) {
						if (typeof(window.console) != "undefined") {
							console.warn([
								"There was a problem sending the log. Here is the response:",
								transport.status,
								transport.statusText
							].join(' '));
						}
						$c.console.warn([
							"There was a problem sending the log. Here is the response:",
							transport.status,
							transport.statusText
						].join(' '));
					}
				});
			},
			/**
			 *	show ()
			 *		This function moves the console to just under the current vertical offset.
			 */
			show: function () {
				$j("#modevious_console").css({
					position: "fixed"
				}).animate({
					top: 0
				});
			},
			/**
			 *	hide ()
			 *		Moves the log to its height + 500px above the page, effectively hiding it.
			 */
			hide: function () {
				$j("#modevious_console").animate({
					top: (($j("#modevious_console").height() + 500) * -1) + "px"
				});
			},
			/**
			 *	checkCode (event)
			 *		If key presses are done in the correct order this calls the function
			 *		If key presses are done in the correct order this calls the function
			 *		that shows the console.
			 */
			checkCode: function (event) {
				if (event.keyCode == $c.config.consoleCode[$c.consoleCounter]) {
					$c.consoleCounter++;
				} else {
					$c.consoleCounter = 0;
				}
				if ($c.consoleCounter == $c.config.consoleCode.length) {
					$c.console.show();
				}
			}
		},
		/**
		 *	getFlashMovie (movieName)
		 *		Returns element of Flash object requested via <movieName>.
		 *		IE, as usual, behaves differently than other browsers.
		 */
		getFlashMovie: function (movieName) {	 
			var isIE = navigator.appName.indexOf("Microsoft") != -1;
			return (isIE) ? window[movieName] : document[movieName];	
		},
		/**
		 *	update (name, version, url)
		 *		Adds a record in the updateArray for the component that called this fn.
		 *		Only runs if config.update is set to true.
		 */
		update: function (name, version, url) {
			$c.updateName[updateName.length] = name;
			$c.updateVersion[updateVersion.length] = version;
			$c.updateURL[updateURL.length] = url;
		}
	};
}());
$c.init(); // sets config
/**
*	Update Mechanism
*		I am going to encourage the use of this system for other plugins and
*		libraries. However, I understand not everbody will want to do this
*		and so provide this technique for attempting to update if Modevious's
*		Update System is in place; if Modevious is not being used this will
*		fail silently and cause no errors. So basically, if the system is there it
*		will use it, otherwise nothing happens.
*/
try { // to update Modevious
	$c.update("Modevious", $c.getVersion(), "http://modevious.com/js/update.php");
} catch (e) {
} // do nothing
