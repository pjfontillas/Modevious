::!\bin\bash
:: run build script to test
@echo off

call build.bat %1 /a

:: move build files to website dev section
rd /q /s Website\dev\modevious
md Website\dev\modevious
xcopy /s tmp Website\dev\modevious

:: clean up
rd /q /s tmp

:: files should be ready to be sent via FTP
echo "Files moved to website dev section. Ready for FTP."
pause
exit 0