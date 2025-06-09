@echo off
setlocal enabledelayedexpansion

for %%f in (* icon*.svg) do (
    set "filename=%%~nf"
    set "extension=%%~xf"
    set "newname=!filename: icon=!!extension!"
    ren "%%f" "!newname!"
)
