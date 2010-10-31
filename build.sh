# Linux/Mac script to build Modevious for deployment
# remove old build files
if [ -d build/console ]
then
rm build/console/*
rmdir build/console
fi

if [ -d build/dumbcrossfade ]
then
rm build/dumbcrossfade/*
rmdir build/dumbcrossfade
fi

if [ -d build/images ]
then
rm build/images/*
rmdir build/images
fi

if [ -d build/swf ]
then
rm build/swf/*
rmdir build/swf
fi

if [ -d build/update ]
then
rm build/update/*
rmdir build/update
fi

if [ -d build ]
then
rm build/*
rmdir build
fi

# create files to hold compiled scripts and style sheets
mkdir build
touch build/library.js
touch build/library.css
mkdir build/console
mkdir build/dumbcrossfade
mkdir build/images
mkdir build/swf
mkdir build/update

# Prototype JS
cat Development/js/src/prototype.js >> build/library.js

# jQuery
cat Development/js/src/jquery-1.4.3.min.js >> build/library.js

# Core libary
cat Development/css/core.min.css >> build/library.css
cat Development/js/src/core.min.js >> build/library.js

# jQuery User interface
cp Development/css/jquery-ui-1.8.5.custom.css build
cat Development/js/src/jquery-ui-1.8.5.min.js >> build/library.js

# jQuery Tools
cat Development/js/src/jquery.tools.min.js >> build/library.js

# autoMouseOver jQuery plugin
cat Development/js/src/jquery.autoMouseOver.min.js >> build/library.js

# Pines Notify jQuery plugin
cat Development/css/jquery.pnotify.min.css >> build/library.css
cat Development/js/src/jquery.pnotify.min.js >> build/library.js

# dumbCrossfade jQuery plugin
cat Development/css/dumbcrossfade.min.css >> build/library.css
cat Development/js/src/jquery.dumbcrossfade-2.0.min.js >> build/library.js

# SoundManager 2 component
cat Development/js/src/soundmanager2-nodebug-jsmin.js >> build/library.js
cp Development/swf/* build/swf

# Encryption components
cat Development/js/src/md5-min.js >> build/library.js
cat Development/js/src/ripemd160-min.js >> build/library.js
cat Development/js/src/sha1-min.js >> build/library.js
cat Development/js/src/sha256-min.js >> build/library.js
cat Development/js/src/sha512-min.js >> build/library.js

# Startup script (init)
cat Development/js/init.min.js >> build/library.js

# Modevious Update System (MUpS)
cp Development/update/index.html build/update

# copy css images
cp Development/css/console/* build/console
cp Development/css/dumbcrossfade/* build/dumbcrossfade
cp Development/css/images/* build/images

# copy licenses
cp Development/licenses.txt build