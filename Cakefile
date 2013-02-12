fs            = require 'fs'
wrench        = require 'wrench'
{print}       = require 'util'
which         = require 'which'
{spawn, exec} = require 'child_process'

log = (message) -> console.log message

build = (callback) ->
  options = ['-c','-b', '-o', '.app', 'src']
  cmd = which.sync 'coffee'
  coffee = spawn cmd, options
  coffee.stdout.pipe process.stdout
  coffee.stderr.pipe process.stderr
  coffee.on 'exit', (status) -> callback?() if status is 0

task "build", ->
  build -> log "Build Success!"

task 'dev', 'start dev env', ->
  cmd = which.sync 'coffee'
  coffee = spawn cmd, ['-c', '-b', '-w', '-o', '.app', 'src']
  coffee.stdout.pipe process.stdout
  coffee.stderr.pipe process.stderr
  log 'Watching coffee files'

  supervisor = spawn 'node', [
    './node_modules/supervisor/lib/cli-wrapper.js',
    '-w',
    '.app',
    '-e',
    'js',
    'app'
  ]
  supervisor.stdout.pipe process.stdout
  supervisor.stderr.pipe process.stderr
  log 'Watching js files and running server'
