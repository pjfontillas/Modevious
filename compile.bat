:: Compile src files and write to "dev" section of "Website" for testing
:: %1 may hold ".min", which loads minify compatible resources

:: remove old tmp files
if exist tmp rmdir /s /q tmp

:: create temporary files and folders
mkdir tmp
type nul > tmp\library.js
type nul > tmp\library.css

:: Prototype JS
copy /b tmp\library.js + Development\js\src\prototype.js tmp\library.js

:: jQuery
copy /b tmp\library.js + Development\js\src\jquery-1.4.3%1.js tmp\library.js

:: Core libary
copy /b tmp\library.css + Development\css\core%1.css tmp\library.css
copy /b tmp\library.js + Development\js\src\core%1.js tmp\library.js

:: jQuery User interface
copy Development\css\jquery-ui-1.8.5.custom.css build
copy /b tmp\library.js + Development\js\src\jquery-ui-1.8.5.min.js tmp\library.js

:: jQuery Tools
copy /b tmp\library.js + Development\js\src\jquery.tools.min.js tmp\library.js

:: autoMouseOver jQuery plugin
copy /b tmp\library.js + Development\js\src\jquery.autoMouseOver%1.js tmp\library.js

:: Pines Notify jQuery plugin
copy /b tmp\library.css + Development\css\jquery.pnotify.default%1.css tmp\library.css
copy /b tmp\library.js + Development\js\src\jquery.pnotify%1.js tmp\library.js

:: dumbCrossfade jQuery plugin
copy /b tmp\library.css + Development\css\dumbcrossfade%1.css tmp\library.css
copy /b tmp\library.js + Development\js\src\jquery.dumbcrossfade-2.0%1.js tmp\library.js

:: SoundManager 2 component
copy /b tmp\library.js + Development\js\src\soundmanager2-nodebug-jsmin.js tmp\library.js
copy /b Development\swf\* tmp\swf

:: Encryption components
copy /b tmp\library.js + Development\js\src\md5%1.js tmp\library.js
copy /b tmp\library.js + Development\js\src\ripemd160%1.js tmp\library.js
copy /b tmp\library.js + Development\js\src\sha1%1.js tmp\library.js
copy /b tmp\library.js + Development\js\src\sha256%1.js tmp\library.js
copy /b tmp\library.js + Development\js\src\sha512%1.js tmp\library.js

:: Google Code Prettify
copy /b tmp\library.js + Development\js\src\prettify.js tmp\library.js
copy /b tmp\library.css + Development\css\prettify%1.css tmp\library.css

:: Google Code Prettify language extensions
copy /b tmp\library.js + Development\js\src\lang-apollo.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-css.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-hs.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-lisp.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-lua.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-ml.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-proto.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-scala.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-sql.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-vb.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-vhdl.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-wiki.js tmp\library.js
copy /b tmp\library.js + Development\js\src\lang-yaml.js tmp\library.js

:: Right-click Context Menu
copy /b tmp\library.js + Development\js\src\jquery.contextMenu.js tmp\library.js
copy /b tmp\library.css + Development\css\jquery.contextMenu.css tmp\library.css

:: Startup script (init)
copy /b tmp\library.js + Development\js\init%1.js tmp\library.js

:: Modevious Update System (MUpS)
copy /b Development\update\index.html Website\dev\modevious\update\index.html

:: move temporary files to "dev"
copy /y tmp\library.js Website\dev\modevious\library.js
copy /y tmp\library.css Website\dev\modevious\library.css

:: purge temporary files
rmdir /s /q tmp

pause