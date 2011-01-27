:: Compile src files and write to "dev" section of "Website" for testing
:: %1 may hold ".min", which loads minify compatible resources

:: remove old tmp files
if exist tmp rmdir /s /q tmp

:: create temporary files and folders
mkdir tmp
type nul > tmp\library.js
type nul > tmp\library.css

:: Prototype JS
copy /a tmp\library.js + Development\js\src\prototype.js tmp\library.js

:: jQuery
copy /a tmp\library.js + Development\js\src\jquery%1.js tmp\library.js

:: Core libary
mkdir tmp\console
copy /b Development\css\console\* tmp\console\
copy /a tmp\library.css + Development\css\core%1.css tmp\library.css
copy /a tmp\library.js + Development\js\src\core%1.js tmp\library.js

:: jQuery User interface
mkdir tmp\images
copy /b Development\css\images\* tmp\images\
copy /b Development\css\jquery-ui%1.css tmp\jquery-ui.css
copy /a tmp\library.js + Development\js\src\jquery-ui.min.js tmp\library.js

:: jQuery Tools
copy /a tmp\library.js + Development\js\src\jquery.tools.min.js tmp\library.js

:: autoMouseOver jQuery plugin
copy /a tmp\library.js + Development\js\src\jquery.autoMouseOver%1.js tmp\library.js

:: Pines Notify jQuery plugin
copy /a tmp\library.css + Development\css\jquery.pnotify.default%1.css tmp\library.css
copy /a tmp\library.js + Development\js\src\jquery.pnotify%1.js tmp\library.js

:: SoundManager 2 component
mkdir tmp\swf
copy /a tmp\library.js + Development\js\src\soundmanager2-nodebug-jsmin.js tmp\library.js
copy /b Development\swf\* tmp\swf\

:: Encryption components
copy /a tmp\library.js + Development\js\src\md5%1.js tmp\library.js
copy /a tmp\library.js + Development\js\src\ripemd160%1.js tmp\library.js
copy /a tmp\library.js + Development\js\src\sha1%1.js tmp\library.js
copy /a tmp\library.js + Development\js\src\sha256%1.js tmp\library.js
copy /a tmp\library.js + Development\js\src\sha512%1.js tmp\library.js

:: Right-click jQuery Context Menu
copy /a tmp\library.js + Development\js\src\jquery.contextMenu%1.js tmp\library.js
copy /a tmp\library.css + Development\css\jquery.contextMenu%1.css tmp\library.css

:: blockUI
copy /a tmp\library.js + Development\js\src\jquery.blockUI.js tmp\library.js

:: jQuery.Validate
copy /a tmp\library.js + Development\js\src\jquery.validate%1.js tmp\library.js
copy /b Development\css\jquery.validate\* tmp\jquery.validate\

:: Startup script (init)
copy /a tmp\library.js + Development\js\init%1.js tmp\library.js

:: Modevious Update System (MUpS)
mkdir tmp\update
touch tmp\update\index.html
copy /b Development\update\index.html tmp\update\index.html

:: Send Console script
copy /b Development\send_log.php tmp\send_log.php

:: copy licenses
copy /b Development\licenses.txt tmp\licenses.txt

:: This script can either compile or build based on parameters sent
if .%2==.build goto build
:compile
echo Compiling...
:: move temporary files to "dev"
xcopy /y /e tmp\* Website\dev\modevious\
goto endif
:build
echo Building...
:: move temporary files to "build"
if exist build rmdir /s /q build
mkdir build
xcopy /y /e tmp\* build\
:endif
:: purge temporary files
rmdir /s /q tmp
pause
