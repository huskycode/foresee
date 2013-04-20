@ECHO OFF

IF NOT EXIST node_modules\coffee-script call npm install coffee-script
IF NOT EXIST node_modules\shelljs call npm install shelljs

coffee build\make.coffee %1

:out
