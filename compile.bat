:: Compile src files and write to "dev" section of "Website" for testing
:: remove old tmp files
if exist tmp rmdir /s /q tmp

:: create temporary files and folders
mkdir tmp
type nul > tmp\library.js
type nul > tmp\library.css

:: Prototype JS
copy /b tmp\library.js + Development\js\src\prototype.js tmp\library.js

:: jQuery
copy /b tmp\library.js + Development\js\src\jquery-1.4.3.js tmp\library.js

:: Core libary
copy /b tmp\library.css + Development\css\core.css tmp\library.css
copy /b tmp\library.js + Development\js\src\core.js tmp\library.js

:: jQuery User interface
copy Development\css\jquery-ui-1.8.5.custom.css build
copy /b tmp\library.js + Development\js\src\jquery-ui-1.8.5.min.js tmp\library.js

:: jQuery Tools
copy /b tmp\library.js + Development\js\src\jquery.tools.min.js tmp\library.js

:: autoMouseOver jQuery plugin
copy /b tmp\library.js + Development\js\src\jquery.autoMouseOver.js tmp\library.js

:: Pines Notify jQuery plugin
copy /b tmp\library.css + Development\css\jquery.pnotify.default.css tmp\library.css
copy /b tmp\library.js + Development\js\src\jquery.pnotify.js tmp\library.js

:: dumbCrossfade jQuery plugin
copy /b tmp\library.css + Development\css\dumbcrossfade.css tmp\library.css
copy /b tmp\library.js + Development\js\src\jquery.dumbcrossfade-2.0.js tmp\library.js

:: SoundManager 2 component
copy /b tmp\library.js + Development\js\src\soundmanager2-nodebug-jsmin.js tmp\library.js
copy /b Development\swf\* tmp\swf

:: Encryption components
copy /b tmp\library.js + Development\js\src\md5.js tmp\library.js
copy /b tmp\library.js + Development\js\src\ripemd160.js tmp\library.js
copy /b tmp\library.js + Development\js\src\sha1.js tmp\library.js
copy /b tmp\library.js + Development\js\src\sha256.js tmp\library.js
copy /b tmp\library.js + Development\js\src\sha512.js tmp\library.js

:: Startup script (init)
copy /b tmp\library.js + Development\js\init.js tmp\library.js

:: Modevious Update System (MUpS)
copy /b Development\update\index.html Website\dev\modevious\update\index.html

:: move temporary files to "dev"
copy /y tmp\library.js Website\dev\modevious\library.js
copy /y tmp\library.css Website\dev\modevious\library.css

:: purge temporary files
rmdir /s /q tmp

pause