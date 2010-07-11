/**
* Core v1.0.9
*   Maintainer
*     Patrick James Fontillas (me@pjfontillas.com) or (pjfontillas@gmail.com)
*   Description
*     Holds some of the most common ajax functions used.
*   Dependencies
*     Prototype v1.6.1 
*     jQuery 1.4.2
*   Verified using JSLint.
*   Module pattern.
*   Implied global variables:
*     var window; // Is it safe to declare this?
*     var document; // Is it safe to declare this?
*     var XMLHttpRequest; // Will be depreciated next release
*     var ActiveXObject; // Will be depreciated next release
*     var alert; // What? How?
*     var $$; // from Prototype
*     var jQuery; // from jQuery
*/
var $c = (function () {
  // private methods and variables
  /**
  * filterData (String, Element)
  *   Updates the actual content of the specified <objectID> with content from
  *   {pageRequest}.
  */
  function filterData(pageRequest, objectID) {
    if (pageRequest.readyState === 4 && 
    (pageRequest.status === 200 || location.href.indexOf("http") === -1)) {
      document.getElementById(objectID).innerHTML = pageRequest.responseText;
    }
  }
  /**
  * fetchData (String, String, Element)
  *   Fetches the content from the <url> specified and passes control to 
  *   filterData().
  */
  function fetchData(url, dataToSend, objectID) {
    var pageRequest = false;
    if (window.XMLHttpRequest) {
      pageRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      try {
        pageRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } 
      catch (e) {
        try {
          pageRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e2) {} // do nothing
      }
    } else {
      return false;
    }
    pageRequest.onreadystatechange = function () {  
      this.filterData(pageRequest, objectID); // actually change the content
    };
    if (dataToSend) {
      var sendData = ["sendData=", dataToSend].join('');
      pageRequest.open("POST", url, true);
      pageRequest.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
      pageRequest.send(sendData);
    } else {
      pageRequest.open("GET", url, true);
      pageRequest.send(null);
    }
  }
  return { // public methods and variables
    version: 109,
    config: {
      loadedScriptsWarnings: false,
      at: "(AT)",
      dot: "(DOT)",
      update: false
    },
    loadedScripts: [],
    /**
    * changePage (String, Element)
    *   Updates <objectID>'s innerHTML with content from <pageName>.
    */
    changePage: function (pageName, objectID) {
      this.fetchData(pageName, null, objectID); 
    },
    /**
    * createCookie (String, String, Int)
    *   Creates a cookie of <name> with <value>, and lasts for number of <days>.
    */
    createCookie: function (name, value, days) {
      var date = new Date();
      var expires;
      if (days) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = ["; expires=", date.toGMTString()].join('');
      } else {
        expires = '';
      }
      document.cookie = [name, '=', value, expires, "; path=/"].join('');
    },
    /**
    * readCookie (String)
    *   Returns value of cookie <name>, if !found, returns null.
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
    * eraseCookie (String)
    *   Deletes a cookie by assigning its days to a negative value.
    */
    eraseCookie: function (name) {
      this.createCookie(name, '', -1);
    },
    /**
    * onLoad(Function) 
    *   Similar to the onLoad HTML attribute, onLoad() runs the specified 
    *   function after the page is done loading.
    */
    addLoadEvent: function (func) {
      var oldonload = window.onload;
      if (typeof window.onload !== "function") {
        window.onload = func;
      } else {
        window.onload = function () {
          if (oldonload) {
            oldonload();
          }
          func();
        };
      }
    },
    onLoad: function (func) {
      this.addLoadEvent(func);
    },
    /**
    * getUrlVariable (String)
    *   Gets the value of a variable embedded in a URL
    *   (e.g.: http://modevious.com/?jsVars=sweet. Pass the name of the variable
    *   (e.g.'s case: jsVar) to the function to get its value.
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
    * include (String)
    *   Imports and records scripts to be used as part of our library. Helps
    *   prevent scripts being loaded multiple times and reduces bandwith usage 
    *   if JavaScript is disabled by the browser. HTML can have few includes, or
    *   at least the files included (aka header files = script-h.js) are much 
    *   smaller than the actual libraries.
    *
    *   <scriptID> is the location of the script, it's possible that the script 
    *   exists in multiple locations, and each will be loaded, this function is 
    *   currently only used to help prevent multiple loading of the same exact 
    *   script (e.g. multiple versions of a script can be used, and although 
    *   discouraged, it might be necessary to do so). They just require 
    *   different paths.
    */
    include: function (scriptID) {
      var loaded = false; // flag indicating if a script is loaded.
      for (var i = 0;i < this.loadedScripts.length;i++) {
        if (this.loadedScripts[i].indexOf(scriptID) !== -1) {
          //set flag to true, meaning a script is already loaded.
          loaded = true;
          // Optional, if <loadedScriptsWarnings> is true throw an alert when 
          // a page tries to load the same script multiple times.
          if (this.config.loadedScriptsWarnings) {
            alert([
              "This page attempted to load: <",
              scriptID,
              "> multiple times.",
              "Please contact the webmaster to correct this."
            ].join(''));
          }
        }
      }
      if (!loaded) { 
        // if the script has not been loaded yet add it to the array, the 
        // array.length returns size, so a size of 0 would put the ID in the 
        // first cell, 1 would be the next cell, which is the array.length
        this.loadedScripts[this.loadedScripts.length] = scriptID;
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
    * exclude (String)
    *   Certain libraries are either already loaded through an HTML include/link
    *   or are blacklisted for the sake of other libraries. The exclude() 
    *   function simply adds the scripts to the included libraries list, 
    *   preventing them from being loaded. They are not actually loaded, just 
    *   stored as if loaded.
    */
    add2Lib: function (scriptID) {
      // add to array without loading the script, used for scripts that are
      // already loaded without the use of Core's include().
      this.loadedScripts[this.loadedScripts.length] = scriptID;
    },
    exclude: function (scriptID) {
      this.add2Lib(scriptID);
    },
    /**
    * showEmail ()
    *   De-obfuscate any email address on the page, replacing the link content 
    *   as well as the href attribute.
    */
    showEmail: function () {
      var url;
      $$(".email").each(function (a) {
        url = a.href.replace(this.at, '@');
        url = url.replace(this.dot, '.');
        a.href = url;
        url = url.replace("mailto:", '');
        a.update(url);
      }.bind(this));
    },
    /**
    * getTime ()
    *   Returns time in HH:MM AM/PM format.
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
      curr_min = [curr_min, ''].join('');
      if (curr_min.length === 1) {
        curr_min = ['0', curr_min].join('');
      }
      return [curr_hour, " : ", curr_min, ' ', a_p].join('');
    },
    /**
    * getFileType (String)
    *   Returns the extension for a file/link/url.
    */
    getFileType: function (file) {
      var extArray = [];
      extArray = file.split('.'); // Store extension in last element of array
      return extArray[extArray.length - 1];
    },
    /**
    * getFileName (String)
    *   Returns the name for a file/link/url.
    */
    getFileName: function (file) {
      var fileArray = [];
      fileArray = file.split('/'); // Store name in the last element of array
      return fileArray[fileArray.length - 1];
    },
    /**
    * popUp (String)
    *   Allows developers to force new windows. Use only when necessary, 
    *   visitors like and need to be able to choose how pages open. No title or
    *   window options configuration supported.
    */
    popUp: function (url) {
      window.open(url);
    }
  };
}());
var $j = jQuery.noConflict(); // Bridge Prototype and jQuery.
