require 'shelljs/make'

#Helpers
req = (cmd) -> 
  w = which cmd
  if not w
    echo "\"#{cmd}\" is required. Please make sure that it is properly installed."
  return w != null

exec_and_print = (dir, cmd) ->

#Tasks
target.all = -> 
  target.dev()

target.checkreq = ->
  reqs_status = [req("nodemon"), req("supervisor"), req("mocha"), req("npm"), req("java")]
  if( reqs_status.indexOf(false) != -1 )
    exit(1)

target.npmInstall = ->
  target.checkreq()
  exec("npm install")

target.dev = ->
  target.npmInstall()
  exec("supervisor -w src -e 'js|coffee' app")

target.autotest = ->
  exec("nodemon --watch src --watch test -e js,coffee  build/autotest.js")

target.test = ->
  exec("mocha --reporter spec --compilers coffee:coffee-script --colors --require should test/*.coffee")

target.webtest = ->
  exec("mocha --reporter spec --compilers coffee:coffee-script --colors --require should webtest/*.coffee -t 30000")

target.webtest_c9 = ->
  #This will only work with ubuntu with xvfb
  reqs_status = [req("xvfb-run"), req("firefox")]
  if( reqs_status.indexOf(false) != -1 )
    exit(1)

  exec("xvfb-run mocha --reporter spec --compilers coffee:coffee-script --colors --require should webtest/*.coffee -t 300000")

  