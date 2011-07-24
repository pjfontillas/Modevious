::!\bin\bash
:: used by deploy script, can be used by itself to test build
@echo off

:: prep
if exist tmp (
	rd /q /s tmp
)
md tmp

:: copy all files into tmp for processing
xcopy /s Development tmp
cd tmp

:: check first parameter for build type
if "%1"=="/m" (
	:: remove non-minified files
	set BTYPE=".min"
	
	:: first _hide_ minified files in another tmp directory
	md js\tmp
	for %%F in (js\*.min.js) DO move %%F js\tmp\
	
	md css\tmp
	for %%F in (css\*.min.css) DO move %%F css\tmp\
	
	:: then delete remaining files
	del /f /q /s js\*.js
	del /f /q /s css\*.js
	
	:: move files back
	for %%F in (js\tmp\*.min.js) DO move %%F js\

	for %%F in (css\tmp\*.min.css) DO move %%F css\

	:: clean up tmp
	del /f /q /s js\tmp
	del /f /q /s css\tmp
) else (
	:: remove minified files, we can straight delete them without
	set BTYPE=


	:: having to move stuff around like above
	del /f /q /s js\*.min.js
	del /f /q /s css\*.min.js
)

:: start by including jQuery in the library
type js\jquery%BTYPE%.js >> library.js
del /f /q /s js\jquery.js
del /f /q /s js\jquery.min.js

:: add the Core library
type js\core%BTYPE%.js >> library.js
del /f /q /s js\core*.js

:: then add Prototype, the only exception to minified files
type js\prototype.js >> library.js
del /f /q /s js\prototype.js

:: move jQuery UI CSS, which is exempt from concat similar to Prototype JS
move css\jquery-ui.css jquery-ui.css

:: move init script to temporary location for later processing
:: note that there will only be one init file, the next line grabs either
:: js\init.js or js\init.min.js
md js\tmp
move js\init*.js js\tmp\init.js

:: concat all the rest of the JavaScript files
type js\*.js >> library.js

:: now add the init script to the library
type js\tmp\init.js >> library.js
del /f /q /s js

:: concat all the rest of the CSS files
type css\*.css >> library.css
del /f /q /s css\*.css

:: copy remaining files, which should be images
xcopy /s css\ ..\tmp\
del /f /q /s -rf css\

:: at this point everything should be ready to deploy
cd ..\
echo "Files processed. Build completed. Ready to deploy."

:: need to shift to read appropriate param if only 1 is sent
if not "%2"=="" (
	echo "SHIFTING"
	shift
)
if not "%1"=="/a" (
	pause
)