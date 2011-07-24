:: Copy everything from inside dev and push to production section of site.
@echo off

xcopy /y /e Website\dev\* Website
echo Finished updating website!
pause