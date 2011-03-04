#!/bin/bash
# Compile src files and write to "dev" section of "Website" for testing
# $1 may hold ".min", which loads minify compatible resources

# remove old tmp files
if [ -d tmp ]; then
	echo "'tmp' directory already exists, removing old files"
	rm -r tmp
fi

# create temporary files and folders
mkdir tmp
touch tmp/library.js
touch tmp/library.css

# Prototype JS
cat Development/js/src/prototype.js >> tmp/library.js

# jQuery
cat Development/js/src/jquery${1}.js >> tmp/library.js

# Core libary
mkdir tmp/console
cp Development/css/console/* tmp/console/
cat Development/css/core${1}.css >> tmp/library.css
cat Development/js/src/core${1}.js >> tmp/library.js

# jQuery User interface
mkdir tmp/images
cp Development/css/images/* tmp/images/
cp Development/css/jquery-ui.css tmp/jquery-ui.css
cat Development/js/src/jquery-ui.min.js >> tmp/library.js

# jQuery Tools
cat Development/js/src/jquery.tools.min.js >> tmp/library.js

# autoMouseOver jQuery plugin
cat Development/js/src/jquery.autoMouseOver${1}.js >> tmp/library.js

# Pines Notify jQuery plugin
cat Development/css/jquery.pnotify.default${1}.css >> tmp/library.css
cat Development/js/src/jquery.pnotify${1}.js >> tmp/library.js

# SoundManager 2 component
mkdir tmp/swf
cat Development/js/src/soundmanager2-nodebug-jsmin.js >> tmp/library.js
cp Development/swf/* tmp/swf/

# Encryption components
cat Development/js/src/md5${1}.js >> tmp/library.js
cat Development/js/src/ripemd160${1}.js >> tmp/library.js
cat Development/js/src/sha1${1}.js >> tmp/library.js
cat Development/js/src/sha256${1}.js >> tmp/library.js
cat Development/js/src/sha512${1}.js >> tmp/library.js

# Right-click jQuery Context Menu
cat Development/js/src/jquery.contextMenu${1}.js >> tmp/library.js
cat Development/css/jquery.contextMenu${1}.css >> tmp/library.css

# blockUI
cat Development/js/src/jquery.blockUI.js >> tmp/library.js

# jQuery.Validate
cat Development/js/src/jquery.validate${1}.js >> tmp/library.js

# Startup script (init)
cat Development/js/init${1}.js >> tmp/library.js

# Modevious Update System (MUpS)
mkdir tmp/update
cp Development/update/index.html tmp/update/index.html

# Send Console script
cp Development/send_log.php tmp/send_log.php

# copy licenses
cp Development/licenses.txt tmp/licenses.txt

# This script can either compile or build based on parameters sent
if [ "${2}" == "build" ]; then
	echo "Building..."
	# move temporary files to "build"
	if [ -d build ]; then
		echo "'build' directory already exists, removing old files"
		rm -r build 
	fi
	mkdir build
	cp -r tmp/* build/
else
	echo "Compiling..."
	# move temporary files to "dev"
	cp -r tmp/* Website/dev/modevious/
fi

# purge temporary files
rm -r tmp
echo "Finished!"
