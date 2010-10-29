:: remove old build files
if exist build rmdir /s /q build

:: create files to hold compiled scripts and style sheets
mkdir build
type nul > build\library.js
type nul > build\library.css
mkdir build\console
mkdir build\dumbcrossfade
mkdir build\images

:: Prototype JS
copy /b build\library.js + js\src\prototype.js build\library.js

:: jQuery
copy /b build\library.js + js\src\jquery-1.4.3.min.js build\library.js

:: Core libary
copy /b build\library.css + css\core.min.css build\library.css
copy /b build\library.js + js\src\core.min.js build\library.js

:: jQuery User interface
copy css\jquery-ui-1.8.5.custom.css build
copy /b build\library.js + js\src\jquery-ui-1.8.5.min.js build\library.js

:: jQuery Tools
copy /b build\library.js + js\src\jquery.tools.min.js build\library.js

:: autoMouseOver jQuery plugin
copy /b build\library.js + js\src\jquery.autoMouseOver.min.js build\library.js

:: Pines Notify jQuery plugin
copy /b build\library.css + css\jquery.pnotify.min.css build\library.css
copy /b build\library.js + js\src\jquery.pnotify.min.js build\library.js

:: dumbCrossfade jQuery plugin
copy /b build\library.css + css\dumbcrossfade.min.css build\library.css
copy /b build\library.js + js\src\jquery.dumbcrossfade-2.0.min.js build\library.js

:: Sound Manager 2 component
copy /b build\library.js + js\src\soundmanager2-nodebug-jsmin.js build\library.js

:: Encryption components
copy /b build\library.js + js\src\md5-min.js build\library.js
copy /b build\library.js + js\src\ripemd160-min.js build\library.js
copy /b build\library.js + js\src\sha1-min.js build\library.js
copy /b build\library.js + js\src\sha256-min.js build\library.js
copy /b build\library.js + js\src\sha512-min.js build\library.js

:: Startup script (init)
copy /b build\library.js + js\init.min.js build\library.js

:: copy css images
copy css\console\* build\console
copy css\dumbcrossfade\* build\dumbcrossfade
copy css\images\* build\images

pause