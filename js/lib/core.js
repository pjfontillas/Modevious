/**
* core v1.0.8
* Maintainer
*	Patrick James Fontillas
* Description
*	Holds some of the most common ajax functions used.
* Dependencies
*	Prototype v1.6.1 
*	jQuery 1.4.2
*/
var $c = new function() {
	this.version = 108;
	this.loadedScripts = [];
	this.loadedScriptsWarnings = false;
	this.at = '(AT)';
	this.dot = '(DOT)';
	this.update = false;
	
	/**
	* filterData() updates the actual content of the specified {objectID} with content from {pageRequest}.
	*/
	this.filterData = function (pageRequest,objectID) {
		if (pageRequest.readyState == 4 && (pageRequest.status==200 || window.location.href.indexOf("http")==-1))
			document.getElementById(objectID).innerHTML=pageRequest.responseText;
	};

	/**
	* fetchData() fetches the content from the {url} specified and passes control to filterData().
	*/
	this.fetchData = function (url,dataToSend,objectID) {
		var pageRequest = false;
		if (window.XMLHttpRequest) {
			pageRequest = new XMLHttpRequest();
		}
		else if (window.ActiveXObject){ 
			try {
				pageRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} 
			catch (e) {
				try {
					pageRequest = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e){} // do nothing
			}
		}
		else {
			return false;
		}
		pageRequest.onreadystatechange=function() {	
			filterData(pageRequest,objectID); // actually change the content
		}
		if (dataToSend) {
			var sendData = 'sendData=' + dataToSend;
			pageRequest.open('POST',url,true);
			pageRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			pageRequest.send(sendData);
		}
		else {
			pageRequest.open('GET',url,true);
			pageRequest.send(null);
		}
	};

	/**
	* changePage() updates {objectID}'s innerHTML with content from {pageName}.
	*/
	this.changePage = function (pageName,objectID) {
		fetchData(pageName,null,objectID); 
	};

	/**
	* createCookie() creates a cookie of {name} with {value}, and lasts for number of {days}.
	*/
	this.createCookie = function (name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	};
	
	/**
	* readCookie() returns value of cookie {name}, if !found, returns null.
	*/
	this.readCookie = function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};

	/**
	* eraseCookie() deletes a cookie by assigning its days to a negative value.
	*/
	this.eraseCookie = function (name) {
		createCookie(name,"",-1);
	}

	/**
	* Similar to the onLoad HTML attribute, onLoad() runs the specified function after the page is done loading.
	*/
	this.onLoad = this.addLoadEvent = function (func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
			} else {
			window.onload = function() {
				if (oldonload) {
				oldonload();
				}
				func();
			}
		}
	};

	/**
	* getUrlVariable() gets the value of a variable embedded in a URL (e.g.: http://modevious.com/?jsVar='sweet'.
	* Pass the name of the variable (e.g.'s case: jsVar) to the function to get its value.
	*/
	this.getUrlVariable = function (urlVariable) {
		var urlArray = new Array;
		var tempUrlArray = new Array;
		var strOfVariables;	
		tempUrlArray = window.location.href.split('?');
		tempUrlArray[1].replace('&amp;','&'); // replace &amp; with &
		urlArray = tempUrlArray[1].split('&'); // split using &
		for (arrayPos = 0; arrayPos < urlArray.length; arrayPos++) {
				tempUrlArray = urlArray[arrayPos].split('=');
				if (tempUrlArray[0] == urlVariable) {
				return tempUrlArray[1];
			}
		}
		return null;
	};

	/**
	* include() imports and records scripts to be used as part of our library. Helps prevent scripts being loaded
	* multiple times and reduces bandwith usage if JavaScript is disabled by the browser. HTML can have few includes, 
	* or at least the files included (aka header files = script-h.js) are much smaller than the actual libraries.
	*
	* {scriptID} is the location of the script, it's possible that the script exists in multiple locations, and 
	* each will be loaded, this function is currently only used to help prevent multiple loading of the same 
	* exact script (e.g. multiple versions of a script can be used, and although discouraged, it might be necessary to do so)
	* They just require different paths.
	*/
	this.include = function (scriptID) {
		loaded = false; // flag standing for whether or not a script had already been loaded
		for (i = 0; i < this.loadedScripts.length; i++){
			if (this.loadedScripts[i].indexOf(scriptID) != -1) {
				//set flag to true, meaning a script was already loaded
				loaded = true;
				// Optional, if  this.loadedScriptsWarnings is set to true this will throw an alert when 
				// a page tries to load the same script multiple times
				if (this.loadedScriptsWarnings) {
					alert('This page attempted to load: <' + scriptID + '> multiple times.'
					+ ' Please contact the webmaster to correct this.');
				}
			}
		}	
		if (!loaded) { // if the script has not been loaded yet
			// add to array, the array.length returns size, so a size of 0 would put the ID in the first cell, 
			// 1 would be the next cell, which is also now the current array.length
			this.loadedScripts[this.loadedScripts.length] = scriptID;	
			var ext = scriptID.substr(scriptID.lastIndexOf('.')+1, scriptID.length).toLowerCase();
			switch(ext) {
			case 'js':		
				// load script, safe to use document.write because this should run ONLY when page is first 
				// loaded, even though document.write is not encouraged for use in AJAX calls
				document.write('<script type="text/javascript" src="' + scriptID + '"></script>');
				break;
			case 'css':
				document.write('<link type="text/css" href="' + scriptID + '" rel="stylesheet" />');
				break;
			default:
				alert('Unsupported filetype: .' + ext);		
			}	
		}
	};
	
	/**
	* Certain libraries are either already loaded through an HTML include/link or are blacklisted for the sake of other
	* libraries. The exclude() function simply adds the scripts to the included libraries list, preventing them
	* from being loaded. They are not actually loaded, just stored as if loaded.
	*/
	this.exclude = this.add2Lib = function (scriptID) {
			// add to array without loading the script, used for scripts that are already loaded without 
			// the use of Core's include()
			this.loadedScripts[this.loadedScripts.length] = scriptID;	
	};

	/**
	* showEmail() will de-obfuscate the email address, replacing the link content as well as the href attribute.
	*/
	this.showEmail = function () {
		$$('.email').each(function(a) {
			url = a.href.replace(this.at,"@");
			url = url.replace(this.dot,".");
			a.href = url;
			url = url.replace('mailto:','');
			a.update(url);
		}.bind(this));
	};

	/**
	* getTime() returns time in HH:MM AM/PM format.
	*/
	this.getTime = function () {
		var a_p = "";
		var d = new Date();
		var curr_hour = d.getHours();
		if (curr_hour < 12) {
			a_p = "AM";
		} else {
			a_p = "PM";
		}
		if (curr_hour == 0) {
			curr_hour = 12;
		}
		if (curr_hour > 12) {
			curr_hour = curr_hour - 12;
		}
		var curr_min = d.getMinutes();	
		curr_min = curr_min + "";
		if (curr_min.length == 1) {
			curr_min = "0" + curr_min;
		}
		return curr_hour + " : " + curr_min + " " + a_p;
	};

	/**
	* getFileType() returns the extension for a file/link/url.
	*/
	this.getFileType = function (file) {
		var extArray = [];
		extArray = file.split('.'); // Store extension in the last element of array
		return extArray[extArray.length-1];
	};

	/**
	* getFileName() returns the name for a file/link/url.
	*/
	this.getFileName = function (file) {
		var fileArray = [];
		fileArray = file.split('/'); // Store name in the last element of array
		return fileArray[fileArray.length-1];
	};

	/**
	* popUp() allows developers to force new windows. Use only when necessary, visitors like
	* and need to be able to choose how pages open. No title or window feature configuration
	* supported.
	*/
	this.popUp = function (url) {
		window.open(url);
	};
	
}

// Bridges Prototype and jQuery to allow for scripts using either library to run.
var $j = jQuery.noConflict();
