# Compile src files and write to "dev" section of "Website" for testing
# remove old tmp files
if [ -d tmp ]
then
rm tmp/*
rmdir tmp
fi

# create temporary files and folders
mkdir tmp
touch tmp/library.js
touch tmp/library.css

# Prototype JS
cat tmp/library.js Development/js/src/prototype.js tmp/library.js

# jQuery
cat tmp/library.js Development/js/src/jquery-1.4.3.js tmp/library.js

# Core libary
cat tmp/library.css Development/css/core.css tmp/library.css
cat tmp/library.js Development/js/src/core.js tmp/library.js

# jQuery User interface
cp Development/css/jquery-ui-1.8.5.custom.css tmp
cat tmp/library.js Development/js/src/jquery-ui-1.8.5.min.js tmp/library.js

# jQuery Tools
cat tmp/library.js Development/js/src/jquery.tools.min.js tmp/library.js

# autoMouseOver jQuery plugin
cat tmp/library.js Development/js/src/jquery.autoMouseOver.js tmp/library.js

# Pines Notify jQuery plugin
cat tmp/library.css Development/css/jquery.pnotify.default.css tmp/library.css
cat tmp/library.js Development/js/src/jquery.pnotify.js tmp/library.js

# dumbCrossfade jQuery plugin
cat tmp/library.css Development/css/dumbcrossfade.css tmp/library.css
cat tmp/library.js Development/js/src/jquery.dumbcrossfade-2.0.js tmp/library.js

# SoundManager 2 component
cat tmp/library.js Development/js/src/soundmanager2-nodebug-jsmin.js tmp/library.js
cp Development/swf/* tmp/swf

# Encryption components
cat tmp/library.js Development/js/src/md5.js tmp/library.js
cat tmp/library.js Development/js/src/ripemd160.js tmp/library.js
cat tmp/library.js Development/js/src/sha1.js tmp/library.js
cat tmp/library.js Development/js/src/sha256.js tmp/library.js
cat tmp/library.js Development/js/src/sha512.js tmp/library.js

# Startup script (init)
cat tmp/library.js Development/js/init.js tmp/library.js

# Modevious Update System (MUpS)
cp Development/update/index.html Website/dev/modevious/update/index.html

# move temporary files to "dev"
cp tmp/library.js Website/dev/modevious/library.js
cp tmp/library.css Website/dev/modevious/library.css

# purge temporary files
rm tmp/*
rmdir tmp

pause