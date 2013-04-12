@ECHO OFF

WHERE node /Q
IF ERRORLEVEL 1 (
  ECHO node is required but is not installed.
	GOTO :out
)

WHERE npm /Q
IF ERRORLEVEL 1 (
	ECHO npm is required but is not installed.
	GOTO :out
)

WHERE coffee /Q
IF ERRORLEVEL 1 (
	call npm install coffee-script -g
)

IF NOT EXIST node_modules\coffee-script call npm install coffee-script
IF NOT EXIST node_modules\shelljs call npm install shelljs

coffee build\make.coffee %1

:out
